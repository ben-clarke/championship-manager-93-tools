import { PlayerDetails } from "./generate-random";

export const applyPlayerFilter = (player: PlayerDetails): boolean => {
  if (player.Age === "31" && player["Current skill"] === "1") return false;
  return true;
};
