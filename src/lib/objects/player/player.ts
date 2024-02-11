import { splitEvery } from "ramda";
import { getGameVersion } from "../../constants/file";
import CMExeParser from "../../files/cm-exe-parser";
import { HumanReadablePlayer } from "../../types/validation";
import Character from "../components/character";
import PersonName from "../components/person-name";
import Age from "./components/age";
import InjuryProneness from "./components/injury-proneness";
import InjuryStatus from "./components/injury-status";
import Nationality from "./components/nationality";
import PlayerAttributes from "./components/player-attributes";
import PlayerClub from "./components/player-club";
import PlayerHistory from "./components/player-history";
import PlayerPosition from "./components/player-position";
import Skill from "./components/skill";
import TransferStatus from "./components/transfer-status";

export abstract class Player {
  club?: PlayerClub;

  firstName: PersonName;

  surname: PersonName;

  transferStatus: TransferStatus;

  injuryStatus: InjuryStatus;

  position: PlayerPosition;

  age: Age;

  character: Character;

  nationality: Nationality;

  currentSkill: Skill;

  potentialSkill: Skill;

  injuryProneness: InjuryProneness; // (out of 10)

  attributes: PlayerAttributes;

  history: PlayerHistory[];

  constructor(player: string[], data: CMExeParser) {
    const firstNames = this.getFirstNameMap(data);
    const surnames = data.get("surname");
    const nationalities = data.get("nationality");
    const clubs = data.get("club");
    const nonDomesticClubs = data.get("non-domestic-club");
    const version = getGameVersion(data.get("version"));

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
    this.currentSkill = new Skill(currentSkill);
    this.potentialSkill = new Skill(potentialSkill);
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
          new PlayerHistory(
            year,
            club,
            games,
            goals,
            clubs,
            nonDomesticClubs,
            nationalities,
            version,
          ),
      );

    // Not used by default - only foreign players
    this.club = undefined;
  }

  abstract getFirstNameMap(data: CMExeParser): Record<string, string>;

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

  static toHex(player: string[], data: CMExeParser, isForeign: boolean): HumanReadablePlayer {
    const { value: club, errors: clubErrors } = PlayerClub.toHex(
      player[0],
      data.get("club"),
      data.get("nationality"),
      getGameVersion(data.get("version")),
    );
    const {
      value1: firstName1,
      value2: firstName2,
      errors: firstNameErrors,
    } = PersonName.toHex(
      player[1],
      isForeign ? data.get("first-name-foreign") : data.get("first-name"),
    );

    const {
      value1: surname1,
      value2: surname2,
      errors: surnameErrors,
    } = PersonName.toHex(player[2], data.get("surname"));
    const { value: transferStatus, errors: transferStatusErrors } = TransferStatus.toHex(player[3]);
    const { value: injuryStatus, errors: injuryStatusErrors } = InjuryStatus.toHex(player[4]);
    const {
      gk,
      def,
      mid,
      att,
      right,
      left,
      centre,
      errors: positionErrors,
    } = PlayerPosition.toHex(player[5], player[6]);
    const { value: age, errors: ageErrors } = Age.toHex(player[7]);

    const { value: character, errors: characterErrors } = Character.toHex(player[8]);
    const { value: nationality, errors: nationalityErrors } = Nationality.toHex(
      player[9],
      data.get("nationality"),
    );
    const { value: currentSkill, errors: currentSkillErrors } = Skill.toHex(player[10]);
    const { value: potentialSkill, errors: potentialSkillErrors } = Skill.toHex(player[11]);
    const { value: injuryProneness, errors: injuryPronenessErrors } = InjuryProneness.toHex(
      player[12],
    );
    const {
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
      errors: attributesErrors,
    } = PlayerAttributes.toHex(
      player[13],
      player[14],
      player[15],
      player[16],
      player[17],
      player[18],
      player[19],
      player[20],
      player[21],
      player[22],
      player[23],
      player[24],
      player[25],
    );

    const { values: histories, errors: historiesErrors } = PlayerHistory.toHex(
      player[26],
      data.get("club"),
      data.get("non-domestic-club"),
      data.get("nationality"),
      getGameVersion(data.get("version")),
    );

    const errors = [
      ...clubErrors,
      ...firstNameErrors,
      ...surnameErrors,
      ...transferStatusErrors,
      ...injuryStatusErrors,
      ...positionErrors,
      ...ageErrors,
      ...characterErrors,
      ...nationalityErrors,
      ...currentSkillErrors,
      ...potentialSkillErrors,
      ...injuryPronenessErrors,
      ...attributesErrors,
      ...historiesErrors,
    ];

    return {
      values: [
        firstName1,
        firstName2,
        surname1,
        surname2,
        transferStatus,
        club,
        injuryStatus,
        gk,
        def,
        mid,
        att,
        right,
        left,
        centre,
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
        ...histories,
        "ff",
      ],
      errors,
    };
  }
}
