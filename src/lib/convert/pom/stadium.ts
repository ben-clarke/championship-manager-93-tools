export class Stadium {
  ID: number;

  Name: Buffer;

  StadiumGenderName: number;

  StadiumCity: number;

  StadiumCapacity: number;

  StadiumSeatingCapacity: number;

  StadiumExpansionCapacity: number;

  StadiumNearbyStadium: number;

  StadiumCovered: number;

  StadiumUnderSoilHeating: number;

  constructor(buffer: Buffer) {
    this.ID = buffer.readInt32LE(0);
    this.Name = buffer.slice(4, 55); // SizeConst = 51 bytes
    this.StadiumGenderName = buffer.readUInt8(55);
    this.StadiumCity = buffer.readInt32LE(56);
    this.StadiumCapacity = buffer.readInt32LE(60);
    this.StadiumSeatingCapacity = buffer.readInt32LE(64);
    this.StadiumExpansionCapacity = buffer.readInt32LE(68);
    this.StadiumNearbyStadium = buffer.readInt32LE(72);
    this.StadiumCovered = buffer.readUInt8(76);
    this.StadiumUnderSoilHeating = buffer.readUInt8(77);
  }

  static fromBuffer(buffer: Buffer): Stadium {
    return new Stadium(buffer);
  }

  static getSize(): number {
    return 78;
  }
}
