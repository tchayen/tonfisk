/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { ReactElement } from "react";

/**
 * A horizontal line spanning the full width of the container.
 */
export const HorizontalLine = (): ReactElement => {
  return (
    <div css={{ background: "var(--border)", width: "100%", height: 1 }} />
  );
};
