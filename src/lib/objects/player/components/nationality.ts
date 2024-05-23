import { HumanReadable } from "../../../types/validation";
import { invertObj } from "../../../utils/conversion";
import { weightedRandom } from "../../../utils/weighted";

export default class Nationality {
  value: string;

  constructor(value: string, nationalities: Record<string, string>) {
    this.value = nationalities[value];

    if (!this.value && value === "ff") this.value = "random";
  }

  toString(): string {
    return this.value;
  }

  static toHex(value: string, nationalities: Record<string, string>): HumanReadable {
    const mapping = invertObj(nationalities);
    const hex = value.toLowerCase() === "random" ? "ff" : mapping[value.toLowerCase()];

    return {
      value: hex,
      errors: !hex ? [`No nationality found for: ${value}`] : [],
    };
  }

  static fromNewData(nation: string): string {
    const map: Record<string, string> = {
      "Northern Ireland": "N.Ireland",
      "Republic of Ireland": "Eire",
      Croatia: "Yugoslavia",
      "San Marino": "Italy",
      Colombia: "Columbia",
      "United States": "U.S.A",
      "Trinidad & Tobago": "Trinidad",
      "South Africa": "S.Africa",
    };

    return map[nation] || nation;
  }

  static randomise(): string {
    const nationality = weightedRandom<string>([
      { item: "England", weight: 20 },
      { item: "Scotland", weight: 4 },
      { item: "Wales", weight: 2 },
      { item: "N.Ireland", weight: 1 },
      { item: "Eire", weight: 1 },
    ]);
    return nationality;
  }
}
