import type { ReactNode } from "react";
import { AlertVariant } from "../alert";

export interface ParentBannerProps {
  className?: string;
  testid: string;
  info: string[];
  variant: AlertVariant;
  icon?: string;
  children?: ReactNode;
}

export interface BannerProps {
  info: string[];
  children?: ReactNode;
  className?: string;
  id?: string;
  icon?: string;
}
