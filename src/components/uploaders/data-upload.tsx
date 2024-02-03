import { useCallback } from "react";
import { FileRejection } from "react-dropzone";
import {
  UPLOAD_GAME_FILE,
  UPLOAD_GAME_TIP,
  UPLOAD_GAME_TIP_2,
  UPLOAD_SUCCESS,
} from "src/constants/strings";
import { AlertVariant } from "../alert";
import UploadFile from "../upload-file/upload-file";

const DataUpload = ({ setFiles, setMessage }: DataUploadProps): JSX.Element => {
  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    const acceptedFileItems = acceptedFiles.map(({ name }) => name.toUpperCase());
    const missingFiles = REQUIRED_FILES.filter(
      (filename) => !acceptedFileItems.includes(filename.toUpperCase()),
    );

    if (fileRejections.length > 0) {
      setMessage(getInvalidErrorMessage(fileRejections), "error");
      return;
    }
    if (missingFiles.length > 0) {
      setMessage([getMissingErrorMessage(missingFiles)], "error");
      return;
    }

    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (): void => {
        const { result } = reader;
        const [, data] = (result as string).split(",");
        setFiles(file.name, data, file.name.toUpperCase());
      };

      reader.readAsDataURL(file);
    });

    setMessage([UPLOAD_SUCCESS], "success");
  }, []);

  return (
    <UploadFile
      value={UPLOAD_GAME_FILE}
      tip={UPLOAD_GAME_TIP}
      tip2={UPLOAD_GAME_TIP_2}
      // value={fileName}
      onDrop={onDrop}
      validator={fileValidator}
      id="data-upload"
      accept="*"
      multiple
      name="data-file"
    />
  );
};

export interface DataUploadProps {
  setFiles: (fileName: string, fileContent: string, fileType: string) => void;
  setMessage: (data: string[], variant: AlertVariant) => void;
}

const fileValidator = (file: File): { code: string; message: string } | null => {
  if (!REQUIRED_FILES.includes(file.name.toUpperCase())) {
    return {
      code: "invalid-file-name",
      message: `Invalid file uploaded: ${file.name}`,
    };
  }

  return null;
};

const REQUIRED_FILES = ["FOREIGN.DAT", "LEAGUE.DAT", "TEAM.DAT", "CMEXE.EXE"];

const getMissingErrorMessage = (missingFiles: string[]): string =>
  `You have not uploaded the required files: ${missingFiles.join(", ")}`;

const getInvalidErrorMessage = (rejectedFiles: FileRejection[]): string[] =>
  rejectedFiles.map(({ errors }) => errors.map(({ message }) => message).join(", "));

export default DataUpload;
