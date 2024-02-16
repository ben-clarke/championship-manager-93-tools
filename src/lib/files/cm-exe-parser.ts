import * as fs from "fs";
import { parse } from "papaparse";
import { resolve } from "path";
import { reduce, splitEvery, sum } from "ramda";
import { getGameVersion } from "../constants/file";
import { DataType } from "../types/executable";
import { HumanReadableExe } from "../types/validation";
import { Version } from "../types/version";
import { buildData, replaceData } from "./utils/cm-exe-builder";
import { getSortedList } from "./utils/sorted";

export default class CMExeParser {
  FILE = "CMEXE.EXE";

  data: string[];

  rawCsv: string | undefined;

  retrieved: Record<DataType, Record<string, string>>;

  version: Version;

  constructor({ fileDirectory, rawData, rawCsv }: Input) {
    const raw = rawData
      ? Buffer.from(rawData, "base64").toString("hex")
      : fs.readFileSync(resolve(fileDirectory as string, this.FILE), "hex").toString();

    this.rawCsv = rawCsv;

    this.data = splitEvery(2, raw);

    const version = getData(this.data, "version", "94");
    const year = getData(this.data, "year", "94");
    this.version = getGameVersion(version, year);

    // fs.writeFileSync("/tmp/cm", this.data.map((d) => hexToUtf8(d)).join(""));

    this.retrieved = {
      nationality: {},
      character: {},
      "injury-type": {},
      club: {},
      "non-domestic-club": {},
      ground: {},
      "first-name": {},
      "first-name-foreign": {},
      surname: {},
      wages: {},
      "style-of-play": {},
      formation: {},
      version: {},
      year: {},
    };
  }

  get(dataType: DataType): Record<string, string> {
    const storedData = this.retrieved[dataType];
    if (Object.keys(storedData).length > 0) return storedData;

    this.retrieved[dataType] = getData(this.data, dataType, this.version);
    return this.retrieved[dataType];
  }

  toHumanReadable(): Record<string, string>[] {
    const club = getSortedList(this.get("club"));
    const ground = getSortedList(this.get("ground"));
    const nationality = getSortedList(this.get("nationality"));
    const firstName = getSortedList(this.get("first-name"));
    const surname = getSortedList(this.get("surname"));

    const csvData: Record<string, string>[] = Array.from({ length: surname.length }).reduce(
      (acc: Record<string, string>[], _, i) => {
        const obj: Record<string, string> = {
          Club: club[i] || "",
          Ground: ground[i] || "",
          Nationality: nationality[i] || "",
          "First name": firstName[i] || "",
          Surname: surname[i] || "",
        };
        acc.push(obj);
        return acc;
      },
      [] as Record<string, string>[],
    );

    return csvData;
  }

  convertFromHumanReadable(): HumanReadableExe {
    const errors: string[] = [];
    const newData = this.readHuman();

    let newParsed = this.update([...this.data], newData, "club", 0);
    newParsed = this.update(newParsed, newData, "ground", 1);
    newParsed = this.update(newParsed, newData, "nationality", 2);
    newParsed = this.update(newParsed, newData, "first-name", 3);
    newParsed = this.update(newParsed, newData, "surname", 4);

    return {
      converted: newParsed,
      hex: newParsed.join(""),
      errors,
    };
  }

  update(data: string[], newData: string[][], dataType: DataType, dataTypeIndex: number): string[] {
    const errors: string[] = [];

    const items = getSortedList(this.get(dataType));
    const newItems = newData.map((d) => d[dataTypeIndex]).filter((d) => d);

    const itemCount = Object.keys(items).length;
    const itemChars = sum(Object.values(items).map((c) => c.length));

    const newItemCount = newItems.length;
    const newItemChars = sum(newItems.map((c) => c.length));

    const charDiff = itemChars - newItemChars;
    if (itemCount !== newItemCount)
      errors.push(`Invalid number of ${dataType}, must be ${itemCount}`);
    if (charDiff < 0) {
      errors.push(
        `You have added too many characters to the ${dataType}, must be ${itemChars} or fewer`,
      );
    }

    let newParsed = [...data];

    newItems.forEach((replacement, i) => {
      newParsed = replaceData(newParsed, items[i], replacement);
    });

    return newParsed;
  }

  readHuman(): string[][] {
    const csv = parse<string[]>(this.rawCsv as string);
    const [, ...data] = csv.data;
    return data;
  }

  getHumanReadableFilename(): string {
    return `${this.FILE}.csv`;
  }
}

export const getData = (
  parsed: string[],
  requiredDataType: DataType,
  version: Version,
): Record<string, string> => {
  const data = buildData(parsed, requiredDataType, version);
  return reduce((acc, { code, value }) => ({ ...acc, [code]: value }), {}, Object.values(data));
};

type Input =
  | { fileDirectory: string; rawData?: null; rawCsv?: string }
  | { fileDirectory?: null; rawData: string; rawCsv?: string };
