import * as fs from "fs";
import { resolve } from "path";
import { Version } from "../types/version";

export default abstract class BaseDataFile {
  hexes: string;

  constructor(fileDirectory: string) {
    const raw = fs
      .readFileSync(
        resolve(__dirname, "../../game-edits", fileDirectory, this.getFilename()),
        "hex",
      )
      .toString();

    this.hexes = raw.split(/[\n\r\s]+/).join();
  }

  abstract getFilename(): string;

  abstract parseHex(version: Version): string[];
}
