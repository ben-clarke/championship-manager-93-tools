import clsx from "clsx";
import type { ReactNode } from "react";
import { Check, Error, IconProps, Info } from "../icons";

const Alert = ({
  children,
  className = "",
  icon,
  iconClassName = "",
  variant,
}: AlertProps): JSX.Element => {
  const Icon = iconToComponent[icon];
  const variantClassName = variantToClass[variant];
  return (
    <div className={clsx("flex rounded p-2 text-left text-sm", variantClassName, className)}>
      {Icon && (
        <div className="mr-3" data-testid="alert-icon">
          <Icon className={clsx("h-5 w-5", iconClassName)} />
        </div>
      )}
      {children}
    </div>
  );
};

export interface AlertProps {
  children: ReactNode;
  variant: AlertVariant;
  className?: string;
  icon: string;
  iconClassName?: string;
}

export type AlertVariant = "success" | "info" | "warning" | "error";

const variantToClass: Record<AlertVariant, string> = {
  error: "text-gray-800 bg-red-400",
  info: "text-gray-800 bg-blue-100",
  warning: "text-gray-800 bg-yellow-400",
  success: "text-gray-800 bg-green-400",
};

const iconToComponent: Record<string, (p: IconProps) => JSX.Element> = {
  info: Info,
  error: Error,
  check: Check,
};

export default Alert;
