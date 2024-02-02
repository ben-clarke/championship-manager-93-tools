import { Banner } from "./banner";
import type { BannerProps } from "./types";

const WarningBanner = ({
  info,
  children,
  className,
  id = "warnings",
  icon,
}: BannerProps): JSX.Element => (
  <Banner variant="warning" info={info} className={className} testid={id} icon={icon}>
    {children}
  </Banner>
);

export default WarningBanner;
