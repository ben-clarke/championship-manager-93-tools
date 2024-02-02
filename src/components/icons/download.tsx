import type { IconProps } from "./types";

const Download = ({ className }: IconProps): JSX.Element => (
  <svg data-testid="download-icon" className={className} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19 19H5v-1.728h14V19Zm-2.732-7.95-1.203-1.22-2.211 2.23V5h-1.708v7.06l-2.21-2.23-1.204 1.22L12 15.37l4.268-4.32Z"
      fillRule="nonzero"
      fill="currentColor"
    />
  </svg>
);

export default Download;
