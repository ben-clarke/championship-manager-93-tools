import * as fs from "fs";
import { parse } from "papaparse";
import { resolve } from "path";
import { flatten, reduce, splitEvery } from "ramda";
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

    const { updated: updated1, errors: errors1 } = this.update(
      [...this.data],
      newData,
      "nationality",
      2,
    );
    if (errors1.length > 0) return { converted: [], hex: "", errors: errors1 };

    const { updated: updated2, errors: errors2 } = this.update(updated1, newData, "first-name", 3);
    if (errors2.length > 0) return { converted: [], hex: "", errors: errors2 };

    const { updated: updated3, errors: errors3 } = this.update(updated2, newData, "surname", 4);
    if (errors3.length > 0) return { converted: [], hex: "", errors: errors3 };

    const { updated: updated4, errors: errors4 } = this.update(updated3, newData, "club", 0);
    if (errors4.length > 0) return { converted: [], hex: "", errors: errors4 };

    const { updated: updated5, errors: errors5 } = this.update(updated4, newData, "ground", 1);
    if (errors5.length > 0) return { converted: [], hex: "", errors: errors5 };

    return {
      converted: updated5,
      hex: updated5.join(""),
      errors,
    };
  }

  update(
    data: string[],
    newData: string[][],
    dataType: DataType,
    dataTypeIndex: number,
  ): UpdateResponse {
    const items = getSortedList(this.get(dataType));
    const newItems = newData.map((d) => d[dataTypeIndex]).filter((d) => d);

    // TODO - BC | Test for errors

    const itemCount = Object.keys(items).length;
    if (itemCount !== newItems.length) {
      return { updated: [], errors: [`Invalid number of ${dataType}, must be ${itemCount}`] };
    }

    const converted = newItems.map((replacement, i) => {
      const required = items[i];
      if (replacement.length > required.length) {
        return {
          errors: [
            `You have added too many characters to the ${dataType}, in position ${i + 1} must be ${required.length} or fewer`,
          ],
          replacement: "",
        };
      }
      return { errors: [], replacement: replacement.padEnd(required.length, " ") };
    });

    const errors = flatten(converted.map((c) => c.errors));
    if (errors.length > 0) return { updated: [], errors };

    const replacedItems = flatten(converted.map((c) => c.replacement));

    let newParsed = [...data];
    replacedItems.forEach((replacement, i) => {
      newParsed = replaceData(newParsed, items[i], replacement, true);
    });

    return { updated: newParsed, errors };
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

type UpdateResponse = { updated: string[]; errors: string[] };
