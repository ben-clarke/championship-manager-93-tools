import clsx from "clsx";
import Spinner from "../spinner";
import Overlay from "./overlay";

const SpinnerOverlay = ({
  fullScreen = false,
  fixed = true,
  className,
  spinnerContainerClassName,
}: SpinnerOverlayProps): JSX.Element => (
  <Overlay centerContent={!fullScreen} className={className} fixed={fixed} noClickthrough>
    <div
      className={clsx(
        fullScreen && "flex h-screen w-full items-center justify-center",
        spinnerContainerClassName,
      )}
    >
      <Spinner />
    </div>
  </Overlay>
);

export interface SpinnerOverlayProps {
  fullScreen?: boolean;
  fixed?: boolean;
  className?: string;
  spinnerContainerClassName?: string;
}

export default SpinnerOverlay;
