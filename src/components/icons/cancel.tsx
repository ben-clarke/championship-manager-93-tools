import type { IconProps } from "./types";

const Cancel = ({ className = "", testId = "cancel" }: IconProps): JSX.Element => (
  <svg
    data-testid={testId}
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 96 960 960"
  >
    <path d="m480 618 129 129q9 9 21 9t21-9q9-9 9-21t-9-21L522 576l129-129q9-9 9-21t-9-21q-9-9-21-9t-21 9L480 534 351 405q-9-9-21-9t-21 9q-9 9-9 21t9 21l129 129-129 129q-9 9-9 21t9 21q9 9 21 9t21-9l129-129Zm0 358q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z" />
  </svg>
);

export default Cancel;
