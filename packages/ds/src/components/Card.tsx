/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import { ReactNode } from "react";
import { ReactElement } from "react";

type Props = {
  /**
   * Content of the card.
   */
  children: ReactNode;
};

/**
 * Card component.
 *
 *  ## Usage
 *
 * ```jsx
 * import { Card } from "@tchayen/design-system";
 *
 * <Card>
 *   Content
 * </Card>
 * ```
 *
 * ## Example
 *
 * <Card>TODO: something is broken here</Card>
 */
export function Card(props: Props): ReactElement {
  const theme = useTheme();
  const { radii } = theme;
  return (
    <div
      css={{
        borderRadius: radii[3],
        border: "1px solid var(--border)",
      }}
    >
      {props.children}
    </div>
  );
}
