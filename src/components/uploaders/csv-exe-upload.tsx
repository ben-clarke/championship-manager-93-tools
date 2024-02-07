import { useCallback } from "react";
import { FileRejection } from "react-dropzone";
import { EXE_CM } from "src/constants/files";
import { UPLOAD_EDIT_FILE, UPLOAD_EDIT_TIP, UPLOAD_EDIT_TIP_2 } from "src/constants/strings";
import { AlertVariant } from "../alert";
import UploadFile from "../upload-file/upload-file";

const CsvExeUpload = ({ setFiles, setMessage }: DataUploadProps): JSX.Element => {
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
        const data = getData(file, result as string);
        setFiles(file.name, data, file.name.toUpperCase());
      };

      if (file.name.toUpperCase().endsWith(".CSV")) reader.readAsText(file);
      else reader.readAsDataURL(file);
    });
  }, []);

  return (
    <UploadFile
      value={UPLOAD_EDIT_FILE}
      tip={UPLOAD_EDIT_TIP}
      tip2={UPLOAD_EDIT_TIP_2}
      // value={fileName}
      onDrop={onDrop}
      validator={fileValidator}
      id="csv-exe-upload"
      accept="*"
      multiple
      name="csv-file"
    />
  );
};

export interface DataUploadProps {
  setFiles: (fileName: string, fileContent: string, fileType: string) => void;
  setMessage: (data: string[], variant: AlertVariant) => void;
}

const getData = (file: File, result: string): string => {
  if (file.name.toUpperCase().endsWith(".CSV")) return result;

  const [, data] = (result as string).split(",");
  return data;
};

const fileValidator = (file: File): { code: string; message: string } | null => {
  if (!REQUIRED_FILES.includes(file.name.toUpperCase())) {
    return {
      code: "invalid-file-name",
      message: `Invalid file uploaded: ${file.name}`,
    };
  }

  return null;
};

const REQUIRED_FILES = ["CMEXE.EXE.CSV", EXE_CM];

const getMissingErrorMessage = (missingFiles: string[]): string =>
  `You have not uploaded the required files: ${missingFiles.join(", ")}`;

const getInvalidErrorMessage = (rejectedFiles: FileRejection[]): string[] =>
  rejectedFiles.map(({ errors }) => errors.map(({ message }) => message).join(", "));

export default CsvExeUpload;
