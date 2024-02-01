export default class ClubMoney {
  value: number;

  constructor(value: string) {
    this.value = parseInt(value, 16) * MONEY_MULTIPLIER + MONEY_ADJUSTMENT;
  }

  toString(): string {
    return this.value.toString();
  }

  static toHex(value: string): string {
    return ((parseInt(value, 10) - MONEY_ADJUSTMENT) / MONEY_MULTIPLIER)
      .toString(16)
      .padStart(2, "0");
  }
}

const MONEY_MULTIPLIER = 250_000;
const MONEY_ADJUSTMENT = 250_000;
