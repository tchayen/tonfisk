import React, { ReactElement } from "react";

import { tag } from "./Tag.css";

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
  return <div className={tag}>{props.children}</div>;
}
