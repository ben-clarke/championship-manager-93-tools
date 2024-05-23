import { join } from "path";
import { Index } from "./pom";
import { Club } from "./pom/club";
import { Competition } from "./pom/competition";
import { Names } from "./pom/names";
import { Nation } from "./pom/nation";
import { NonPlayer } from "./pom/non-player";
import { Player } from "./pom/player";
import { Stadium } from "./pom/stadium";
import { Staff } from "./pom/staff";
import { StaffHistory } from "./pom/staff-history";
import { getText, readFile } from "./read-file";

export const load = async (): Promise<Loaded> => {
  const indexFilepath = join(__dirname, "./data/index.dat");

  const index = await readFile<Index>(indexFilepath, Index, 8);

  const staffDetails = index.find((x) => getText(x.name) === "staff.dat" && x.fileType === 6);
  const playerDetails = index.find((x) => getText(x.name) === "staff.dat" && x.fileType === 10);
  const nonPlayerDetails = index.find((x) => getText(x.name) === "staff.dat" && x.fileType === 9);

  if (!staffDetails) throw new Error("Staff details bad");
  if (!playerDetails) throw new Error("Player details bad");
  if (!nonPlayerDetails) throw new Error("Non player details bad");

  const competitions = await readFile<Competition>(
    join(__dirname, "./data/club_comp.dat"),
    Competition,
  );
  const clubs = await readFile<Club>(join(__dirname, "./data/club.dat"), Club);
  const nations = await readFile<Nation>(join(__dirname, "./data/nation.dat"), Nation);

  const staff = await readFile<Staff>(
    join(__dirname, "./data/staff.dat"),
    Staff,
    staffDetails.offset,
    staffDetails.count,
  );
  const staffHistory = await readFile<StaffHistory>(
    join(__dirname, "./data/staff_history.dat"),
    StaffHistory,
  );

  const players = await readFile<Player>(
    join(__dirname, "./data/staff.dat"),
    Player,
    playerDetails.offset,
    playerDetails.count,
  );

  const nonPlayers = await readFile<NonPlayer>(
    join(__dirname, "./data/staff.dat"),
    NonPlayer,
    nonPlayerDetails.offset,
    nonPlayerDetails.count,
  );

  const stadiums = await readFile<Stadium>(join(__dirname, "./data/stadium.dat"), Stadium);

  const firstNames = await readFile<Names>(join(__dirname, "./data/first_names.dat"), Names);
  const surnames = await readFile<Names>(join(__dirname, "./data/second_names.dat"), Names);
  const commonNames = await readFile<Names>(join(__dirname, "./data/common_names.dat"), Names);

  return {
    clubs,
    competitions,
    nations,
    staff,
    staffHistory,
    players,
    nonPlayers,
    firstNames,
    surnames,
    commonNames,
    stadiums,
  };
};

interface Loaded {
  clubs: Club[];
  competitions: Competition[];
  nations: Nation[];
  staff: Staff[];
  staffHistory: StaffHistory[];
  players: Player[];
  nonPlayers: NonPlayer[];
  firstNames: Names[];
  surnames: Names[];
  commonNames: Names[];
  stadiums: Stadium[];
}
