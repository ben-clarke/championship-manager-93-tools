import clsx from "clsx";
import type { ReactNode } from "react";

const Overlay = ({
  children,
  className,
  centerContent = true,
  testId = "overlay",
  noClickthrough = false,
  fixed = false,
}: OverlayProps): JSX.Element => (
  <>
    {/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
    <div
      onClick={(e): void => {
        if (noClickthrough) {
          e.stopPropagation();
        }
      }}
      data-testid={testId}
      className={clsx(
        "left-0 top-0 z-20 flex h-full w-full bg-white bg-opacity-80",
        fixed ? "fixed" : "absolute",
        centerContent && "items-center justify-center",
        className,
      )}
    >
      {children}
    </div>
  </>
);

export interface OverlayProps {
  children: ReactNode;
  className?: string;
  centerContent?: boolean;
  testId?: string;
  noClickthrough?: boolean;
  fixed?: boolean;
}

export default Overlay;
