import { useEffect, useState } from "react";
import { AlertVariant } from "../components/alert";
import SubmittingOverlay from "../components/submitting-overlay";
import ExeUpload from "../components/uploaders/exe-upload";
import UploadComplete from "../components/uploaders/upload-complete";
import { EXE_CM } from "../constants/files";
import { UPLOAD_EDIT_EXE_PARSED } from "../constants/strings";
import { Message } from "../types/web";
import { createExeCsvFile } from "../utils/file-conversion";

const ConvertExeToCsv = (): JSX.Element => {
  const [exeMessage, setExeMessage] = useState<Message>({ data: [], variant: "info" });
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const [exeContent, setExeContent] = useState("");

  const setFileValues = (name: string, value: string, fileType: string): void => {
    if (fileType === EXE_CM) setExeContent(value);
    setShowOverlay(true);
  };

  const setCsvExeAlertMessage = (data: string[], variant: AlertVariant): void => {
    setExeMessage({ data, variant });
  };

  useEffect(() => {
    if (exeContent.length > 0) {
      const errors = createExeCsvFile(exeContent);
      setExeContent("");
      setShowOverlay(false);

      if (errors.length) setExeMessage({ data: errors, variant: "error" });
      else setExeMessage({ data: [UPLOAD_EDIT_EXE_PARSED], variant: "success" });
    }
  }, [exeContent]);

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
            TODO - BC
          </div>
          <div className="w-1/2 mt-8 px-8">
            <div>
              {exeMessage && exeMessage.data.length === 0 ? (
                <ExeUpload setFiles={setFileValues} setMessage={setCsvExeAlertMessage} />
              ) : (
                <UploadComplete message={exeMessage} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConvertExeToCsv;
