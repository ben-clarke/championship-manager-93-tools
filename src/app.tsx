import { saveAs } from "file-saver";
import { useEffect, useState } from "react";
import { AlertVariant } from "./components/alert";
import { Banner } from "./components/banner";
import { Navbar } from "./components/navbar";
import UploadFile from "./components/upload-file/upload-file";
import {
  UPLOAD_EDIT_FILE,
  UPLOAD_EDIT_TIP,
  UPLOAD_EDIT_TIP_2,
  UPLOAD_GAME_FILE,
  UPLOAD_GAME_TIP,
  UPLOAD_GAME_TIP_2,
} from "./constants/strings";
import { convertToHumanReadableBlob } from "./lib/handlers/convert-to-human-readable";

// eslint-disable-next-line global-require
window.Buffer = window.Buffer || require("buffer").Buffer;

function App(): JSX.Element {
  const [message, setMessage] = useState<Message>({ data: [], variant: "info" });
  const [foreignContent, setForeignContent] = useState("");
  const [leagueContent, setLeagueContent] = useState("");
  const [teamContent, setTeamContent] = useState("");
  const [exeContent, setExeContent] = useState("");

  const setFileValues = (name: string, value: string, fileType: string): void => {
    if (fileType === "FOREIGN.DAT") setForeignContent(value);
    if (fileType === "LEAGUE.DAT") setLeagueContent(value);
    if (fileType === "TEAM.DAT") setTeamContent(value);
    if (fileType === "CMEXE.EXE") setExeContent(value);
  };

  const setAlertMessage = (data: string[], variant: AlertVariant): void => {
    setMessage({ data, variant });
  };

  const createHumanReadableFiles = (
    foreign: string,
    league: string,
    team: string,
    exe: string,
  ): void => {
    const {
      data: { foreign: foreignCsv, league: leagueCsv, team: teamCsv },
    } = convertToHumanReadableBlob(foreign, league, team, exe);

    const items = [
      { filename: "FOREIGN.DAT.csv", data: foreignCsv },
      { filename: "LEAGUE.DAT.csv", data: leagueCsv },
      { filename: "TEAM.DAT.csv", data: teamCsv },
    ];

    items.forEach(({ filename, data }) => {
      const file = new Blob([data], { type: "application/csv" });
      saveAs(file, filename);
    });
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
      setMessage({
        data: ["Game edit CSV files have been saved to you downloads folder"],
        variant: "success",
      });
    }
  }, [foreignContent, leagueContent, teamContent, exeContent]);

  return (
    <div className="flex min-h-screen flex-col bg-dark-gray">
      <Navbar />
      <main>
        <div className="text-center bg-dark-gray text-white flex flex-wrap items-center justify-center">
          <div className="lg:w-3/5 w-4/5 mt-8">
            {(message?.data?.length || 0) > 0 && (
              <Banner
                className="mb-2"
                testid="game-message"
                info={message?.data}
                variant={message?.variant}
              />
            )}
            <UploadFile
              value={UPLOAD_GAME_FILE}
              tip={UPLOAD_GAME_TIP}
              tip2={UPLOAD_GAME_TIP_2}
              // value={fileName}
              setFiles={setFileValues}
              setMessage={setAlertMessage}
              id="upload-application-documents"
              accept="*"
              multiple
            />
          </div>
          <div className="lg:w-3/5 w-4/5 mt-8">
            <UploadFile
              value={UPLOAD_EDIT_FILE}
              tip={UPLOAD_EDIT_TIP}
              tip2={UPLOAD_EDIT_TIP_2}
              // value={fileName}
              setFiles={setFileValues}
              setMessage={setAlertMessage}
              id="upload-application-documents"
              accept="*"
              multiple
            />
          </div>
        </div>
      </main>
    </div>
  );
}

interface Message {
  data: string[];
  variant: AlertVariant;
}

export default App;
