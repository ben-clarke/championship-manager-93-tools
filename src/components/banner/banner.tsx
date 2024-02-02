import clsx from "clsx";
import { propOr, uniq } from "ramda";
import { Alert } from "../alert";
import type { ParentBannerProps } from "./types";

export const Banner = ({
  info,
  className,
  testid,
  variant,
  icon,
  children,
}: ParentBannerProps): JSX.Element | null => {
  if (info.length === 0 && !children) return null;
  return (
    <div
      className={clsx(className, !(className || "").includes("mb-") && "mb-6")}
      data-testid={testid}
    >
      <Alert variant={variant} icon={icon || propOr("", variant, variantToIcon)}>
        <div className="relative">
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
