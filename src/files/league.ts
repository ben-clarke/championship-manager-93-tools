import { EDIT_FILE_DIRECTORY } from "../constants/file";
import Squad from "../objects/squad";
import BaseDataFile from "./base";
import CMExeParser from "./cm-exe-parser";

export default class League extends BaseDataFile {
  HISTORY_FIRST_INDEX = 33; // Change for foreign

  squads: Squad[];

  constructor() {
    super(EDIT_FILE_DIRECTORY);

    const data = new CMExeParser();
    const firstNames = data.get("first-name");
    const surnames = data.get("surname");
    const nationalities = data.get("nationality");
    const clubs = data.get("club");

    const parsed = this.parseHex();
    this.squads = parsed.map(
      (t) => new Squad(t, this.HISTORY_FIRST_INDEX, firstNames, surnames, nationalities, clubs),
    );

    this.printSquads(clubs);
  }

  getFilename(): string {
    return "LEAGUE.DAT";
  }

  parseHex(): string[] {
    return this.hexes.split(TEAM_SEPARATOR).filter((t) => t);
  }

  printSquads(clubs: Record<string, string>): void {
    this.squads.forEach((s, i) => {
      // eslint-disable-next-line no-console
      console.log(i, clubs[i.toString(16).padStart(2, "0")]);
      // eslint-disable-next-line no-console
      console.log(s.toString());
      // eslint-disable-next-line no-console
      console.log("");
    });
  }
}

const TEAM_SEPARATOR = "0bb8";
