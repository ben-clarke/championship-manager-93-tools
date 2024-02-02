import type { IconProps } from "./types";

const Arrow = ({ className, testId = "arrow" }: IconProps): JSX.Element => (
  <svg
    className={className}
    data-testid={testId}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <polygon
        fill="currentColor"
        fillRule="nonzero"
        points="12 5 10.76625 6.23375 15.64875 11.125 5 11.125 5 12.875 15.64875 12.875 10.76625 17.76625 12 19 19 12"
      />
    </g>
  </svg>
);

export default Arrow;
