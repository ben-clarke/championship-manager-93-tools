import { splitEvery } from "ramda";
import { HumanReadablePersonName } from "../../types/validation";
import { invertObj } from "../../utils/conversion";

export default class PersonName {
  value: string;

  constructor(value1: string, value2: string, nameMap: Record<string, string>) {
    const key = `${value1}${value2}`;
    this.value = nameMap[key];
  }

  toString(): string {
    return this.value;
  }

  static toHex(value: string, nameMap: Record<string, string>): HumanReadablePersonName {
    const mapping = invertObj(nameMap);
    const hex = mapping[value.toLowerCase()];

    if (!hex) return { value1: "", value2: "", errors: [`No person name found for: ${value}`] };

    const [one, two] = splitEvery(2, hex);
    return { value1: one, value2: two, errors: [] };
  }
}

export const FOREIGN_NAME_MODIFIER = 341;
