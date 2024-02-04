import { useEffect, useState } from "react";
import { AlertVariant } from "../components/alert";
import { Banner } from "../components/banner";
import CsvUpload from "../components/uploaders/csv-upload";
import {
  CSV_HEADER,
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
  UPLOAD_EDIT_PARSED,
} from "../constants/strings";
import { createDataFiles } from "../utils/file-conversion";

const ConvertToData = (): JSX.Element => {
  const [csvMessage, setCsvMessage] = useState<Message>({ data: [], variant: "info" });

  const [foreignCsvContent, setForeignCsvContent] = useState("");
  const [leagueCsvContent, setLeagueCsvContent] = useState("");
  const [teamCsvContent, setTeamCsvContent] = useState("");

  const [exeContent, setExeContent] = useState("");

  const setFileValues = (name: string, value: string, fileType: string): void => {
    if (fileType === "FOREIGN.DAT.CSV") setForeignCsvContent(value);
    if (fileType === "LEAGUE.DAT.CSV") setLeagueCsvContent(value);
    if (fileType === "TEAM.DAT.CSV") setTeamCsvContent(value);
    if (fileType === "CMEXE.EXE") setExeContent(value);
  };

  const setCsvAlertMessage = (data: string[], variant: AlertVariant): void => {
    setCsvMessage({ data, variant });
  };

  useEffect(() => {
    if (
      foreignCsvContent.length > 0 &&
      leagueCsvContent.length > 0 &&
      teamCsvContent.length > 0 &&
      exeContent.length > 0
    ) {
      createDataFiles(foreignCsvContent, leagueCsvContent, teamCsvContent, exeContent);
      setForeignCsvContent("");
      setLeagueCsvContent("");
      setTeamCsvContent("");
      setExeContent("");
      setCsvMessage({
        data: [UPLOAD_EDIT_PARSED],
        variant: "success",
      });
    }
  }, [foreignCsvContent, leagueCsvContent, teamCsvContent, exeContent]);

  return (
    <div className="text-center bg-dark-gray text-white flex flex-wrap items-center justify-center">
      <div className="flex flex-wrap items-center justify-center w-full">
        <div className="w-1/2 mt-8 px-8">
          {(csvMessage?.data?.length || 0) > 0 && (
            <Banner
              className="mb-2"
              testid="edit-game-message"
              info={csvMessage?.data}
              variant={csvMessage?.variant}
            />
          )}
          <CsvUpload
            // value={fileName}
            setFiles={setFileValues}
            setMessage={setCsvAlertMessage}
          />
        </div>
        <div className="w-1/2 text-sm pl-4 pr-8 text-justify text-gray-400 font-medium my-8">
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
            <strong className="text-red-400">{CSV_INSTRUCTIONS_WARN_2}</strong>
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
        </div>
      </div>
    </div>
  );
};

interface Message {
  data: string[];
  variant: AlertVariant;
}

export default ConvertToData;
