import { Banner } from "./banner";
import type { BannerProps } from "./types";

const SuccessBanner = ({
  info,
  children,
  className,
  id = "successes",
}: BannerProps): JSX.Element => (
  <Banner variant="success" info={info} className={className} testid={id}>
    {children}
  </Banner>
);

export default SuccessBanner;
