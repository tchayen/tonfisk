import React from "react";

import { atoms } from "../theme.css";

type Props = {
  className?: string;
};

export function Tick({ className }: Props): JSX.Element {
  return (
    <svg
      width="12"
      height="10"
      viewBox="0 0 12 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 4.4L5 8L10 2"
        className={
          className ||
          atoms({
            stroke: {
              lightMode: "white",
              darkMode: "gray-900",
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
