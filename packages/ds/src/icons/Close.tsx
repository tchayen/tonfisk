import React from "react";

import { atoms } from "../theme.css";

export function Close(): JSX.Element {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.00012 3.50006L13.0001 13.5001M13.0001 3.50006L3 13.5001"
        className={atoms({
          stroke: {
            lightMode: "black",
            darkMode: "gray-200",
          },
        })}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
