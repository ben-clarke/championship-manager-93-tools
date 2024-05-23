export class StaffHistory {
  ID: number;

  StaffID: number;

  Year: number;

  ClubID: number;

  OnLoan: number;

  Apps: number;

  Goals: number;

  constructor(buffer: Buffer) {
    this.ID = buffer.readInt32LE(0);
    this.StaffID = buffer.readInt32LE(4);
    this.Year = buffer.readInt16LE(8);
    this.ClubID = buffer.readInt32LE(10);
    this.OnLoan = buffer.readInt8(14);
    this.Apps = buffer.readInt8(15);
    this.Goals = buffer.readInt8(16);
  }

  static fromBuffer(buffer: Buffer): StaffHistory {
    return new StaffHistory(buffer);
  }

  static getSize(): number {
    return 17;
  }
}
