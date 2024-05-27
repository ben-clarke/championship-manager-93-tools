import CMExeParser from "../files/cm-exe-parser";
import ClubAttraction from "../objects/club/components/club-attraction";
import ClubColours from "../objects/club/components/club-colours";
import Formation from "../objects/club/components/club-formation";
import ClubMoney from "../objects/club/components/club-money";
import StyleOfPlay from "../objects/club/components/club-style-of-play";
import ManagerReputation from "../objects/club/components/manager-reputation";
import Stadium from "../objects/club/components/stadium";
import { load } from "./load-files";
import { Club } from "./pom/club";
import { Competition } from "./pom/competition";
import { Names } from "./pom/names";
import { Nation } from "./pom/nation";
import { NonPlayer } from "./pom/non-player";
import { Staff } from "./pom/staff";
import { getText } from "./read-file";
import { TeamDetails, fixTeamData } from "./utils/fix-team-data";
import { getNormalisedClub, getNormalisedName, getNormalisedSurname } from "./utils/normalisation";
import { getUnknown10, getUnknown8 } from "./utils/unknown-values";

export const processTeams = async (
  year: number,
  filepath: string,
  data: CMExeParser,
): Promise<{
  leagueSquads: Record<string, TeamDetails>;
  divisions: Record<string, number>;
}> => {
  const { clubs, competitions, nations, staff, firstNames, surnames, nonPlayers, stadiums } =
    await load(year);

  const england = nations.find((n) => getText(n.Name) === ENGLAND) as Nation;

  const englishCompetitions = competitions.filter((c) => c.ClubCompNation === england.ID);
  const englishLeagues = englishCompetitions.map((c) => c.ID);

  const hardcodedClubs = Object.values(data.get("club"));

  const englishClubs = clubs.filter((c) => englishLeagues.includes(c.Division));
  const teams = englishClubs.reduce(
    (acc, c) => {
      const name = getText(c.Name);

      const { coachId, first, surname } = getCoach(staff, c.Manager, firstNames, surnames);
      const { first: firstCoach, surname: surnameCoach } = getCoach(
        staff,
        c.AssistantManager,
        firstNames,
        surnames,
      );

      const coachDetails = nonPlayers.find((p) => p.ID === coachId) as NonPlayer;

      const team: TeamDetails = {
        Club: getNormalisedClub(name),
        ...Stadium.fromNewData(stadiums[c.Stadium]),
        ...ClubColours.fromNewDataHome(c.ForeColour1, c.BackColour1),
        ...ClubColours.fromNewDataAway(c.ForeColour2, c.BackColour2),
        "Club status": ClubAttraction.fromNewData(c),
        "Unknown 8": getUnknown8(getNormalisedClub(name)),
        Money: ClubMoney.fromNewData(c, year),
        "Unknown 10": getUnknown10(getNormalisedClub(name)),
        "Board confidence": "80",
        "Manager first name": getNormalisedName(first, year),
        "Manager surname": getNormalisedSurname(surname, year),
        "Style of play": StyleOfPlay.randomise(getDivision(c, competitions)),
        Formation: Formation.fromNewData(coachDetails),
        "Manager reputation": ManagerReputation.fromNewData(
          coachDetails?.CurrentReputation,
          getDivision(c, competitions),
        ),
        "Manager character": "random",
        "Assistant first name": getNormalisedName(firstCoach, year),
        "Assistant surname": getNormalisedSurname(surnameCoach, year),
      };

      acc[name] = fixTeamData(team, year);
      return acc;
    },
    {} as Record<string, TeamDetails>,
  );

  const { leagueSquads, divisions } = createTeams(
    teams,
    hardcodedClubs,
    englishClubs,
    englishCompetitions,
  );

  return { leagueSquads, divisions };
};

export const createTeams = (
  teams: Record<string, TeamDetails>,
  hardcodedClubs: string[],
  englishClubs: Club[],
  competitions: Competition[],
): {
  leagueSquads: Record<string, TeamDetails>;
  divisions: Record<string, number>;
} => {
  const leagueSquads: Record<string, TeamDetails> = {};
  const divisions: Record<string, number> = {};

  Object.entries(teams).forEach(([name, team]) => {
    const normalised = getNormalisedClub(name);
    const match = hardcodedClubs.includes(normalised);
    if (match) {
      leagueSquads[normalised] = team;
      divisions[normalised] = getDivision(
        englishClubs.find((c) => getText(c.Name) === name) as Club,
        competitions,
        true,
      );
    }
  });

  return { leagueSquads, divisions };
};

const getCoach = (
  staff: Staff[],
  id: number,
  firstNames: Names[],
  surnames: Names[],
): { coachId: number; first: string; surname: string } => {
  const coach = staff[id];
  if (!coach) return { coachId: -1, first: "random", surname: "random" };

  const first = getText(firstNames[coach.FirstName].name);
  const surname = getText(surnames[coach.SecondName].name);

  return {
    coachId: coach.NonPlayer,
    first,
    surname,
  };
};

const getDivision = (club: Club, competitions: Competition[], log = false): number => {
  const division = getText(
    competitions.find((x) => x.ID === club.Division)?.ShortName || Buffer.from(""),
  );
  switch (division) {
    case "Premier Division":
      return 1;
    case "First Division":
      return 2;
    case "Second Division":
      return 3;
    case "Third Division":
      return 4;
    default:
      // eslint-disable-next-line no-console
      if (log) console.log("Unknown division", division, getText(club.Name));
      return 4;
  }
};

const ENGLAND = "England";
