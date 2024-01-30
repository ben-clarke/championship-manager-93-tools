import PlayerClub from "./components/player-club";
import { Player } from "./player";

export class ForeignPlayer extends Player {
  constructor(
    player: string[],
    firstNames: Record<string, string>,
    surnames: Record<string, string>,
    nationalities: Record<string, string>,
    clubs: Record<string, string>,
  ) {
    super(player, firstNames, surnames, nationalities, clubs);

    const [, , , , , club] = this.getDataItems(player);

    this.club = new PlayerClub(club, nationalities);
  }

  getDataItems(parsed: string[]): string[] {
    return parsed;
  }
}
