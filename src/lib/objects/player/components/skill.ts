import { max } from "ramda";
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

  static potentialFromNewData(name: string, potentialSkill: number, currentSkill: number): string {
    const randomInRange = (seed: number, min: number, maximum: number): number => {
      // Linear Congruential Generator (LCG) implementation
      const lcg = (s: number): (() => number) => {
        let state = s;
        const m = 0x80000000; // 2^31, modulus
        const a = 1103515245; // multiplier
        const c = 12345; // increment

        // Function to generate the next random number in [0, 1)
        return () => {
          state = (a * state + c) % m;
          return state / (m - 1);
        };
      };

      const generator = lcg(seed);
      // Generate a random number in the range [min, max]
      return Math.floor(generator() * (maximum - min + 1)) + min;
    };

    const stringToNumber = (str: string): number => {
      let hash = 0;
      for (let i = 0; i < str.length; i += 1) {
        // eslint-disable-next-line no-bitwise
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
        // eslint-disable-next-line no-bitwise, operator-assignment
        hash = hash & hash; // Convert to 32bit integer
      }
      return Math.abs(hash);
    };

    if (potentialSkill === -1) {
      return max(
        Math.round(randomInRange(stringToNumber(name), 140, 180)),
        currentSkill,
      ).toString();
    }

    if (potentialSkill === -2) {
      return max(
        Math.round(randomInRange(stringToNumber(name), 160, 200)),
        currentSkill,
      ).toString();
    }

    return potentialSkill.toString();
  }
}

const LOWER_RANGE = 1;
const UPPER_RANGE = 200;

const RANDOM = 255;
