import type { IconProps } from "./types";

const DashboardFilled = ({ className, testId = "dashboard-filled" }: IconProps): JSX.Element => (
  <svg
    className={className}
    data-testid={testId}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="2.75"
      y="2.75"
      width="7.5"
      height="7.5"
      rx="1.25"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <rect
      x="2.75"
      y="13.75"
      width="7.5"
      height="7.5"
      rx="1.25"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <rect
      x="13.75"
      y="2.75"
      width="7.5"
      height="7.5"
      rx="1.25"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <rect
      x="13.75"
      y="13.75"
      width="7.5"
      height="7.5"
      rx="1.25"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

export default DashboardFilled;
