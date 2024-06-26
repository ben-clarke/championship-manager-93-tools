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
    let hex = mapping[value.toLowerCase()];

    if (!hex && value.toLowerCase() === "random") {
      const names = Object.keys(mapping);
      const index = Math.floor(Math.random() * names.length);
      hex = mapping[names[index]];
      console.log("Picking random", names[index]);
    }

    if (!hex) return { value1: "", value2: "", errors: [`No person name found for: ${value}`] };

    const [one, two] = splitEvery(2, hex);
    return { value1: one, value2: two, errors: [] };
  }
}
