import * as fs from "fs";
import { parse } from "papaparse";
import { resolve } from "path";
import { Version } from "../types/version";
import CMExeParser from "./cm-exe-parser";

export default abstract class BaseDataFile {
  fileDirectory?: string | null;

  rawData?: string | null;

  data: CMExeParser;

  constructor({ fileDirectory, data, rawData }: DataFileInput) {
    this.fileDirectory = fileDirectory;
    this.rawData = rawData;
    this.data = data;
  }

  read(): string {
    const raw = this.rawData
      ? Buffer.from(this.rawData, "base64").toString("hex")
      : fs
          .readFileSync(resolve(this.fileDirectory as string, this.getFilename()), "hex")
          .toString();

    return raw.split(/[\n\r\s]+/).join();
  }

  readHuman(): ReadHuman {
    const raw = fs
      .readFileSync(resolve(this.fileDirectory as string, this.getHumanReadableFilename()))
      .toString();
    const csv = parse<string[]>(raw);
    const [headings, ...data] = csv.data;
    return { headings, data };
  }

  abstract getFilename(): string;

  abstract parseHex(version: Version): string[];

  abstract convertFromHex(): void;

  getHumanReadableFilename(): string {
    return `${this.getFilename()}.csv`;
  }
}

interface ReadHuman {
  headings: string[];
  data: string[][];
}

export type DataFileInput =
  | { fileDirectory: string; rawData?: null; data: CMExeParser }
  | { fileDirectory?: null; rawData: string; data: CMExeParser };
