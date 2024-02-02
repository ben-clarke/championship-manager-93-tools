import type { IconProps } from "./types";

const Person = ({ className, testId = "person" }: IconProps): JSX.Element => (
  <svg
    className={className}
    data-testid={testId}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.0007 10.9999C11.084 10.9999 10.2993 10.6735 9.64648 10.0208C8.99371 9.36797 8.66732 8.58325 8.66732 7.66658C8.66732 6.74992 8.99371 5.9652 9.64648 5.31242C10.2993 4.65964 11.084 4.33325 12.0007 4.33325C12.9173 4.33325 13.702 4.65964 14.3548 5.31242C15.0076 5.9652 15.334 6.74992 15.334 7.66658C15.334 8.58325 15.0076 9.36797 14.3548 10.0208C13.702 10.6735 12.9173 10.9999 12.0007 10.9999ZM5.33398 17.6666V15.3333C5.33398 14.861 5.45565 14.4269 5.69898 14.0308C5.94176 13.6352 6.26454 13.3333 6.66732 13.1249C7.52843 12.6944 8.40343 12.3713 9.29232 12.1558C10.1812 11.9408 11.084 11.8333 12.0007 11.8333C12.9173 11.8333 13.8201 11.9408 14.709 12.1558C15.5979 12.3713 16.4729 12.6944 17.334 13.1249C17.7368 13.3333 18.0595 13.6352 18.3023 14.0308C18.5456 14.4269 18.6673 14.861 18.6673 15.3333V17.6666H5.33398ZM7.00065 15.9999H17.0007V15.3333C17.0007 15.1805 16.9626 15.0416 16.8865 14.9166C16.8098 14.7916 16.709 14.6944 16.584 14.6249C15.834 14.2499 15.077 13.9685 14.3131 13.7808C13.5493 13.5935 12.7784 13.4999 12.0007 13.4999C11.2229 13.4999 10.452 13.5935 9.68815 13.7808C8.92426 13.9685 8.16732 14.2499 7.41732 14.6249C7.29232 14.6944 7.19176 14.7916 7.11565 14.9166C7.03898 15.0416 7.00065 15.1805 7.00065 15.3333V15.9999ZM12.0007 9.33325C12.459 9.33325 12.8515 9.16992 13.1782 8.84325C13.5043 8.51714 13.6673 8.12492 13.6673 7.66658C13.6673 7.20825 13.5043 6.81603 13.1782 6.48992C12.8515 6.16325 12.459 5.99992 12.0007 5.99992C11.5423 5.99992 11.1501 6.16325 10.824 6.48992C10.4973 6.81603 10.334 7.20825 10.334 7.66658C10.334 8.12492 10.4973 8.51714 10.824 8.84325C11.1501 9.16992 11.5423 9.33325 12.0007 9.33325Z"
      fill="currentColor"
    />
  </svg>
);

export default Person;