export default class CurrentSkill {
  value: number;

  constructor(value: string) {
    this.value = parseInt(value, 16);
  }

  toString(): string {
    return this.value.toString();
  }
}
