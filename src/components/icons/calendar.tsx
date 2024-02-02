import type { IconProps } from "./types";

const Calendar = ({ className, testId = "calendar" }: IconProps): JSX.Element => (
  <svg
    className={className}
    data-testid={testId}
    viewBox="0 0 100 125"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M87,28.5v-0.2h0c-0.1-3.6-3-6.4-6.6-6.4h-3.3v-3.5c0-3.7-3-6.6-6.6-6.6c-3.7,0-6.6,3-6.6,6.6v3.5H36.2v-3.5 c0-3.7-3-6.6-6.6-6.6s-6.6,3-6.6,6.6v3.5h-3.3c-3.6,0-6.5,2.8-6.6,6.4h0v16.6h0v36.9c0,3.7,3,6.6,6.6,6.6h60.8c3.7,0,6.6-3,6.6-6.6 L87,28.5L87,28.5z M21.3,80V44.8h57.5V80H21.3z" />
  </svg>
);

export default Calendar;
