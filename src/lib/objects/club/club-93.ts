import { Version } from "../../types/version";
import { Club } from "./club";

export class Club93 extends Club {
  static getVersion(): Version {
    return "93";
  }

  static getNumColumns(): number {
    return 21;
  }

  getDataItems(parsed: string[]): string[] {
    const [capacity, seated, home, away, ...rest] = parsed;

    // CM93 only has a column for home and away, wheras CM94/EOS has 2 additional columns.
    // Home text, home background, away text and away background.
    // So need to adjust for this.
    const [homeText, homeBackground] = home.split("");
    const [awayText, awayBackground] = away.split("");

    return [
      capacity,
      seated,
      `0${homeText}`,
      `0${homeBackground}`,
      `0${awayText}`,
      `0${awayBackground}`,
      ...rest,
    ];
  }
}
