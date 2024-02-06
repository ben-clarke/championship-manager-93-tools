import {
  DAT_HEADER,
  DAT_HELP,
  DAT_INSTRUCTIONS_DOWNLOADS,
  DAT_INSTRUCTIONS_INTRO,
  DAT_INSTRUCTIONS_PROGRAMS,
  DAT_INSTRUCTIONS_WARN,
  DAT_SPREADSHEET_1,
  DAT_SPREADSHEET_2,
  DAT_SPREADSHEET_3,
} from "../../../constants/strings";

const DataInstructions = (): JSX.Element => (
  <>
    <h1 className="text-xl mb-6 text-gray-200">{DAT_HEADER}</h1>
    <p className="mb-2">{DAT_INSTRUCTIONS_INTRO}</p>
    <p>
      You must upload <strong className="text-green-400">four</strong> files:
    </p>
    <ol className="list-decimal px-8 pt-2 text-left">
      <li className="pb-1">
        CMEXE.EXE - this contains all data mappings that you can use such as names
      </li>
      <li className="pb-1">FOREIGN.DAT - this is the foreign player list</li>
      <li className="pb-1">LEAGUE.DAT - this is the domestic player list</li>
      <li className="pb-2">TEAM.DAT - this is team information</li>
    </ol>
    <p className="mb-2">
      {DAT_SPREADSHEET_1}
      <strong className="text-gray-300">{DAT_SPREADSHEET_2}</strong>
      {DAT_SPREADSHEET_3}
    </p>
    <p className="mb-2">{DAT_INSTRUCTIONS_PROGRAMS}</p>
    <p className="mb-2">{DAT_INSTRUCTIONS_DOWNLOADS}</p>
    <p className="mb-2">{DAT_INSTRUCTIONS_WARN}</p>
    <p className="mb-2">{DAT_HELP}</p>
  </>
);

export default DataInstructions;
