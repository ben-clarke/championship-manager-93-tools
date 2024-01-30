export default class PlayerClub {
  value: string;

  constructor(value: string, nationalities: Record<string, string>) {
    this.value =
      nationalities[
        (parseInt(value, 16) - FOREIGN_PLAYER_CODE_MODIFIER).toString(16).padStart(2, "0")
      ];
  }

  toString(): string {
    return this.value;
  }
}

// For some reason the foreign player clubs (which are actually nationalities) have their codes
// offset by 140
const FOREIGN_PLAYER_CODE_MODIFIER = 140;
