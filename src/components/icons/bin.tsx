import type { IconProps } from "./types";

const Bin = ({ className }: IconProps): JSX.Element => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    data-testid="bin"
  >
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(6.000000, 4.000000)" fill="#3B3B47" fillRule="nonzero">
        <path d="M0.857142857,14.2222222 C0.857142857,15.2 1.62857143,16 2.57142857,16 L9.42857143,16 C10.3714286,16 11.1428571,15.2 11.1428571,14.2222222 L11.1428571,3.55555556 L0.857142857,3.55555556 L0.857142857,14.2222222 Z M2.57142857,5.33333333 L9.42857143,5.33333333 L9.42857143,14.2222222 L2.57142857,14.2222222 L2.57142857,5.33333333 Z M9,0.888888889 L8.14285714,0 L3.85714286,0 L3,0.888888889 L0,0.888888889 L0,2.66666667 L12,2.66666667 L12,0.888888889 L9,0.888888889 Z" />
      </g>
    </g>
  </svg>
);

export default Bin;
