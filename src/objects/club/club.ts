import PersonName from "../components/person-name";
import ClubAttraction from "./components/club-attraction";
import ClubColours from "./components/club-colours";
import ClubMoney from "./components/club-money";
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

  unknown14: string;

  unknown15: string;

  managerReputation: ManagerReputation;

  unknown17: string;

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
      unknown14,
      unknown15,
      managerReputation,
      unknown17,
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

    this.unknown14 = unknown14;
    this.unknown15 = unknown15;
    this.managerReputation = new ManagerReputation(managerReputation);
    this.unknown17 = unknown17;
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
      this.unknown14,
      this.unknown15,
      this.managerReputation,
      this.unknown17,
      this.assistantFirstName,
      this.assistantSurname,
    ].join(",");
  }
}
