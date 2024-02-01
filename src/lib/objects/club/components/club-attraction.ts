import { invertObj } from "../../../utils/conversion";

export default class ClubAttraction {
  value: Status;

  constructor(value: string) {
    this.value = MAPPING[value];
  }

  toString(): string {
    return this.value.toString();
  }

  static toHex(value: string): string {
    const mapping = invertObj(MAPPING);
    const hex = mapping[value.toLowerCase()];
    if (!hex) throw new Error(`ClubAttraction: could not find code for '${value}'`);

    return hex;
  }
}

export type Status = "super" | "high" | "medium" | "low" | "none";

const MAPPING: Record<string, Status> = {
  11: "super",
  10: "high",
  "0f": "medium",
  "0e": "low",
  "0d": "none",
};
