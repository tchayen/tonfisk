import { useFocusRing } from "@react-aria/focus";
import { useSwitch } from "@react-aria/switch";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useToggleState } from "@react-stately/toggle";
import React, { useRef } from "react";

import * as styles from "./Switch.css";

type Props = {
  /**
   * Callback called when selected value changes.
   */
  onChange: (value: boolean) => void;
  /**
   * Label of the switch.
   */
  children?: string;
  /**
   * Whether user can interact with the switch.
   */
  isDisabled?: boolean;
  /**
   * Whether the switch is selected. Used for manual control of the component.
   */
  isSelected?: boolean;
};

/**
 * Switch component.
 *
 * ## Usage
 *
 * ```jsx
 * import { Switch } from "ds";
 *
 * function SwitchExample() {
 *   return <Switch>Label</Switch>;
 * }
 * ```
 *
 * ## Example
 *
 * <Switch>Select this switch either by clicking on the label or on the switch element on the right.</Switch>
 */
export function Switch(props: Props): JSX.Element {
  const state = useToggleState(props);
  const ref = useRef<HTMLInputElement>(null);
  const { inputProps } = useSwitch(props, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <label className={styles.label}>
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      {props.children}
      <div
        className={styles.wrapper({
          opacity: props.isDisabled ? "isDisabled" : "default",
        })}
      >
        <div
          className={styles.bar({
            background: state.isSelected ? "isSelected" : "default",
          })}
        />
        <div
          className={styles.dot({
            background: state.isSelected ? "isSelected" : "default",
            boxShadow: isFocusVisible ? "isFocusVisible" : "default",
            right: state.isSelected ? "isSelected" : "default",
          })}
        />
      </div>
    </label>
  );
}
