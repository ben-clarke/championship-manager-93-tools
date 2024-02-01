import { splitEvery } from "ramda";

export const parsePlayers = (hexes: string, historyIndex: number): string[][] => {
  const parsed = splitEvery(2, hexes);

  const initial: string[][] = [];
  let player: string[] = [];

  const players = parsed.reduce((acc, hex, index) => {
    player.push(hex);

    if (isBeginning(index) || !isPlayerEnd(parsed, hex, player, index, historyIndex)) return acc;

    acc.push(player);
    player = [];
    return acc;
  }, initial);

  return players;
};

const isBeginning = (index: number): boolean => index === 0;

const isPlayerEnd = (
  parsed: string[],
  hex: string,
  player: string[],
  index: number,
  historyIndex: number,
): boolean =>
  // Line ending - however this is also used as a "randomise" character, so cannot look at this alone.
  hex.toLowerCase() === "ff" &&
  // We are into the player history (unfortunately this can be randomised (`ff`) as well)
  player.length >= historyIndex &&
  // The next hex is a name (always 00 or 01), if undefined it is the last player
  (!parsed[index + 1] || ["00", "01"].includes(parsed[index + 1]));
