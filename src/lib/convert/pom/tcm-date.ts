import { Buffer } from "buffer";

export class TCMDate {
  Day: number;

  Year: number;

  LeapYear: number;

  constructor(buffer?: Buffer, position: number = 0) {
    if (buffer) {
      this.Day = buffer.readInt16LE(position);
      this.Year = buffer.readInt16LE(position + 2);
      this.LeapYear = buffer.readInt32LE(position + 4);
    } else {
      this.Day = 1;
      this.Year = 1970;
      this.LeapYear = 0;
    }
  }

  static fromDateTime(dt: Date): TCMDate {
    const date = new TCMDate();
    date.Day = dt.getUTCDate() - 1; // JavaScript dates are 0-based for the day of the month
    date.Year = dt.getUTCFullYear();
    date.LeapYear = this.isLeapYear(dt.getUTCFullYear()) ? 1 : 0;
    return date;
  }

  static fromBuffer(buffer: Buffer, position: number = 0): TCMDate {
    const date = new TCMDate();
    date.Day = buffer.readInt16LE(position);
    date.Year = buffer.readInt16LE(position + 2);
    date.LeapYear = buffer.readInt32LE(position + 4);
    return date;
  }

  toBuffer(): Buffer {
    const buffer = Buffer.alloc(8);
    buffer.writeInt16LE(this.Day, 0);
    buffer.writeInt16LE(this.Year, 2);
    buffer.writeInt32LE(this.LeapYear, 4);
    return buffer;
  }

  static toDateTime(tcmDate: TCMDate): Date {
    try {
      return new Date(tcmDate.Year, 0, tcmDate.Day + 1); // JavaScript months are zero-indexed
    } catch (e) {
      return new Date(1900, 0, 1);
    }
  }

  static toAge(tcmDate: TCMDate): string {
    const year = tcmDate.Year || 1970;
    const age = 2001 - year;
    return age < 15 ? "15" : age.toString();
  }

  private static isLeapYear(year: number): boolean {
    if (year % 4 !== 0) return false;
    if (year % 100 !== 0) return true;
    if (year % 400 !== 0) return false;
    return true;
  }
}
