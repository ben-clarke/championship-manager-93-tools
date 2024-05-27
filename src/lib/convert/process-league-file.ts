import { flatten } from "ramda";
import CMExeParser from "../files/cm-exe-parser";
import Character from "../objects/components/character";
import InjuryProneness from "../objects/player/components/injury-proneness";
import Nationality from "../objects/player/components/nationality";
import PlayerAttributes from "../objects/player/components/player-attributes";
import PlayerPosition from "../objects/player/components/player-position";
import { load } from "./load-files";
import { Player } from "./pom/player";
import { StaffHistory } from "./pom/staff-history";
import { TCMDate } from "./pom/tcm-date";
import { getText } from "./read-file";
import { fixData } from "./utils/fix-data";
import { PlayerDetails, generateRandomPlayers, shuffleArray } from "./utils/generate-random";
import { getNames, getNormalisedClub } from "./utils/normalisation";
import { applyPlayerFilter } from "./utils/player-filtering";
import { applySquadFilter, rejectedPlayersFilter } from "./utils/squad-filtering";

export const processSquads = async (
  year: number,
  filepath: string,
  data: CMExeParser,
  generate = true,
): Promise<PlayerDetails[]> => {
  if (!generate) return [];

  const { clubs, nations, staff, staffHistory, players, firstNames, surnames, commonNames } =
    await load(year);

  const histories = staffHistory.reduce(
    (acc, h) => {
      if (!acc[h.StaffID]) acc[h.StaffID] = [];
      acc[h.StaffID].push(h);
      return acc;
    },
    {} as Record<string, StaffHistory[]>,
  );

  const hardcodedClubs = Object.values(data.get("club"));

  const englishClubs = clubs.filter((c) => {
    const clubNation = nations.find((n) => n.ID === c.Nation)?.Name as Buffer;
    return (clubNation ? Nationality.fromNewData(getText(clubNation)) : "Brazil") === "England";
  });

  const squads = englishClubs.reduce(
    (acc, c) => {
      const name = getText(c.Name);

      const squadMembers = c.Squad.filter((id) => id >= 0);

      const squad = squadMembers.map((id) => {
        const player = staff[id];
        const playerDetails = players.find((p) => p.ID === player.Player) as Player;

        const nation = nations.find((n) => n.ID === player.Nation)?.Name as Buffer;
        const history = histories[playerDetails.ID] || [];
        history.sort((a, b) => a.Year - b.Year);

        const { firstName, surname } = getNames(
          year,
          player,
          firstNames,
          surnames,
          commonNames,
          nation ? Nationality.fromNewData(getText(nation)) : "unknown",
        );

        const details: PlayerDetails = {
          Club: name,
          "First name": firstName,
          Surname: surname,
          "Transfer status": "available",
          "Injury status": "fit",
          ...PlayerPosition.fromNewData(playerDetails),
          Age: TCMDate.toAge(player.DateOfBirth),
          Character: Character.randomise(player.Temperament),
          Nationality: nation ? Nationality.fromNewData(getText(nation)) : "unknown",
          "Current skill": playerDetails.CurrentAbility.toString(),
          "Potential skill": playerDetails.PotentialAbility.toString(),
          "Injury proneness": InjuryProneness.fromNewData(playerDetails.InjuryProneness),
          ...PlayerAttributes.fromNewData(playerDetails, player.Temperament),
          History: [].join(","),
        };
        return fixData(details, year);
      });

      acc[name] = generateRandomPlayers(name, squad, hardcodedClubs, year);
      return acc;
    },
    {} as Record<string, PlayerDetails[]>,
  );

  const { leaguePlayers } = createPlayerLists(year, squads, hardcodedClubs);
  return leaguePlayers;
};

const createPlayerLists = (
  year: number,
  squads: Record<string, PlayerDetails[]>,
  hardcodedClubs: string[],
): { leaguePlayers: PlayerDetails[] } => {
  const leagueSquads: Record<string, PlayerDetails[]> = {};
  const nonLeagueSquads: Record<string, PlayerDetails[]> = {};

  Object.entries(squads).forEach(([name, squad]) => {
    const normalised = getNormalisedClub(name);
    const match = hardcodedClubs.includes(normalised);
    if (match) leagueSquads[normalised] = squad.map((p) => ({ ...p, Club: normalised }));
    else nonLeagueSquads[normalised] = squad;
  });

  const resizedLeagueSquads = Object.entries(leagueSquads).reduce(
    (acc, [name, squad]) => {
      acc[name] = squad.filter(applyPlayerFilter).filter((s) => applySquadFilter(s, year));
      return acc;
    },
    {} as Record<string, PlayerDetails[]>,
  );

  const filteredNonLeagueSquads = Object.entries(nonLeagueSquads).reduce(
    (acc, [name, squad]) => {
      acc[name] = squad.filter(applyPlayerFilter);
      return acc;
    },
    {} as Record<string, PlayerDetails[]>,
  );

  const rejectedPlayers = Object.entries(leagueSquads).reduce(
    (acc, [name, squad]) => {
      acc[name] = squad.filter((s) => rejectedPlayersFilter(s, year));
      return acc;
    },
    {} as Record<string, PlayerDetails[]>,
  );

  const sortedLeagueSquads = Object.values(resizedLeagueSquads).map((s) => s.filter((x) => x));
  const sortedNonLeagueSquads = Object.values(filteredNonLeagueSquads).map((s) =>
    s.filter((x) => x),
  );

  const leaguePlayers = replaceRandomPlayerWithRealPlayers(flatten(sortedLeagueSquads), [
    ...flatten(sortedNonLeagueSquads),
    ...flatten(Object.values(rejectedPlayers)),
  ]);

  // eslint-disable-next-line no-console
  console.log("Number of players", leaguePlayers.length);
  if (leaguePlayers.length < 1650) throw new Error("Not enough players");

  return { leaguePlayers };
};

const replaceRandomPlayerWithRealPlayers = (
  players: PlayerDetails[],
  unusedPlayers: PlayerDetails[],
): PlayerDetails[] => {
  let secondListIndex = 0;

  const updatedPlayers = shuffleArray<PlayerDetails>(players);

  updatedPlayers.forEach((item, index) => {
    if (item["First name"] === "random" && secondListIndex < unusedPlayers.length) {
      updatedPlayers[index] = {
        ...unusedPlayers[secondListIndex],
        Club: updatedPlayers[index].Club,
      };
      secondListIndex += 1;
    }
  });

  return updatedPlayers
    .sort((a, b) => parseInt(b.Age, 10) - parseInt(a.Age, 10))
    .sort((a, b) => {
      if (a["First name"] === "random") return 1;
      if (b["First name"] === "random") return -1;
      return 0;
    })
    .sort((a, b) => a.Club.localeCompare(b.Club));
};
