import React, { ReactElement, ReactNode } from "react";

import { atoms } from "../theme.css";

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
  return (
    <div
      className={atoms({
        borderRadius: "8px",
        border: "regular",
      })}
    >
      {props.children}
    </div>
  );
}
