import * as fs from "fs";
import { unparse } from "papaparse";
import { flatten } from "ramda";
import Character from "../objects/components/character";
import { DomesticPlayer, ForeignPlayer } from "../objects/player";
import InjuryProneness from "../objects/player/components/injury-proneness";
import Nationality from "../objects/player/components/nationality";
import PlayerAttributes from "../objects/player/components/player-attributes";
import PlayerHistory from "../objects/player/components/player-history";
import PlayerPosition from "../objects/player/components/player-position";
import { load } from "./load-files";
import { Player } from "./pom/player";
import { TCMDate } from "./pom/tcm-date";
import { getText } from "./read-file";
import { fixData } from "./utils/fix-data";
import { PlayerDetails } from "./utils/generate-random";
import { getNation } from "./utils/get-nations";
import { getNames } from "./utils/normalisation";
import { applyPlayerFilter, getOriginalPlayer } from "./utils/player-filtering";

export const processForeignPlayers = async (
  year: number,
  filepath: string,
  originalPlayers: DomesticPlayer[],
  originalForeignPlayers: ForeignPlayer[],
  generate = true,
): Promise<PlayerDetails[]> => {
  if (!generate) return [];

  const { clubs, nations, staff, players, firstNames, surnames, commonNames } = await load(year);

  const nonEnglishClubs = clubs.filter((c) => {
    const clubNation = getNation(nations, c.Nation);
    return !((clubNation ? Nationality.fromNewData(getText(clubNation)) : "Brazil") === "England");
  });

  if (nonEnglishClubs.length > 0) return [];

  const foreignPlayers = nonEnglishClubs.reduce(
    (acc, c) => {
      const name = getText(c.Name);

      const squad = c.Squad.map((id) => {
        if (id < 0) return null;

        const player = staff[id];
        const playerDetails = players.find((p) => p.ID === player.Player) as Player;

        const nation = getNation(nations, player.Nation);
        const clubNation = getNation(nations, c.Nation);
        const nationText = nation ? Nationality.fromNewData(getText(nation)) : "unknown";

        const { firstName, surname } = getNames(
          year,
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

        const originalPlayer = getOriginalPlayer(
          [...originalPlayers, ...originalForeignPlayers],
          firstName,
          surname,
          name,
        );

        const details: PlayerDetails = {
          Club: clubNation ? Nationality.fromNewData(getText(clubNation)) : "Brazil",
          "First name": firstName,
          Surname: surname,
          "Transfer status": "available",
          "Injury status": "fit",
          ...PlayerPosition.fromNewData(playerDetails),
          Age: TCMDate.toAge(player.DateOfBirth),
          Character: Character.fromNewData(player.Temperament, originalPlayer?.character),
          Nationality: nationText,
          "Current skill": playerDetails.CurrentAbility.toString(),
          "Potential skill": playerDetails.PotentialAbility.toString(),
          "Injury proneness": InjuryProneness.fromNewData(
            playerDetails.InjuryProneness,
            originalPlayer?.injuryProneness,
          ),
          ...PlayerAttributes.fromNewData(
            playerDetails,
            player.Temperament,
            originalPlayer?.attributes,
          ),
          History: PlayerHistory.fromNewData(year, originalPlayer?.history),
        };
        return fixData(details, year);
      });

      acc[name] = squad.filter((x) => x) as PlayerDetails[];
      return acc;
    },
    {} as Record<string, PlayerDetails[]>,
  );

  const skilledPlayers = flatten(Object.values(foreignPlayers)).sort(
    (a, b) => parseInt(b["Potential skill"], 10) - parseInt(a["Potential skill"], 10),
  );

  const filteredPlayers = skilledPlayers
    .filter(applyPlayerFilter)
    .slice(0, originalForeignPlayers.length);

  const csv1 = unparse(
    filteredPlayers
      .sort((a, b) => a.Surname.localeCompare(b.Surname))
      .sort((a, b) => a.Club.localeCompare(b.Club)),
  );
  fs.writeFileSync(`${filepath}/FOREIGN.DAT.csv`, csv1);

  return filteredPlayers;
};

const EXCLUSIONS = [
  { firstName: "Goikoetxea", surname: "Goikoetxea Olaskoaga" },
  { firstName: "Fernandez", surname: "Roberto" },
  { firstName: "Tino", surname: "Asprilla", potentialSkill: 180 },
];
