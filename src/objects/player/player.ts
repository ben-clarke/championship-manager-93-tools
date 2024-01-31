import { splitEvery } from "ramda";
import CMExeParser from "../../files/cm-exe-parser";
import Character from "../components/character";
import PersonName from "../components/person-name";
import Age from "./components/age";
import CurrentSkill from "./components/current-skill";
import InjuryProneness from "./components/injury-proneness";
import InjuryStatus from "./components/injury-status";
import Nationality from "./components/nationality";
import PlayerAttributes from "./components/player-attributes";
import PlayerClub from "./components/player-club";
import PlayerHistory from "./components/player-history";
import PlayerPosition from "./components/player-position";
import PotentialSkill from "./components/potential-skill";
import TransferStatus from "./components/transfer-status";

export abstract class Player {
  firstName: PersonName;

  surname: PersonName;

  transferStatus: TransferStatus;

  club?: PlayerClub;

  injuryStatus: InjuryStatus;

  position: PlayerPosition;

  age: Age;

  character: Character;

  nationality: Nationality;

  currentSkill: CurrentSkill;

  potentialSkill: PotentialSkill;

  injuryProneness: InjuryProneness; // (out of 10)

  attributes: PlayerAttributes;

  history: PlayerHistory[];

  constructor(player: string[], data: CMExeParser) {
    const firstNames = data.get("first-name");
    const surnames = data.get("surname");
    const nationalities = data.get("nationality");
    const clubs = data.get("club");
    const nonDomesticClubs = data.get("non-domestic-club");

    const [
      firstName1,
      firstName2,
      surname1,
      surname2,
      transferStatus,
      // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
      _club,
      injuryStatus,
      isGk,
      isDef,
      isMid,
      isAtt,
      isRightSided,
      isLeftSided,
      isCentral,
      age,
      character,
      nationality,
      currentSkill,
      passing,
      tackling,
      pace,
      heading,
      flair,
      creativity,
      goalscoring,
      injuryProneness,
      potentialSkill,
      agility,
      aggression,
      influence,
      temperament,
      consistency,
      stamina,
      ...history
    ] = this.getDataItems(player);

    this.firstName = new PersonName(firstName1, firstName2, firstNames);
    this.surname = new PersonName(surname1, surname2, surnames);
    this.transferStatus = new TransferStatus(transferStatus);
    this.injuryStatus = new InjuryStatus(injuryStatus);
    this.position = new PlayerPosition(
      isGk,
      isDef,
      isMid,
      isAtt,
      isRightSided,
      isLeftSided,
      isCentral,
    );
    this.age = new Age(age);
    this.character = new Character(character);
    this.nationality = new Nationality(nationality, nationalities);
    this.currentSkill = new CurrentSkill(currentSkill);
    this.potentialSkill = new PotentialSkill(potentialSkill);
    this.injuryProneness = new InjuryProneness(injuryProneness);
    this.attributes = new PlayerAttributes(
      passing,
      tackling,
      pace,
      heading,
      flair,
      creativity,
      goalscoring,
      agility,
      aggression,
      influence,
      temperament,
      consistency,
      stamina,
    );

    const histories = splitEvery(4, history);
    this.history = histories
      .filter(([year]) => year !== "ff")
      .map(
        ([year, club, games, goals]) =>
          new PlayerHistory(year, club, games, goals, clubs, nonDomesticClubs, nationalities),
      );

    // Not used by default - only foreign players
    this.club = undefined;
  }

  abstract getDataItems(parsed: string[]): string[];

  toString(): string {
    return [
      this.firstName,
      this.surname,
      this.transferStatus,
      this.injuryStatus,
      this.position,
      this.age,
      this.character,
      this.nationality,
      this.currentSkill,
      this.potentialSkill,
      this.injuryProneness,
      this.attributes,
      this.club,
      this.history,
    ].join(",");
  }

  toHumanReadable(): Record<string, string> {
    return {
      Club: this.club?.toString() || "",
      "First name": this.firstName.toString(),
      Surname: this.surname.toString(),
      "Transfer status": this.transferStatus.toString(),
      "Injury status": this.injuryStatus.toString(),
      ...this.position.toHumanReadable(),
      Age: this.age.toString(),
      Character: this.character.toString(),
      Nationality: this.nationality.toString(),
      "Current skill": this.currentSkill.toString(),
      "Potential skill": this.potentialSkill.toString(),
      "Injury proneness": this.injuryProneness.toString(),
      ...this.attributes.toHumanReadable(),
      History: this.history.toString(),
    };
  }
}
