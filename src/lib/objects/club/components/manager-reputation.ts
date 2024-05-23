import { HumanReadable } from "../../../types/validation";

export default class ManagerReputation {
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
      return { value: "", errors: [`Manager reputation must be a decimal number`] };
    }

    if (decimal !== RANDOM && (LOWER_RANGE > decimal || decimal > UPPER_RANGE)) {
      return {
        value: "",
        errors: [
          `Manager reputation must be between ${LOWER_RANGE} and ${UPPER_RANGE}, got: ${decimal}`,
        ],
      };
    }

    return { value: decimal.toString(16).padStart(2, "0"), errors: [] };
  }

  static fromNewData(value: number | undefined, division: number): string {
    if (!value) return randomizeOnSlidingScale(division).toString();
    return value.toString();
  }
}

const REPUTATION_RANGES: Record<number, Range> = {
  1: [125, 190],
  2: [110, 160],
  3: [100, 140],
  4: [100, 120],
};

const getRandomInRange = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomizeOnSlidingScale = (value: number): number => {
  const [min, max] = REPUTATION_RANGES[value] || [100, 120];
  return Math.round(getRandomInRange(min, max) / 5) * 5; // Ensure a multiple of 5 as well.
};

const LOWER_RANGE = 1;
const UPPER_RANGE = 200;

const RANDOM = 255;

type Range = [number, number];
