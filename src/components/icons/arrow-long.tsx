import type { IconProps } from "./types";

const ArrowLong = ({ className, testId = "arrow-long" }: IconProps): JSX.Element => (
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
        points="14.25 6.75 13.1925 7.8075 16.6275 11.25 4.5 11.25 4.5 12.75 16.6275 12.75 13.185 16.1925 14.25 17.25 19.5 12"
      />
    </g>
  </svg>
);

export default ArrowLong;
