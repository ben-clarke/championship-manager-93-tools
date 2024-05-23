import Age from "../../objects/player/components/age";
import InjuryProneness from "../../objects/player/components/injury-proneness";
import Nationality from "../../objects/player/components/nationality";
import PlayerAttributes from "../../objects/player/components/player-attributes";
import PlayerPosition, {
  ATT,
  DEF,
  GOAL,
  MID,
} from "../../objects/player/components/player-position";
import { getNormalisedClub } from "./normalisation";

export const generateRandomPlayers = (
  name: string,
  players: PlayerDetails[],
  hardcodedClubs: string[],
): PlayerDetails[] => {
  const normalised = getNormalisedClub(name);
  const match = hardcodedClubs.includes(normalised);
  if (!match) return players;

  const remainingPositions = getRemainingPositions(players);
  const randomPlayers = remainingPositions.map((pos) => createRandomPlayer(name, pos));
  return [...players, ...randomPlayers];
};

const createRandomPlayer = (club: string, position: string): PlayerDetails => ({
  Club: club,
  "First name": "random",
  Surname: "random",
  "Transfer status": "available",
  "Injury status": "fit",
  ...PlayerPosition.randomise(position),
  Age: Age.randomise(),
  Character: RANDOM,
  Nationality: Nationality.randomise(),
  "Current skill": RANDOM_NUM,
  "Potential skill": RANDOM_NUM,
  "Injury proneness": InjuryProneness.randomise(),
  ...PlayerAttributes.randomise(),
  History: [].join(","),
});

const getRemainingPositions = (currentPlayers: PlayerDetails[]): string[] => {
  const sizeMod = Math.floor(Math.random() * 6); // 0-5 inclusive

  const filledPositions = currentPlayers.map((p) => p.Position);
  const remainingPositions = [
    GOAL,
    GOAL,
    ...removeRandomItems([...REQUIRED_OUTFIELD_SQUAD_POSITIONS], sizeMod),
  ];

  if (currentPlayers.length >= remainingPositions.length) return [];

  // eslint-disable-next-line no-restricted-syntax
  for (const filledPosition of filledPositions) {
    const index = remainingPositions.findIndex(
      (pos) => pos.includes(filledPosition) || filledPosition.includes(pos),
    );
    if (index !== -1) remainingPositions.splice(index, 1);
  }

  return remainingPositions;
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const removeRandomItems = (array: string[], count: number): string[] => {
  const shuffledArray = shuffleArray<string>(array);
  return shuffledArray.slice(count);
};

const RANDOM = "random";
const RANDOM_NUM = "255";

const REQUIRED_OUTFIELD_SQUAD_POSITIONS = [
  DEF,
  DEF,
  DEF,
  DEF,
  DEF,
  DEF,
  DEF,
  [DEF, MID].join(""),
  MID,
  MID,
  MID,
  MID,
  MID,
  MID,
  [MID, ATT].join(""),
  [MID, ATT].join(""),
  ATT,
  ATT,
  ATT,
  ATT,
];

export interface PlayerDetails {
  Club: string;
  "First name": string;
  Surname: string;
  "Transfer status": string;
  "Injury status": string;
  Position: string;
  Side: string;
  Age: string;
  Character: string;
  Nationality: string;
  "Current skill": string;
  "Potential skill": string;
  "Injury proneness": string;
  History: string;
  Passing: string;
  Tackling: string;
  Pace: string;
  Heading: string;
  Flair: string;
  Creativity: string;
  Goalscoring: string;
  Agility: string;
  Aggression: string;
  Influence: string;
  Temperament: string;
  Consistency: string;
  Stamina: string;
}
