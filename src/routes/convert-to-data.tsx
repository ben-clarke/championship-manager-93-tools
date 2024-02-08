import { useEffect, useState } from "react";
import ConvertToDataType from "src/components/convert-to-datatype";
import CsvExeUpload from "src/components/uploaders/csv-exe-upload";
import CsvInstructions from "src/components/uploaders/csv/csv-instructions";
import { AlertVariant } from "../components/alert";
import SubmittingOverlay from "../components/submitting-overlay";
import CsvUpload from "../components/uploaders/csv-upload";
import UploadComplete from "../components/uploaders/upload-complete";
import { CSV_FOREIGN, CSV_LEAGUE, CSV_TEAM, EXE_CM } from "../constants/files";
import {
  UPLOAD_EDIT_EXE_PARSED,
  UPLOAD_EDIT_FILE,
  UPLOAD_EDIT_FILE_FOREIGN,
  UPLOAD_EDIT_FILE_LEAGUE,
  UPLOAD_EDIT_FILE_TEAM,
  UPLOAD_EDIT_PARSED,
  UPLOAD_EDIT_TIP,
  UPLOAD_EDIT_TIP_2,
  UPLOAD_EDIT_TIP_FOREIGN,
  UPLOAD_EDIT_TIP_LEAGUE,
  UPLOAD_EDIT_TIP_TEAM,
} from "../constants/strings";
import { Message } from "../types/web";
import { createDataFiles, createExeFile } from "../utils/file-conversion";

const ConvertToData = (): JSX.Element => {
  const [message, setMessage] = useState<Message>({ data: [], variant: "info" });
  const [exeMessage, setExeMessage] = useState<Message>({ data: [], variant: "info" });
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const [foreignCsvContent, setForeignCsvContent] = useState("");
  const [leagueCsvContent, setLeagueCsvContent] = useState("");
  const [teamCsvContent, setTeamCsvContent] = useState("");

  const [exeCsvContent, setExeCsvContent] = useState("");
  const [exeContent, setExeContent] = useState("");

  const setFileValues = (name: string, value: string, fileType: string): void => {
    if (fileType === CSV_FOREIGN) setForeignCsvContent(value);
    if (fileType === CSV_LEAGUE) setLeagueCsvContent(value);
    if (fileType === CSV_TEAM) setTeamCsvContent(value);
    if (fileType === EXE_CM) setExeContent(value);
    if (fileType === "CMEXE.EXE.CSV") setExeCsvContent(value);
    setShowOverlay(true);
  };

  const setCsvAlertMessage = (data: string[], variant: AlertVariant): void => {
    setMessage({ data, variant });
  };

  const setCsvExeAlertMessage = (data: string[], variant: AlertVariant): void => {
    setExeMessage({ data, variant });
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

    if (exeContent.length > 0 && exeCsvContent.length > 0) {
      const errors = createExeFile(exeContent, exeCsvContent);
      setExeContent("");
      setExeCsvContent("");
      setShowOverlay(false);

      if (errors.length) setExeMessage({ data: errors, variant: "error" });
      else setExeMessage({ data: [UPLOAD_EDIT_EXE_PARSED], variant: "success" });
    }
  }, [foreignCsvContent, leagueCsvContent, teamCsvContent, exeContent, exeCsvContent]);

  useEffect(() => {
    // This is so that react triggers a re-render.
    // Seems pointless, but not enough time to investigate as now works.
  }, [showOverlay]);

  const toggle = false;

  return (
    <>
      <SubmittingOverlay showOverlay={showOverlay} />
      <div className="text-center bg-dark-gray text-white flex flex-wrap items-center justify-center">
        <div className="flex flex-wrap items-center justify-center w-full">
          <div className="w-1/2 mt-8 px-8">
            <div className="mb-4">
              {message && message.data.length === 0 ? (
                <CsvUpload
                  setFiles={setFileValues}
                  setMessage={setCsvAlertMessage}
                  requiredFiles={REQUIRED_FILES}
                  id="csv-upload"
                  value={UPLOAD_EDIT_FILE}
                  tip={UPLOAD_EDIT_TIP}
                  tip2={UPLOAD_EDIT_TIP_2}
                />
              ) : (
                <UploadComplete message={message} />
              )}
            </div>
            <div className="border-2 border-gray-300 border-dashed rounded-lg b-wh">
              <p className="my-2">Upload single files</p>
              <div className="mb-4">
                <ConvertToDataType
                  requiredFileType="FOREIGN.DAT"
                  requiredFiles={[CSV_FOREIGN, EXE_CM]}
                  id="csv-upload-foreign"
                  value={UPLOAD_EDIT_FILE_FOREIGN}
                  tip={UPLOAD_EDIT_TIP_FOREIGN}
                />
              </div>
              <div className="mb-4">
                <ConvertToDataType
                  requiredFileType="LEAGUE.DAT"
                  requiredFiles={[CSV_LEAGUE, EXE_CM]}
                  id="csv-upload-league"
                  value={UPLOAD_EDIT_FILE_LEAGUE}
                  tip={UPLOAD_EDIT_TIP_LEAGUE}
                />
              </div>
              <div className="mb-4">
                <ConvertToDataType
                  requiredFileType="TEAM.DAT"
                  requiredFiles={[CSV_TEAM, EXE_CM]}
                  id="csv-upload-team"
                  value={UPLOAD_EDIT_FILE_TEAM}
                  tip={UPLOAD_EDIT_TIP_TEAM}
                />
              </div>
            </div>
            {toggle && (
              <div>
                {exeMessage && exeMessage.data.length === 0 ? (
                  <CsvExeUpload setFiles={setFileValues} setMessage={setCsvExeAlertMessage} />
                ) : (
                  <UploadComplete message={exeMessage} />
                )}
              </div>
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

const REQUIRED_FILES = [CSV_FOREIGN, CSV_LEAGUE, CSV_TEAM, EXE_CM];

export default ConvertToData;
