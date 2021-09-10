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
 * <Card>Some text</Card>
 */
export function Card(props: Props): ReactElement {
  return (
    <div
      className={atoms({
        borderRadius: "8px",
        border: {
          lightMode: "regular",
          darkMode: "regularDark",
        },
      })}
    >
      {props.children}
    </div>
  );
}
