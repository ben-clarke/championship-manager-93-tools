import * as fs from "fs";
import { unparse } from "papaparse";
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
import { getNormalisedClub, getNormalisedName, getNormalisedSurname } from "./utils/normalisation";
import { getUnknown10, getUnknown8 } from "./utils/unknown-values";

export const processTeams = async (
  filepath: string,
  data: CMExeParser,
): Promise<Record<string, Record<string, string>>> => {
  const { clubs, competitions, nations, staff, firstNames, surnames, nonPlayers, stadiums } =
    await load();

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

      const team = {
        Club: getNormalisedClub(name),
        ...Stadium.fromNewData(stadiums[c.Stadium]),
        ...ClubColours.fromNewData(c.ForeColour1, c.BackColour1, "Home"),
        ...ClubColours.fromNewData(c.ForeColour2, c.BackColour2, "Away"),
        "Club status": ClubAttraction.fromNewData(c),
        "Unknown 8": getUnknown8(getNormalisedClub(name)),
        Money: ClubMoney.fromNewData(c),
        "Unknown 10": getUnknown10(getNormalisedClub(name)),
        "Board confidence": "80",
        "Manager first name": getNormalisedName(first),
        "Manager surname": getNormalisedSurname(surname),
        "Style of play": StyleOfPlay.randomise(),
        Formation: Formation.fromNewData(coachDetails),
        "Manager reputation": ManagerReputation.fromNewData(
          coachDetails?.CurrentReputation,
          getDivision(c, competitions),
        ),
        "Manager character": "random",
        "Assistant first name": getNormalisedName(firstCoach),
        "Assistant surname": getNormalisedSurname(surnameCoach),
      };

      acc[name] = team;
      return acc;
    },
    {} as Record<string, Record<string, string>>,
  );

  const leagueSquads: Record<string, Record<string, string>> = {};

  Object.entries(teams).forEach(([name, team]) => {
    const normalised = getNormalisedClub(name);
    const match = hardcodedClubs.includes(normalised);
    if (match) leagueSquads[normalised] = team;
  });

  const csv = unparse(Object.values(leagueSquads));
  fs.writeFileSync(`${filepath}/TEAM.DAT.csv`, csv);

  return leagueSquads;
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

const getDivision = (club: Club, competitions: Competition[]): number => {
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
    default:
      return 4;
  }
};

const ENGLAND = "England";
