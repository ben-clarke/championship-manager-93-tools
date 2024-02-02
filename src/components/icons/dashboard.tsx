import type { IconProps } from "./types";

const Dashboard = ({ className, testId = "dashboard" }: IconProps): JSX.Element => (
  <svg
    className={className}
    data-testid={testId}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="2.75"
      y="2.75"
      rx="1.25"
      width="7.5"
      height="7.5"
      stroke="currentColor"
      fill="none"
      strokeWidth="1.5"
    />
    <rect
      x="2.75"
      y="13.75"
      rx="1.25"
      width="7.5"
      height="7.5"
      stroke="currentColor"
      fill="none"
      strokeWidth="1.5"
    />
    <rect
      x="13.75"
      y="2.75"
      rx="1.25"
      width="7.5"
      height="7.5"
      stroke="currentColor"
      fill="none"
      strokeWidth="1.5"
    />
    <rect
      x="13.75"
      y="13.75"
      rx="1.25"
      width="7.5"
      height="7.5"
      stroke="currentColor"
      fill="none"
      strokeWidth="1.5"
    />
  </svg>
);

export default Dashboard;
