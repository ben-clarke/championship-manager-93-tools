import { getGameVersion } from "../../constants/file";
import CMExeParser from "../../files/cm-exe-parser";
import { HumanReadableClub } from "../../types/validation";
import Character from "../components/character";
import PersonName from "../components/person-name";
import BoardConfidence from "./components/board-confidence";
import ClubAttraction from "./components/club-attraction";
import ClubColours from "./components/club-colours";
import Formation from "./components/club-formation";
import ClubMoney from "./components/club-money";
import StyleOfPlay from "./components/club-style-of-play";
import ManagerReputation from "./components/manager-reputation";
import Stadium from "./components/stadium";

export abstract class Club {
  stadium: Stadium;

  home: ClubColours;

  away: ClubColours;

  attractiveness: ClubAttraction;

  unknown6: string;

  money: ClubMoney;

  unknown8: string;

  boardConfidence: BoardConfidence;

  managerFirstName: PersonName;

  managerSurname: PersonName;

  styleOfPlay: StyleOfPlay;

  formation: Formation;

  managerReputation: ManagerReputation;

  managerCharacter: Character;

  assistantFirstName: PersonName;

  assistantSurname: PersonName;

  constructor(
    parsed: string[],
    firstNames: Record<string, string>,
    surnames: Record<string, string>,
  ) {
    const data = this.getDataItems(parsed);
    const [
      capacity,
      seated,
      homeText,
      homeBackground,
      awayText,
      awayBackground,
      attractiveness,
      unknown6,
      money,
      unknown8,
      boardConfidence,
      managerFirstName1,
      managerFirstName2,
      managerSurname1,
      managerSurname2,
      styleOfPlay,
      formation,
      managerReputation,
      managerCharacter,
      assistantFirstName1,
      assistantFirstName2,
      assistantSurname1,
      assistantSurname2,
    ] = data;

    this.stadium = new Stadium(capacity, seated);

    this.home = new ClubColours(homeText, homeBackground);
    this.away = new ClubColours(awayText, awayBackground);

    this.attractiveness = new ClubAttraction(attractiveness);
    this.unknown6 = unknown6;
    this.money = new ClubMoney(money);
    this.unknown8 = unknown8;

    this.boardConfidence = new BoardConfidence(boardConfidence);
    this.managerFirstName = new PersonName(managerFirstName1, managerFirstName2, firstNames);
    this.managerSurname = new PersonName(managerSurname1, managerSurname2, surnames);

    this.styleOfPlay = new StyleOfPlay(styleOfPlay);
    this.formation = new Formation(formation);
    this.managerReputation = new ManagerReputation(managerReputation);
    this.managerCharacter = new Character(managerCharacter);
    this.assistantFirstName = new PersonName(assistantFirstName1, assistantFirstName2, firstNames);
    this.assistantSurname = new PersonName(assistantSurname1, assistantSurname2, surnames);
  }

  abstract getDataItems(parsed: string[]): string[];

  toString(): string {
    return [
      this.stadium,
      this.home,
      this.away,
      this.attractiveness,
      this.unknown6,
      this.money,
      this.unknown8,
      this.boardConfidence,
      this.managerFirstName,
      this.managerSurname,
      this.styleOfPlay,
      this.formation,
      this.managerReputation,
      this.managerCharacter,
      this.assistantFirstName,
      this.assistantSurname,
    ].join(",");
  }

  toHumanReadable(): Record<string, string> {
    return {
      ...this.stadium.toHumanReadable(),
      ...this.home.toHumanReadable("Home"),
      ...this.away.toHumanReadable("Away"),
      "Club status": this.attractiveness.toString(),
      "Unknown 8": this.unknown6,
      Money: this.money.toString(),
      "Unknown 10": this.unknown8,
      "Board confidence": this.boardConfidence.toString(),
      "Manager first name": this.managerFirstName.toString(),
      "Manager surname": this.managerSurname.toString(),
      "Style of play": this.styleOfPlay.toString(),
      Formation: this.formation.toString(),
      "Manager reputation": this.managerReputation.toString(),
      "Manager character": this.managerCharacter.toString(),
      "Assistant first name": this.assistantFirstName.toString(),
      "Assistant surname": this.assistantSurname.toString(),
    };
  }

  static toHex(team: string[], data: CMExeParser): HumanReadableClub {
    const { capacity, seated, errors: stadiumErrors } = Stadium.toHex(team[0], team[1]);
    const {
      text: homeText,
      background: homeBackground,
      errors: homeErrors,
    } = ClubColours.toHex(team[2], team[3]);
    const {
      text: awayText,
      background: awayBackground,
      errors: awayErrors,
    } = ClubColours.toHex(team[4], team[5]);
    const { value: status, errors: statusErrors } = ClubAttraction.toHex(team[6]);
    const unknown8 = team[7].padStart(2, "0");

    const { value: money, errors: moneyErrors } = ClubMoney.toHex(team[8]);
    const unknown10 = team[9].padStart(2, "0");
    const { value: boardConfidence, errors: boardConfidenceErrors } = BoardConfidence.toHex(
      team[10],
    );
    const {
      value1: firstName1,
      value2: firstName2,
      errors: firstNameErrors,
    } = PersonName.toHex(team[11], data.get("first-name"));
    const {
      value1: surname1,
      value2: surname2,
      errors: surnameErrors,
    } = PersonName.toHex(team[12], data.get("surname"));
    const { value: styleOfPlay, errors: styleOfPlayErrors } = StyleOfPlay.toHex(team[13]);
    const { value: formation, errors: formationErrors } = Formation.toHex(team[14]);
    const { value: managerReputation, errors: managerReputationErrors } = ManagerReputation.toHex(
      team[15],
    );
    const { value: managerCharacter, errors: characterErrors } = Character.toHex(team[16]);
    const {
      value1: assistantFirstName1,
      value2: assistantFirstName2,
      errors: assistantFirstNameErrors,
    } = PersonName.toHex(team[17], data.get("first-name"));
    const {
      value1: assistantSurname1,
      value2: assistantSurname2,
      errors: assistantSurnameError,
    } = PersonName.toHex(team[18], data.get("surname"));

    const errors = [
      ...stadiumErrors,
      ...homeErrors,
      ...awayErrors,
      ...statusErrors,
      ...moneyErrors,
      ...boardConfidenceErrors,
      ...firstNameErrors,
      ...surnameErrors,
      ...styleOfPlayErrors,
      ...formationErrors,
      ...managerReputationErrors,
      ...characterErrors,
      ...assistantFirstNameErrors,
      ...assistantSurnameError,
    ];

    const homeColours = Club.hexColour(
      homeText,
      homeBackground,
      data.get("version"),
      data.get("year"),
    );
    const awayColours = Club.hexColour(
      awayText,
      awayBackground,
      data.get("version"),
      data.get("year"),
    );

    return {
      values: [
        capacity,
        seated,
        ...homeColours,
        ...awayColours,
        status,
        unknown8,
        money,
        unknown10,
        boardConfidence,
        firstName1,
        firstName2,
        surname1,
        surname2,
        styleOfPlay,
        formation,
        managerReputation,
        managerCharacter,
        assistantFirstName1,
        assistantFirstName2,
        assistantSurname1,
        assistantSurname2,
      ],
      errors,
    };
  }

  static hexColour(
    text: string,
    background: string,
    versions: Record<string, string>,
    years: Record<string, string>,
  ): string[] {
    const version = getGameVersion(versions, years);
    if (version === "93") return [`${text[1]}${background[1]}`];
    return [text, background];
  }
}
