import { Club } from "../../../convert/pom/club";
import { getSortedList } from "../../../files/utils/sorted";
import { HumanReadable } from "../../../types/validation";
import { invertObj } from "../../../utils/conversion";

export default class ClubAttraction {
  value: Status;

  constructor(value: string) {
    this.value = MAPPING[value];
  }

  toString(): string {
    return this.value.toString();
  }

  static toHex(value: string): HumanReadable {
    const mapping = invertObj(MAPPING);
    const hex = mapping[value.toLowerCase()];
    return {
      value: hex,
      errors: !hex
        ? [
            `No club status found for: ${value}, valid values are ${getSortedList(MAPPING).reverse().join(", ")}`,
          ]
        : [],
    };
  }

  static fromNewData(club: Club): string {
    const reputation = club.Reputation;
    if (reputation >= 15_000) return "world class";
    if (reputation >= 9_500) return "elite";
    if (reputation >= 9_000) return "super";
    if (reputation >= 7_000) return "high";
    if (reputation >= 5_500) return "medium";
    if (reputation >= 4_000) return "low";
    return "none";
  }
}

export type Status = "world class" | "elite" | "super" | "high" | "medium" | "low" | "none";

const MAPPING: Record<string, Status> = {
  13: "world class",
  12: "elite",
  11: "super",
  10: "high",
  "0f": "medium",
  "0e": "low",
  "0d": "none",
};
