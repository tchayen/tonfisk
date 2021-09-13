import React, { ReactElement } from "react";

import { atoms } from "../theme.css";

export function Chevron({ className }: { className?: string }): ReactElement {
  return (
    <svg
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.0001 6.40001L6.4001 7.20001L7.0001 7.65001L7.6001 7.20001L7.0001 6.40001ZM9.76324e-05 2.40001L6.4001 7.20001L7.6001 5.60001L1.2001 0.800006L9.76324e-05 2.40001ZM7.6001 7.20001L14.0001 2.40001L12.8001 0.800006L6.4001 5.60001L7.6001 7.20001Z"
        className={
          className ||
          atoms({
            fill: {
              lightMode: "gray-400",
              darkMode: "gray-700",
            },
          })
        }
      />
    </svg>
  );
}
