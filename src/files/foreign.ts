import { EDIT_FILE_DIRECTORY } from "../constants/file";
import { ForeignPlayer } from "../objects/player";
import BaseDataFile from "./base";
import CMExeParser from "./cm-exe-parser";
import { parsePlayers } from "./utils/players";

export default class Foreign extends BaseDataFile {
  HISTORY_FIRST_INDEX = 34;

  players: ForeignPlayer[];

  constructor() {
    super(EDIT_FILE_DIRECTORY);

    const data = new CMExeParser();
    const firstNames = data.get("first-name");
    const surnames = data.get("surname");
    const nationalities = data.get("nationality");
    const club = data.get("club");

    const players = parsePlayers(this.hexes, this.HISTORY_FIRST_INDEX);
    this.players = players.map(
      (p) => new ForeignPlayer(p, firstNames, surnames, nationalities, club),
    );
    this.printForeignPlayers();
  }

  getFilename(): string {
    return "FOREIGN.DAT";
  }

  parseHex(): string[] {
    // Nothing special needed to get the data in working order.
    return [];
  }

  printForeignPlayers(): void {
    this.players.forEach((s, i) => {
      // eslint-disable-next-line no-console
      console.log(i, s.toString());
    });
  }
}
