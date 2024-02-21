import {
  CSV_EXE_HEADER,
  CSV_EXE_INSTRUCTIONS_INTRO,
  CSV_EXE_REPLACE,
  CSV_EXE_USAGE,
} from "../../../constants/strings";

const CsvExeInstructions = (): JSX.Element => (
  <>
    <h1 className="text-xl mb-6 text-gray-200">{CSV_EXE_HEADER}</h1>
    <p className="mb-2">{CSV_EXE_INSTRUCTIONS_INTRO}</p>
    <p className="mb-2">{CSV_EXE_REPLACE}</p>
    <p className="mb-2">{CSV_EXE_USAGE}</p>
  </>
);

export default CsvExeInstructions;
