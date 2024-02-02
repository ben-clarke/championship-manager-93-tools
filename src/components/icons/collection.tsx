import clsx from "clsx";
import type { IconProps } from "./types";

const Collection = ({ className, testId = "collection" }: IconProps): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={clsx("fill-gray-800", className)}
    data-testid={testId}
    fill="none"
    viewBox="0 0 48 48"
  >
    <path d="M13 35h28V7h-3v12.55q0 .45-.375.675-.375.225-.775-.025l-3.5-2.15-3.5 2.15q-.4.25-.775.025t-.375-.675V7H13v28Zm0 3q-1.2 0-2.1-.9-.9-.9-.9-2.1V7q0-1.2.9-2.1.9-.9 2.1-.9h28q1.2 0 2.1.9.9.9.9 2.1v28q0 1.2-.9 2.1-.9.9-2.1.9Zm-6 6q-1.2 0-2.1-.9Q4 42.2 4 41V11.5q0-.65.425-1.075Q4.85 10 5.5 10q.65 0 1.075.425Q7 10.85 7 11.5V41h29.5q.65 0 1.075.425Q38 41.85 38 42.5q0 .65-.425 1.075Q37.15 44 36.5 44ZM28.7 7H38ZM13 7h28Z" />
  </svg>
);

export default Collection;
