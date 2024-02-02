import type { IconProps } from "./types";

const Upload = ({ className = "", testId = "upload" }: IconProps): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className={className}
    data-testid={testId}
    viewBox="0 0 48 48"
  >
    <path d="M11 40q-1.2 0-2.1-.9Q8 38.2 8 37v-7.15h3V37h26v-7.15h3V37q0 1.2-.9 2.1-.9.9-2.1.9Zm11.5-7.65V13.8l-6 6-2.15-2.15L24 8l9.65 9.65-2.15 2.15-6-6v18.55Z" />
  </svg>
);

export default Upload;