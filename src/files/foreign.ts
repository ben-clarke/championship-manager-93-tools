import { ForeignPlayer } from "../objects/player";
import BaseDataFile from "./base";
import CMExeParser from "./cm-exe-parser";
import { parsePlayers } from "./utils/players";

export default class Foreign extends BaseDataFile {
  HISTORY_FIRST_INDEX = 34;

  players: ForeignPlayer[];

  constructor(fileDirectory: string, data: CMExeParser) {
    super(fileDirectory);

    const players = parsePlayers(this.hexes, this.HISTORY_FIRST_INDEX);
    this.players = players.map((p) => new ForeignPlayer(p, data));
    this.printForeignPlayers();
  }

  getFilename(): string {
    return "FOREIGN.DAT";
  }

  parseHex(): string[] {
    // Nothing special needed to get the data in working order.
    return [];
  }

  toHumanReadable(): Record<string, string>[] {
    return this.players.map((p) => p.toHumanReadable());
  }

  printForeignPlayers(): void {
    this.players.forEach((s, i) => {
      // eslint-disable-next-line no-console
      console.log(i, s.toString());
    });
  }
}
