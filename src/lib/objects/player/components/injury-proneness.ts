import { HumanReadable } from "../../../types/validation";

export default class InjuryProneness {
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
      return { value: "", errors: [`Injury proneness must be a decimal number`] };
    }

    if (decimal !== RANDOM && (LOWER_RANGE > decimal || decimal > UPPER_RANGE)) {
      return {
        value: "",
        errors: [`Injury proneness must be between ${LOWER_RANGE} and ${UPPER_RANGE}`],
      };
    }

    return { value: decimal.toString(16).padStart(2, "0"), errors: [] };
  }

  static fromNewData(value: number): string {
    if (value > 0) return Math.ceil(value / 2).toString();
    return RANDOM.toString();
  }

  static randomise(): string {
    return RANDOM.toString();
  }
}
const LOWER_RANGE = 1;
const UPPER_RANGE = 10;

const RANDOM = 255;
