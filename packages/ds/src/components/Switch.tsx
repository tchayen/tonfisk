import { useFocusRing } from "@react-aria/focus";
import { useSwitch } from "@react-aria/switch";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useToggleState } from "@react-stately/toggle";
import React, { ReactElement, useRef } from "react";

import { atoms } from "../theme.css";
import { bar, dot, label, wrapper } from "./Switch.css";

type Props = {
  /**
   * TODO
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
 * <Switch>Label</Switch>
 */
export function Switch(props: Props): ReactElement {
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
        className={`${wrapper} ${atoms({
          opacity: props.isDisabled ? 0.5 : 1,
        })}`}
      >
        <div
          className={`${bar} ${atoms({
            background: {
              lightMode: state.isSelected ? "pinkOutline" : "gray-200",
              darkMode: state.isSelected ? "pink-900" : "gray-700",
            },
          })}`}
        />
        <div
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
