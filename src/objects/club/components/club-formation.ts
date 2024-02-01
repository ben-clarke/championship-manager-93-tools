import { invertObj } from "../../../utils/conversion";

export default class Formation {
  value: Form;

  constructor(value: string) {
    this.value = MAPPING[value];
  }

  toString(): string {
    return this.value;
  }

  static toHex(value: string): string {
    const mapping = invertObj(MAPPING);
    return mapping[value.toLowerCase()] || "XXXX";
  }
}

type Form =
  | "4-4-2"
  | "4-2-4"
  | "Sweeper"
  | "5-3-2"
  | "4-3-3"
  | "5-2-3"
  | "4-5-1"
  | "anchor man"
  | "support man"
  | "random";

const MAPPING: Record<string, Form> = {
  "00": "4-4-2",
  "01": "4-2-4",
  "02": "Sweeper",
  "03": "5-3-2",
  "04": "4-3-3",
  "05": "5-2-3",
  "06": "4-5-1",
  "07": "anchor man",
  "08": "support man",
  ff: "random",
};
