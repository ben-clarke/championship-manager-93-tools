import { invertObj } from "../../../utils/conversion";

export default class TransferStatus {
  status: Status;

  constructor(value: string) {
    this.status = MAPPING[value];
  }

  toString(): string {
    return this.status;
  }

  static toHex(value: string): string {
    const mapping = invertObj(MAPPING);
    return mapping[value.toLowerCase()] || "XXXX";
  }
}

type Status = "available" | "not for sale";

const MAPPING: Record<string, Status> = {
  "00": "available",
  "01": "not for sale",
};
