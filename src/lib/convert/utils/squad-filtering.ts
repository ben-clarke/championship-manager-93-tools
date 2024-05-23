import { PlayerDetails } from "./generate-random";

const SQUAD_FILTERS: Pick<PlayerDetails, "Club" | "First name" | "Surname">[] = [
  // ARSENAL
  { Club: "Arsenal", "First name": "Gary", Surname: "McKeown" },
  { Club: "Arsenal", "First name": "Pat", Surname: "Scully" },
  { Club: "Arsenal", "First name": "Francis", Surname: "Cagigao" },
  { Club: "Arsenal", "First name": "Steve", Surname: "Ball" },
  { Club: "Arsenal", "First name": "Paul", Surname: "Dickov" },
  { Club: "Arsenal", "First name": "Martin", Surname: "Hayes" },
  // CHELSEA
  { Club: "Chelsea", "First name": "Mick", Surname: "Bodley" },
  { Club: "Chelsea", "First name": "Roger", Surname: "Freestone" },
  { Club: "Chelsea", "First name": "Billy", Surname: "Dodds" },
  { Club: "Chelsea", "First name": "Gareth", Surname: "Hall" },
  { Club: "Chelsea", "First name": "David", Surname: "Lee" },
  { Club: "Chelsea", "First name": "Graham", Surname: "Stuart" },
  // MAN UTD
  { Club: "Man Utd", "First name": "Derek", Surname: "Brazil" },
  { Club: "Man Utd", "First name": "Shaun", Surname: "Goater" },
  { Club: "Man Utd", "First name": "Wayne", Surname: "Bullimore" },
  { Club: "Man Utd", "First name": "Deniol", Surname: "Graham" },
  { Club: "Man Utd", "First name": "Mark", Surname: "Bosnich" },
  { Club: "Man Utd", "First name": "Billy", Surname: "Garton" },
  // LUTON
  { Club: "Luton", "First name": "Ricky", Surname: "McEvoy" },
  { Club: "Luton", "First name": "Gary", Surname: "Cobb" },
  { Club: "Luton", "First name": "Marvin", Surname: "Johnson" },
  { Club: "Luton", "First name": "David", Surname: "Oldfield" },
  { Club: "Luton", "First name": "Andy", Surname: "Petterson" },
  { Club: "Luton", "First name": "Sean", Surname: "Farrell" },
  { Club: "Luton", "First name": "Tim", Surname: "Allpress" },
  // CHARLTON
  { Club: "Charlton", "First name": "Mickey", Surname: "Bennett" },
  { Club: "Charlton", "First name": "Paul", Surname: "Mortimer" },
  { Club: "Charlton", "First name": "Jason", Surname: "Lee" },
  { Club: "Charlton", "First name": "Gordon", Surname: "Watson" },
  { Club: "Charlton", "First name": "Kim", Surname: "Grant" },
  // TOTTENHAM
  { Club: "Tottenham", "First name": "Tim", Surname: "O'Shea" },
  { Club: "Tottenham", "First name": "Guy", Surname: "Butters" },
  { Club: "Tottenham", "First name": "Brian", Surname: "Statham" },
  { Club: "Tottenham", "First name": "John", Surname: "Polston" },
  // HUDDERSFIELD
  { Club: "Huddersfld", "First name": "Paul", Surname: "France" },
  { Club: "Huddersfld", "First name": "Graham", Surname: "Mitchell" },
  { Club: "Huddersfld", "First name": "Gordon", Surname: "Tucker" },
  { Club: "Huddersfld", "First name": "Paul", Surname: "Kirkham" },
  { Club: "Huddersfld", "First name": "Malcolm", Surname: "" },
  // LIVERPOOL
  { Club: "Liverpool", "First name": "John", Surname: "Durnin" },
  { Club: "Liverpool", "First name": "Alex", Surname: "Watson" },
  { Club: "Liverpool", "First name": "Craig", Surname: "Hignett" },
  // MILLWALL
  { Club: "Millwall", "First name": "Brian", Surname: "Horne" },
  { Club: "Millwall", "First name": "Wesley", Surname: "Reid" },
  { Club: "Millwall", "First name": "Sean", Surname: "Sparham" },
  { Club: "Millwall", "First name": "David", Surname: "Thompson" },
  { Club: "Millwall", "First name": "Steve", Surname: "Torpey" },
  // SHEFF WED
  { Club: "Sheff Wed", "First name": "David", Surname: "Reeves" },
  { Club: "Sheff Wed", "First name": "Wayne", Surname: "Jacobs" },
  { Club: "Sheff Wed", "First name": "Dean", Surname: "Barrick" },
  // MAN CITY
  { Club: "Man City", "First name": "Gerry", Surname: "Taggart" },
  { Club: "Man City", "First name": "Jason", Surname: "Beckford" },
  { Club: "Man City", "First name": "Mike", Surname: "Sheron" },
  // PORTSMOUTH
  { Club: "Portsmouth", "First name": "Lee", Surname: "Sandford" },
  { Club: "Portsmouth", "First name": "Mark", Surname: "Kelly" },
  { Club: "Portsmouth", "First name": "Andrew", Surname: "Awford" },
  { Club: "Portsmouth", "First name": "Darryl", Surname: "Powell" },
  // ASTON VILLA
  { Club: "Aston Villa", "First name": "Ian", Surname: "Olney" },
  { Club: "Aston Villa", "First name": "Tommy", Surname: "Mooney" },
  { Club: "Aston Villa", "First name": "Bryan", Surname: "Small" },
  { Club: "Aston Villa", "First name": "Dwight", Surname: "Yorke" },
  // DERBY
  { Club: "Derby", "First name": "Brian", Surname: "McCord" },
  // NEWCASTLE
  { Club: "Newcastle", "First name": "Paul", Surname: "Stephenson" },
  // N.FOREST
  { Club: "N.Forest", "First name": "Alan", Surname: "Lamb" },
  // Q.P.R.
  { Club: "Q.P.R.", "First name": "Brian", Surname: "Law" },
  // SOUTHAMPTON
  { Club: "Southampton", "First name": "Thomas", Surname: "Widdrington" },
  // WATFORD
  { Club: "Watford", "First name": "Barry", Surname: "Ashby" },
];

export const applySquadFilter = (player: PlayerDetails): boolean =>
  !SQUAD_FILTERS.some((filter) =>
    Object.entries(filter).every(([key, value]) => player[key as keyof PlayerDetails] === value),
  );

export const rejectedPlayersFilter = (player: PlayerDetails): boolean =>
  !applySquadFilter(player) && player.Surname !== "";
