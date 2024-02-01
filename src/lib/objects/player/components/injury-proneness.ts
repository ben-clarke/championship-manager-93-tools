export default class InjuryProneness {
  value: number;

  constructor(value: string) {
    this.value = parseInt(value, 16);
  }

  toString(): string {
    return this.value.toString();
  }

  static toHex(value: string): string {
    return parseInt(value, 10).toString(16).padStart(2, "0");
  }
}
