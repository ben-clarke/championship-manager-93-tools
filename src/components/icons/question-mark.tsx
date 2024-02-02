import type { IconProps } from "./types";

const QuestionMark = ({ className, testId = "question-mark" }: IconProps): JSX.Element => (
  <svg
    className={className}
    data-testid={testId}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <rect fill="none" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.75 12C22.75 6.06294 17.9371 1.25 12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12ZM12.3333 15.6171C12.8632 15.6171 13.2929 16.0468 13.2929 16.5767C13.2929 17.1066 12.8632 17.5363 12.3333 17.5363C11.8034 17.5363 11.3737 17.1066 11.3737 16.5767C11.3737 16.0468 11.8034 15.6171 12.3333 15.6171ZM16.0833 9.969C16.0833 7.90157 14.4075 6.25 12.3333 6.25C10.2688 6.25 8.58333 7.98361 8.58333 10.062H10.0833C10.0833 8.80273 11.1068 7.75 12.3333 7.75C13.5839 7.75 14.5833 8.73494 14.5833 9.969C14.5833 11.2031 13.5839 12.188 12.3333 12.188C11.9191 12.188 11.5833 12.5238 11.5833 12.938V14.787H13.0833L13.083 13.613L13.1136 13.6082C14.812 13.2549 16.0833 11.7697 16.0833 9.969Z"
      />
    </g>
  </svg>
);

export default QuestionMark;