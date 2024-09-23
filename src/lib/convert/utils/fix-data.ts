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
    { Club: "Spain", "First name": "Johan", Surname: "Cruyff", "Current skill": "180" },
    { Club: "U.S.A.", "First name": "Carlos", Surname: "Alberto", "Current skill": "150" },
    { Club: "U.S.A.", "First name": "George", Surname: "Best", "Current skill": "180" },
    { Club: "U.S.A.", "First name": "Gerd", Surname: "Muller", "Current skill": "170" },
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
    { Club: "Russia", "First name": "Andrei", Surname: "Kanchelskis", "Potential skill": "190" },
  ],
  90: [
    {
      Club: "Arsenal",
      "First name": "Tony",
      Surname: "Adams",
      "Potential skill": "190",
    },
    {
      Club: "Arsenal",
      "First name": "Ray",
      Surname: "Parlour",
      "Potential skill": "175",
    },
    {
      Club: "Aston Villa",
      "First name": "David",
      Surname: "Platt",
      "Potential skill": "190",
    },
    {
      Club: "Aston Villa",
      "First name": "Paul",
      Surname: "McGrath",
      "Potential skill": "190",
      Position: "D",
    },
    {
      Club: "Aston Villa",
      "First name": "Dwight",
      Surname: "Yorke",
      "Potential skill": "180",
    },
    {
      Club: "Everton",
      "First name": "Neville",
      Surname: "Southall",
      "Potential skill": "190",
    },
    {
      Club: "Everton",
      "First name": "Norman",
      Surname: "Whiteside",
      "Potential skill": "195",
      "Injury proneness": "9",
    },
    {
      Club: "Leeds",
      "First name": "Gordon",
      Surname: "Strachan",
      "Potential skill": "180",
      "Current skill": "180",
    },
    {
      Club: "Leeds",
      "First name": "David",
      Surname: "Batty",
      "Potential skill": "175",
    },
    {
      Club: "Liverpool",
      "First name": "Kenny",
      Surname: "Dalglish",
      "Current skill": "165",
    },
    {
      Club: "Man City",
      "First name": "Paul",
      Surname: "Lake",
      "Potential skill": "190",
    },
    {
      Club: "Man Utd",
      "First name": "Ryan",
      Surname: "Giggs",
      "Current skill": "115",
      "Potential skill": "200",
    },
    {
      Club: "Man Utd",
      "First name": "Giuliano",
      Surname: "Maiorana",
      "Current skill": "130",
      "Potential skill": "190",
      Character: "rebellious",
    },
    {
      Club: "Man Utd",
      "First name": "Bryan",
      Surname: "Robson",
      "Current skill": "190",
      "Potential skill": "190",
    },
    {
      Club: "Man Utd",
      "First name": "Gary",
      Surname: "Walsh",
      "Current skill": "140",
      "Potential skill": "170",
    },
    {
      Club: "Man Utd",
      "First name": "Lee",
      Surname: "Sharpe",
      "Potential skill": "180",
    },
    {
      Club: "Man Utd",
      "First name": "Kevin",
      Surname: "Pilkington",
      "Potential skill": "150",
    },
    {
      Club: "Man Utd",
      "First name": "Mark",
      Surname: "Hughes",
      "Potential skill": "180",
    },
    {
      Club: "Man Utd",
      "First name": "Gary",
      Surname: "Pallister",
      "Potential skill": "185",
    },
    {
      Club: "Man Utd",
      "First name": "Steve",
      Surname: "Bruce",
      "Potential skill": "170",
    },
    {
      Club: "Man Utd",
      "First name": "Mark",
      Surname: "Bosnich",
      "Potential skill": "185",
    },
    {
      Club: "Southampton",
      "First name": "Alan",
      Surname: "Shearer",
      "Potential skill": "190",
    },
    {
      Club: "Southampton",
      "First name": "Matthew",
      Surname: "Le Tissier",
      "Potential skill": "185",
    },
    {
      Club: "Tottenham",
      "First name": "Paul",
      Surname: "Gascoigne",
      "Potential skill": "200",
    },

    // FOREIGN
    { Club: "Brazil", "First name": "..", Surname: "Cafu", "Potential skill": "181" },
    { Club: "Brazil", "First name": "Roberto", Surname: "Carlos", "Potential skill": "181" },
  ],
  98: [],
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
