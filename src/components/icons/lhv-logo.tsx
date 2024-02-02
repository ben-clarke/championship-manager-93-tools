import type { IconProps } from "./types";

const LHVLogo = ({ className, testId = "lhv-logo" }: IconProps): JSX.Element => (
  <svg
    className={className}
    viewBox="0 0 83 28"
    data-testid={testId}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m43.097 0-1.735 11.242h-9.458L33.636.005H21.503v23.888H8.77L12.377.005 0 .002V28h29.394l1.889-12.685h9.485L38.856 28h9.952l4.035-23.878L61.715 28H70.5L83.263.002h-6.855l-6.379 14.713-.724 1.79-.699-1.795L63.044.005 43.097 0Z"
      fillRule="evenodd"
    />
  </svg>
);

export default LHVLogo;
