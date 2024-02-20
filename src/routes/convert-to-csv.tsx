import { useEffect, useState } from "react";
import { isSafari } from "react-device-detect";
import { AlertVariant } from "../components/alert";
import SubmittingOverlay from "../components/submitting-overlay";
import DataUpload from "../components/uploaders/data-upload";
import DataInstructions from "../components/uploaders/data/data-instructions";
import UploadComplete from "../components/uploaders/upload-complete";
import { DAT_FOREIGN, DAT_LEAGUE, DAT_TEAM, EXE_CM } from "../constants/files";
import { UPLOAD_DATA_PARSED } from "../constants/strings";
import { Message } from "../types/web";
import { createHumanReadableFiles } from "../utils/file-conversion";

const ConvertToCsv = (): JSX.Element => {
  const [message, setMessage] = useState<Message>({ data: [], variant: "info" });
  const [showOverlay, setShowOverlay] = useState(false);

  const [foreignContent, setForeignContent] = useState("");
  const [leagueContent, setLeagueContent] = useState("");
  const [teamContent, setTeamContent] = useState("");

  const [exeContent, setExeContent] = useState("");

  const setFileValues = (name: string, value: string, fileType: string): void => {
    if (fileType === DAT_FOREIGN) setForeignContent(value);
    if (fileType === DAT_LEAGUE) setLeagueContent(value);
    if (fileType === DAT_TEAM) setTeamContent(value);
    if (fileType === EXE_CM) setExeContent(value);
    setShowOverlay(true);
  };

  const setDataAlertMessage = (data: string[], variant: AlertVariant): void => {
    setMessage({ data, variant });
  };

  useEffect(() => {
    if (
      foreignContent.length > 0 &&
      leagueContent.length > 0 &&
      teamContent.length > 0 &&
      exeContent.length > 0
    ) {
      createHumanReadableFiles(foreignContent, leagueContent, teamContent, exeContent, isSafari);
      setForeignContent("");
      setLeagueContent("");
      setTeamContent("");
      setExeContent("");
      setShowOverlay(false);
      setMessage({
        data: [UPLOAD_DATA_PARSED],
        variant: "success",
      });
    }
  }, [foreignContent, leagueContent, teamContent, exeContent]);

  useEffect(() => {
    // This is so that react triggers a re-render.
    // Seems pointless, but not enough time to investigate as now works.
  }, [showOverlay]);

  return (
    <>
      <SubmittingOverlay showOverlay={showOverlay} />
      <div className="text-center bg-dark-gray text-white flex flex-wrap items-center justify-center">
        <div className="flex flex-wrap items-center justify-center w-full">
          <div className="w-1/2 text-sm pl-8 pr-4 text-justify text-gray-400 font-medium my-8">
            <DataInstructions />
          </div>
          <div className="w-1/2 mt-8 px-8">
            {message && message.data.length === 0 ? (
              <DataUpload setFiles={setFileValues} setMessage={setDataAlertMessage} />
            ) : (
              <UploadComplete message={message} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConvertToCsv;
