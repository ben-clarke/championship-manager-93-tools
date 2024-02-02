import { useCallback } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { UPLOAD_FILE_DRAG } from "../../constants/strings";
import { AlertVariant } from "../alert";

const UploadFile = ({
  setFiles,
  setMessage,
  value,
  tip,
  tip2,
  accept = "application/xml",
  disabled = false,
  multiple = false,
  id,
}: UploadFileProps): JSX.Element => {
  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    const acceptedFileItems = acceptedFiles.map(({ name }) => name.toUpperCase());
    const missingFiles = VALID_FILES.filter(
      (filename) => !acceptedFileItems.includes(filename.toUpperCase()),
    );

    // TODO - BC | These errors
    if (fileRejections.length > 0) {
      setMessage(["Invalid"], "error");
      return;
    }
    if (missingFiles.length > 0) {
      setMessage(["Missing"], "error");
      return;
    }

    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = (): void => console.log("file reading was aborted");
      reader.onerror = (): void => console.log("file reading has failed");
      reader.onload = (): void => {
        const { result } = reader;
        const [, data] = (result as string).split(",");
        setFiles(file.name, data, file.name.toUpperCase());
      };

      reader.readAsDataURL(file);
    });

    setMessage(["Successfully uploaded the data files"], "success");
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    validator: fileValidator,
  });

  return (
    <div className="px-4">
      <input type="hidden" value="" />
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor={id}
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-dark-gray hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-white">
              <span className="font-semibold">{value}</span>
              {isDragActive && UPLOAD_FILE_DRAG}
            </p>
            <p className="text-xs text-gray-300">{tip}</p>
            <p className="text-xs text-gray-300 pt-4 font-bold">{tip2}</p>
          </div>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <div {...getRootProps()}>
            <input
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...getInputProps()}
              id={id}
              type="file"
              className="hidden"
              accept={accept}
              disabled={disabled}
              multiple={multiple}
              name="file"
            />
          </div>
        </label>
      </div>
    </div>
  );
};

const fileValidator = (file: File): { code: string; message: string } | null => {
  if (!VALID_FILES.includes(file.name.toUpperCase())) {
    return {
      code: "invalid-file-name",
      message: `Invalid file name on upload: ${file.name}`,
    };
  }

  return null;
};

export interface UploadFileProps {
  value: string;
  tip: string;
  tip2: string;
  setFiles: (fileName: string, fileContent: string, fileType: string) => void;
  setMessage: (data: string[], variant: AlertVariant) => void;
  accept?: string;
  disabled?: boolean;
  multiple?: boolean;
  id: string;
}

const VALID_FILES = ["FOREIGN.DAT", "LEAGUE.DAT", "TEAM.DAT", "CMEXE.EXE"];

export default UploadFile;
