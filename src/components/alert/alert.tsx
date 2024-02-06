import clsx from "clsx";
import type { ReactNode } from "react";

const Alert = ({ children, className = "", variant }: AlertProps): JSX.Element => {
  const variantClassName = variantToClass[variant];
  return (
    <div className={clsx("flex rounded p-2 text-left text-sm h-full", variantClassName, className)}>
      {children}
    </div>
  );
};

export interface AlertProps {
  children: ReactNode;
  variant: AlertVariant;
  className?: string;
}

export type AlertVariant = "success" | "info" | "warning" | "error";

const variantToClass: Record<AlertVariant, string> = {
  error: "text-gray-800 bg-red-300",
  info: "text-gray-800 bg-blue-100",
  warning: "text-gray-800 bg-yellow-300",
  success: "text-gray-800 bg-green-300",
};

export default Alert;
