import { getGameVersion } from "src/lib/constants/file";
import CMExeParser from "../../files/cm-exe-parser";
import { HumanReadablePlayer } from "../../types/validation";
import PlayerClub from "./components/player-club";
import { Player } from "./player";

export class DomesticPlayer extends Player {
  constructor(player: string[], data: CMExeParser, club: string) {
    super(player, data);
    this.club = new PlayerClub(
      club,
      data.get("club"),
      data.get("nationality"),
      getGameVersion(data.get("version")),
    );
  }

  getFirstNameMap(data: CMExeParser): Record<string, string> {
    return data.get("first-name");
  }

  getDataItems(parsed: string[]): string[] {
    const [firstName1, firstName2, surname1, surname2, transferStatus, ...rest] = parsed;

    // Domestic players do not have a `club` column. So adding a blank one in to align with the
    // foreign players
    const club = "";

    return [firstName1, firstName2, surname1, surname2, transferStatus, club, ...rest];
  }

  static toHex(player: string[], data: CMExeParser): HumanReadablePlayer {
    const { values, errors } = super.toHex(player, data, false);

    // Get rid of the club component
    const [firstName1, firstName2, surname1, surname2, transferStatus, , ...rest] = values;
    return {
      values: [firstName1, firstName2, surname1, surname2, transferStatus, ...rest],
      errors,
    };
  }
}
