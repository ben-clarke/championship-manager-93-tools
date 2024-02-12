import { HumanReadable } from "src/lib/types/validation";
import { getSortedList } from "../../../files/utils/sorted";
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
