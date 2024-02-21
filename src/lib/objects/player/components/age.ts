import { HumanReadable } from "../../../types/validation";

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
}

const LOWER_RANGE = 16;
const UPPER_RANGE = 45;
