import { useEffect, useState } from "react";
import { AlertVariant } from "../components/alert";
import { Banner } from "../components/banner";
import SubmittingOverlay from "../components/submitting-overlay";
import DataUpload from "../components/uploaders/data-upload";
import { DAT_FOREIGN, DAT_LEAGUE, DAT_TEAM, EXE_CM } from "../constants/files";
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
  UPLOAD_DATA_PARSED,
} from "../constants/strings";
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
      createHumanReadableFiles(foreignContent, leagueContent, teamContent, exeContent);
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
          </div>
          <div className="w-1/2 mt-8 px-8">
            {(message?.data?.length || 0) > 0 && (
              <Banner
                className="mb-2"
                testid="game-message"
                info={message?.data}
                variant={message?.variant}
              />
            )}
            <DataUpload
              // value={fileName}
              setFiles={setFileValues}
              setMessage={setDataAlertMessage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

interface Message {
  data: string[];
  variant: AlertVariant;
}

export default ConvertToCsv;
