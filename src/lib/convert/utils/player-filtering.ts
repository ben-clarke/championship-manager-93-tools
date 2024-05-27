import { Player } from "../../objects/player/player";
import { PlayerDetails } from "./generate-random";
import { getNormalisedClub } from "./normalisation";

export const applyPlayerFilter = (player: PlayerDetails): boolean => {
  if (player.Age === "31" && player["Current skill"] === "1") return false;
  return true;
};

export const getOriginalPlayer = (
  originalPlayers: Player[],
  firstName: string,
  surname: string,
  clubName: string,
): Player | null => {
  const filteredOriginalPlayer = originalPlayers.filter(
    (p) => p.firstName.toString() === firstName && p.surname.toString() === surname,
  );

  if (filteredOriginalPlayer.length === 0) return null;
  if (filteredOriginalPlayer.length === 1) return filteredOriginalPlayer[0];

  const filteredByClub = filteredOriginalPlayer.filter(
    (p) => p.club?.toString() === getNormalisedClub(clubName),
  );

  if (filteredByClub.length === 1) return filteredByClub[0];
  return null;
};
