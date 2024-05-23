import { HumanReadable } from "../../../types/validation";
import { invertObj } from "../../../utils/conversion";
import { weightedRandom } from "../../../utils/weighted";

export default class StyleOfPlay {
  value: Style;

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
            `No style of play found for: ${value}, valid values are ${Object.values(MAPPING).join(", ")}`,
          ]
        : [],
    };
  }

  static randomise(): Style {
    return weightedRandom<Style>([
      { item: "long ball", weight: 40 },
      { item: "direct ball", weight: 19 },
      { item: "counter-attack", weight: 2 },
      { item: "pass to feet", weight: 16 },
      { item: "continental", weight: 5 },
    ]);
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
