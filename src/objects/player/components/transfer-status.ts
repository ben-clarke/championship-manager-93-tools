export default class TransferStatus {
  status: Status;

  constructor(value: string) {
    this.status = MAPPING[value];
  }

  toString(): string {
    return this.status;
  }
}

type Status = "available" | "not for sale";

const MAPPING: Record<string, Status> = {
  "00": "available",
  "01": "not for sale",
};
