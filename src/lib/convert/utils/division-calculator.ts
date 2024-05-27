import { randomBytes } from "crypto";
import { splitEvery } from "ramda";
import CMExeParser from "../../files/cm-exe-parser";
import { getSortedList } from "../../files/utils/sorted";

export const getMatchedDivision = (
  data: CMExeParser,
  divisions: Record<string, number>,
): number => {
  const clubs = getSortedList(data.get("club"));
  const grounds = getSortedList(data.get("ground"));

  const exeDetails = splitEvery(20, groupItemsByIndex(clubs, grounds));

  const incorrectDivisions = removeCorrectItems(exeDetails, divisions);
  // eslint-disable-next-line no-console
  console.log(incorrectDivisions);
  const corrected = swapItemsToCorrectDivision(incorrectDivisions);
  // eslint-disable-next-line no-console
  console.log(corrected);

  return 1;
};

const groupItemsByIndex = (one: string[], two: string[]): TeamTuple => {
  const minLength = Math.min(one.length, two.length);

  return Array.from({ length: minLength }).map((_, index) => [one[index], two[index]]);
};

const removeCorrectItems = (
  teams: [string, string][][],
  divisions: Record<string, number>,
): UpdateRequirements[][] =>
  teams.map((list, index) => {
    const incorrect = list.filter(([team]) => divisions[team] !== index + 1);
    return incorrect
      .sort((a, b) => a[0].length - b[0].length)
      .map(([team, ground]) => ({
        team: `${team}`,
        ground: `${ground}`,
        division: divisions[team],
      }));
  });

const swapItemsToCorrectDivision = (lists: UpdateRequirements[][]): UpdateRequirements[][] => {
  const divisions = [...lists];

  const swaps = [];

  for (let i = 0; i < lists.length; i += 1) {
    for (let j = 0; j < lists[i].length; j += 1) {
      const currentItem = lists[i][j];
      const correctDivision = currentItem.division - 1; // zero-indexed list

      if (i !== correctDivision) {
        // Find a swap candidate in the correct division
        const swapIndex = divisions[correctDivision].findIndex((item) => item.division - 1 === i);

        if (swapIndex !== -1) {
          // Swap the items
          const temp = divisions[correctDivision][swapIndex];

          swaps.push(createSwaps(temp, divisions[i][j]));

          divisions[correctDivision][swapIndex] = divisions[i][j];
          divisions[i][j] = temp;
        }
      }
    }
  }

  // console.log(JSON.stringify(swaps));

  SWAPS[88].forEach((swap) => {
    const first = swap[1];
    const second = swap[2];

    if (
      first[0].change.team !== second[0].team ||
      first[0].team.length !== second[0].change.team.length
    ) {
      // eslint-disable-next-line no-console
      console.log(first[0].change.team, second[0].team);
      // eslint-disable-next-line no-console
      console.log(first[0].team, second[0].change.team);
    }

    if (
      first[1].change.team !== second[1].team ||
      first[1].team.length !== second[1].change.team.length
    ) {
      // eslint-disable-next-line no-console
      console.log(first[0].change.team, second[0].team);
      // eslint-disable-next-line no-console
      console.log(first[0].team, second[0].change.team);
    }

    if (
      first[0].change.ground !== second[0].ground ||
      first[0].ground.length !== second[0].change.ground.length
    ) {
      // eslint-disable-next-line no-console
      console.log(first[0].change.ground, second[0].ground);
      // eslint-disable-next-line no-console
      console.log(first[0].ground, second[0].change.ground);
    }

    if (
      first[1].change.ground !== second[1].ground ||
      first[1].ground.length !== second[1].change.ground.length
    ) {
      // eslint-disable-next-line no-console
      console.log(first[0].change.ground, second[0].ground);
      // eslint-disable-next-line no-console
      console.log(first[0].ground, second[0].change.ground);
    }
  });

  return divisions;
};

const createSwaps = (
  one: UpdateRequirements,
  two: UpdateRequirements,
): { 1: UpdateRequirementsWithChange[]; 2: UpdateRequirementsWithChange[] } => {
  const team1Random = createRandomString(one.team.length);
  const ground1Random = createRandomString(one.ground.length);
  const team2Random = createRandomString(two.team.length);
  const ground2Random = createRandomString(two.ground.length);

  return {
    1: [
      { ...one, change: { team: team1Random, ground: ground1Random } },
      { ...two, change: { team: team2Random, ground: ground2Random } },
    ],
    2: [
      { team: team1Random, ground: ground1Random, division: 99, change: adjustLength(two, one) },
      { team: team2Random, ground: ground2Random, division: 99, change: adjustLength(one, two) },
    ],
  };
};

const adjustLength = (one: UpdateRequirements, two: UpdateRequirements): UpdateRequirements => {
  const { team: team1, ground: ground1 } = one;
  const { team: team2, ground: ground2 } = two;

  return {
    team:
      team1.length > team2.length
        ? team1.substring(0, team2.length)
        : team1.padEnd(team2.length, " "),
    ground:
      ground1.length > ground2.length
        ? ground1.substring(0, ground2.length)
        : ground1.padEnd(ground2.length, " "),
    division: one.division,
  };
};

export const getNewTeamName = (name: string, year: number): string => {
  const swaps = SWAPS[year];

  const match1 = swaps.find((swap) => swap[1][0].team === name);
  if (match1) return match1[2][1].change.team;

  const match2 = swaps.find((swap) => swap[1][1].team === name);
  if (match2) return match2[2][0].change.team;

  return name;
};

export const getDivisionSwaps = (
  year: number,
): {
  firstSwap: { club: [string, string][]; ground: [string, string][] };
  secondSwap: { club: [string, string][]; ground: [string, string][] };
} => {
  const swaps = SWAPS[year];

  const club1 = swaps.reduce(
    (acc, swap) => {
      acc.push(
        [swap[1][0].change.team, swap[1][0].team],
        [swap[1][1].change.team, swap[1][1].team],
      );
      return acc;
    },
    [] as [string, string][],
  );

  const ground1 = swaps.reduce(
    (acc, swap) => {
      acc.push(
        [swap[1][0].change.ground, swap[1][0].ground],
        [swap[1][1].change.ground, swap[1][1].ground],
      );
      return acc;
    },
    [] as [string, string][],
  );
  const club2 = swaps.reduce(
    (acc, swap) => {
      acc.push(
        [swap[2][0].change.team, swap[2][0].team],
        [swap[2][1].change.team, swap[2][1].team],
      );
      return acc;
    },
    [] as [string, string][],
  );
  const ground2 = swaps.reduce(
    (acc, swap) => {
      acc.push(
        [swap[2][0].change.ground, swap[2][0].ground],
        [swap[2][1].change.ground, swap[2][1].ground],
      );
      return acc;
    },
    [] as [string, string][],
  );

  return {
    firstSwap: { club: club1, ground: ground1 },
    secondSwap: { club: club2, ground: ground2 },
  };
};

const SWAPS: Record<
  number,
  { 1: UpdateRequirementsWithChange[]; 2: UpdateRequirementsWithChange[] }[]
> = {
  82: [
    {
      1: [
        {
          team: "Wolves",
          ground: "Molineux",
          division: 1,
          change: { team: "8bdc8d", ground: "389fedf4" },
        },
        {
          team: "Q.P.R.",
          ground: "Loftus Road",
          division: 2,
          change: { team: "560854", ground: "3fa023b1c20" },
        },
      ],
      2: [
        {
          team: "8bdc8d",
          ground: "389fedf4",
          division: 99,
          change: { team: "Q.P.R.", ground: "Loftus R", division: 2 },
        },
        {
          team: "560854",
          ground: "3fa023b1c20",
          division: 99,
          change: { team: "Wolves", ground: "Molineux   ", division: 1 },
        },
      ],
    },
    {
      1: [
        {
          team: "Notts C",
          ground: "Meadow Lane",
          division: 1,
          change: { team: "bd9513e", ground: "3b48b4f670e" },
        },
        {
          team: "Chelsea",
          ground: "Stamford Bridge",
          division: 2,
          change: { team: "e4b67fa", ground: "4fab628e81e1171" },
        },
      ],
      2: [
        {
          team: "bd9513e",
          ground: "3b48b4f670e",
          division: 99,
          change: { team: "Chelsea", ground: "Stamford Br", division: 2 },
        },
        {
          team: "e4b67fa",
          ground: "4fab628e81e1171",
          division: 99,
          change: { team: "Notts C", ground: "Meadow Lane    ", division: 1 },
        },
      ],
    },
    {
      1: [
        {
          team: "N.Forest",
          ground: "City Ground",
          division: 1,
          change: { team: "6502fac4", ground: "ede7b6d820e" },
        },
        {
          team: "Sheff Wed",
          ground: "Hillsborough",
          division: 2,
          change: { team: "92363d245", ground: "5a2b1b0b33ed" },
        },
      ],
      2: [
        {
          team: "6502fac4",
          ground: "ede7b6d820e",
          division: 99,
          change: { team: "Sheff W.", ground: "Hillsboro", division: 2 },
        },
        {
          team: "92363d245",
          ground: "5a2b1b0b33ed",
          division: 99,
          change: { team: "N.Forest ", ground: "City Ground ", division: 1 },
        },
      ],
    },
    {
      1: [
        {
          team: "Birmingham",
          ground: "St Andrews",
          division: 1,
          change: { team: "6980ef6325", ground: "fc13275775" },
        },
        {
          team: "Blackburn",
          ground: "Ewood Park",
          division: 2,
          change: { team: "305628e4a", ground: "ebc9310c62" },
        },
      ],
      2: [
        {
          team: "6980ef6325",
          ground: "fc13275775",
          division: 99,
          change: { team: "Blackburn ", ground: "Ewood Park", division: 2 },
        },
        {
          team: "305628e4a",
          ground: "ebc9310c62",
          division: 99,
          change: { team: "Birmingha", ground: "St Andrews", division: 1 },
        },
      ],
    },
    {
      1: [
        {
          team: "Sunderland",
          ground: "Roker Park",
          division: 1,
          change: { team: "638d42c89a", ground: "48c5d48d45" },
        },
        {
          team: "Wimbledon",
          ground: "Selhurst Park",
          division: 2,
          change: { team: "80ca1e4d4", ground: "3b75b6fbb37c7" },
        },
      ],
      2: [
        {
          team: "638d42c89a",
          ground: "48c5d48d45",
          division: 99,
          change: { team: "Wimbledon ", ground: "Selhurst P", division: 2 },
        },
        {
          team: "80ca1e4d4",
          ground: "3b75b6fbb37c7",
          division: 99,
          change: { team: "Sunderlnd", ground: "Roker Park   ", division: 1 },
        },
      ],
    },
    {
      1: [
        {
          team: "Swansea",
          ground: "Vetch Field",
          division: 1,
          change: { team: "d628ba6", ground: "2c7028acc20" },
        },
        {
          team: "Sheff Utd",
          ground: "Bramall Lane",
          division: 3,
          change: { team: "264e221e1", ground: "f1c127329437" },
        },
      ],
      2: [
        {
          team: "d628ba6",
          ground: "2c7028acc20",
          division: 99,
          change: { team: "Sheff U", ground: "Bramall Ln.", division: 3 },
        },
        {
          team: "264e221e1",
          ground: "f1c127329437",
          division: 99,
          change: { team: "Swansea  ", ground: "Vetch Field ", division: 1 },
        },
      ],
    },
    {
      1: [
        {
          team: "Luton",
          ground: "Kenilworth Road",
          division: 2,
          change: { team: "5d0b9", ground: "4ab500cc65c2518" },
        },
        {
          team: "Stoke",
          ground: "Victoria Ground",
          division: 3,
          change: { team: "f4202", ground: "54a0dde55958dad" },
        },
      ],
      2: [
        {
          team: "5d0b9",
          ground: "4ab500cc65c2518",
          division: 99,
          change: { team: "Stoke", ground: "Victoria Ground", division: 3 },
        },
        {
          team: "f4202",
          ground: "54a0dde55958dad",
          division: 99,
          change: { team: "Luton", ground: "Kenilworth Road", division: 2 },
        },
      ],
    },
    {
      1: [
        {
          team: "Grimsby",
          ground: "Blundell Park",
          division: 2,
          change: { team: "e92b277", ground: "b7c350cf4da27" },
        },
        {
          team: "Swindon",
          ground: "County Ground",
          division: 3,
          change: { team: "4bbe599", ground: "a1f59caaf10f1" },
        },
      ],
      2: [
        {
          team: "e92b277",
          ground: "b7c350cf4da27",
          division: 99,
          change: { team: "Swindon", ground: "County Ground", division: 3 },
        },
        {
          team: "4bbe599",
          ground: "a1f59caaf10f1",
          division: 99,
          change: { team: "Grimsby", ground: "Blundell Park", division: 2 },
        },
      ],
    },
    {
      1: [
        {
          team: "Cardiff",
          ground: "Ninian Park",
          division: 2,
          change: { team: "26c7f36", ground: "78c2a278ade" },
        },
        {
          team: "Millwall",
          ground: "The Den",
          division: 3,
          change: { team: "b690d666", ground: "544e754" },
        },
      ],
      2: [
        {
          team: "26c7f36",
          ground: "78c2a278ade",
          division: 99,
          change: { team: "Milwall", ground: "The Den    ", division: 3 },
        },
        {
          team: "b690d666",
          ground: "544e754",
          division: 99,
          change: { team: "Cardiff ", ground: "Ninian ", division: 2 },
        },
      ],
    },
    {
      1: [
        {
          team: "Watford",
          ground: "Vicarage Road",
          division: 2,
          change: { team: "ea5140f", ground: "0f49e2f8235ac" },
        },
        {
          team: "Tranmere",
          ground: "Prenton Park",
          division: 3,
          change: { team: "efd634d7", ground: "eb43956c3ad6" },
        },
      ],
      2: [
        {
          team: "ea5140f",
          ground: "0f49e2f8235ac",
          division: 99,
          change: { team: "Tranmre", ground: "Prenton Park ", division: 3 },
        },
        {
          team: "efd634d7",
          ground: "eb43956c3ad6",
          division: 99,
          change: { team: "Watford ", ground: "Vicarage Rd.", division: 2 },
        },
      ],
    },
    {
      1: [
        {
          team: "Cambridge",
          ground: "Abbey Stadium",
          division: 2,
          change: { team: "0d0ec9eed", ground: "dbddfeb71161b" },
        },
        {
          team: "Portsmouth",
          ground: "Fratton Park",
          division: 4,
          change: { team: "8f96da2949", ground: "9fba0eb71109" },
        },
      ],
      2: [
        {
          team: "0d0ec9eed",
          ground: "dbddfeb71161b",
          division: 99,
          change: { team: "Portmouth", ground: "Fratton Park ", division: 4 },
        },
        {
          team: "8f96da2949",
          ground: "9fba0eb71109",
          division: 99,
          change: { team: "Cambridge ", ground: "Abbey Stdium", division: 2 },
        },
      ],
    },
    {
      1: [
        {
          team: "Rotherham",
          ground: "Millmoor",
          division: 2,
          change: { team: "cacf9bcea", ground: "120368f9" },
        },
        {
          team: "Middlesboro",
          ground: "Ayresome Park",
          division: 3,
          change: { team: "99a8a678606", ground: "03519ef9de9ec" },
        },
      ],
      2: [
        {
          team: "cacf9bcea",
          ground: "120368f9",
          division: 99,
          change: { team: "Middlboro", ground: "Ayresome", division: 3 },
        },
        {
          team: "99a8a678606",
          ground: "03519ef9de9ec",
          division: 99,
          change: { team: "Rotherham  ", ground: "Millmoor     ", division: 2 },
        },
      ],
    },
    {
      1: [
        {
          team: "Fulham",
          ground: "Craven Cottage",
          division: 3,
          change: { team: "113521", ground: "7c89351794ab6c" },
        },
        {
          team: "Oxford",
          ground: "Manor Ground",
          division: 4,
          change: { team: "e2e412", ground: "df0a7bc98693" },
        },
      ],
      2: [
        {
          team: "113521",
          ground: "7c89351794ab6c",
          division: 99,
          change: { team: "Oxford", ground: "Manor Ground  ", division: 4 },
        },
        {
          team: "e2e412",
          ground: "df0a7bc98693",
          division: 99,
          change: { team: "Fulham", ground: "Craven Cttge", division: 3 },
        },
      ],
    },
    {
      1: [
        {
          team: "Colchester",
          ground: "Layer Road",
          division: 3,
          change: { team: "4fc7696977", ground: "339609c7f9" },
        },
        {
          team: "Stockport",
          ground: "Edgeley Park",
          division: 4,
          change: { team: "7c6845678", ground: "f12cead36106" },
        },
      ],
      2: [
        {
          team: "4fc7696977",
          ground: "339609c7f9",
          division: 99,
          change: { team: "Stockport ", ground: "Edgeley Pk", division: 4 },
        },
        {
          team: "7c6845678",
          ground: "f12cead36106",
          division: 99,
          change: { team: "Colchestr", ground: "Layer Road  ", division: 3 },
        },
      ],
    },
  ],
  88: [
    {
      1: [
        {
          team: "Derby",
          ground: "Baseball Ground",
          division: 1,
          change: { team: "X93a6", ground: "X89910d9f6d3d57" },
        },
        {
          team: "Leeds",
          ground: "Elland Road",
          division: 2,
          change: { team: "X7617", ground: "X8f51df91a0" },
        },
      ],
      2: [
        {
          team: "X93a6",
          ground: "X89910d9f6d3d57",
          division: 99,
          change: { team: "Leeds", ground: "Elland Road    ", division: 2 },
        },
        {
          team: "X7617",
          ground: "X8f51df91a0",
          division: 99,
          change: { team: "Derby", ground: "Baseball Gr", division: 1 },
        },
      ],
    },
    {
      1: [
        {
          team: "N.Forest",
          ground: "City Ground",
          division: 1,
          change: { team: "X2f85279", ground: "Xd33900098d" },
        },
        {
          team: "Sheff Utd",
          ground: "Bramall Lane",
          division: 2,
          change: { team: "Xb8d62c99", ground: "X002ff32ee73" },
        },
      ],
      2: [
        {
          team: "X2f85279",
          ground: "Xd33900098d",
          division: 99,
          change: { team: "Sheff U.", ground: "Bramall Ln.", division: 2 },
        },
        {
          team: "Xb8d62c99",
          ground: "X002ff32ee73",
          division: 99,
          change: { team: "N.Forest ", ground: "City Ground ", division: 1 },
        },
      ],
    },
    {
      1: [
        {
          team: "Charlton",
          ground: "The Valley",
          division: 1,
          change: { team: "X9747e1c", ground: "X54afc5493" },
        },
        {
          team: "Man City",
          ground: "Maine Road",
          division: 2,
          change: { team: "X54291e7", ground: "X992d896ee" },
        },
      ],
      2: [
        {
          team: "X9747e1c",
          ground: "X54afc5493",
          division: 99,
          change: { team: "Man City", ground: "Maine Road", division: 2 },
        },
        {
          team: "X54291e7",
          ground: "X992d896ee",
          division: 99,
          change: { team: "Charlton", ground: "The Valley", division: 1 },
        },
      ],
    },
    {
      1: [
        {
          team: "Portsmouth",
          ground: "Fratton Park",
          division: 1,
          change: { team: "Xf74de107e", ground: "X92f57f7894c" },
        },
        {
          team: "Blackburn",
          ground: "Ewood Park",
          division: 2,
          change: { team: "Xa26484cd", ground: "X76d6dbc16" },
        },
      ],
      2: [
        {
          team: "Xf74de107e",
          ground: "X92f57f7894c",
          division: 99,
          change: { team: "Blackburn ", ground: "Ewood Park  ", division: 2 },
        },
        {
          team: "Xa26484cd",
          ground: "X76d6dbc16",
          division: 99,
          change: { team: "Portmouth", ground: "Fratton Pk", division: 1 },
        },
      ],
    },
    {
      1: [
        {
          team: "Oxford",
          ground: "Manor Ground",
          division: 2,
          change: { team: "Xbb35c", ground: "X39c72324b99" },
        },
        {
          team: "Notts C",
          ground: "Meadow Lane",
          division: 3,
          change: { team: "X27e3a3", ground: "X6e81a02699" },
        },
      ],
      2: [
        {
          team: "Xbb35c",
          ground: "X39c72324b99",
          division: 99,
          change: { team: "NottsC", ground: "Meadow Lane ", division: 3 },
        },
        {
          team: "X27e3a3",
          ground: "X6e81a02699",
          division: 99,
          change: { team: "Oxford ", ground: "Manor Grnd.", division: 2 },
        },
      ],
    },
    {
      1: [
        {
          team: "Bradford",
          ground: "Valley Parade",
          division: 2,
          change: { team: "Xab2e399", ground: "X69b38cb12345" },
        },
        {
          team: "Sunderland",
          ground: "Roker Park",
          division: 3,
          change: { team: "X313ed88ce", ground: "Xdf2155615" },
        },
      ],
      2: [
        {
          team: "Xab2e399",
          ground: "X69b38cb12345",
          division: 99,
          change: { team: "Sunderld", ground: "Roker Park   ", division: 3 },
        },
        {
          team: "X313ed88ce",
          ground: "Xdf2155615",
          division: 99,
          change: { team: "Bradford  ", ground: "Valley Prd", division: 2 },
        },
      ],
    },
    {
      1: [
        {
          team: "Fulham",
          ground: "Craven Cottage",
          division: 3,
          change: { team: "X0044f", ground: "X54dcfcdb1543c" },
        },
        {
          team: "Cardiff",
          ground: "Ninian Park",
          division: 4,
          change: { team: "X5be518", ground: "Xd152d4ac01" },
        },
      ],
      2: [
        {
          team: "X0044f",
          ground: "X54dcfcdb1543c",
          division: 99,
          change: { team: "Cardif", ground: "Ninian Park   ", division: 4 },
        },
        {
          team: "X5be518",
          ground: "Xd152d4ac01",
          division: 99,
          change: { team: "Fulham ", ground: "Craven Ctge", division: 3 },
        },
      ],
    },
    {
      1: [
        {
          team: "Preston",
          ground: "Deepdale",
          division: 3,
          change: { team: "Xe288af", ground: "X2467c3c" },
        },
        {
          team: "Burnley",
          ground: "Turf Moor",
          division: 4,
          change: { team: "Xb09d29", ground: "Xb00f1d23" },
        },
      ],
      2: [
        {
          team: "Xe288af",
          ground: "X2467c3c",
          division: 99,
          change: { team: "Burnley", ground: "Turf Mr.", division: 4 },
        },
        {
          team: "Xb09d29",
          ground: "Xb00f1d23",
          division: 99,
          change: { team: "Preston", ground: "Deepdale ", division: 3 },
        },
      ],
    },
    {
      1: [
        {
          team: "Chester",
          ground: "The Deva Stadium",
          division: 3,
          change: { team: "Xdf4e64", ground: "Xc8b78439c9e58e0" },
        },
        {
          team: "Swansea",
          ground: "Vetch Field",
          division: 4,
          change: { team: "X494425", ground: "X196e7a61a0" },
        },
      ],
      2: [
        {
          team: "Xdf4e64",
          ground: "Xc8b78439c9e58e0",
          division: 99,
          change: { team: "Swansea", ground: "Vetch Field     ", division: 4 },
        },
        {
          team: "X494425",
          ground: "X196e7a61a0",
          division: 99,
          change: { team: "Chester", ground: "Deva Stad. ", division: 3 },
        },
      ],
    },
    {
      1: [
        {
          team: "Huddersfld",
          ground: "Leeds Road",
          division: 3,
          change: { team: "Xe1ee2ad12", ground: "X84dcee04c" },
        },
        {
          team: "Peterboro",
          ground: "London Road",
          division: 4,
          change: { team: "X6b82a375", ground: "Xadc92a1fa0" },
        },
      ],
      2: [
        {
          team: "Xe1ee2ad12",
          ground: "X84dcee04c",
          division: 99,
          change: { team: "Peterboro ", ground: "London Rd.", division: 4 },
        },
        {
          team: "X6b82a375",
          ground: "Xadc92a1fa0",
          division: 99,
          change: { team: "Huddersfd", ground: "Leeds Road ", division: 3 },
        },
      ],
    },
    {
      1: [
        {
          team: "Doncaster",
          ground: "Belle Vue",
          division: 3,
          change: { team: "X31aefa54", ground: "Xdc8ca627" },
        },
        {
          team: "Stockport",
          ground: "Edgeley Park",
          division: 4,
          change: { team: "X0328e35a", ground: "Xb93e452d73a" },
        },
      ],
      2: [
        {
          team: "X31aefa54",
          ground: "Xdc8ca627",
          division: 99,
          change: { team: "Stockport", ground: "Edgeley P", division: 4 },
        },
        {
          team: "X0328e35a",
          ground: "Xb93e452d73a",
          division: 99,
          change: { team: "Doncaster", ground: "Belle Vue   ", division: 3 },
        },
      ],
    },
  ],
  90: [],
  98: [],
};

const createRandomString = (length: number): string =>
  `${randomBytes(length).toString("hex").substring(0, length)}`;

type TeamTuple = [string, string][];

interface UpdateRequirements {
  team: string;
  ground: string;
  division: number;
}

interface UpdateRequirementsWithChange extends UpdateRequirements {
  change: { team: string; ground: string; division?: number };
}
