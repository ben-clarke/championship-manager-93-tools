import { Version } from "../../types/version";
import { Club } from "./club";

export class Club94 extends Club {
  static getVersion(): Version {
    return "94";
  }

  static getNumColumns(): number {
    return 23;
  }

  getDataItems(parsed: string[]): string[] {
    return parsed;
  }
}
