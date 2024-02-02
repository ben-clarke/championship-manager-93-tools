import type { IconProps } from "./types";

const Repeat = ({ className, testId }: IconProps): JSX.Element => (
  <svg
    className={className}
    data-testid={testId}
    viewBox="0 0 14 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.65562 9.7828L2.06268 12.3758L4.65562 14.9687L3.62429 16L0 12.3758L3.62429 8.75146L4.65562 9.7828Z"
      fill="#3B3B47"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.106 0L13.7303 3.62429L10.106 7.24857L9.07471 6.21723L11.6677 3.62429L9.07471 1.03134L10.106 0Z"
      fill="#3B3B47"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.62348 4.35355C3.1292 4.35355 2.65517 4.5499 2.30566 4.89941C1.95615 5.24892 1.7598 5.72295 1.7598 6.21723V8.24297H0.30127V6.21723C0.30127 5.33613 0.651287 4.49111 1.27432 3.86807C1.89736 3.24504 2.74238 2.89502 3.62348 2.89502H12.6988V4.35355H3.62348Z"
      fill="#3B3B47"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.4288 7.75696V9.7827C13.4288 10.6638 13.0788 11.5088 12.4557 12.1319C11.8327 12.7549 10.9877 13.1049 10.1066 13.1049H1.03125V11.6464H10.1066C10.6008 11.6464 11.0749 11.45 11.4244 11.1005C11.7739 10.751 11.9702 10.277 11.9702 9.7827V7.75696H13.4288Z"
      fill="#3B3B47"
    />
  </svg>
);

export default Repeat;
