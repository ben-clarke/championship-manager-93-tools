export default class InjuryProneness {
  value: number;

  constructor(value: string) {
    this.value = parseInt(value, 16);
  }

  toString(): string {
    return this.value.toString();
  }
}
