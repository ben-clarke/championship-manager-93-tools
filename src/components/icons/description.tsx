import type { IconProps } from "./types";

const Description = ({ className, testId = "description" }: IconProps): JSX.Element => (
  <svg
    className={className}
    data-testid={testId}
    viewBox="0 0 10 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2.5 11.1663H7.5V9.91634H2.5V11.1663ZM2.5 8.66634H7.5V7.41634H2.5V8.66634ZM1.25 13.6663C0.902778 13.6663 0.607778 13.5447 0.365 13.3013C0.121667 13.0586 0 12.7636 0 12.4163V1.58301C0 1.23579 0.121667 0.940786 0.365 0.698008C0.607778 0.454674 0.902778 0.333008 1.25 0.333008H6.66667L10 3.66634V12.4163C10 12.7636 9.87833 13.0586 9.635 13.3013C9.39222 13.5447 9.09722 13.6663 8.75 13.6663H1.25ZM5.83333 4.49967V1.58301H1.25V12.4163H8.75V4.49967H5.83333Z" />
  </svg>
);

export default Description;
