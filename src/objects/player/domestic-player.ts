import CMExeParser from "../../files/cm-exe-parser";
import PlayerClub from "./components/player-club";
import { Player } from "./player";

export class DomesticPlayer extends Player {
  constructor(player: string[], data: CMExeParser, club: string) {
    super(player, data);
    this.club = new PlayerClub(club, data.get("club"), data.get("nationality"));
  }

  getDataItems(parsed: string[]): string[] {
    const [firstName1, firstName2, surname1, surname2, transferStatus, ...rest] = parsed;

    // Domestic players do not have a `club` column. So adding a blank one in to align with the
    // foreign players
    const club = "";

    return [firstName1, firstName2, surname1, surname2, transferStatus, club, ...rest];
  }
}
