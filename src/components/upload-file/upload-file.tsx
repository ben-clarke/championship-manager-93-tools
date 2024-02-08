import clsx from "clsx";
import { FileRejection, useDropzone } from "react-dropzone";
import { UPLOAD_FILE_DRAG } from "../../constants/strings";
import Cloud from "./cloud";

const UploadFile = ({
  onDrop,
  validator,
  value,
  tip,
  tip2,
  accept = "application/xml",
  disabled = false,
  multiple = false,
  id,
  name,
  height = "h-64",
}: UploadFileProps): JSX.Element => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    validator,
  });

  return (
    <div className="px-4">
      <input type="hidden" value="" />
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor={id}
          className={clsx(
            "flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-dark-gray hover:bg-gray-600",
            height,
          )}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Cloud />
            <p className="mb-2 text-sm text-white">
              <span className="font-semibold">{value}</span>
              {isDragActive && UPLOAD_FILE_DRAG}
            </p>
            <p className="text-xs text-gray-300 px-2">{tip}</p>
            {tip2 && <p className="text-xs text-gray-300 pt-4 px-2 font-bold">{tip2}</p>}
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
              name={name}
            />
          </div>
        </label>
      </div>
    </div>
  );
};

export interface UploadFileProps {
  value: string;
  tip: string;
  tip2?: string;
  onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => void;
  validator: (file: File) => { code: string; message: string } | null;
  accept?: string;
  disabled?: boolean;
  multiple?: boolean;
  id: string;
  name: string;
  height?: string;
}

export default UploadFile;
