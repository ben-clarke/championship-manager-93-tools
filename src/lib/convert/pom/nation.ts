import { Buffer } from "buffer";

export class Nation {
  ID: number;

  Name: Uint8Array;

  GenderName: number;

  ShortName: Uint8Array;

  ShortGenderName: number;

  ThreeLetterName: Uint8Array;

  Nationality: Uint8Array;

  Continent: number;

  Region: number;

  ActualRegion: number;

  FirstLanguage: number;

  SecondLanguage: number;

  ThirdLanguage: number;

  CapitalCity: number;

  StateOfDevelopment: number;

  GroupMembership: number;

  NationalStadium: number;

  GameImportance: number;

  LeagueStandard: number;

  NumberClubs: number;

  NumberStaff: number;

  SeasonUpdateDay: number;

  Reputation: number;

  ForegroundColour1: number;

  BackgroundColour1: number;

  ForegroundColour2: number;

  BackgroundColour2: number;

  ForegroundColour3: number;

  BackgroundColour3: number;

  FIFACoefficient: number;

  FIFACoefficient91: number;

  FIFACoefficient92: number;

  FIFACoefficient93: number;

  FIFACoefficient94: number;

  FIFACoefficient95: number;

  FIFACoefficient96: number;

  UEFACoefficient91: number;

  UEFACoefficient92: number;

  UEFACoefficient93: number;

  UEFACoefficient94: number;

  UEFACoefficient95: number;

  UEFACoefficient96: number;

  Rivals1: number;

  Rivals2: number;

  Rivals3: number;

  NationLeagueSelected: number;

  NationShortlistOffset: number;

  NationGamesPlayed: number;

  constructor(buffer: Buffer) {
    let pos = 0;
    this.ID = buffer.readInt32LE(pos);
    pos += 4;
    this.Name = buffer.slice(pos, pos + 51);
    pos += 51;
    this.GenderName = buffer.readUInt8(pos);
    pos += 1;
    this.ShortName = buffer.slice(pos, pos + 26);
    pos += 26;
    this.ShortGenderName = buffer.readUInt8(pos);
    pos += 1;
    this.ThreeLetterName = buffer.slice(pos, pos + 4);
    pos += 4;
    this.Nationality = buffer.slice(pos, pos + 26);
    pos += 26;
    this.Continent = buffer.readInt32LE(pos);
    pos += 4;
    this.Region = buffer.readInt8(pos);
    pos += 1;
    this.ActualRegion = buffer.readInt8(pos);
    pos += 1;
    this.FirstLanguage = buffer.readInt8(pos);
    pos += 1;
    this.SecondLanguage = buffer.readInt8(pos);
    pos += 1;
    this.ThirdLanguage = buffer.readInt8(pos);
    pos += 1;
    this.CapitalCity = buffer.readInt32LE(pos);
    pos += 4;
    this.StateOfDevelopment = buffer.readInt8(pos);
    pos += 1;
    this.GroupMembership = buffer.readInt8(pos);
    pos += 1;
    this.NationalStadium = buffer.readInt32LE(pos);
    pos += 4;
    this.GameImportance = buffer.readInt8(pos);
    pos += 1;
    this.LeagueStandard = buffer.readInt8(pos);
    pos += 1;
    this.NumberClubs = buffer.readInt16LE(pos);
    pos += 2;
    this.NumberStaff = buffer.readInt32LE(pos);
    pos += 4;
    this.SeasonUpdateDay = buffer.readInt16LE(pos);
    pos += 2;
    this.Reputation = buffer.readInt16LE(pos);
    pos += 2;
    this.ForegroundColour1 = buffer.readInt32LE(pos);
    pos += 4;
    this.BackgroundColour1 = buffer.readInt32LE(pos);
    pos += 4;
    this.ForegroundColour2 = buffer.readInt32LE(pos);
    pos += 4;
    this.BackgroundColour2 = buffer.readInt32LE(pos);
    pos += 4;
    this.ForegroundColour3 = buffer.readInt32LE(pos);
    pos += 4;
    this.BackgroundColour3 = buffer.readInt32LE(pos);
    pos += 4;
    this.FIFACoefficient = buffer.readDoubleLE(pos);
    pos += 8;
    this.FIFACoefficient91 = buffer.readDoubleLE(pos);
    pos += 8;
    this.FIFACoefficient92 = buffer.readDoubleLE(pos);
    pos += 8;
    this.FIFACoefficient93 = buffer.readDoubleLE(pos);
    pos += 8;
    this.FIFACoefficient94 = buffer.readDoubleLE(pos);
    pos += 8;
    this.FIFACoefficient95 = buffer.readDoubleLE(pos);
    pos += 8;
    this.FIFACoefficient96 = buffer.readDoubleLE(pos);
    pos += 8;
    this.UEFACoefficient91 = buffer.readDoubleLE(pos);
    pos += 8;
    this.UEFACoefficient92 = buffer.readDoubleLE(pos);
    pos += 8;
    this.UEFACoefficient93 = buffer.readDoubleLE(pos);
    pos += 8;
    this.UEFACoefficient94 = buffer.readDoubleLE(pos);
    pos += 8;
    this.UEFACoefficient95 = buffer.readDoubleLE(pos);
    pos += 8;
    this.UEFACoefficient96 = buffer.readDoubleLE(pos);
    pos += 8;
    this.Rivals1 = buffer.readInt32LE(pos);
    pos += 4;
    this.Rivals2 = buffer.readInt32LE(pos);
    pos += 4;
    this.Rivals3 = buffer.readInt32LE(pos);
    pos += 4;
    this.NationLeagueSelected = buffer.readInt8(pos);
    pos += 1;
    this.NationShortlistOffset = buffer.readInt32LE(pos);
    pos += 4;
    this.NationGamesPlayed = buffer.readInt8(pos);
  }

  static fromBuffer(buffer: Buffer): Nation {
    return new Nation(buffer);
  }

  static getSize(): number {
    return 290; // Total byte size
  }
}
