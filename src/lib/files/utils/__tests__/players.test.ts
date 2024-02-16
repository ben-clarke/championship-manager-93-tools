import { parsePlayers } from "../players";
import { INTER, PADOVA } from "./data/players-data";

describe("players", () => {
  test("isPlayerEnd - regular", () => {
    const players = parsePlayers(PADOVA, 33);
    expect(players[0]).toEqual([
      "00",
      "22",
      "00",
      "25",
      "00",
      "00",
      "00",
      "00",
      "01",
      "01",
      "00",
      "01",
      "00",
      "1c",
      "ff",
      "00",
      "9a",
      "0c",
      "09",
      "0d",
      "05",
      "0b",
      "0c",
      "08",
      "07",
      "ff",
      "ff",
      "ff",
      "0e",
      "ff",
      "0b",
      "0d",
      "55",
      "d7",
      "0e",
      "01",
      "56",
      "d7",
      "1d",
      "01",
      "57",
      "d7",
      "22",
      "02",
      "58",
      "00",
      "25",
      "02",
      "59",
      "00",
      "17",
      "01",
      "5a",
      "20",
      "24",
      "00",
      "5b",
      "00",
      "22",
      "04",
      "5c",
      "00",
      "21",
      "04",
      "5d",
      "00",
      "25",
      "02",
      "5e",
      "1e",
      "25",
      "06",
      "ff",
    ]);
  });

  test("isPlayerEnd - random in history", () => {
    const players = parsePlayers(INTER, 33);
    expect([players[0], players[1]]).toEqual([
      [
        "00",
        "49",
        "00",
        "8d",
        "00",
        "00",
        "00",
        "01",
        "00",
        "00",
        "01",
        "00",
        "01",
        "18",
        "ff",
        "00",
        "a5",
        "0c",
        "0d",
        "0c",
        "0b",
        "0c",
        "0b",
        "08",
        "06",
        "b2",
        "ff",
        "06",
        "0b",
        "ff",
        "08",
        "0e",
        "5a",
        "0d",
        "03",
        "00",
        "5b",
        "0d",
        "06",
        "00",
        "5c",
        "0d",
        "24",
        "01",
        "5d", // year
        "08", // club
        "ff", // games
        "00", // goals
        "5e",
        "05",
        "10",
        "00",
        "ff",
      ],
      [
        "00",
        "1a",
        "00",
        "8e",
        "00",
        "00",
        "00",
        "00",
        "00",
        "01",
        "01",
        "00",
        "00",
        "15",
        "ff",
        "00",
        "9e",
        "0e",
        "07",
        "0e",
        "0c",
        "0e",
        "0f",
        "0c",
        "06",
        "b4",
        "06",
        "07",
        "0b",
        "08",
        "0d",
        "0d",
        "5e",
        "11",
        "07",
        "00",
        "ff",
      ],
    ]);
  });
});
