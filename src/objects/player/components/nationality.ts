export default class Nationality {
  value: string;

  constructor(value: string, nationalities: Record<string, string>) {
    this.value = nationalities[value];
  }

  toString(): string {
    return this.value;
  }
}
