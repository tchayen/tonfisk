import { useFocusRing } from "@react-aria/focus";
import { useSwitch } from "@react-aria/switch";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useToggleState } from "@react-stately/toggle";
import React, { useRef } from "react";

import { atoms } from "../theme.css";
import { bar, dot, label, wrapper } from "./Switch.css";

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
 * <Switch>Label</Switch>
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
    <label className={label}>
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      {props.children}
      <div
        // TODO: recipe
        className={`${wrapper} ${atoms({
          opacity: props.isDisabled ? 0.5 : 1,
        })}`}
      >
        <div
          // TODO: recipe
          className={`${bar} ${atoms({
            background: {
              lightMode: state.isSelected ? "pinkOutline" : "gray-200",
              darkMode: state.isSelected ? "pink-900" : "gray-700",
            },
          })}`}
        />
        <div
          // TODO: recipe
          className={`${dot} ${atoms({
            right: state.isSelected ? "none" : "l",
            boxShadow: {
              lightMode: isFocusVisible ? "outline" : "tooltipDotShadow",
              darkMode: isFocusVisible ? "outline" : "none",
            },
            background: {
              lightMode: state.isSelected ? "pink-500" : "white",
              darkMode: state.isSelected ? "pink-500" : "gray-500",
            },
          })}`}
        />
      </div>
    </label>
  );
}
