import {
  CSV_HEADER,
  CSV_HELP,
  CSV_INSTRUCTIONS_1,
  CSV_INSTRUCTIONS_DISCLAIMER,
  CSV_INSTRUCTIONS_GENERATE_1,
  CSV_INSTRUCTIONS_GENERATE_2,
  CSV_INSTRUCTIONS_GENERATE_3,
  CSV_INSTRUCTIONS_LOCATION,
  CSV_INSTRUCTIONS_WARN_1,
  CSV_INSTRUCTIONS_WARN_2,
  CSV_INSTRUCTIONS_WARN_3,
  CSV_NOTE_1,
  CSV_NOTE_2,
  CSV_NOTE_EXAMPLE,
  CSV_NOTE_HEADER,
} from "../../../constants/strings";

const CsvInstructions = (): JSX.Element => (
  <>
    <h1 className="text-xl mb-6 text-gray-200">{CSV_HEADER}</h1>
    <p className="mb-2">{CSV_INSTRUCTIONS_1}</p>
    <p>
      You must upload <strong className="text-green-400">four</strong> files:
    </p>
    <ol className="list-decimal px-8 pt-2 text-left">
      <li className="pb-1">
        CMEXE.EXE - this contains all data mappings that you can use such as names
      </li>
      <li className="pb-1">FOREIGN.DAT.csv</li>
      <li className="pb-1">LEAGUE.DAT.csv</li>
      <li className="pb-2">TEAM.DAT.csv</li>
    </ol>
    <p className="mb-2">
      {CSV_INSTRUCTIONS_WARN_1}
      <strong className="text-yellow-400">{CSV_INSTRUCTIONS_WARN_2}</strong>
      {CSV_INSTRUCTIONS_WARN_3}
    </p>
    <p className="mb-2">
      {CSV_INSTRUCTIONS_GENERATE_1}
      <strong className="text-gray-300">{CSV_INSTRUCTIONS_GENERATE_2}</strong>
      {CSV_INSTRUCTIONS_GENERATE_3}
    </p>
    <p className="mb-2">{CSV_INSTRUCTIONS_LOCATION}</p>
    <p className="mb-2">
      <strong className="text-yellow-500">{CSV_NOTE_HEADER}</strong>
      {CSV_NOTE_1}
      <u>{CSV_NOTE_EXAMPLE}</u>
      {CSV_NOTE_2}
    </p>
    <p className="mb-2 text-red-400">{CSV_INSTRUCTIONS_DISCLAIMER}</p>
    <p className="mb-2">{CSV_HELP}</p>
  </>
);

export default CsvInstructions;
