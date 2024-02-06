import { HumanReadable } from "../../../types/validation";
import { invertObj } from "../../../utils/conversion";

export default class PlayerClub {
  value: string;

  constructor(value: string, clubs: Record<string, string>, nationalities: Record<string, string>) {
    this.value =
      nationalities[
        (parseInt(value, 16) - FOREIGN_PLAYER_CODE_MODIFIER).toString(16).padStart(2, "0")
      ] || clubs[value];
  }

  toString(): string {
    return this.value;
  }

  static toHex(
    club: string,
    clubs: Record<string, string>,
    nationalities: Record<string, string>,
  ): HumanReadable {
    const hex =
      invertObj(clubs)[club.toLowerCase()] ||
      textToHexConversion(nationalities, club, FOREIGN_PLAYER_CODE_MODIFIER);

    return {
      value: hex,
      errors: !hex ? [`No player club found for: ${club}`] : [],
    };
  }
}

const textToHexConversion = (
  obj: Record<string, string>,
  value: string,
  modifier: number,
  padding = 2,
): string => {
  const key = invertObj(obj)[value.toLowerCase()];
  if (!key) return "";
  return (parseInt(key, 16) + modifier).toString(16).padStart(padding, "0");
};

// For some reason the foreign player clubs (which are actually nationalities) have their codes
// offset by 140
const FOREIGN_PLAYER_CODE_MODIFIER = 140;
