import type { IconProps } from "./types";

const Filter = ({ className, testId }: IconProps): JSX.Element => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    data-testid={testId}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.606 6.76h8.797l-4.407 5.542-4.39-5.542Zm-2.42-.344c1.777 2.279 5.059 6.502 5.059 6.502v5.279c0 .483.396.88.88.88h1.76c.483 0 .879-.397.879-.88v-5.279s3.273-4.223 5.05-6.502A.878.878 0 0 0 18.119 5H5.88a.878.878 0 0 0-.695 1.416Z"
      fillRule="nonzero"
      fill="currentColor"
    />
  </svg>
);

export default Filter;
