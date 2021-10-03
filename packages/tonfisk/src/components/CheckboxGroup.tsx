import { useCheckboxGroup, useCheckboxGroupItem } from "@react-aria/checkbox";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import {
  CheckboxGroupState,
  useCheckboxGroupState,
} from "@react-stately/checkbox";
import React from "react";
import { createContext, ReactNode } from "react";

import { atoms } from "..";
import { Tick } from "../icons/Tick";
import * as styles from "./Checkbox.css";
import * as labelStyles from "./Label.css";

const CheckboxGroupContext = createContext<CheckboxGroupState | null>(null);

function Checkbox(props: {
  isDisabled?: boolean;
  value: string;
  children: ReactNode;
}) {
  const { children } = props;
  const state = React.useContext(CheckboxGroupContext);
  const ref = React.useRef<HTMLInputElement>(null);
  const { inputProps } = useCheckboxGroupItem(props, state!, ref);
  const { focusProps, isFocusVisible } = useFocusRing();

  const isDisabled = state!.isDisabled || props.isDisabled;
  const isSelected = state!.isSelected(props.value);

  return (
    <label className={styles.label}>
      <input
        {...mergeProps(inputProps, focusProps)}
        ref={ref}
        className={styles.checkbox({
          border: isSelected || isFocusVisible ? "focusVisible" : "default",
          background: isSelected ? "selected" : "default",
          boxShadow: isFocusVisible ? "focusVisible" : "default",
          opacity: isDisabled ? "disabled" : "active",
        })}
      />
      {isSelected && (
        <div className={styles.tick}>
          <Tick />
        </div>
      )}
      <span className={atoms({ marginLeft: "m" })}>{children}</span>
    </label>
  );
}

type Props = {
  /**
   * `<RadioGroup.Radio />` elements.
   */
  children: ReactNode;
  /**
   * Label displayed above the radio group.
   */
  label: string;
  /**
   * TODO
   */
  description?: string;
  /**
   * TODO
   */
  errorMessage?: string;
};

/**
 * CheckboxGroup component.
 *
 * For usage with Formik check [Formik](/docs/guides/formik) guide.
 *
 * ## Usage
 *
 * ```jsx
 * import { CheckboxGroup } from "tonfisk";
 *
 * function CheckboxGroupExample() {
 *   return (
 *     <CheckboxGroup label="Favorite sports">
 *       <CheckboxGroup.Checkbox value="Baseball">Baseball</CheckboxGroup.Checkbox>
 *       <CheckboxGroup.Checkbox value="Basketball">
 *         Basketball
 *       </CheckboxGroup.Checkbox>
 *     </CheckboxGroup>
 *   );
 * }
 *
 * ## Example
 *
 * <CheckboxGroupExample />
 */
export function CheckboxGroup(props: Props): JSX.Element {
  const { children, label } = props;
  const state = useCheckboxGroupState(props);
  const { groupProps, labelProps } = useCheckboxGroup(props, state);

  return (
    <div
      {...groupProps}
      className={atoms({
        display: "flex",
        flexDirection: "column",
      })}
    >
      <span {...labelProps} className={labelStyles.label}>
        {label}
      </span>
      <div
        className={atoms({
          display: "flex",
          flexDirection: "column",
          gap: "m",
        })}
      >
        <CheckboxGroupContext.Provider value={state}>
          {children}
        </CheckboxGroupContext.Provider>
      </div>
    </div>
  );
}

CheckboxGroup.Checkbox = Checkbox;
