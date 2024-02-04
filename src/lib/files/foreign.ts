import { map } from "ramda";
import { DAT_FOREIGN } from "src/constants/files";
import { ForeignPlayer } from "../objects/player";
import BaseDataFile, { DataFileInput } from "./base";
import { TEAM_SEPARATOR } from "./league";
import { parsePlayers } from "./utils/players";

export default class Foreign extends BaseDataFile {
  HISTORY_FIRST_INDEX = 34;

  players: ForeignPlayer[];

  constructor(input: DataFileInput) {
    super(input);
    this.players = [];
  }

  getFilename(): string {
    return DAT_FOREIGN;
  }

  parseHex(): string[] {
    const hexes = this.read();
    // Not the `TEAM_SEPARATOR` - this is expected at the end even though it is the only one and the
    // players are not split into teams.
    return hexes.split(TEAM_SEPARATOR).filter((t) => t);
  }

  convertFromHex(): void {
    const hexes = this.parseHex();
    const players = parsePlayers(hexes[0], this.HISTORY_FIRST_INDEX);
    this.players = players.map((p) => new ForeignPlayer(p, this.data));
  }

  convertFromHumanReadable(): { converted: string[][]; hex: string } {
    const { headings, data } = this.readHuman();

    const converted = map((d) => ForeignPlayer.toHex(d, headings, this.data, true), data);

    // Not the `TEAM_SEPARATOR` - this is expected at the end even though it is the only one and the
    // players are not split into teams.
    const hex = converted.join("").split(",").join("") + TEAM_SEPARATOR;
    return { converted, hex };
  }

  toHumanReadable(): Record<string, string>[] {
    this.convertFromHex();
    return this.players.map((p) => p.toHumanReadable());
  }

  printForeignPlayers(): void {
    this.convertFromHex();
    this.players.forEach((s, i) => {
      // eslint-disable-next-line no-console
      console.log(i, s.toString());
    });
  }
}
