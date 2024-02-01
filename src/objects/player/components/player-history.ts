import { flatten } from "ramda";
import { invertObj } from "../../../utils/conversion";

export default class PlayerHistory {
  year: number;

  club: string;

  games: number;

  goals: number;

  constructor(
    year: string,
    club: string,
    games: string,
    goals: string,
    clubs: Record<string, string>,
    nonDomesticClubs: Record<string, string>,
    nationalities: Record<string, string>,
  ) {
    this.year = parseInt(year, 16) + YEAR_MODIFIER;
    this.club =
      clubs[club] ||
      nonDomesticClubs[
        (parseInt(club, 16) + NON_LEAGUE_PLAYER_CODE_MODIFIER).toString(16).padStart(4, "0")
      ] ||
      nationalities[
        (parseInt(club, 16) - FOREIGN_PLAYER_CODE_MODIFIER).toString(16).padStart(2, "0")
      ];

    this.games = parseInt(games, 16);
    this.goals = parseInt(goals, 16);
  }

  toString(): string {
    return [this.year, this.club, this.games, this.goals].join(HISTORY_PART_SEPARATOR);
  }

  static toHex(
    value: string,
    clubs: Record<string, string>,
    nonDomesticClubs: Record<string, string>,
    nationalities: Record<string, string>,
  ): string[] {
    const part = value.split(",").filter((p) => p);
    const histories = part.map((p) => {
      const [year, club, games, goals] = p.split(HISTORY_PART_SEPARATOR);
      const parsedClub = getClubHexadecimal(club, clubs, nonDomesticClubs, nationalities);
      return [
        (parseInt(year, 10) - YEAR_MODIFIER).toString(16).padStart(2, "0"),
        parsedClub,
        parseInt(games, 10).toString(16).padStart(2, "0"),
        parseInt(goals, 10).toString(16).padStart(2, "0"),
      ];
    });

    return flatten(histories);
  }
}

const getClubHexadecimal = (
  value: string,
  clubs: Record<string, string>,
  nonDomesticClubs: Record<string, string>,
  nationalities: Record<string, string>,
): string => {
  try {
    return (
      invertObj(clubs)[value.toLowerCase()] ||
      textToHexConversion(nonDomesticClubs, value, -NON_LEAGUE_PLAYER_CODE_MODIFIER, 2) ||
      textToHexConversion(nationalities, value, FOREIGN_PLAYER_CODE_MODIFIER)
    );
  } catch (e) {
    return "XX";
  }
};

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

const YEAR_MODIFIER = 1900;

// For some reason the foreign player clubs (which are actually nationalities) have their codes
// offset by 140
const FOREIGN_PLAYER_CODE_MODIFIER = 140;

const NON_LEAGUE_PLAYER_CODE_MODIFIER = 320;

const HISTORY_PART_SEPARATOR = "|";
