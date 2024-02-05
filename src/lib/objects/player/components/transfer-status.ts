import { HumanReadable } from "src/lib/types/validation";
import { invertObj } from "../../../utils/conversion";

export default class TransferStatus {
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
            `No transfer status found for: ${value}, valid values are ${Object.values(MAPPING).join(", ")}`,
          ]
        : [],
    };
  }
}

type Status = "available" | "not for sale";

const MAPPING: Record<string, Status> = {
  "00": "available",
  "01": "not for sale",
};
