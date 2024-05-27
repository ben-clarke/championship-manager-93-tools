import { HumanReadable } from "../../types/validation";
import { invertObj } from "../../utils/conversion";

export default class Character {
  value: CharacterValue;

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
      errors: !hex ? [`No character found for: ${value}`] : [],
    };
  }

  static fromNewData(
    temperament: number,
    originalCharacter: Character | undefined,
  ): CharacterValue {
    if (originalCharacter) return originalCharacter.value;

    if (temperament < 1 || temperament > 20) return "random";
    return TEMPERAMENTS[temperament][Math.floor(Math.random() * TEMPERAMENTS[temperament].length)];
  }
}

const TEMPERAMENTS: Record<number, CharacterValue[]> = {
  1: ["rebellious", "rebellious", "selfish"],
  2: ["rebellious", "selfish", "selfish"],
  3: ["selfish", "selfish", "selfish"],
  4: ["selfish", "selfish", "rash"],
  5: ["rash", "rash", "selfish"],
  6: ["rash", "arrogant"],
  7: ["arrogant", "arrogant", "withdrawn"],
  8: ["arrogant", "withdrawn"],
  9: ["withdrawn", "withdrawn", "passive"],
  10: ["withdrawn", "passive", "passive"],
  11: ["passive", "passive", "passive", "unselfish"],
  12: ["passive", "passive", "thoughtful", "unselfish", "unselfish"],
  13: ["thoughtful", "thoughtful", "unselfish", "unselfish", "passive"],
  14: ["thoughtful", "unselfish", "unselfish", "unselfish"],
  15: ["unselfish", "unselfish", "unselfish", "unselfish"],
  16: ["unselfish", "confident", "unselfish", "unselfish"],
  17: ["confident", "responsible", "confident", "unselfish"],
  18: ["responsible", "responsible", "confident"],
  19: ["responsible", "responsible", "responsible"],
  20: ["responsible", "responsible", "responsible", "responsible"],
};

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
