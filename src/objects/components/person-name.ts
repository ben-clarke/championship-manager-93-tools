import { splitEvery } from "ramda";
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

  static toHex(value: string, nameMap: Record<string, string>): HexParts {
    const mapping = invertObj(nameMap);
    const hex = mapping[value.toLowerCase()];
    if (!hex) throw new Error(`PersonName: could not find code for '${value}'`);

    const [one, two] = splitEvery(2, hex);
    return { one, two };
  }
}

interface HexParts {
  one: string;
  two: string;
}

export const FOREIGN_NAME_MODIFIER = 341;
