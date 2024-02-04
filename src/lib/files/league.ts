import { flatten, map } from "ramda";
import { DAT_LEAGUE } from "src/constants/files";
import { DomesticPlayer } from "../objects/player";
import Squad from "../objects/squad";
import BaseDataFile, { DataFileInput } from "./base";

export default class League extends BaseDataFile {
  HISTORY_FIRST_INDEX = 33; // Change for foreign

  squads: Squad[];

  constructor(input: DataFileInput) {
    super(input);
    this.squads = [];
  }

  getFilename(): string {
    return DAT_LEAGUE;
  }

  parseHex(): string[] {
    const hexes = this.read();
    return hexes.split(TEAM_SEPARATOR).filter((t) => t);
  }

  convertFromHex(): void {
    const parsed = this.parseHex();
    this.squads = parsed.map((t, i) => {
      const club = i.toString(16).padStart(2, "0");
      return new Squad(t, club, this.data, this.HISTORY_FIRST_INDEX);
    });
  }

  convertFromHumanReadable(): { converted: string[][][]; hex: string } {
    const { headings, data } = this.readHuman();

    const initial: Record<string, string[][]> = {};
    const squads = data.reduce((acc, d) => {
      const club = d[0];
      const player = DomesticPlayer.toHex(d, headings, this.data);

      if (!Object.keys(acc).includes(club)) acc[club] = [];
      acc[club].push(player);
      return acc;
    }, initial);

    const converted = map((d) => Squad.toHex(d), Object.values(squads));
    const hex = converted.join(TEAM_SEPARATOR).split(",").join("") + TEAM_SEPARATOR;
    return { converted, hex };
  }

  toString(clubs: Record<string, string>): void {
    this.convertFromHex();
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
    this.convertFromHex();
    return flatten(this.squads.map((s) => s.toHumanReadable()));
  }
}

export const TEAM_SEPARATOR = "0bb8";
