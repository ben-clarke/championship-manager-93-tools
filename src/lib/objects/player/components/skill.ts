import { HumanReadable } from "../../../types/validation";

export default class Skill {
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
      return { value: "", errors: [`Skill must be a decimal number`] };
    }

    if (decimal !== RANDOM && (LOWER_RANGE > decimal || decimal > UPPER_RANGE)) {
      return { value: "", errors: [`Skill must be between ${LOWER_RANGE} and ${UPPER_RANGE}`] };
    }

    return { value: decimal.toString(16).padStart(2, "0"), errors: [] };
  }
}

const LOWER_RANGE = 1;
const UPPER_RANGE = 200;

const RANDOM = 255;
