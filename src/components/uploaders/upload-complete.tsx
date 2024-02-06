import clsx from "clsx";
import { Banner } from "src/components/banner";
import { Message } from "../../types/web";

const UploadComplete = ({ message }: UploadCompleteProps): JSX.Element => (
  <div className="px-4">
    <div className="flex items-center justify-center w-full h-full">
      <div
        className={clsx(
          "flex flex-col items-center justify-center w-full h-64",
          "border-2 border-gray-300 border-dashed rounded-lg",
        )}
      >
        <div className="flex flex-col items-center justify-center w-full h-full">
          <Banner
            className="w-11/12 mb-0 h-5/6 items-center justify-center"
            testid="game-message"
            info={message?.data}
            variant={message?.variant}
          />
        </div>
      </div>
    </div>
  </div>
);

interface UploadCompleteProps {
  message: Message;
}

export default UploadComplete;
