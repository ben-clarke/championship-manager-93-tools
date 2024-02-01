import { invertObj } from "../../../utils/conversion";

export default class StyleOfPlay {
  value: Style;

  constructor(value: string) {
    this.value = MAPPING[value];
  }

  toString(): string {
    return this.value;
  }

  static toHex(value: string): string {
    const mapping = invertObj(MAPPING);

    const hex = mapping[value.toLowerCase()];
    if (!hex) throw new Error(`StyleOfPlay: could not find code for '${value}'`);

    return hex;
  }
}

type Style = "long ball" | "pass to feet" | "counter-attack" | "continental" | "direct ball";

const MAPPING: Record<string, Style> = {
  "00": "long ball",
  "01": "pass to feet",
  "02": "counter-attack",
  "03": "continental",
  "04": "direct ball",
};
