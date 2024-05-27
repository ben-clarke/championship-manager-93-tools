import { getNormalisedClub } from "./normalisation";

const FIXES: Record<number, Partial<TeamDetails>[]> = {
  82: [
    {
      Club: "Wolves",
      "Club status": "medium",
    },
  ],
  86: [],
  88: [
    {
      Club: "Aston Villa",
      "Club status": "high",
    },
    {
      Club: "Barnet",
      "Manager first name": "Barry",
      "Manager surname": "Fry",
    },
    {
      Club: "Barnsley",
      "Manager first name": "Allan",
      "Manager surname": "Clarke",
    },
    {
      Club: "Birmingham",
      "Manager first name": "Garry",
      "Manager surname": "Pendrey",
    },
    {
      Club: "Blackburn",
      "Manager first name": "Don",
      "Manager surname": "MacKay",
    },
    {
      Club: "Blackpool",
      "Manager first name": "Sam",
      "Manager surname": "Ellis",
    },
    {
      Club: "Bolton",
      "Manager first name": "Phil",
      "Manager surname": "Neal",
    },
    {
      Club: "Bournemouth",
      "Manager first name": "Harry",
      "Manager surname": "Redknapp",
    },
    {
      Club: "Bradford",
      "Manager first name": "Terry",
      "Manager surname": "Dolan",
    },
    {
      Club: "Brentford",
      "Manager first name": "Steve",
      "Manager surname": "Perryman",
    },
    {
      Club: "Brighton",
      "Manager first name": "Barry",
      "Manager surname": "Lloyd",
    },
    {
      Club: "Bristol C",
      "Manager first name": "Terry",
      "Manager surname": "Cooper",
    },
    {
      Club: "Bristol R",
      "Manager first name": "Gerry",
      "Manager surname": "Francis",
    },
    {
      Club: "Burnley",
      "Manager first name": "Brian",
      "Manager surname": "Miller",
    },
    {
      Club: "Cambridge",
      "Manager first name": "Chris",
      "Manager surname": "Turner",
    },
    {
      Club: "Cardiff",
      "Manager first name": "Frank",
      "Manager surname": "Burrows",
    },
    {
      Club: "Chester",
      "Manager first name": "Harry",
      "Manager surname": "McNally",
    },
    {
      Club: "Colchester",
      "Manager first name": "Mike",
      "Manager surname": "Walker",
    },
    {
      Club: "Coventry",
      "Club status": "medium",
    },
    {
      Club: "Crewe",
      "Manager first name": "Dario",
      "Manager surname": "Gradi",
    },
    {
      Club: "Doncaster",
      "Manager first name": "David",
      "Manager surname": "Cusack",
    },
    {
      Club: "Fulham",
      "Manager first name": "Ray",
      "Manager surname": "Lewington",
    },
    {
      Club: "Grimsby",
      "Manager first name": "Bobby",
      "Manager surname": "Roberts",
    },
    {
      Club: "Hartlepool",
      "Manager first name": "John",
      "Manager surname": "Bird",
    },
    {
      Club: "Huddersfld",
      "Manager first name": "Steve",
      "Manager surname": "Smith",
    },
    {
      Club: "Hull",
      "Manager first name": "Brian",
      "Manager surname": "Horton",
    },
    {
      Club: "Ipswich",
      "Manager first name": "John",
      "Manager surname": "Duncan",
    },
    {
      Club: "Leeds",
      "Manager first name": "Billy",
      "Manager surname": "Bremner",
      "Club status": "high",
    },
    {
      Club: "Leicester",
      "Manager first name": "Brian",
      "Manager surname": "Hamilton",
    },
    {
      Club: "Liverpool",
      "Manager first name": "Kenny",
      "Manager surname": "Dalglish",
    },
    {
      Club: "Luton",
      "Club status": "medium",
    },
    {
      Club: "Man City",
      "Manager first name": "Jimmy",
      "Manager surname": "Frizzell",
      "Club status": "medium",
    },
    {
      Club: "Mansfield",
      "Manager first name": "Ian",
      "Manager surname": "Greaves",
    },
    {
      Club: "Notts C",
      "Manager first name": "John",
      "Manager surname": "Barnwell",
    },
    {
      Club: "Oldham",
      "Manager first name": "Joe",
      "Manager surname": "Royle",
    },
    {
      Club: "Peterboro",
      "Manager first name": "Noel",
      "Manager surname": "Cantwell",
    },
    {
      Club: "Plymouth",
      "Manager first name": "Dave",
      "Manager surname": "Smith",
    },
    {
      Club: "Port Vale",
      "Manager first name": "John",
      "Manager surname": "Rudge",
    },
    {
      Club: "Preston",
      "Manager first name": "John",
      "Manager surname": "McGrath",
    },
    {
      Club: "Q.P.R.",
      "Club status": "medium",
    },
    {
      Club: "Reading",
      "Manager first name": "Ian",
      "Manager surname": "Branfoot",
    },
    {
      Club: "Rochdale",
      "Manager first name": "Eddie",
      "Manager surname": "Gray",
    },
    {
      Club: "Rotherham",
      "Manager first name": "Norman",
      "Manager surname": "Hunter",
    },
    {
      Club: "Scarborough",
      "Manager first name": "Neil",
      "Manager surname": "Warnock",
    },
    {
      Club: "Scunthorpe",
      "Manager first name": "Mick",
      "Manager surname": "Buxton",
    },
    {
      Club: "Sheff Utd",
      "Manager first name": "Billy",
      "Manager surname": "McEwan",
    },
    {
      Club: "Stockport",
      "Manager first name": "Asa",
      "Manager surname": "Hartford",
    },
    {
      Club: "Stoke",
      "Manager first name": "Mick",
      "Manager surname": "Mills",
    },
    {
      Club: "Sunderland",
      "Manager first name": "Denis",
      "Manager surname": "Smith",
    },
    {
      Club: "Swansea",
      "Manager first name": "Terry",
      "Manager surname": "Yorath",
    },
    {
      Club: "Torquay",
      "Manager first name": "Cyril",
      "Manager surname": "Knowles",
    },
    {
      Club: "Tottenham",
      "Club status": "high",
    },
    {
      Club: "Tranmere",
      "Manager first name": "John",
      "Manager surname": "King",
    },
    {
      Club: "Watford",
      "Club status": "medium",
    },
    {
      Club: "Wimbledon",
      "Club status": "medium",
    },
    {
      Club: "Wolves",
      "Manager first name": "Graham",
      "Manager surname": "Turner",
    },
    {
      Club: "W.B.A.",
      "Manager first name": "Ron",
      "Manager surname": "Saunders",
    },
    {
      Club: "Wycombe",
      "Manager first name": "Peter",
      "Manager surname": "Suddaby",
    },
    {
      Club: "York",
      "Manager first name": "Bobby",
      "Manager surname": "Saxton",
    },
  ],
  90: [],
  98: [],
};

export const fixTeamData = (team: TeamDetails, year: number): TeamDetails => {
  const fixed = FIXES[year].find((f) => f.Club === getNormalisedClub(team.Club));

  if (!fixed) return team;

  return {
    ...team,
    ...fixed,
  };
};

export interface TeamDetails {
  Club: string;
  Capacity: string;
  "Seated capacity": string;
  "Home text": string;
  "Home background": string;
  "Away text": string;
  "Away background": string;
  "Club status": string;
  "Unknown 8": string;
  Money: string;
  "Unknown 10": string;
  "Board confidence": string;
  "Manager first name": string;
  "Manager surname": string;
  "Style of play": string;
  Formation: string;
  "Manager reputation": string;
  "Manager character": string;
  "Assistant first name": string;
  "Assistant surname": string;
}
