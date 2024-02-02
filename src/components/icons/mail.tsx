import type { IconProps } from "./types";

const Mail = ({ className, testId = "mail" }: IconProps): JSX.Element => (
  <svg
    className={className}
    data-testid={testId}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <path
        d="M19.0588235,6 C19.5786209,6 20,6.39796911 20,6.88888889 L20,17.1111111 C20,17.6020309 19.5786209,18 19.0588235,18 L4.94117647,18 C4.42137906,18 4,17.6020309 4,17.1111111 L4,6.88888889 C4,6.39796911 4.42137906,6 4.94117647,6 L19.0588235,6 Z M5.505,9.226 L5.50588235,16.5777778 L18.4941176,16.5777778 L18.4941176,9.227 L12,13.0607983 L5.505,9.226 Z M18.4941176,7.42222222 L5.50588235,7.42222222 L5.505,7.549 L12,11.3831111 L18.4941176,7.549 L18.4941176,7.42222222 Z"
        fill="currentColor"
        fillRule="nonzero"
      />
    </g>
  </svg>
);

export default Mail;
