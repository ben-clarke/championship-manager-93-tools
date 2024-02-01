import { map, splitEvery } from "ramda";
import { getGameVersion } from "../constants/file";
import Club, { Club93, Club94 } from "../objects/club";
import { Version } from "../types/version";
import BaseDataFile from "./base";
import CMExeParser from "./cm-exe-parser";

export default class Team extends BaseDataFile {
  parsed: string[][];

  teams: Club[];

  constructor(fileDirectory: string, data: CMExeParser) {
    super(fileDirectory, data);
    this.parsed = [];
    this.teams = [];
  }

  getFilename(): string {
    return "TEAM.DAT";
  }

  parseHex(version: Version): string[] {
    const hexes = this.read();
    const chunk = COLUMNS[version] * 2;
    return splitEvery(chunk, hexes);
  }

  convertFromHex(): void {
    const firstNames = this.data.get("first-name");
    const surnames = this.data.get("surname");
    const versions = this.data.get("version");

    const ClubClass = getGameVersion(versions) === "93" ? Club93 : Club94;

    const parsed = this.parseHex(ClubClass.getVersion());
    this.parsed = parsed.map((t) => splitEvery(2, t));

    this.teams = this.parsed.map((t) => new ClubClass(t, firstNames, surnames));
  }

  convertFromHumanReadable(): string[][] {
    const ClubClass = getGameVersion(this.data.get("version")) === "93" ? Club93 : Club94;

    const { headings, data } = this.readHuman();
    return map((d) => ClubClass.toHex(d, headings, this.data), data);
  }

  toHumanReadable(): Record<string, string>[] {
    this.convertFromHex();
    return this.teams.map((t) => t.toHumanReadable());
  }

  printTeams(): void {
    this.convertFromHex();
    this.teams.forEach((t) => {
      // eslint-disable-next-line no-console
      console.log(t.toString());
    });
  }

  printAllDetailsInDecimal(clubs: Record<string, string>): void {
    this.convertFromHex();
    // eslint-disable-next-line no-console
    console.log(
      this.parsed.map((p, index) => {
        const club = clubs[index.toString(16).padStart(2, "0")];
        return `${club?.padEnd(12, " ") || "Unknown"}: ${p
          .map((y) => parseInt(y, 16).toString().padStart(3, " "))
          .join(", ")}`;
      }),
    );
  }

  print(clubs: Record<string, string>, hex = false): void {
    this.convertFromHex();

    const initial: Record<string, string[]> = {};
    const data = this.teams.reduce((acc, team, i) => {
      const value = team.unknown6;

      const inHex = (v: string): string => `${v} (${parseInt(v, 16)})`;
      const inDec = (v: string): string => parseInt(v, 16).toString();

      const key = hex ? inHex(value) : inDec(value);
      const club = clubs[i.toString(16).padStart(2, "0")];

      if (Object.keys(acc).includes(key)) acc[key].push(club);
      else acc[key] = [club];

      return acc;
    }, initial);

    const readme = Object.entries(data).map(([code, value]) => {
      const examples = (values: string[]): string => {
        const examplesToShow = 5;
        if (values.length <= examplesToShow) return values.join(", ");
        const rest = values.length - examplesToShow;
        return `${value.splice(0, examplesToShow).join(", ")}, plus ${rest} more`;
      };
      return `${code} --> ${examples(value)}`;
    });
    readme.forEach((r) => {
      // eslint-disable-next-line no-console
      console.log(r);
    });
  }
}

const COLUMNS: Record<Version, number> = {
  93: Club93.getNumColumns(),
  94: Club94.getNumColumns(),
};
