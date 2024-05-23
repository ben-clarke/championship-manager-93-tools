import { any } from "ramda";
import { Player } from "../../../convert/pom/player";
import { HumanReadablePosition } from "../../../types/validation";
import { weightedRandom } from "../../../utils/weighted";

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

  toHumanReadable(): Position {
    return {
      Position: this.position,
      Side: this.side,
    };
  }

  static fromNewData(playerDetails: Player): Position {
    const getPositionAttribute = (pd: Player, positions: string[], position: string): string => {
      // @ts-ignore
      if (any((v) => pd[v] > 10, positions)) return position;
      return "";
    };
    const getSideAttribute = (pd: Player, side: string, position: string): string => {
      // @ts-ignore
      if (pd[side] > 10) return position;
      return "";
    };

    const goalkeeper = ["Goalkeeper"];
    const defender = ["Sweeper", "Defender", "WingBack"];
    const midfielder = ["DefensiveMidfielder", "Midfielder", "AttackingMidfielder", "WingBack"];
    const attacker = ["Attacker", "AttackingMidfielder"];

    return {
      Position: [
        getPositionAttribute(playerDetails, goalkeeper, GOAL),
        getPositionAttribute(playerDetails, defender, DEF),
        getPositionAttribute(playerDetails, midfielder, MID),
        getPositionAttribute(playerDetails, attacker, ATT),
      ].join(""),
      Side: [
        getSideAttribute(playerDetails, "LeftSide", LEFT),
        getSideAttribute(playerDetails, "RightSide", RIGHT),
        getSideAttribute(playerDetails, "Central", CENTRE),
      ].join(""),
    };
  }

  static randomise(position: string): Position {
    if (position === GOAL) return { Position: GOAL, Side: "" };
    if (position === ATT) return { Position: ATT, Side: "C" };

    const side = weightedRandom<string>([
      { item: LEFT, weight: 8 },
      { item: RIGHT, weight: 8 },
      { item: CENTRE, weight: 8 },
      { item: [LEFT, CENTRE].join(""), weight: 4 },
      { item: [RIGHT, CENTRE].join(""), weight: 4 },
      { item: [LEFT, RIGHT].join(""), weight: 2 },
      { item: [LEFT, RIGHT, CENTRE].join(""), weight: 1 },
    ]);

    return {
      Position: position,
      Side: position === GOAL ? "" : side,
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

export const GOAL = "GK";
export const DEF = "D";
export const MID = "M";
export const ATT = "A";

const LEFT = "L";
const RIGHT = "R";
const CENTRE = "C";

interface Position {
  Position: string;
  Side: string;
}
