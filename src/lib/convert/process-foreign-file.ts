import * as fs from "fs";
import { unparse } from "papaparse";
import { defaultTo, find, flatten, map } from "ramda";
import Character from "../objects/components/character";
import { DomesticPlayer, ForeignPlayer } from "../objects/player";
import InjuryProneness from "../objects/player/components/injury-proneness";
import Nationality from "../objects/player/components/nationality";
import PlayerAttributes from "../objects/player/components/player-attributes";
import PlayerHistory from "../objects/player/components/player-history";
import PlayerPosition from "../objects/player/components/player-position";
import Skill from "../objects/player/components/skill";
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

  const playersWithPotential = players
    .sort((a, b) => b.PotentialAbility - a.PotentialAbility)
    .slice(0, originalForeignPlayers.length * 2);
  const playersWithPotentialIds = playersWithPotential.map((p) => p.ID);

  const filteredPlayers = map(
    ({ id, clubNation }) => {
      if (id < 0) return null;

      const player = staff[id];
      if (!playersWithPotentialIds.includes(player.Player)) return null;

      const playerDetails = find((p) => p.ID === player.Player, playersWithPotential) as Player;
      return { id, clubNation, skill: playerDetails.PotentialAbility };
    },
    flatten(map((c) => map((id) => ({ id, clubNation: c.Nation }), c.Squad), nonEnglishClubs)),
  )
    .filter((x) => x)
    .sort((a, b) => defaultTo(0, b?.skill) - defaultTo(0, a?.skill)) as {
    id: number;
    clubNation: number;
    skill: number;
  }[];

  const foreignPlayers = filteredPlayers.map(({ id, clubNation }) => {
    const player = staff[id];
    const playerDetails = players.find((p) => p.ID === player.Player) as Player;

    const nation = getNation(nations, player.Nation);
    const club = getNation(nations, clubNation);
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
      "name",
    );

    const details: PlayerDetails = {
      Club: club ? Nationality.fromNewData(getText(club)) : "Brazil",
      "First name": firstName,
      Surname: surname,
      "Transfer status": "available",
      "Injury status": "fit",
      ...PlayerPosition.fromNewData(playerDetails),
      Age: TCMDate.toAge(player.DateOfBirth),
      Character: Character.fromNewData(player.Temperament, originalPlayer?.character),
      Nationality: nationText,
      "Current skill": playerDetails.CurrentAbility.toString(),
      "Potential skill": Skill.potentialFromNewData(
        `${firstName} ${surname}`,
        playerDetails.PotentialAbility,
        playerDetails.CurrentAbility,
      ),
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

    const fixed = fixData(details, year);

    if (/\S+\s+\S+/.test(fixed["First name"]) || /\S+\s+\S+/.test(fixed.Surname)) {
      // eslint-disable-next-line no-console
      console.log(
        `### Space in name: ${fixed["First name"]} ${fixed.Surname} (${fixed["Current skill"]} / ${fixed["Potential skill"]})`,
      );
    }

    return fixed;
  }) as PlayerDetails[];

  const skilledPlayers = foreignPlayers
    .filter((x) => x)
    .sort((a, b) => a.Surname.localeCompare(b.Surname))
    .sort((a, b) => parseInt(a.Age, 10) - parseInt(b.Age, 10))
    .sort((a, b) => parseInt(b["Potential skill"], 10) - parseInt(a["Potential skill"], 10));

  const filteredPlayerDetails = skilledPlayers
    .filter(applyPlayerFilter)
    .slice(0, originalForeignPlayers.length);

  const csv = unparse(
    filteredPlayerDetails
      .sort((a, b) => a.Surname.localeCompare(b.Surname))
      .sort((a, b) => a.Club.localeCompare(b.Club)),
  );
  fs.writeFileSync(`${filepath}/FOREIGN.DAT.csv`, csv);

  return filteredPlayerDetails;
};

const EXCLUSIONS = [
  { firstName: "Giampiero", surname: "Maini" },
  { firstName: "Carrasco", surname: "Hidalgo" },
  { firstName: "Gaetano", surname: "Scirea" },
  { firstName: "Goikoetxea", surname: "Goikoetxea Olaskoaga" },
  { firstName: "Fernandez", surname: "Roberto" },
  { firstName: "Tino", surname: "Asprilla", potentialSkill: 180 },
];
