export default class PersonName {
  name: string;

  constructor(value1: string, value2: string, nameMap: Record<string, string>) {
    this.name = nameMap[`${value1}${value2}`];
  }

  toString(): string {
    return this.name;
  }
}
