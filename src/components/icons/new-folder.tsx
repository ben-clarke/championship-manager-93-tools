import type { IconProps } from "./types";

const NewFolder = ({ className = "", testId = "new-folder" }: IconProps): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className={className}
    data-testid={testId}
    viewBox="0 0 48 48"
  >
    <path d="M28.5 32h3v-4.5H36v-3h-4.5V20h-3v4.5H24v3h4.5ZM7.05 40q-1.2 0-2.1-.925-.9-.925-.9-2.075V11q0-1.15.9-2.075Q5.85 8 7.05 8h14l3 3h17q1.15 0 2.075.925.925.925.925 2.075v23q0 1.15-.925 2.075Q42.2 40 41.05 40Zm0-29v26h34V14H22.8l-3-3H7.05Zm0 0v26Z" />
  </svg>
);

export default NewFolder;
