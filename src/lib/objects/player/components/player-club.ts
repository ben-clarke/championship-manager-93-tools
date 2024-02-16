import { HumanReadable } from "../../../types/validation";
import { Version } from "../../../types/version";
import { invertObj } from "../../../utils/conversion";

export default class PlayerClub {
  value: string;

  constructor(
    value: string,
    clubs: Record<string, string>,
    nationalities: Record<string, string>,
    version: Version,
  ) {
    this.value =
      nationalities[
        (parseInt(value, 16) - FOREIGN_PLAYER_CODE_MODIFIER).toString(16).padStart(2, "0")
      ] || clubs[value];

    if (!this.value && ["Italia", "Italia95"].includes(version)) {
      this.value = ITALIA_MAPPING[value];
    }
  }

  toString(): string {
    return this.value;
  }

  static toHex(
    club: string,
    clubs: Record<string, string>,
    nationalities: Record<string, string>,
    version: Version,
  ): HumanReadable {
    const hex =
      invertObj(clubs)[club.toLowerCase()] ||
      textToHexConversion(nationalities, club, FOREIGN_PLAYER_CODE_MODIFIER) ||
      textToHexItaliaMapping(club, version);

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

const textToHexItaliaMapping = (value: string, version: Version): string => {
  if (!["Italia", "Italia95"].includes(version)) return "";

  const mapping = invertObj(ITALIA_MAPPING);
  return mapping[value.toLowerCase()];
};

// For some reason the foreign player clubs (which are actually nationalities) have their codes
// offset by 140
const FOREIGN_PLAYER_CODE_MODIFIER = 140;

const ITALIA_MAPPING: Record<string, string> = {
  d5: "Serie C1B",
  d6: "Serie C1A",
};
