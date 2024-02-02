import type { IconProps } from "./types";

const Minus = ({ className }: IconProps): JSX.Element => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <polygon
        fill="#3B3B47"
        fillRule="nonzero"
        points="18 12.8571429 6 12.8571429 6 11.1428571 18 11.1428571"
      />
    </g>
  </svg>
);

export default Minus;
