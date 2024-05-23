import { Stadium as StadiumType } from "../../../convert/pom/stadium";
import { HumanReadableStadium } from "../../../types/validation";

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

  static toHex(capacity: string, seated: string): HumanReadableStadium {
    const decCapacity = parseInt(capacity, 10);
    const decSeated = parseInt(seated, 10);

    const errors = [decCapacity, decSeated]
      .map((a) => {
        if (Number.isNaN(a)) return "Capacity must be a decimal number";
        if (LOWER_RANGE > a || a > UPPER_RANGE) {
          return `Capacity must be between ${LOWER_RANGE} and ${UPPER_RANGE}, got: ${a}`;
        }
        return "";
      })
      .filter((a) => a);

    if (decCapacity < decSeated) {
      errors.push("Capacity must be greater than or equal to the seated capacity");
    }

    if (errors.length > 0) return { capacity: "", seated: "", errors };

    return {
      capacity: convertCapacity(decCapacity).toString(16).padStart(2, "0"),
      seated: convertCapacity(decSeated).toString(16).padStart(2, "0"),
      errors,
    };
  }

  static fromNewData(stadium: StadiumType): Record<string, string> {
    if (!stadium) console.log("No stadium found");

    return {
      Capacity: (stadium?.StadiumCapacity || 1000).toString(),
      "Seated capacity": (stadium?.StadiumSeatingCapacity || 1000).toString(),
    };
  }
}

export const convertCapacity = (value: number): number => {
  const cap = Math.round(value / CAPACITY_MULTIPLIER);
  return cap < 1 ? 1 : cap;
};

const CAPACITY_MULTIPLIER = 1_000;

const LOWER_RANGE = 1 * CAPACITY_MULTIPLIER;
const UPPER_RANGE = 100 * CAPACITY_MULTIPLIER;
