import * as fs from "fs";
import { resolve } from "path";
import { splitEvery } from "ramda";
import { DataType } from "../types/executable";
import { buildData } from "./utils/cm-exe-builder";

export default class CMExeParser {
  FILE = "CMEXE.EXE";

  data: string[];

  retrieved: Record<DataType, Record<string, string>>;

  constructor({ fileDirectory, rawData }: Input) {
    const raw = rawData
      ? Buffer.from(rawData, "base64").toString("hex")
      : fs.readFileSync(resolve(fileDirectory as string, this.FILE), "hex").toString();

    this.data = splitEvery(2, raw);

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
    };
  }

  get(dataType: DataType): Record<string, string> {
    const storedData = this.retrieved[dataType];
    if (Object.keys(storedData).length > 0) return storedData;

    this.retrieved[dataType] = getData(this.data, dataType);
    return this.retrieved[dataType];
  }
}

export const getData = (parsed: string[], requiredDataType: DataType): Record<string, string> => {
  const data = buildData(parsed, requiredDataType);
  return Object.values(data).reduce((acc, { code, value }) => ({ ...acc, [code]: value }), {});
};

type Input = { fileDirectory: string; rawData?: null } | { fileDirectory?: null; rawData: string };
