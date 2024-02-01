import * as fs from "fs";
import { parse } from "papaparse";
import { resolve } from "path";
import { Version } from "../types/version";
import CMExeParser from "./cm-exe-parser";

export default abstract class BaseDataFile {
  fileDirectory: string;

  data: CMExeParser;

  constructor(fileDirectory: string, data: CMExeParser) {
    this.fileDirectory = fileDirectory;
    this.data = data;
  }

  read(): string {
    const raw = fs
      .readFileSync(
        resolve(__dirname, "../../game-edits", this.fileDirectory, this.getFilename()),
        "hex",
      )
      .toString();

    return raw.split(/[\n\r\s]+/).join();
  }

  readHuman(): ReadHuman {
    const raw = fs
      .readFileSync(
        resolve(__dirname, "../../game-edits", this.fileDirectory, this.getHumanReadableFilename()),
      )
      .toString();
    const csv = parse<string[]>(raw);
    const [headings, ...data] = csv.data;
    return {
      headings,
      data,
    };
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
