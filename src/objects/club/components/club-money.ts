export default class ClubMoney {
  money: number;

  constructor(value: string) {
    this.money = parseInt(value, 16) * MONEY_MULTIPLIER + MONEY_ADJUSTMENT;
  }

  toString(): string {
    return this.money.toString();
  }
}

const MONEY_MULTIPLIER = 250_000;
const MONEY_ADJUSTMENT = 250_000;
