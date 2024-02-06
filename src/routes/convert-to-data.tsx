import { useEffect, useState } from "react";
import CsvInstructions from "src/components/uploaders/csv/csv-instructions";
import { AlertVariant } from "../components/alert";
import SubmittingOverlay from "../components/submitting-overlay";
import CsvUpload from "../components/uploaders/csv-upload";
import UploadComplete from "../components/uploaders/upload-complete";
import { CSV_FOREIGN, CSV_LEAGUE, CSV_TEAM, EXE_CM } from "../constants/files";
import { UPLOAD_EDIT_PARSED } from "../constants/strings";
import { Message } from "../types/web";
import { createDataFiles } from "../utils/file-conversion";

const ConvertToData = (): JSX.Element => {
  const [message, setMessage] = useState<Message>({ data: [], variant: "info" });
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const [foreignCsvContent, setForeignCsvContent] = useState("");
  const [leagueCsvContent, setLeagueCsvContent] = useState("");
  const [teamCsvContent, setTeamCsvContent] = useState("");

  const [exeContent, setExeContent] = useState("");

  const setFileValues = (name: string, value: string, fileType: string): void => {
    if (fileType === CSV_FOREIGN) setForeignCsvContent(value);
    if (fileType === CSV_LEAGUE) setLeagueCsvContent(value);
    if (fileType === CSV_TEAM) setTeamCsvContent(value);
    if (fileType === EXE_CM) setExeContent(value);
    setShowOverlay(true);
  };

  const setCsvAlertMessage = (data: string[], variant: AlertVariant): void => {
    setMessage({ data, variant });
  };

  useEffect(() => {
    if (
      foreignCsvContent.length > 0 &&
      leagueCsvContent.length > 0 &&
      teamCsvContent.length > 0 &&
      exeContent.length > 0
    ) {
      const errors = createDataFiles(
        foreignCsvContent,
        leagueCsvContent,
        teamCsvContent,
        exeContent,
      );
      setForeignCsvContent("");
      setLeagueCsvContent("");
      setTeamCsvContent("");
      setExeContent("");
      setShowOverlay(false);

      if (errors.length) setMessage({ data: errors, variant: "error" });
      else setMessage({ data: [UPLOAD_EDIT_PARSED], variant: "success" });
    }
  }, [foreignCsvContent, leagueCsvContent, teamCsvContent, exeContent]);

  useEffect(() => {
    // This is so that react triggers a re-render.
    // Seems pointless, but not enough time to investigate as now works.
  }, [showOverlay]);

  return (
    <>
      <SubmittingOverlay showOverlay={showOverlay} />
      <div className="text-center bg-dark-gray text-white flex flex-wrap items-center justify-center">
        <div className="flex flex-wrap items-center justify-center w-full">
          <div className="w-1/2 mt-8 px-8">
            {message && message.data.length === 0 ? (
              <CsvUpload setFiles={setFileValues} setMessage={setCsvAlertMessage} />
            ) : (
              <UploadComplete message={message} />
            )}
          </div>
          <div className="w-1/2 text-sm pl-4 pr-8 text-justify text-gray-400 font-medium my-8">
            <CsvInstructions />
          </div>
        </div>
      </div>
    </>
  );
};

export default ConvertToData;
