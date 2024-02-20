import { HumanReadable } from "../../../types/validation";
import { invertObj } from "../../../utils/conversion";

export default class InjuryStatus {
  status: Status;

  constructor(value: string) {
    this.status = MAPPING[value];
  }

  toString(): string {
    return this.status;
  }

  static toHex(value: string): HumanReadable {
    const mapping = invertObj(MAPPING);
    const hex = mapping[value.toLowerCase()];
    return {
      value: hex,
      errors: !hex
        ? [
            `No injury status found for: ${value}, valid values are ${Object.values(MAPPING).join(", ")}`,
          ]
        : [],
    };
  }
}

type Status = "fit" | "injured";

const MAPPING: Record<string, Status> = {
  "00": "fit",
  "01": "injured",
};
