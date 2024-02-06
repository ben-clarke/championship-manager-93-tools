import clsx from "clsx";

const Spinner = ({ className, testId = "spinner" }: SpinnerProps): JSX.Element => (
  <div
    data-testid={testId}
    className={clsx(
      "absolute h-12 w-12 animate-spin rounded-full border-4 border-x-gray-400 border-b-transparent border-t-gray-400",
      className,
    )}
  />
);

export interface SpinnerProps {
  className?: string;
  testId?: string;
}

export default Spinner;
