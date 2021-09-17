import React from "react";

import { atoms } from "../theme.css";

export function Chevron({ className }: { className?: string }): JSX.Element {
  return (
    <svg
      width="18"
      height="8"
      viewBox="0 0 18 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L9 7L17 1"
        className={
          className ||
          atoms({
            stroke: {
              lightMode: "gray-400",
              darkMode: "gray-700",
            },
          })
        }
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
