import * as fs from "fs";
import { dirname, resolve } from "path";
import { splitEvery } from "ramda";
import { fileURLToPath } from "url";
import { EDIT_FILE_DIRECTORY } from "../constants/file";
import { DataType } from "../types/executable";
import { hexToUtf8 } from "../utils/conversion";
import { buildData } from "./utils/cm-exe-builder";

export default class CMExeParser {
  FILE = "CMEXE.EXE";

  data: string[];

  retrieved: Record<DataType, Record<string, string>>;

  constructor() {
    const raw = fs
      .readFileSync(resolve(__dirname, "../../game-edits", EDIT_FILE_DIRECTORY, this.FILE), "hex")
      .toString();

    this.data = splitEvery(2, raw);

    fs.writeFileSync("/tmp/cm", this.data.map((d) => hexToUtf8(d)).join(""));

    this.retrieved = {
      nationality: {},
      character: {},
      "injury-type": {},
      club: {},
      "non-domestic-club": {},
      ground: {},
      "first-name": {},
      surname: {},
      morale: {},
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

// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
const __dirname = dirname(__filename);
