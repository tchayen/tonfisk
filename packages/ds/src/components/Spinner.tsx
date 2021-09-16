import React from "react";

import { background, main } from "./Spinner.css";

/**
 * Spinner component for loading states.
 * ## Usage
 *
 * ```jsx
 * import { Spinner } from "TODO_LIB_NAME";
 *
 * function SpinnerExample() {
 *   return <Spinner />;
 * }
 * ```
 *
 * ## Example
 *
 * <Spinner />
 */
export function Spinner(): JSX.Element {
  const size = 32;

  const center = 16;
  const strokeWidth = 4;
  const r = 16 - strokeWidth;
  const c = 2 * r * Math.PI;
  const offset = c - (1 / 4) * c;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      strokeWidth={strokeWidth}
    >
      <circle
        role="presentation"
        cx={center}
        cy={center}
        r={r}
        className={background}
      />
      <circle
        role="presentation"
        cx={center}
        cy={center}
        r={r}
        className={main}
        strokeDasharray={c}
        strokeDashoffset={offset}
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          begin="0s"
          dur="1s"
          from="0 16 16"
          to="360 16 16"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}
