export default class InjuryStatus {
  status: Status;

  constructor(value: string) {
    this.status = MAPPING[value];
  }

  toString(): string {
    return this.status;
  }
}

type Status = "fit" | "injured";

const MAPPING: Record<string, Status> = {
  "00": "fit",
  "01": "injured",
};
