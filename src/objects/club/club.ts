import Character from "../components/character";
import PersonName from "../components/person-name";
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

  boardConfidence: number;

  managerFirstName: PersonName;

  managerSurname: PersonName;

  styleOfPlay: StyleOfPlay;

  formation: Formation;

  managerReputation: ManagerReputation;

  managerCharacter: Character; // TODO - BC | Move to common

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

    this.boardConfidence = parseInt(boardConfidence, 16);
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
      ...this.home.toHumanReadable("Away"),
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
}
