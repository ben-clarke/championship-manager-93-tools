import { HumanReadable } from "../../../types/validation";
import { weightedRandom } from "../../../utils/weighted";

export default class Age {
  value: number;

  constructor(value: string) {
    this.value = parseInt(value, 16);
  }

  toString(): string {
    return this.value.toString();
  }

  static toHex(value: string): HumanReadable {
    const decimal = parseInt(value, 10);
    if (Number.isNaN(decimal)) {
      return { value: "", errors: [`Age must be a decimal number`] };
    }

    if (LOWER_RANGE > decimal || decimal > UPPER_RANGE) {
      return {
        value: "",
        errors: [`Age must be between ${LOWER_RANGE} and ${UPPER_RANGE}, got: ${decimal}`],
      };
    }

    return { value: decimal.toString(16).padStart(2, "0"), errors: [] };
  }

  static randomise(): string {
    return weightedRandom<number>([
      { item: 17, weight: 1 },
      { item: 18, weight: 2 },
      { item: 19, weight: 3 },
      { item: 20, weight: 3 },
      { item: 21, weight: 4 },
      { item: 22, weight: 4 },
      { item: 23, weight: 4 },
      { item: 24, weight: 5 },
      { item: 25, weight: 6 },
      { item: 26, weight: 6 },
      { item: 27, weight: 5 },
      { item: 28, weight: 4 },
      { item: 29, weight: 4 },
      { item: 30, weight: 4 },
      { item: 31, weight: 3 },
      { item: 32, weight: 2 },
      { item: 33, weight: 1 },
      { item: 34, weight: 1 },
    ]).toString();
  }
}

const LOWER_RANGE = 15;
const UPPER_RANGE = 45;
