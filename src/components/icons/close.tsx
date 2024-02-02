import type { IconProps } from "./types";

const Close = ({ className }: IconProps): JSX.Element => (
  <svg data-testid="close-icon" className={className} xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="nonzero"
      d="M18 7.209 16.791 6 12 10.791 7.209 6 6 7.209 10.791 12 6 16.791 7.209 18 12 13.209 16.791 18 18 16.791 13.209 12z"
    />
  </svg>
);

export default Close;
