import { useEffect, useState } from "react";
import { EXE_CM } from "src/constants/files";
import { FileType } from "src/lib/handlers/convert-to-hex";
import { UPLOAD_EDIT_PARSED } from "../constants/strings";
import { Message } from "../types/web";
import { createDataTypeFiles } from "../utils/file-conversion";
import { AlertVariant } from "./alert";
import SubmittingOverlay from "./submitting-overlay";
import CsvUpload from "./uploaders/csv-upload";
import UploadComplete from "./uploaders/upload-complete";

const ConvertToDataType = ({
  requiredFileType,
  requiredFiles,
  id,
  value,
  tip,
}: ConvertProps): JSX.Element => {
  const [message, setMessage] = useState<Message>({ data: [], variant: "info" });
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const [csvContent, setCsvContent] = useState("");
  const [exeContent, setExeContent] = useState("");

  const setFileValues = (name: string, val: string, fileType: string): void => {
    if (fileType === `${requiredFileType}.CSV`) setCsvContent(val);
    if (fileType === EXE_CM) setExeContent(val);
    setShowOverlay(true);
  };

  const setCsvAlertMessage = (data: string[], variant: AlertVariant): void => {
    setMessage({ data, variant });
  };

  useEffect(() => {
    if (csvContent.length > 0 && exeContent.length > 0) {
      const errors = createDataTypeFiles(csvContent, requiredFileType, exeContent);
      setCsvContent("");
      setExeContent("");
      setShowOverlay(false);

      if (errors.length) setMessage({ data: errors, variant: "error" });
      else setMessage({ data: [UPLOAD_EDIT_PARSED], variant: "success" });
    }
  }, [csvContent, exeContent]);

  useEffect(() => {
    // This is so that react triggers a re-render.
    // Seems pointless, but not enough time to investigate as now works.
  }, [showOverlay]);

  return (
    <>
      <SubmittingOverlay showOverlay={showOverlay} />
      {message && message.data.length === 0 ? (
        <CsvUpload
          setFiles={setFileValues}
          setMessage={setCsvAlertMessage}
          requiredFiles={requiredFiles}
          id={id}
          value={value}
          tip={tip}
          height="h-32"
          showIcon={false}
        />
      ) : (
        <UploadComplete message={message} />
      )}
    </>
  );
};

interface ConvertProps {
  requiredFileType: FileType;
  requiredFiles: string[];
  id: string;
  value: string;
  tip: string;
}

export default ConvertToDataType;
