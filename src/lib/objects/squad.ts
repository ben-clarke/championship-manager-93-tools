import { map } from "ramda";
import CMExeParser from "../files/cm-exe-parser";
import { parsePlayers } from "../files/utils/players";
import { DomesticPlayer } from "./player";

export default class Squad {
  club: string;

  size: number;

  players: DomesticPlayer[];

  constructor(hexes: string, club: string, data: CMExeParser, historyFirstIndex: number) {
    const players = parsePlayers(hexes, historyFirstIndex);
    this.club = club;
    this.size = players.length;
    this.players = players.map((p) => new DomesticPlayer(p, data, club));
  }

  toString(): string {
    return this.players.map((p) => p.toString()).join("\n");
  }

  toHumanReadable(): Record<string, string>[] {
    return this.players.map((p) => p.toHumanReadable());
  }

  static toHex(players: string[][]): string[][] {
    return map((d) => d, players);
  }
}
