import * as fs from "fs";
import { parse } from "papaparse";
import { resolve } from "path";
import { flatten, reduce, splitEvery } from "ramda";
import { getGameVersion } from "../constants/file";
import { DataType } from "../types/executable";
import { HumanReadableExe } from "../types/validation";
import { Version } from "../types/version";
import { buildData, getDataFirstIndex, replaceData } from "./utils/cm-exe-builder";
import { getSortedList } from "./utils/sorted";

export default class CMExeParser {
  FILE = "CMEXE.EXE";

  data: string[];

  rawCsv: string | undefined;

  retrieved: Record<DataType, Record<string, string>>;

  retrievedWithIndexes: Record<
    DataType,
    { matches: Record<string, string>; startIndex: number; endIndex: number }
  >;

  version: Version;

  constructor({ fileDirectory, rawData, rawCsv }: Input) {
    const raw = rawData
      ? Buffer.from(rawData, "base64").toString("hex")
      : fs.readFileSync(resolve(fileDirectory as string, this.FILE), "hex").toString();

    this.rawCsv = rawCsv;

    this.data = splitEvery(2, raw);

    const { matches: version } = getData(this.data, "version", "94");
    const { matches: year } = getData(this.data, "year", "94");
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

    this.retrievedWithIndexes = {
      nationality: { matches: {}, startIndex: 0, endIndex: 0 },
      character: { matches: {}, startIndex: 0, endIndex: 0 },
      "injury-type": { matches: {}, startIndex: 0, endIndex: 0 },
      club: { matches: {}, startIndex: 0, endIndex: 0 },
      "non-domestic-club": { matches: {}, startIndex: 0, endIndex: 0 },
      ground: { matches: {}, startIndex: 0, endIndex: 0 },
      "first-name": { matches: {}, startIndex: 0, endIndex: 0 },
      "first-name-foreign": { matches: {}, startIndex: 0, endIndex: 0 },
      surname: { matches: {}, startIndex: 0, endIndex: 0 },
      wages: { matches: {}, startIndex: 0, endIndex: 0 },
      "style-of-play": { matches: {}, startIndex: 0, endIndex: 0 },
      formation: { matches: {}, startIndex: 0, endIndex: 0 },
      version: { matches: {}, startIndex: 0, endIndex: 0 },
      year: { matches: {}, startIndex: 0, endIndex: 0 },
    };
  }

  get(dataType: DataType): Record<string, string> {
    const storedData = this.retrieved[dataType];
    if (Object.keys(storedData).length > 0) return storedData;

    const { matches } = getData(this.data, dataType, this.version);
    this.retrieved[dataType] = matches;
    return this.retrieved[dataType];
  }

  getWithIndexes(dataType: DataType): {
    matches: Record<string, string>;
    startIndex: number;
    endIndex: number;
  } {
    const storedData = this.retrievedWithIndexes[dataType];
    if (Object.keys(storedData.matches).length > 0) return storedData;

    this.retrievedWithIndexes[dataType] = getData(this.data, dataType, this.version);
    return this.retrievedWithIndexes[dataType];
  }

  toHumanReadable(): Record<string, string>[] {
    const club = getSortedList(this.get("club"));
    const ground = getSortedList(this.get("ground"));
    const nationality = getSortedList(this.get("nationality"));
    const firstName = getSortedList(this.get("first-name"));
    const surname = getSortedList(this.get("surname"));
    const nonDomestic = getSortedList(this.get("non-domestic-club"));

    const csvData: Record<string, string>[] = Array.from({ length: surname.length }).reduce(
      (acc: Record<string, string>[], _, i) => {
        const obj: Record<string, string> = {
          Club: club[i] || "",
          Ground: ground[i] || "",
          Nationality: nationality[i] || "",
          "First name": firstName[i] || "",
          Surname: surname[i] || "",
          "Non domestic club": nonDomestic[i] || "",
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
      CSV_INDEX_NATIONALITY,
    );
    if (errors1.length > 0) return { converted: [], hex: "", errors: errors1 };

    const { updated: updated2, errors: errors2 } = this.update(
      updated1,
      newData,
      "first-name",
      CSV_INDEX_FIRST_NAME,
    );
    if (errors2.length > 0) return { converted: [], hex: "", errors: errors2 };

    const { updated: updated3, errors: errors3 } = this.update(
      updated2,
      newData,
      "surname",
      CSV_INDEX_SURNAME,
    );
    if (errors3.length > 0) return { converted: [], hex: "", errors: errors3 };

    const { updated: updated4, errors: errors4 } = this.update(
      updated3,
      newData,
      "club",
      CSV_INDEX_CLUB,
    );
    if (errors4.length > 0) return { converted: [], hex: "", errors: errors4 };

    const { updated: updated5, errors: errors5 } = this.update(
      updated4,
      newData,
      "ground",
      CSV_INDEX_GROUND,
    );
    if (errors5.length > 0) return { converted: [], hex: "", errors: errors5 };

    const { updated: updated6, errors: errors6 } = this.update(
      updated5,
      newData,
      "non-domestic-club",
      CSV_INDEX_NON_DOMESTIC_CLUB,
    );
    if (errors6.length > 0) return { converted: [], hex: "", errors: errors6 };

    return {
      converted: updated6,
      hex: updated6.join(""),
      errors,
    };
  }

  update(
    data: string[],
    newData: string[][],
    dataType: DataType,
    dataTypeIndex: number,
  ): UpdateResponse {
    const { matches, startIndex, endIndex } = this.getWithIndexes(dataType);
    const items = getSortedList(matches);
    const newItems = newData.map((d) => d[dataTypeIndex]).filter((d) => d);

    const dataFirstIndex = getDataFirstIndex(this.version);
    const { required: firstItem } = dataFirstIndex[dataType];

    if (firstItem !== newItems[0]) {
      return {
        updated: [],
        errors: [
          `You cannot change the first item in a category, first ${dataType} must be ${firstItem}`,
        ],
      };
    }

    const itemCount = Object.keys(items).length;
    if (itemCount !== newItems.length) {
      return {
        updated: [],
        errors: [`Invalid number of ${ERROR_DATA_TYPE_MAP[dataType]}, must be ${itemCount}`],
      };
    }

    const converted = newItems.map((replacement, i) => {
      const required = items[i];
      if (replacement.length > required.length) {
        return {
          errors: [
            `You have added too many characters to the ${dataType} in line ${i + 1} must be ${required.length} or fewer`,
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
      newParsed = replaceData(newParsed, items[i], replacement, true, startIndex, endIndex);
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
): { matches: Record<string, string>; startIndex: number; endIndex: number } => {
  const { matches, startIndex, endIndex } = buildData(parsed, requiredDataType, version);
  const match = reduce(
    (acc, { code, value }) => ({ ...acc, [code]: value }),
    {},
    Object.values(matches),
  );

  return { matches: match, startIndex, endIndex };
};

type Input =
  | { fileDirectory: string; rawData?: null; rawCsv?: string }
  | { fileDirectory?: null; rawData: string; rawCsv?: string };

type UpdateResponse = { updated: string[]; errors: string[] };

const ERROR_DATA_TYPE_MAP: Record<DataType, string> = {
  nationality: "nationalities",
  character: "characters",
  "injury-type": "injury types",
  club: "clubs",
  "non-domestic-club": "non domestic clubs",
  ground: "grounds",
  "first-name": "first names",
  "first-name-foreign": "foreign first names",
  surname: "surnames",
  wages: "wages",
  "style-of-play": "styles of play",
  formation: "formations",
  version: "versions",
  year: "years",
};

const CSV_INDEX_CLUB = 0;
const CSV_INDEX_GROUND = 1;
const CSV_INDEX_NATIONALITY = 2;
const CSV_INDEX_FIRST_NAME = 3;
const CSV_INDEX_SURNAME = 4;
const CSV_INDEX_NON_DOMESTIC_CLUB = 5;
