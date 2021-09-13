import React, { ReactElement } from "react";

import { label } from "./Label.css";

type Props = {
  /**
   * Text content of label.
   */
  children: string;
  /**
   * Optional props passed to the label element. Usually they come from
   * react-aria hooks such as useSelect() or useTextField().
   */
  props?: any;
};

/**
 * Label component used in form elements.
 *
 * ## Usage
 *
 * ```jsx
 * import { Label } from "TODO_LIB_NAME";
 *
 * <Label>Text</Label>
 * ```
 *
 * ## Example
 *
 * <Label>Text</Label>
 */
export const Label = ({ children, ...props }: Props): ReactElement => {
  return (
    <label {...props} className={label}>
      {children}
    </label>
  );
};
