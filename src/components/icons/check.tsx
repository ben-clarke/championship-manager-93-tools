import type { IconProps } from "./types";

const Check = ({ className = "", testId = "check" }: IconProps): JSX.Element => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className={className}
    data-testid={testId}
  >
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <polygon
        fill="currentColor"
        fillRule="nonzero"
        points="9.08470722 15.4675615 5.29164298 11.7360179 4 12.9977629 9.08470722 18 20 7.26174497 18.7174531 6"
      />
    </g>
  </svg>
);

export default Check;
