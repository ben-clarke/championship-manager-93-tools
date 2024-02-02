import type { IconProps } from "./types";

const Info = ({ className }: IconProps): JSX.Element => (
  <svg viewBox="0 0 24 24" className={className}>
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <path
        d="M11.2,8 L12.8,8 L12.8,9.6 L11.2,9.6 L11.2,8 Z M11.2,11.2 L12.8,11.2 L12.8,16 L11.2,16 L11.2,11.2 Z M12,4 C7.584,4 4,7.584 4,12 C4,16.416 7.584,20 12,20 C16.416,20 20,16.416 20,12 C20,7.584 16.416,4 12,4 Z M12,18.4 C8.472,18.4 5.6,15.528 5.6,12 C5.6,8.472 8.472,5.6 12,5.6 C15.528,5.6 18.4,8.472 18.4,12 C18.4,15.528 15.528,18.4 12,18.4 Z"
        fill="currentColor"
        fillRule="nonzero"
      />
    </g>
  </svg>
);

export default Info;
