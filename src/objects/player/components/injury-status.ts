import { invertObj } from "../../../utils/conversion";

export default class InjuryStatus {
  status: Status;

  constructor(value: string) {
    this.status = MAPPING[value];
  }

  toString(): string {
    return this.status;
  }

  static toHex(value: string): string {
    const mapping = invertObj(MAPPING);

    const hex = mapping[value.toLowerCase()];
    if (!hex) throw new Error(`InjuryStatus: could not find code for '${value}'`);

    return hex;
  }
}

type Status = "fit" | "injured";

const MAPPING: Record<string, Status> = {
  "00": "fit",
  "01": "injured",
};
