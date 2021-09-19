import React from "react";

import * as styles from "./Label.css";

type Props = {
  /**
   * Text content of label.
   */
  children: string;
  /**
   * Optional props passed to the label element. Usually they come from `react-aria` hooks such as `useSelect()` or `useTextField()`.
   */
  props?: React.LabelHTMLAttributes<HTMLLabelElement>;
};

/**
 * Label component used in form elements.
 *
 * ## Usage
 *
 * ```jsx
 * import { Label } from "tonfisk";
 *
 * function LabelExample() {
 *   return <Label>Text</Label>;
 * }
 * ```
 *
 * ## Example
 *
 * <Label>Yes, this one is actually pretty tiny and not impressive on its own</Label>
 */
export const Label = ({ children, ...props }: Props): JSX.Element => {
  return (
    <label {...props} className={styles.label}>
      {children}
    </label>
  );
};
