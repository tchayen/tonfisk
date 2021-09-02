/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import React, { ReactElement } from "react";

type Props = {
  /**
   * Text content of the tag.
   */
  children: string;
};

/**
 * TODO
 *
 * <Tag>Hello</Tag>
 */
export function Tag(props: Props): ReactElement {
  const theme = useTheme();
  const { radii, fontSizes, fontWeights } = theme;
  return (
    <div
      css={{
        color: "var(--primary-text)",
        fontWeight: fontWeights.bold,
        fontSize: fontSizes[0],
        borderRadius: 10,
        height: 20,
        padding: "0 8px",
        background: "var(--primary)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 1,
      }}
    >
      {props.children}
    </div>
  );
}
