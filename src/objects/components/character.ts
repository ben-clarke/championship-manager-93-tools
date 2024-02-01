import { invertObj } from "../../utils/conversion";

export default class Character {
  value: CharacterValue;

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

type CharacterValue =
  | "withdrawn"
  | "passive"
  | "selfish"
  | "unselfish"
  | "rebellious"
  | "responsible"
  | "arrogant"
  | "confident"
  | "thoughtful"
  | "rash"
  | "random";

const MAPPING: Record<string, CharacterValue> = {
  "00": "withdrawn",
  "01": "passive",
  "02": "selfish",
  "03": "unselfish",
  "04": "rebellious",
  "05": "responsible",
  "06": "arrogant",
  "07": "confident",
  "08": "thoughtful",
  "09": "rash",
  ff: "random",
};
