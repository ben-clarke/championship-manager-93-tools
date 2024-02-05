import { any } from "ramda";
import { HumanReadablePosition } from "../../../types/validation";

export default class PlayerPosition {
  isGk: boolean;

  position: string;

  side: string;

  constructor(
    gk: string,
    def: string,
    mid: string,
    att: string,
    rightSided: string,
    leftSided: string,
    central: string,
  ) {
    this.isGk = !!this.getAttribute(gk, GOAL);

    this.position = [
      this.getAttribute(gk, GOAL),
      this.getAttribute(def, DEF),
      this.getAttribute(mid, MID),
      this.getAttribute(att, ATT),
    ].join("");
    this.side = [
      this.getAttribute(leftSided, LEFT),
      this.getAttribute(rightSided, RIGHT),
      this.getAttribute(central, CENTRE),
    ].join("");
  }

  getAttribute(value: string, position: string): string {
    if (value === "00") return "";
    return position;
  }

  toString(): string {
    if (this.isGk) return this.position;
    return [this.position, this.side].toString();
  }

  toHumanReadable(): Record<string, string> {
    return {
      Position: this.position,
      Side: this.side,
    };
  }

  static toHex(position: string, side: string): HumanReadablePosition {
    const gk = PlayerPosition.getHex(position, GOAL);
    const def = PlayerPosition.getHex(position, DEF);
    const mid = PlayerPosition.getHex(position, MID);
    const att = PlayerPosition.getHex(position, ATT);
    const left = PlayerPosition.getHex(side, LEFT);
    const right = PlayerPosition.getHex(side, RIGHT);
    const centre = PlayerPosition.getHex(side, CENTRE);

    const isGk = gk === YES;
    const isOutfield = any((v) => v === YES, [def, mid, att]);
    // const hasSide = any((v) => v === YES, [left, right, centre]);

    const errors: string[] = [];
    // if (isGk && isOutfield) {
    //   errors.push("A goalkeeper cannot play in any other positions");
    // }

    // if (isGk && hasSide) {
    //   errors.push("A goalkeeper cannot have an assigned side");
    // }

    // if (isOutfield && !hasSide) {
    //   errors.push("An outfield player must be assigned at least one side");
    // }

    if (!isGk && !isOutfield) {
      errors.push("At least one position must be assigned. GK, D, M or A");
    }

    return {
      gk,
      def,
      mid,
      att,
      left,
      right,
      centre,
      errors,
    };
  }

  static getHex(value: string, required: string): string {
    if (value.toLowerCase().includes(required.toLowerCase())) return YES;
    return NO;
  }
}

const NO = "00";
const YES = "01";

const GOAL = "GK";
const DEF = "D";
const MID = "M";
const ATT = "A";

const LEFT = "L";
const RIGHT = "R";
const CENTRE = "C";
