import { find } from "ramda";
import { Nation } from "../pom/nation";

const NATIONS: Record<number, Buffer> = {};

export const getNation = (nations: Nation[], id: number): Buffer => {
  if (NATIONS[id]) return NATIONS[id];

  const nation = find((n) => n.ID === id, nations)?.Name as Buffer;
  NATIONS[id] = nation;
  return nation;
};
