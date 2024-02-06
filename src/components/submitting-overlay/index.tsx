import { SpinnerOverlay } from "../overlay";

const SubmittingOverlay = ({
  className = "",
  fullScreen = false,
  fixed = true,
  showOverlay,
}: SubmittingOverlayProps): JSX.Element | null => {
  if (showOverlay)
    return <SpinnerOverlay className={className} fullScreen={fullScreen} fixed={fixed} />;

  return null;
};

interface SubmittingOverlayProps {
  showOverlay: boolean;
  className?: string;
  fullScreen?: boolean;
  fixed?: boolean;
}

export default SubmittingOverlay;
