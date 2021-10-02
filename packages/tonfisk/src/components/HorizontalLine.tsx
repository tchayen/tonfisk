import { useSeparator } from "@react-aria/separator";
import React from "react";

import * as styles from "./HorizontalLine.css";

/**
 * A horizontal line spanning the full width of the container.
 *
 *  ## Usage
 *
 * ```jsx
 * import { HorizontalLine } from "tonfisk";
 *
 * function HorizontalLineExample() {
 *   return <HorizontalLine />;
 * }
 * ```
 *
 * ## Example
 *
 * <HorizontalLine />
 */
export function HorizontalLine(): JSX.Element {
  const { separatorProps } = useSeparator({});
  return <div {...separatorProps} className={styles.horizontalLine} />;
}
