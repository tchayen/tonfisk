import { useCheckbox } from "@react-aria/checkbox";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { useToggleState } from "@react-stately/toggle";
import React, { ReactElement, ReactNode, useRef } from "react";

import { Tick } from "../icons/Tick";
import { atoms } from "../theme.css";
import { checkbox, tick } from "./Checkbox.css";

type Props = {
  /**
   * TODO
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
 * import { Checkbox } from "@tchayen/design-system";
 *
 * <Checkbox>Label</Checkbox>
 * ```
 *
 * ## Example
 *
 * <CheckboxExample />
 */
export function Checkbox(props: Props): ReactElement {
  const { children } = props;
  const state = useToggleState(props);
  const ref = useRef(null);
  const { inputProps } = useCheckbox(props, state, ref);
  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <label
      className={atoms({
        display: "flex",
        alignItems: "center",
        position: "relative",
        fontSize: "14px",
      })}
    >
      <input
        {...mergeProps(inputProps, focusProps)}
        ref={ref}
        className={`${checkbox} ${atoms({
          border: state.isSelected || isFocusVisible ? "primary" : "regular",
          background: state.isSelected ? "pink-500" : "white",
          boxShadow: isFocusVisible ? "outline" : "none",
          opacity: props.isDisabled ? 0.5 : 1,
        })}`}
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
