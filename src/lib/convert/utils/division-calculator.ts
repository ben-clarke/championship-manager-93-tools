import { splitEvery } from "ramda";
import CMExeParser from "../../files/cm-exe-parser";
import { getSortedList } from "../../files/utils/sorted";

export const getMatchedDivision = (
  data: CMExeParser,
  divisions: Record<string, number>,
): number => {
  const clubs = getSortedList(data.get("club"));
  const grounds = getSortedList(data.get("ground"));

  const exeDetails = splitEvery(20, groupItemsByIndex(clubs, grounds));

  const incorrectDivisions = removeCorrectItems(exeDetails, divisions);
  console.log(incorrectDivisions);

  return 1;
};

const groupItemsByIndex = (one: string[], two: string[]): TeamTuple => {
  const minLength = Math.min(one.length, two.length);

  return Array.from({ length: minLength }).map((_, index) => [one[index], two[index]]);
};

const removeCorrectItems = (
  teams: [string, string][][],
  divisions: Record<string, number>,
): UpdateRequirements =>
  teams.map((list, index) => {
    const incorrect = list.filter(([team]) => divisions[team] !== index + 1);
    return incorrect.map(([team, ground]) => ({
      team: `${team} (${team.length})`,
      ground: `${ground} (${ground.length})`,
      division: divisions[team],
    }));
  }) as unknown as UpdateRequirements;

type TeamTuple = [string, string][];

interface UpdateRequirements {
  team: string;
  ground: string;
  division: number;
}

// { team: 'Leeds (5)', ground: 'Elland Road (11)', division: 2 }
// { team: 'Derby (5)', ground: 'Baseball Ground (15)', division: 1 }

// { team: 'Man City (8)', ground: 'Maine Road (10)', division: 2 }
// { team: 'Charlton (8)', ground: 'The Valley (10)', division: 1 }

// { team: 'Sheff Utd (9)', ground: 'Bramall Lane (12)', division: 2 }
// { team: 'Portsmouth (10)', ground: 'Fratton Park (12)', division: 1}
