import clsx from "clsx";
import { uniq } from "ramda";
import { Alert } from "../alert";
import type { ParentBannerProps } from "./types";

export const Banner = ({
  info,
  className,
  testid,
  variant,
  children,
}: ParentBannerProps): JSX.Element | null => {
  if (info.length === 0 && !children) return null;
  return (
    <div className={clsx(className)} data-testid={testid}>
      <Alert variant={variant}>
        <div className="text-center items-center justify-center">
          {uniq(info).map((message, i) => (
            <p data-testid={`${testid}-${i}`} key={message}>
              {message}
            </p>
          ))}
          {children}
        </div>
      </Alert>
    </div>
  );
};

export const variantToIcon = {
  error: "error",
};
