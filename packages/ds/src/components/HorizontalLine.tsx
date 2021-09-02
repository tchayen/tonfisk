/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { ReactElement } from "react";

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
 */
export const HorizontalLine = (): ReactElement => {
  return (
    <div css={{ background: "var(--border)", width: "100%", height: 1 }} />
  );
};
