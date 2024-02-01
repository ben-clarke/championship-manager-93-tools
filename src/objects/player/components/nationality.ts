import { invertObj } from "../../../utils/conversion";

export default class Nationality {
  value: string;

  constructor(value: string, nationalities: Record<string, string>) {
    this.value = nationalities[value];
  }

  toString(): string {
    return this.value;
  }

  static toHex(value: string, nationalities: Record<string, string>): string {
    const mapping = invertObj(nationalities);
    return mapping[value.toLowerCase()] || "XXXX";
  }
}
