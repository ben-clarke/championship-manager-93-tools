import { PlayerDetails } from "./generate-random";
import { getNormalisedClub } from "./normalisation";

const FIXES: Partial<PlayerDetails>[] = [
  { Club: "Arsenal", "First name": "Tony", Surname: "Adams", "Potential skill": "185" },
  {
    Club: "Everton",
    "First name": "Neville",
    Surname: "Southall",
    "Current skill": "180",
    "Potential skill": "185",
  },
  {
    Club: "Liverpool",
    "First name": "Alan",
    Surname: "Hansen",
    "Current skill": "180",
    "Potential skill": "185",
  },
  { Club: "Southampton", "First name": "Matthew", Surname: "Le Tissier", "Potential skill": "185" },
  { Club: "Southampton", "First name": "Alan", Surname: "Shearer", "Potential skill": "190" },
  { Club: "Tottenham", "First name": "Ray", Surname: "Clemence", Age: "41" },

  // FOREIGN
  { Club: "Denmark", "First name": "Peter", Surname: "Schmeichel", "Potential skill": "195" },
  { Club: "Yugoslavia", "First name": "Thomas", Surname: "Doll", Nationality: "Germany" },
  { Club: "Yugoslavia", "First name": "Steffen", Surname: "Steffen", Nationality: "Germany" },
  { Club: "Yugoslavia", "First name": "Sven", Surname: "Kmetsch", Nationality: "Germany" },
  { Club: "Yugoslavia", "First name": "Matthias", Surname: "Sammer", Nationality: "Germany" },
];

export const fixData = (player: PlayerDetails): PlayerDetails => {
  const fixed = FIXES.find(
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
