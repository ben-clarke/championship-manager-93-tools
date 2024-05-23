import { Buffer } from "buffer";
import { TCMDate } from "./tcm-date";

export class Staff {
  ID: number;

  FirstName: number;

  SecondName: number;

  CommonName: number;

  DateOfBirth: TCMDate;

  YearOfBirth: number;

  Nation: number;

  SecondNation: number;

  IntApps: number;

  IntGoals: number;

  NationalJob: number;

  JobForNation: number;

  DateJoinedNation: TCMDate;

  DateExpiresNation: TCMDate;

  ClubJob: number;

  JobForClub: number;

  DateJoinedClub: TCMDate;

  DateExpiresClub: TCMDate;

  Wage: number;

  Value: number;

  Adaptability: number;

  Ambition: number;

  Determination: number;

  Loyality: number;

  Pressure: number;

  Professionalism: number;

  Sportsmanship: number;

  Temperament: number;

  PlayingSquad: number;

  Classification: number;

  ClubValuation: number;

  Player: number;

  StaffPreferences: number;

  NonPlayer: number;

  SquadSelectedFor: number;

  constructor(buffer: Buffer) {
    this.ID = buffer.readInt32LE(0);
    this.FirstName = buffer.readInt32LE(4);
    this.SecondName = buffer.readInt32LE(8);
    this.CommonName = buffer.readInt32LE(12);
    this.DateOfBirth = TCMDate.fromBuffer(buffer, 16);
    this.YearOfBirth = buffer.readUInt16LE(24);
    this.Nation = buffer.readInt32LE(26);
    this.SecondNation = buffer.readInt32LE(30);
    this.IntApps = buffer.readUInt8(34);
    this.IntGoals = buffer.readUInt8(35);
    this.NationalJob = buffer.readInt32LE(36);
    this.JobForNation = buffer.readUInt8(40);
    this.DateJoinedNation = TCMDate.fromBuffer(buffer, 41);
    this.DateExpiresNation = TCMDate.fromBuffer(buffer, 49);
    this.ClubJob = buffer.readInt32LE(57);
    this.JobForClub = buffer.readUInt8(61);
    this.DateJoinedClub = TCMDate.fromBuffer(buffer, 62);
    this.DateExpiresClub = TCMDate.fromBuffer(buffer, 70);
    this.Wage = buffer.readInt32LE(78);
    this.Value = buffer.readInt32LE(82);
    this.Adaptability = buffer.readUInt8(86);
    this.Ambition = buffer.readUInt8(87);
    this.Determination = buffer.readUInt8(88);
    this.Loyality = buffer.readUInt8(89);
    this.Pressure = buffer.readUInt8(90);
    this.Professionalism = buffer.readUInt8(91);
    this.Sportsmanship = buffer.readUInt8(92);
    this.Temperament = buffer.readUInt8(93);
    this.PlayingSquad = buffer.readUInt8(94);
    this.Classification = buffer.readUInt8(95);
    this.ClubValuation = buffer.readUInt8(96);
    this.Player = buffer.readInt32LE(97);
    this.StaffPreferences = buffer.readInt32LE(101);
    this.NonPlayer = buffer.readInt32LE(105);
    this.SquadSelectedFor = buffer.readUInt8(109);
  }

  static fromBuffer(buffer: Buffer): Staff {
    return new Staff(buffer);
  }

  static getSize(): number {
    return 110;
  }
}
