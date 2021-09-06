import React, { ReactElement } from "react";

import { atoms } from "../theme.css";

/**
 * A horizontal line spanning the full width of the container.
 *
 *  ## Usage
 *
 * ```jsx
 * import { HorizontalLine } from "@tchayen/design-system";
 *
 * <HorizontalLine />
 * ```
 *
 * <HorizontalLine />
 */
export function HorizontalLine(): ReactElement {
  return (
    <div
      className={atoms({
        background: "gray-200",
        width: "100%",
        height: "1px",
      })}
    />
  );
}
