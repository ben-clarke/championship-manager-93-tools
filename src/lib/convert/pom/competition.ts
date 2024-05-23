import { Buffer } from "buffer";

export class Competition {
  ID: number;

  Name: Uint8Array;

  GenderName: number;

  ShortName: Uint8Array;

  ShortGenderName: number;

  ThreeLetterName: Uint8Array;

  ClubCompScope: number;

  ClubCompSelected: number;

  ClubCompContinent: number;

  ClubCompNation: number;

  ClubCompForegroundColour: number;

  ClubCompBackgroundColour: number;

  ClubCompReputation: number;

  constructor(buffer: Buffer) {
    let position = 0;
    this.ID = buffer.readInt32LE(position);
    position += 4;
    this.Name = buffer.slice(position, position + 51);
    position += 51;
    this.GenderName = buffer.readUInt8(position);
    position += 1;
    this.ShortName = buffer.slice(position, position + 26);
    position += 26;
    this.ShortGenderName = buffer.readUInt8(position);
    position += 1;
    this.ThreeLetterName = buffer.slice(position, position + 4);
    position += 4;
    this.ClubCompScope = buffer.readInt8(position);
    position += 1;
    this.ClubCompSelected = buffer.readInt8(position);
    position += 1;
    this.ClubCompContinent = buffer.readInt32LE(position);
    position += 4;
    this.ClubCompNation = buffer.readInt32LE(position);
    position += 4;
    this.ClubCompForegroundColour = buffer.readInt32LE(position);
    position += 4;
    this.ClubCompBackgroundColour = buffer.readInt32LE(position);
    position += 4;
    this.ClubCompReputation = buffer.readInt16LE(position);
  }

  static fromBuffer(buffer: Buffer): Competition {
    return new Competition(buffer);
  }

  static getSize(): number {
    return 107;
  }
}
