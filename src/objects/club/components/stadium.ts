export default class Stadium {
  CAPACITY_MULTIPLIER = 1_000;

  capacity: number;

  seated: number;

  constructor(capacity: string, seated: string) {
    this.capacity = this.getCapacity(capacity);
    this.seated = this.getCapacity(seated);
  }

  getCapacity(value: string): number {
    return parseInt(value, 16) * this.CAPACITY_MULTIPLIER;
  }

  toString(): string {
    return `${this.capacity}(${this.seated})`;
  }
}
