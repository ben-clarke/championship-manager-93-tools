import {
  DAT_INSTRUCTIONS_DOWNLOADS,
  DAT_INSTRUCTIONS_PROGRAMS,
  EXE_CSV_CATEGORIES,
  EXE_CSV_CATEGORY,
  EXE_CSV_DISCLAIMER,
  EXE_CSV_INSTRUCTIONS_RESTRICTIONS,
  EXE_CSV_INSTRUCTIONS_WARN,
  EXE_CSV_SPREADSHEET_1,
  EXE_CSV_SPREADSHEET_2,
  EXE_CSV_SPREADSHEET_3,
  EXE_CVS_HEADER,
  EXE_CVS_INSTRUCTIONS_INTRO,
} from "../../../constants/strings";

const ExeCsvInstructions = (): JSX.Element => (
  <>
    <h1 className="text-xl mb-6 text-gray-200">{EXE_CVS_HEADER}</h1>
    <p className="mb-2">{EXE_CVS_INSTRUCTIONS_INTRO}</p>
    <p className="mb-2">
      {EXE_CSV_SPREADSHEET_1}
      <strong className="text-gray-300">{EXE_CSV_SPREADSHEET_2}</strong>
      {EXE_CSV_SPREADSHEET_3}
    </p>
    <p className="mb-2">{DAT_INSTRUCTIONS_PROGRAMS}</p>
    <p className="mb-4">{DAT_INSTRUCTIONS_DOWNLOADS}</p>
    <p className="mb-2">{EXE_CSV_INSTRUCTIONS_WARN}</p>
    <ul className="list-disc px-8 text-left mb-4">
      {EXE_CSV_INSTRUCTIONS_RESTRICTIONS.map((v) => (
        <li className="pb-1">{v}</li>
      ))}
    </ul>
    <p className="mb-2 text-xs">{EXE_CSV_DISCLAIMER}</p>
    <p className="mb-2">{EXE_CSV_CATEGORY}</p>
    <ul className="list-decimal px-8 text-left mb-4">
      {EXE_CSV_CATEGORIES.map((v) => (
        <li className="pb-1">{v}</li>
      ))}
    </ul>
  </>
);

export default ExeCsvInstructions;
