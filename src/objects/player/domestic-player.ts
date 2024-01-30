import { Player } from "./player";

export class DomesticPlayer extends Player {
  getDataItems(parsed: string[]): string[] {
    const [firstName1, firstName2, surname1, suraname2, transferStatus, ...rest] = parsed;

    // Domestic players do not have a `club` column. So adding a blank one in to align with the
    // foreign players
    const club = "";

    return [firstName1, firstName2, surname1, suraname2, transferStatus, club, ...rest];
  }
}
