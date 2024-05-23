import { Buffer } from "buffer";

export class Index {
  name: Uint8Array; // byte[51]

  fileType: number;

  count: number;

  offset: number;

  version: number;

  constructor(buffer?: Buffer, position: number = 0) {
    if (buffer) {
      this.name = buffer.slice(position, position + 51);
      this.fileType = buffer.readInt32LE(position + 51);
      this.count = buffer.readInt32LE(position + 55);
      this.offset = buffer.readInt32LE(position + 59);
      this.version = buffer.readInt32LE(position + 63);
    } else {
      this.name = new Uint8Array(51);
      this.fileType = 0;
      this.count = 0;
      this.offset = 0;
      this.version = 0;
    }
  }

  static fromBuffer(buffer: Buffer, position: number = 0): Index {
    return new Index(buffer, position);
  }

  toBuffer(): Buffer {
    const buffer = Buffer.alloc(67); // Total size of all fields
    buffer.fill(this.name, 0, 51); // Fill name from 0 to 50
    buffer.writeInt32LE(this.fileType, 51);
    buffer.writeInt32LE(this.count, 55);
    buffer.writeInt32LE(this.offset, 59);
    buffer.writeInt32LE(this.version, 63);
    return buffer;
  }

  static getSize(): number {
    return 67; // The total byte size of TIndex
  }
}
