import { useCallback } from "react";
import { FileRejection } from "react-dropzone";
import { AlertVariant } from "../alert";
import UploadFile from "../upload-file/upload-file";

const CsvUpload = ({
  setFiles,
  setMessage,
  requiredFiles,
  id,
  value,
  tip,
  tip2,
  height,
  showIcon = true,
}: DataUploadProps): JSX.Element => {
  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    const acceptedFileItems = acceptedFiles.map(({ name }) => name.toUpperCase());
    const missingFiles = requiredFiles.filter(
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

  const fileValidator = (file: File): { code: string; message: string } | null => {
    if (!requiredFiles.includes(file.name.toUpperCase())) {
      return {
        code: "invalid-file-name",
        message: `Invalid file uploaded: ${file.name}`,
      };
    }

    return null;
  };

  return (
    <UploadFile
      value={value}
      tip={tip}
      tip2={tip2}
      // value={fileName}
      onDrop={onDrop}
      validator={fileValidator}
      id={id}
      accept="*"
      multiple
      name="csv-file"
      height={height}
      showIcon={showIcon}
    />
  );
};

export interface DataUploadProps {
  setFiles: (fileName: string, fileContent: string, fileType: string) => void;
  setMessage: (data: string[], variant: AlertVariant) => void;
  requiredFiles: string[];
  id: string;
  value: string;
  tip: string;
  tip2?: string;
  height?: string;
  showIcon?: boolean;
}

const getData = (file: File, result: string): string => {
  if (file.name.toUpperCase().endsWith(".CSV")) return result;

  const [, data] = (result as string).split(",");
  return data;
};

const getMissingErrorMessage = (missingFiles: string[]): string =>
  `You have not uploaded the required files: ${missingFiles.join(", ")}`;

const getInvalidErrorMessage = (rejectedFiles: FileRejection[]): string[] =>
  rejectedFiles.map(({ errors }) => errors.map(({ message }) => message).join(", "));

export default CsvUpload;
