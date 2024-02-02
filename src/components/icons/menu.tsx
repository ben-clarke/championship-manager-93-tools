import type { IconProps } from "./types";

const Menu = ({ className, testId = "menu" }: IconProps): JSX.Element => (
  <svg
    className={className}
    data-testid={testId}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <path
        d="M4,18 L20,18 L20,16.5 L4,16.5 L4,18 Z M4,12.75 L20,12.75 L20,11.25 L4,11.25 L4,12.75 Z M4,6 L4,7.5 L20,7.5 L20,6 L4,6 Z"
        fill="currentColor"
        fillRule="nonzero"
      />
    </g>
  </svg>
);

export default Menu;
