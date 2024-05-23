import { Buffer } from "buffer";

export class Names {
  name: Uint8Array;

  id: number;

  nation: number;

  count: number; // Using `number` type here to handle the signed byte

  constructor(buffer: Buffer, position: number = 0) {
    this.name = buffer.slice(position, position + 51);
    this.id = buffer.readInt32LE(position + 51);
    this.nation = buffer.readInt32LE(position + 55);
    this.count = buffer.readInt8(position + 59);
  }

  static fromBuffer(buffer: Buffer, position: number = 0): Names {
    return new Names(buffer, position);
  }

  static getSize(): number {
    return 60; // The total size of TNames in bytes
  }
}
