import { parsePlayers } from "../files/utils/players";
import { DomesticPlayer } from "./player";

export default class Squad {
  size: number;

  players: DomesticPlayer[];

  constructor(
    hexes: string,
    historyFirstIndex: number,
    firstNames: Record<string, string>,
    surnames: Record<string, string>,
    nationalities: Record<string, string>,
    clubs: Record<string, string>,
  ) {
    const players = parsePlayers(hexes, historyFirstIndex);
    this.size = players.length;
    this.players = players.map(
      (p) => new DomesticPlayer(p, firstNames, surnames, nationalities, clubs),
    );
  }

  toString(): string {
    return this.players.map((p) => p.toString()).join("\n");
  }
}
