import * as fs from "fs";
import { unparse } from "papaparse";
import { flatten } from "ramda";
import InjuryProneness from "../objects/player/components/injury-proneness";
import Nationality from "../objects/player/components/nationality";
import PlayerAttributes from "../objects/player/components/player-attributes";
import PlayerPosition from "../objects/player/components/player-position";
import { load } from "./load-files";
import { Nation } from "./pom/nation";
import { Player } from "./pom/player";
import { StaffHistory } from "./pom/staff-history";
import { TCMDate } from "./pom/tcm-date";
import { getText } from "./read-file";
import { fixData } from "./utils/fix-data";
import { PlayerDetails } from "./utils/generate-random";
import { getNames } from "./utils/normalisation";

export const processForeignPlayers = async (
  year: number,
  filepath: string,
  numberOfForeignPlayersRequired: number,
  generate = true,
): Promise<PlayerDetails[]> => {
  if (!generate) return [];

  const {
    clubs,
    competitions,
    nations,
    staff,
    staffHistory,
    players,
    firstNames,
    surnames,
    commonNames,
  } = await load(year);

  const england = nations.find((n) => getText(n.Name) === ENGLAND) as Nation;

  const englishCompetitions = competitions.filter((c) => c.ClubCompNation === england.ID);
  const englishLeagues = englishCompetitions.map((c) => c.ID);

  const histories = staffHistory.reduce(
    (acc, h) => {
      if (!acc[h.StaffID]) acc[h.StaffID] = [];
      acc[h.StaffID].push(h);
      return acc;
    },
    {} as Record<string, StaffHistory[]>,
  );

  const nonEnglishClubs = clubs.filter((c) => !englishLeagues.includes(c.Division));
  const foreignPlayers = nonEnglishClubs.reduce(
    (acc, c) => {
      const name = getText(c.Name);

      const squad = c.Squad.map((id) => {
        if (id < 0) return null;

        const player = staff[id];
        const playerDetails = players.find((p) => p.ID === player.Player) as Player;

        const nation = nations.find((n) => n.ID === player.Nation)?.Name as Buffer;
        const clubNation = nations.find((n) => n.ID === c.Nation)?.Name as Buffer;
        const nationText = nation ? Nationality.fromNewData(getText(nation)) : "unknown";

        const { firstName, surname } = getNames(
          player,
          firstNames,
          surnames,
          commonNames,
          nationText,
        );

        if (
          EXCLUSIONS.find(
            (x) =>
              x.firstName === firstName &&
              x.surname === surname &&
              (!x.potentialSkill || x.potentialSkill === playerDetails.PotentialAbility),
          )
        ) {
          return null;
        }

        const history = histories[playerDetails.ID] || [];
        history.sort((a, b) => a.Year - b.Year);

        const details: PlayerDetails = {
          Club: clubNation ? Nationality.fromNewData(getText(clubNation)) : "unknown",
          "First name": firstName,
          Surname: surname,
          "Transfer status": "available",
          "Injury status": "fit",
          ...PlayerPosition.fromNewData(playerDetails),
          Age: TCMDate.toAge(player.DateOfBirth),
          Character: RANDOM,
          Nationality: nationText,
          "Current skill": playerDetails.CurrentAbility.toString(),
          "Potential skill": playerDetails.PotentialAbility.toString(),
          "Injury proneness": InjuryProneness.fromNewData(playerDetails.InjuryProneness),
          ...PlayerAttributes.fromNewData(playerDetails, player.Temperament),
          History: [].join(","),
        };
        return fixData(details);
      });

      acc[name] = squad.filter((x) => x) as PlayerDetails[];
      return acc;
    },
    {} as Record<string, PlayerDetails[]>,
  );

  const skilledPlayers = flatten(Object.values(foreignPlayers)).sort((a, b) => {
    const ageA = parseInt(a["Potential skill"], 10);
    const ageB = parseInt(b["Potential skill"], 10);
    return ageB - ageA;
  });

  const filteredPlayers = skilledPlayers.slice(0, numberOfForeignPlayersRequired);

  const csv1 = unparse(
    filteredPlayers
      .sort((a, b) => a.Surname.localeCompare(b.Surname))
      .sort((a, b) => a.Club.localeCompare(b.Club)),
  );
  fs.writeFileSync(`${filepath}/FOREIGN.DAT.csv`, csv1);

  return filteredPlayers;
};

const ENGLAND = "England";

const RANDOM = "random";

const EXCLUSIONS = [
  { firstName: "Goikoetxea", surname: "Goikoetxea Olaskoaga" },
  { firstName: "Fernandez", surname: "Roberto" },
  { firstName: "Tino", surname: "Asprilla", potentialSkill: 180 },
];
