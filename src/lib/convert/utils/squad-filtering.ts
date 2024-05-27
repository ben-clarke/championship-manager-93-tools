import { PlayerDetails } from "./generate-random";

const SQUAD_FILTERS: Record<number, Pick<PlayerDetails, "Club" | "First name" | "Surname">[]> = {
  82: [
    // ASTON VILLA
    { Club: "Aston Villa", "First name": "Mark", Surname: "Jones" },
    { Club: "Aston Villa", "First name": "Pat", Surname: "Heard" },
    { Club: "Aston Villa", "First name": "Gary", Surname: "Williams" },
    { Club: "Aston Villa", "First name": "Kevin", Surname: "Rogers" },
    { Club: "Aston Villa", "First name": "Mark", Surname: "Kendall" },
    { Club: "Aston Villa", "First name": "Kevin", Surname: "Poole" },
    // BIRMINGHAM
    { Club: "Birmingham", "First name": "Paul", Surname: "Ivey" },
    { Club: "Birmingham", "First name": "David", Surname: "Linney" },
    { Club: "Birmingham", "First name": "Carlos", Surname: "Francis" },
    { Club: "Birmingham", "First name": "Philip", Surname: "Hawker" },
    { Club: "Birmingham", "First name": "Duncan", Surname: "MacDowall" },
    { Club: "Birmingham", "First name": "Leslie", Surname: "Phillips" },
    { Club: "Birmingham", "First name": "David", Surname: "Coles" },
    // EVERTON
    { Club: "Everton", "First name": "Paul", Surname: "Lodge" },
    { Club: "Everton", "First name": "Mark", Surname: "Ward" },
    { Club: "Everton", "First name": "Stuart", Surname: "Rimmer" },
    { Club: "Everton", "First name": "Ian", Surname: "Marshall" },
    // IPSWICH
    { Club: "Ipswich", "First name": "Kevin", Surname: "Steggles" },
    { Club: "Ipswich", "First name": "Irvin", Surname: "Gernon" },
    { Club: "Ipswich", "First name": "Mich", Surname: "D'Avray" },
    { Club: "Ipswich", "First name": "Mick", Surname: "Stockwell" },
    // LEEDS
    { Club: "Leeds", "First name": "Aiden", Surname: "Butterworth" },
    { Club: "Leeds", "First name": "Steve", Surname: "Balcombe" },
    { Club: "Leeds", "First name": "Terry", Surname: "Connor" },
    { Club: "Leeds", "First name": "Neil", Surname: "Aspin" },
    // LEICESTER
    { Club: "Leicester", "First name": "Paul", Surname: "Friar" },
    { Club: "Leicester", "First name": "David", Surname: "Rennie" },
    // LIVERPOOL
    { Club: "Liverpool", "First name": "Mark", Surname: "Seagraves" },
    { Club: "Liverpool", "First name": "Brian", Surname: "Mooney" },
    { Club: "Liverpool", "First name": "Paul", Surname: "Jewell" },
    { Club: "Liverpool", "First name": "Colin", Surname: "Russell" },
    { Club: "Liverpool", "First name": "Michael", Surname: "Halsall" },
    // MAN UTD
    { Club: "Man Utd", "First name": "Alan", Surname: "Davies" },
    { Club: "Man Utd", "First name": "Martin", Surname: "Lane" },
    { Club: "Man Utd", "First name": "Steve", Surname: "Pears" },
    { Club: "Man Utd", "First name": "Scott", Surname: "McGarvey" },
    { Club: "Man Utd", "First name": "John", Surname: "Pemberton" },
    { Club: "Man Utd", "First name": "Nicky", Surname: "Wood" },
    // MIDDLESBROUGH
    { Club: "Middlesboro", "First name": "David", Surname: "Currie" },
    { Club: "Middlesboro", "First name": "Colin", Surname: "Ross" },
    { Club: "Middlesboro", "First name": "Andy", Surname: "McCreesh" },
    { Club: "Middlesboro", "First name": "Garry", Surname: "MacDonald" },
    { Club: "Middlesboro", "First name": "Darren", Surname: "Wood" },
    { Club: "Middlesboro", "First name": "Stephen", Surname: "Bell" },
    // N.FOREST
    { Club: "N.Forest", "First name": "Colin", Surname: "Walsh" },
    { Club: "N.Forest", "First name": "Calvin", Surname: "Plummer" },
    // Q.P.R.
    { Club: "Q.P.R.", "First name": "Warren", Surname: "Neill" },
    { Club: "Q.P.R.", "First name": "Ian", Surname: "Dawes" },
    { Club: "Q.P.R.", "First name": "Ian", Surname: "Muir" },
    { Club: "Q.P.R.", "First name": "Graham", Surname: "Benstead" },
    { Club: "Q.P.R.", "First name": "Wayne", Surname: "Fereday" },
    // SOUTHAMPTON
    { Club: "Southampton", "First name": "Ian", Surname: "Juryeff" },
    { Club: "Southampton", "First name": "David", Surname: "Madden" },
    { Club: "Southampton", "First name": "Martin", Surname: "Foyle" },
    // SWANSEA
    { Club: "Swansea", "First name": "Dudley", Surname: "Lewis" },
    { Club: "Swansea", "First name": "Chris", Surname: "Sander" },
    { Club: "Swansea", "First name": "James", Surname: "Loveridge" },
    { Club: "Swansea", "First name": "Gary", Surname: "Richards" },
    { Club: "Swansea", "First name": "Darren", Surname: "Gale" },
    // TOTTENHAM
    { Club: "Tottenham", "First name": "Patrick", Surname: "Corbett" },
    { Club: "Tottenham", "First name": "Allan", Surname: "Cockram" },
    { Club: "Tottenham", "First name": "Ian", Surname: "Culverhouse" },
    { Club: "Tottenham", "First name": "Ally", Surname: "Dick" },
    { Club: "Tottenham", "First name": "Tony", Surname: "Parks" },
    // W.B.A
    { Club: "W.B.A.", "First name": "Alan", Surname: "Webb" },
    { Club: "W.B.A.", "First name": "Gary", Surname: "Childs" },
    { Club: "W.B.A.", "First name": "Mickey", Surname: "Lewis" },
  ],
  86: [],
  88: [
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
  ],
};

export const applySquadFilter = (player: PlayerDetails, year: number): boolean =>
  !SQUAD_FILTERS[year].some((filter) =>
    Object.entries(filter).every(([key, value]) => player[key as keyof PlayerDetails] === value),
  );

export const rejectedPlayersFilter = (player: PlayerDetails, year: number): boolean =>
  !applySquadFilter(player, year) && player.Surname !== "";
