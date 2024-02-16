import { splitEvery } from "ramda";

export const parsePlayers = (hexes: string, historyIndex: number): string[][] => {
  const parsed = splitEvery(2, hexes);

  const initial: string[][] = [];
  let player: string[] = [];

  const players = parsed.reduce((acc, hex, index) => {
    player.push(hex);

    if (isBeginning(index) || !isPlayerEnd(hex, player, historyIndex)) return acc;

    acc.push(player);
    player = [];

    return acc;
  }, initial);

  return players;
};

const isBeginning = (index: number): boolean => index === 0;

export const isPlayerEnd = (hex: string, player: string[], historyIndex: number): boolean => {
  const isInHistory = player.length >= historyIndex;
  const historyMod = isInHistory ? (player.length - historyIndex) % HISTORY_LENGTH : 0;

  // Line ending - however this is also used as a "randomise" character, so cannot look at this alone.
  const end =
    hex.toLowerCase() === "ff" &&
    // We are into the player history (unfortunately this can be randomised (`ff`) as well)
    isInHistory;

  // We cannot end until the history is complete.
  return end && historyMod === 0;
};

const HISTORY_LENGTH = 4;
