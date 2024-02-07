import { flatten } from "ramda";
import { DAT_LEAGUE } from "../../constants/files";
import { DomesticPlayer } from "../objects/player";
import Squad from "../objects/squad";
import { HumanReadableLeague } from "../types/validation";
import BaseDataFile, { DataFileInput } from "./base";
import { getSortedList } from "./utils/sorted";

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

  convertFromHumanReadable(): HumanReadableLeague {
    const { data } = this.readHuman();

    const errors: string[] = [];

    const initial: Record<string, string[][]> = {};
    const squads = data.reduce((acc, d, i) => {
      const club = d[0];
      const { values, errors: playerErrors } = DomesticPlayer.toHex(d, this.data);

      const indexedErrors = playerErrors.map((e) => `Player ${i + 1}: ${e}`);
      errors.push(...indexedErrors);

      if (!Object.keys(acc).includes(club)) acc[club] = [];
      acc[club].push(values);
      return acc;
    }, initial);

    if (Object.keys(squads).length !== NUM_SQUADS) {
      errors.push(
        `Invalid number of squads provided, must be 80, got: ${Object.keys(squads).length}`,
      );
    }

    Object.entries(squads).forEach(([club, players]) => {
      const squadSize = players.length;
      if (LOWER_RANGE > squadSize || squadSize > UPPER_RANGE) {
        errors.push(
          `Squad size must be between ${LOWER_RANGE} and ${UPPER_RANGE}, got: ${squadSize} for ${club}`,
        );
      }
    });

    if (errors.length > 0) return { converted: [], hex: "", errors };

    const sorted = getSortedList(this.data.get("club"));
    const converted = sorted.reduce(
      (acc, club) => {
        const squad = Squad.toHex(squads[club]);
        acc.push(squad);
        return acc;
      },
      [] as string[][][],
    );

    const hex = converted.join(TEAM_SEPARATOR).split(",").join("") + TEAM_SEPARATOR;
    return { converted, hex, errors: [] };
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

const LOWER_RANGE = 13;
const UPPER_RANGE = 26;

const NUM_SQUADS = 80;
