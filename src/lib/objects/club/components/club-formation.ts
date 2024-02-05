import { HumanReadable } from "src/lib/types/validation";
import { invertObj } from "../../../utils/conversion";

export default class Formation {
  value: Form;

  constructor(value: string) {
    this.value = MAPPING[value];
  }

  toString(): string {
    return this.value;
  }

  static toHex(value: string): HumanReadable {
    const mapping = invertObj(MAPPING);
    const hex = mapping[value.toLowerCase()];
    return {
      value: hex,
      errors: !hex
        ? [
            `No formation found for: ${value}, valid values are ${Object.values(MAPPING).join(", ")}`,
          ]
        : [],
    };
  }
}

type Form =
  | "four-four-two"
  | "four-two-four"
  | "Sweeper"
  | "five-three-two"
  | "four-three-three"
  | "five-two-three"
  | "four-five-one"
  | "anchor man"
  | "support man"
  | "random";

const MAPPING: Record<string, Form> = {
  "00": "four-four-two",
  "01": "four-two-four",
  "02": "Sweeper",
  "03": "five-three-two",
  "04": "four-three-three",
  "05": "five-two-three",
  "06": "four-five-one",
  "07": "anchor man",
  "08": "support man",
  ff: "random",
};
