export default class Stadium {
  capacity: number;

  seated: number;

  constructor(capacity: string, seated: string) {
    this.capacity = this.getCapacity(capacity);
    this.seated = this.getCapacity(seated);
  }

  getCapacity(value: string): number {
    return parseInt(value, 16) * CAPACITY_MULTIPLIER;
  }

  toString(): string {
    return `${this.capacity}(${this.seated})`;
  }

  toHumanReadable(): Record<string, string> {
    return {
      Capacity: this.capacity.toString(),
      "Seated capacity": this.seated.toString(),
    };
  }

  static toHex(capacity: string, seated: string): { capacity: string; seated: string } {
    return {
      capacity: (parseInt(capacity, 10) / CAPACITY_MULTIPLIER).toString(16).padStart(2, "0"),
      seated: (parseInt(seated, 10) / CAPACITY_MULTIPLIER).toString(16).padStart(2, "0"),
    };
  }
}

const CAPACITY_MULTIPLIER = 1_000;
