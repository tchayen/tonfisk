import React from "react";

import { atoms } from "../theme.css";

/**
 * A horizontal line spanning the full width of the container.
 *
 *  ## Usage
 *
 * ```jsx
 * import { HorizontalLine } from "TODO_LIB_NAME";
 *
 * <HorizontalLine />
 * ```
 *
 * ## Example
 *
 * <HorizontalLine />
 */
export function HorizontalLine(): JSX.Element {
  return (
    <div
      className={atoms({
        background: {
          lightMode: "gray-200",
          darkMode: "gray-600",
        },
        width: "100%",
        height: "1px",
      })}
    />
  );
}
