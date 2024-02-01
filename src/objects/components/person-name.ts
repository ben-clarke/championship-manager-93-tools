import { splitEvery } from "ramda";
import { invertObj } from "../../utils/conversion";

export default class PersonName {
  name: string;

  constructor(value1: string, value2: string, nameMap: Record<string, string>) {
    this.name = nameMap[`${value1}${value2}`];
  }

  toString(): string {
    return this.name;
  }

  static toHex(value: string, nameMap: Record<string, string>): HexParts {
    const mapping = invertObj(nameMap);
    const hex = mapping[value.toLowerCase()] || "XXXX";

    const [one, two] = splitEvery(2, hex);
    return { one, two };
  }
}

interface HexParts {
  one: string;
  two: string;
}
