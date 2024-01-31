import { flatten } from "ramda";
import Squad from "../objects/squad";
import BaseDataFile from "./base";
import CMExeParser from "./cm-exe-parser";

export default class League extends BaseDataFile {
  HISTORY_FIRST_INDEX = 33; // Change for foreign

  squads: Squad[];

  constructor(fileDirectory: string, data: CMExeParser) {
    super(fileDirectory);

    const parsed = this.parseHex();
    this.squads = parsed.map((t, i) => {
      const club = i.toString(16).padStart(2, "0");
      return new Squad(t, club, data, this.HISTORY_FIRST_INDEX);
    });
  }

  getFilename(): string {
    return "LEAGUE.DAT";
  }

  parseHex(): string[] {
    return this.hexes.split(TEAM_SEPARATOR).filter((t) => t);
  }

  toString(clubs: Record<string, string>): void {
    this.squads.forEach((s, i) => {
      // eslint-disable-next-line no-console
      console.log(i, clubs[i.toString(16).padStart(2, "0")]);
      // eslint-disable-next-line no-console
      console.log(s.toString());
      // eslint-disable-next-line no-console
      console.log("");
    });
  }

  toHumanReadable(): Record<string, string>[] {
    return flatten(this.squads.map((s) => s.toHumanReadable()));
  }
}

const TEAM_SEPARATOR = "0bb8";
