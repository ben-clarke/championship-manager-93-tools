import CMExeParser from "../../files/cm-exe-parser";
import PlayerClub from "./components/player-club";
import { Player } from "./player";

export class ForeignPlayer extends Player {
  constructor(player: string[], data: CMExeParser) {
    super(player, data);

    const [, , , , , club] = this.getDataItems(player);

    this.club = new PlayerClub(club, data.get("club"), data.get("nationality"));
  }

  getDataItems(parsed: string[]): string[] {
    return parsed;
  }
}
