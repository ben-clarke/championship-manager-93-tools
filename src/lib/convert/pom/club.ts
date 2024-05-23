import { Buffer } from "buffer";

export class Club {
  ID: number;

  Name: Uint8Array;

  GenderName: number;

  ShortName: Uint8Array;

  ShortGenderName: number;

  Nation: number;

  Division: number;

  LastDivision: number;

  LastPosition: number;

  ReserveDivision: number;

  ProfessionalStatus: number;

  Cash: number;

  Stadium: number;

  OwnStadium: number;

  ReserveStadium: number;

  MatchDay: number;

  Attendance: number;

  MinAttendance: number;

  MaxAttendance: number;

  Training: number;

  Reputation: number;

  PLC: number;

  ForeColour1: number;

  BackColour1: number;

  ForeColour2: number;

  BackColour2: number;

  ForeColour3: number;

  BackColour3: number;

  FavStaff1: number;

  FavStaff2: number;

  FavStaff3: number;

  DisStaff1: number;

  DisStaff2: number;

  DisStaff3: number;

  Rival1: number;

  Rival2: number;

  Rival3: number;

  Chairman: number;

  Directors: number[];

  Manager: number;

  AssistantManager: number;

  Squad: number[];

  Coaches: number[];

  Scouts: number[];

  Physios: number[];

  EuroFlag: number;

  EuroSeeding: number;

  TeamSelected: number[];

  TacticTraining: number[];

  TacticSelected: number;

  HasLinkedClub: number;

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
    this.Nation = buffer.readInt32LE(pos);
    pos += 4;
    this.Division = buffer.readInt32LE(pos);
    pos += 4;
    this.LastDivision = buffer.readInt32LE(pos);
    pos += 4;
    this.LastPosition = buffer.readUInt8(pos);
    pos += 1;
    this.ReserveDivision = buffer.readInt32LE(pos);
    pos += 4;
    this.ProfessionalStatus = buffer.readUInt8(pos);
    pos += 1;
    this.Cash = buffer.readInt32LE(pos);
    pos += 4;
    this.Stadium = buffer.readInt32LE(pos);
    pos += 4;
    this.OwnStadium = buffer.readUInt8(pos);
    pos += 1;
    this.ReserveStadium = buffer.readInt32LE(pos);
    pos += 4;
    this.MatchDay = buffer.readUInt8(pos);
    pos += 1;
    this.Attendance = buffer.readInt32LE(pos);
    pos += 4;
    this.MinAttendance = buffer.readInt32LE(pos);
    pos += 4;
    this.MaxAttendance = buffer.readInt32LE(pos);
    pos += 4;
    this.Training = buffer.readUInt8(pos);
    pos += 1;
    this.Reputation = buffer.readUInt16LE(pos);
    pos += 2;
    this.PLC = buffer.readUInt8(pos);
    pos += 1;
    this.ForeColour1 = buffer.readInt32LE(pos);
    pos += 4;
    this.BackColour1 = buffer.readInt32LE(pos);
    pos += 4;
    this.ForeColour2 = buffer.readInt32LE(pos);
    pos += 4;
    this.BackColour2 = buffer.readInt32LE(pos);
    pos += 4;
    this.ForeColour3 = buffer.readInt32LE(pos);
    pos += 4;
    this.BackColour3 = buffer.readInt32LE(pos);
    pos += 4;
    this.FavStaff1 = buffer.readInt32LE(pos);
    pos += 4;
    this.FavStaff2 = buffer.readInt32LE(pos);
    pos += 4;
    this.FavStaff3 = buffer.readInt32LE(pos);
    pos += 4;
    this.DisStaff1 = buffer.readInt32LE(pos);
    pos += 4;
    this.DisStaff2 = buffer.readInt32LE(pos);
    pos += 4;
    this.DisStaff3 = buffer.readInt32LE(pos);
    pos += 4;
    this.Rival1 = buffer.readInt32LE(pos);
    pos += 4;
    this.Rival2 = buffer.readInt32LE(pos);
    pos += 4;
    this.Rival3 = buffer.readInt32LE(pos);
    pos += 4;
    this.Chairman = buffer.readInt32LE(pos);
    pos += 4;
    this.Directors = new Array(3).fill(null).map(() => buffer.readInt32LE(pos));
    pos += 12;
    this.Manager = buffer.readInt32LE(pos);
    pos += 4;
    this.AssistantManager = buffer.readInt32LE(pos);
    pos += 4;
    this.Squad = new Array(50).fill(null).map((_, i) => buffer.readInt32LE(pos + i * 4));
    pos += 200;
    this.Coaches = new Array(5).fill(null).map(() => buffer.readInt32LE(pos));
    pos += 20;
    this.Scouts = new Array(7).fill(null).map(() => buffer.readInt32LE(pos));
    pos += 28;
    this.Physios = new Array(3).fill(null).map(() => buffer.readInt32LE(pos));
    pos += 12;
    this.EuroFlag = buffer.readInt32LE(pos);
    pos += 4;
    this.EuroSeeding = buffer.readUInt8(pos);
    pos += 1;
    this.TeamSelected = new Array(20).fill(null).map(() => buffer.readInt32LE(pos));
    pos += 80;
    this.TacticTraining = new Array(4).fill(null).map(() => buffer.readInt32LE(pos));
    pos += 16;
    this.TacticSelected = buffer.readInt32LE(pos);
    pos += 4;
    this.HasLinkedClub = buffer.readUInt8(pos);
    pos += 1;
  }

  static fromBuffer(buffer: Buffer): Club {
    return new Club(buffer);
  }

  static getSize(): number {
    return 581;
  }
}
