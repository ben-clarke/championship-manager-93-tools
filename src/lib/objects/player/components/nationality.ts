import { HumanReadable } from "src/lib/types/validation";
import { invertObj } from "../../../utils/conversion";

export default class Nationality {
  value: string;

  constructor(value: string, nationalities: Record<string, string>) {
    this.value = nationalities[value];
  }

  toString(): string {
    return this.value;
  }

  static toHex(value: string, nationalities: Record<string, string>): HumanReadable {
    const mapping = invertObj(nationalities);
    const hex = mapping[value.toLowerCase()];
    return {
      value: hex,
      errors: !hex ? [`No nationality found for: ${value}`] : [],
    };
  }
}
