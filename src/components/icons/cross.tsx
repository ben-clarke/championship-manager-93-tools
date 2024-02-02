import type { IconProps } from "./types";

const Cross = ({ className, testId = "cross" }: IconProps): JSX.Element => (
  <svg
    className={className}
    data-testid={testId}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="none" strokeWidth="1" fillRule="evenodd">
      <polygon
        id="Path"
        fillRule="nonzero"
        points="18 7.20857143 16.7914286 6 12 10.7914286 7.20857143 6 6 7.20857143 10.7914286 12 6 16.7914286 7.20857143 18 12 13.2085714 16.7914286 18 18 16.7914286 13.2085714 12"
      />
    </g>
  </svg>
);

export default Cross;
