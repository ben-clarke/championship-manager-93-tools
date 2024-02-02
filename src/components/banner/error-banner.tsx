import { Banner } from "./banner";
import type { BannerProps } from "./types";

const ErrorBanner = ({ info, children, className, id = "errors" }: BannerProps): JSX.Element => (
  <Banner variant="error" info={info} className={className} testid={id}>
    {children}
  </Banner>
);

export default ErrorBanner;
