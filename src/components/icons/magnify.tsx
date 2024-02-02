import clsx from "clsx";
import type { IconProps } from "./types";

const Magnify = ({ className }: IconProps): JSX.Element => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={clsx("h-5 w-5", className)}
    data-testid="magnify"
  >
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <path
        d="M15.0057176,13.8050314 L14.3733562,13.8050314 L14.1492281,13.5889079 C14.9336764,12.6763865 15.4059463,11.4917095 15.4059463,10.2029731 C15.4059463,7.32933105 13.0766152,5 10.2029731,5 C7.32933105,5 5,7.32933105 5,10.2029731 C5,13.0766152 7.32933105,15.4059463 10.2029731,15.4059463 C11.4917095,15.4059463 12.6763865,14.9336764 13.5889079,14.1492281 L13.8050314,14.3733562 L13.8050314,15.0057176 L17.8073185,19 L19,17.8073185 L15.0057176,13.8050314 Z M10.2029731,13.8050314 C8.20983419,13.8050314 6.60091481,12.1961121 6.60091481,10.2029731 C6.60091481,8.20983419 8.20983419,6.60091481 10.2029731,6.60091481 C12.1961121,6.60091481 13.8050314,8.20983419 13.8050314,10.2029731 C13.8050314,12.1961121 12.1961121,13.8050314 10.2029731,13.8050314 Z"
        fill="currentColor"
        fillRule="nonzero"
      />
    </g>
  </svg>
);

export default Magnify;
