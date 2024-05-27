import { PlayerDetails } from "./generate-random";
import { getNormalisedClub } from "./normalisation";

const FIXES: Record<number, Partial<PlayerDetails>[]> = {
  82: [
    { Club: "Brazil", "First name": "..", Surname: "Pele ", "Current skill": "190" },
    { Club: "Eire", "First name": "Paul", Surname: "McGrath", Nationality: "Eire" },
    { Club: "Germany", "First name": "Sepp", Surname: "Maier", "Current skill": "150" },
    { Club: "Germany", "First name": "Berti", Surname: "Vogts", "Current skill": "170" },
    { Club: "Italy", "First name": "Angelo", Surname: "Di Livio", "Current skill": "90" },
    { Club: "Italy", "First name": "Giacinto", Surname: "Facchetti", "Current skill": "140" },
    { Club: "Italy", "First name": "Sandro", Surname: "Mazzola", "Current skill": "140" },
    { Club: "Scotland", "First name": "Jimmy", Surname: "Johnstone", "Current skill": "160" },
    { Club: "U.S.A.", "First name": "Carlos", Surname: "Alberto", "Current skill": "140" },
    { Club: "U.S.A.", "First name": "George", Surname: "Best", "Current skill": "170" },
    { Club: "U.S.A.", "First name": "Gerd", Surname: "Muller", "Current skill": "160" },
  ],
  86: [],
  88: [
    { Club: "Arsenal", "First name": "Tony", Surname: "Adams", "Potential skill": "185" },
    {
      Club: "Everton",
      "First name": "Neville",
      Surname: "Southall",
      "Current skill": "180",
      "Potential skill": "190",
    },
    {
      Club: "Liverpool",
      "First name": "Alan",
      Surname: "Hansen",
      "Current skill": "180",
      "Potential skill": "185",
    },
    {
      Club: "Southampton",
      "First name": "Matthew",
      Surname: "Le Tissier",
      "Potential skill": "185",
    },
    { Club: "Southampton", "First name": "Alan", Surname: "Shearer", "Potential skill": "190" },
    { Club: "Tottenham", "First name": "Ray", Surname: "Clemence", Age: "41" },

    // FOREIGN
    { Club: "Denmark", "First name": "Peter", Surname: "Schmeichel", "Potential skill": "195" },
    { Club: "Yugoslavia", "First name": "Thomas", Surname: "Doll", Nationality: "Germany" },
    { Club: "Yugoslavia", "First name": "Steffen", Surname: "Steffen", Nationality: "Germany" },
    { Club: "Yugoslavia", "First name": "Sven", Surname: "Kmetsch", Nationality: "Germany" },
    { Club: "Yugoslavia", "First name": "Matthias", Surname: "Sammer", Nationality: "Germany" },
  ],
};

export const fixData = (player: PlayerDetails, year: number): PlayerDetails => {
  const fixed = FIXES[year].find(
    (f) =>
      f.Club === getNormalisedClub(player.Club) &&
      f["First name"] === player["First name"] &&
      f.Surname === player.Surname,
  );

  if (!fixed) return player;

  return {
    ...player,
    ...fixed,
  };
};
