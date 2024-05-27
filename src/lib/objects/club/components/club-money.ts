import { Club } from "../../../convert/pom/club";
import { HumanReadable } from "../../../types/validation";

export default class ClubMoney {
  value: number;

  constructor(value: string) {
    this.value = convertToMoney(parseInt(value, 16));
  }

  toString(): string {
    return this.value.toString();
  }

  static toHex(value: string): HumanReadable {
    const decimal = parseInt(value, 10);
    if (Number.isNaN(decimal)) {
      return { value: "", errors: [`Money must be a decimal number`] };
    }

    if (convertToMoney(LOWER_RANGE) > decimal || decimal > convertToMoney(UPPER_RANGE)) {
      return {
        value: "",
        errors: [`Money must be between ${LOWER_RANGE} and ${UPPER_RANGE}, got: ${decimal}`],
      };
    }

    return {
      value: convertFromMoney(decimal).toString(16).padStart(2, "0"),
      errors: [],
    };
  }

  static fromNewData(club: Pick<Club, "Cash">, year: number): string {
    const MODIFIER = year === 88 ? YEAR_88_MODIFIER : 1;

    const cash = club.Cash / MODIFIER;
    if (cash < 250000) return "250000";

    return Math.ceil(cash).toString();
  }
}

export const convertFromMoney = (value: number): number =>
  Math.round((value - MONEY_ADJUSTMENT) / MONEY_MULTIPLIER);

const convertToMoney = (value: number): number => value * MONEY_MULTIPLIER + MONEY_ADJUSTMENT;

const MONEY_MULTIPLIER = 250_000;
const MONEY_ADJUSTMENT = 250_000;

const LOWER_RANGE = 0;
const UPPER_RANGE = 255;

const YEAR_88_MODIFIER = 7;
