import React from "react";

import { tag } from "./Tag.css";

type Props = {
  /**
   * Text content of the tag.
   */
  children: string;
};

/**
 * ## Usage
 *
 * ```jsx
 * import { Tag } from "tonfisk";
 *
 * function TagExample() {
 *   return <Tag>Tag</Tag>;
 * }
 * ```
 *
 * ## Example
 *
 * <Tag>Tag</Tag>
 */
export function Tag(props: Props): JSX.Element {
  return <div className={tag}>{props.children}</div>;
}
