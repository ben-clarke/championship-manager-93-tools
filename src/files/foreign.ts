import { map } from "ramda";
import { ForeignPlayer } from "../objects/player";
import BaseDataFile from "./base";
import CMExeParser from "./cm-exe-parser";
import { parsePlayers } from "./utils/players";

export default class Foreign extends BaseDataFile {
  HISTORY_FIRST_INDEX = 34;

  players: ForeignPlayer[];

  constructor(fileDirectory: string, data: CMExeParser) {
    super(fileDirectory, data);
    this.players = [];
  }

  getFilename(): string {
    return "FOREIGN.DAT";
  }

  parseHex(): string[] {
    // Nothing special needed to get the data in working order.
    return [];
  }

  convertFromHex(): void {
    const hexes = this.read();
    const players = parsePlayers(hexes, this.HISTORY_FIRST_INDEX);
    this.players = players.map((p) => new ForeignPlayer(p, this.data));
  }

  convertFromHumanReadable(): string[][] {
    const { headings, data } = this.readHuman();
    return map((d) => ForeignPlayer.toHex(d, headings, this.data), data);
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
