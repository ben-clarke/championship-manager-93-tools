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
    nationalities: Record<string, string>,
  ) {
    this.year = parseInt(year, 16) + YEAR_MODIFIER;
    this.club =
      clubs[club] ||
      nationalities[
        (parseInt(club, 16) - FOREIGN_PLAYER_CODE_MODIFIER).toString(16).padStart(2, "0")
      ];
    this.games = parseInt(games, 16);
    this.goals = parseInt(goals, 16);
  }

  toString(): string {
    return [this.year, this.club, this.games, this.goals].join(",");
  }
}

const YEAR_MODIFIER = 1900;

// For some reason the foreign player clubs (which are actually nationalities) have their codes
// offset by 140
const FOREIGN_PLAYER_CODE_MODIFIER = 140;
