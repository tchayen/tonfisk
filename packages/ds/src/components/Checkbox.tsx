import { useCheckbox } from "@react-aria/checkbox";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { useToggleState } from "@react-stately/toggle";
import React, { ReactNode, useRef } from "react";

import { Tick } from "../icons/Tick";
import { atoms } from "../theme.css";
import { checkbox, label, tick } from "./Checkbox.css";

type Props = {
  /**
   * Callback called when state of the checkbox changes.
   */
  onChange: (checked: boolean) => void;
  /**
   * Label of the checkbox.
   */
  children?: ReactNode;
  /**
   * Whether user can interact with the checkbox.
   */
  isDisabled?: boolean;
};

/**
 * Checkbox component.
 *
 * ## Usage
 *
 * ```jsx
 * import { Checkbox } from "TODO_LIB_NAME";
 *
 * <Checkbox>Label</Checkbox>
 * ```
 *
 * ## Example
 *
 * <CheckboxExample />
 */
export function Checkbox(props: Props): JSX.Element {
  const { children } = props;
  const state = useToggleState(props);
  const ref = useRef(null);
  const { inputProps } = useCheckbox(props, state, ref);
  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <label className={label}>
      <input
        {...mergeProps(inputProps, focusProps)}
        ref={ref}
        className={checkbox({
          border:
            state.isSelected || isFocusVisible ? "focusVisible" : "default",
          background: state.isSelected ? "selected" : "default",
          boxShadow: isFocusVisible ? "focusVisible" : "default",
          opacity: props.isDisabled ? "disabled" : "active",
        })}
      />
      {state.isSelected && (
        <div className={tick}>
          <Tick />
        </div>
      )}
      <span className={atoms({ marginLeft: "m" })}>{children}</span>
    </label>
  );
}
