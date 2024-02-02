import type { IconProps } from "./types";

const PaymentFilled = ({ className, testId = "payment-filled" }: IconProps): JSX.Element => (
  <svg
    className={className}
    data-testid={testId}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.5 14.75L12.5711 7.67896"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M12 16.25L19.0711 9.17896"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.5 17.75H2.5V12.75L7.5 17.75Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.5 11.75V6.75H16.5L21.5 11.75Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="round"
    />
  </svg>
);

export default PaymentFilled;
