import { useEffect, useState } from "react";
import { AlertVariant } from "./components/alert";
import { Banner } from "./components/banner";
import { Navbar } from "./components/navbar";
import CsvUpload from "./components/uploaders/csv-upload";
import DataUpload from "./components/uploaders/data-upload";
import { UPLOAD_DATA_PARSED, UPLOAD_EDIT_PARSED } from "./constants/strings";
import { createDataFiles, createHumanReadableFiles } from "./utils/file-conversion";

// eslint-disable-next-line global-require
window.Buffer = window.Buffer || require("buffer").Buffer;

function App(): JSX.Element {
  const [dataMessage, setDataMessage] = useState<Message>({ data: [], variant: "info" });
  const [csvMessage, setCsvMessage] = useState<Message>({ data: [], variant: "info" });

  const [foreignContent, setForeignContent] = useState("");
  const [leagueContent, setLeagueContent] = useState("");
  const [teamContent, setTeamContent] = useState("");

  const [foreignCsvContent, setForeignCsvContent] = useState("");
  const [leagueCsvContent, setLeagueCsvContent] = useState("");
  const [teamCsvContent, setTeamCsvContent] = useState("");

  const [exeContent, setExeContent] = useState("");

  const setFileValues = (name: string, value: string, fileType: string): void => {
    if (fileType === "FOREIGN.DAT") setForeignContent(value);
    if (fileType === "LEAGUE.DAT") setLeagueContent(value);
    if (fileType === "TEAM.DAT") setTeamContent(value);
    if (fileType === "FOREIGN.DAT.CSV") setForeignCsvContent(value);
    if (fileType === "LEAGUE.DAT.CSV") setLeagueCsvContent(value);
    if (fileType === "TEAM.DAT.CSV") setTeamCsvContent(value);
    if (fileType === "CMEXE.EXE") setExeContent(value);
  };

  const setDataAlertMessage = (data: string[], variant: AlertVariant): void => {
    setDataMessage({ data, variant });
  };

  const setCsvAlertMessage = (data: string[], variant: AlertVariant): void => {
    setCsvMessage({ data, variant });
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
      setDataMessage({
        data: [UPLOAD_DATA_PARSED],
        variant: "success",
      });
    }

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
  }, [
    foreignContent,
    leagueContent,
    teamContent,
    foreignCsvContent,
    leagueCsvContent,
    teamCsvContent,
    exeContent,
  ]);

  return (
    <div className="flex min-h-screen flex-col bg-dark-gray">
      <Navbar />
      <main>
        <div className="text-center bg-dark-gray text-white flex flex-wrap items-center justify-center">
          <div className="lg:w-3/5 w-4/5 mt-8">
            {(dataMessage?.data?.length || 0) > 0 && (
              <Banner
                className="mb-2"
                testid="game-message"
                info={dataMessage?.data}
                variant={dataMessage?.variant}
              />
            )}
            <DataUpload
              // value={fileName}
              setFiles={setFileValues}
              setMessage={setDataAlertMessage}
            />
          </div>
          <div className="lg:w-3/5 w-4/5 mt-8">
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
