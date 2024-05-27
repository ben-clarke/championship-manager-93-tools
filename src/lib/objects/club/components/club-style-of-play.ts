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

  static randomise(division: number): Style {
    const WEIGHTS: Record<number, WeightedStyle[]> = {
      1: [
        { item: "long ball", weight: 2 },
        { item: "direct ball", weight: 4 },
        { item: "counter-attack", weight: 5 },
        { item: "pass to feet", weight: 5 },
        { item: "continental", weight: 4 },
      ],
      2: [
        { item: "long ball", weight: 4 },
        { item: "direct ball", weight: 8 },
        { item: "counter-attack", weight: 4 },
        { item: "pass to feet", weight: 4 },
        { item: "continental", weight: 0 },
      ],
      3: DEFAULT_WEIGHTS,
      4: DEFAULT_WEIGHTS,
    };

    return weightedRandom<Style>(WEIGHTS[division] || DEFAULT_WEIGHTS);
  }
}

const DEFAULT_WEIGHTS: WeightedStyle[] = [
  { item: "long ball", weight: 11 },
  { item: "direct ball", weight: 9 },
  { item: "counter-attack", weight: 4 },
  { item: "pass to feet", weight: 2 },
  { item: "continental", weight: 0 },
];
interface WeightedStyle {
  item: Style;
  weight: number;
}

type Style = "long ball" | "pass to feet" | "counter-attack" | "continental" | "direct ball";

const MAPPING: Record<string, Style> = {
  "00": "long ball",
  "01": "pass to feet",
  "02": "counter-attack",
  "03": "continental",
  "04": "direct ball",
};
