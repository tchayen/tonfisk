import { useRadio, useRadioGroup } from "@react-aria/radio";
import { RadioGroupState, useRadioGroupState } from "@react-stately/radio";
import React, { ReactNode } from "react";
import { createContext } from "react";

import { atoms } from "..";
import * as labelStyles from "./Label.css";
import * as styles from "./RadioGroup.css";

const RadioContext = createContext<RadioGroupState | null>(null);

function Radio(props: {
  isDisabled?: boolean;
  value: string;
  children: ReactNode;
}) {
  const { children } = props;
  const state = React.useContext(RadioContext);
  const ref = React.useRef(null);
  const { inputProps } = useRadio(props, state!, ref);

  const isDisabled = state!.isDisabled || props.isDisabled;
  const isSelected = state!.selectedValue === props.value;

  return (
    <label
      className={atoms({
        position: "relative",
        display: "flex",
      })}
    >
      <input
        {...inputProps}
        ref={ref}
        className={styles.radio({
          background: isSelected ? "selected" : "default",
          boxShadow: isSelected ? "selected" : "default",
          opacity: isDisabled ? "disabled" : "active",
        })}
      />
      {isSelected && (
        <div
          className={atoms({
            background: "blue-500",
            position: "absolute",
          })}
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            left: 4,
            top: 4,
          }}
        />
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
 * RadioGroup component.
 *
 * For usage with Formik check [Formik](/docs/guides/formik) guide.
 *
 * ## Usage
 *
 * ```jsx
 * import { RadioGroup } from "tonfisk";
 *
 * function RadioGroupExample() {
 *   return (
 *     <RadioGroup label="Favorite fruit">
 *       <RadioGroup.Radio value="Apple">Apple</RadioGroup.Radio>
 *       <RadioGroup.Radio value="Banana">Banana</RadioGroup.Radio>
 *     </RadioGroup>
 *   );
 * }
 * ```
 *
 * ## Example
 *
 * <RadioGroupExample />
 */
export function RadioGroup(props: Props): JSX.Element {
  const { children, label } = props;
  const state = useRadioGroupState(props);
  const { radioGroupProps, labelProps } = useRadioGroup(props, state);

  return (
    <div
      {...radioGroupProps}
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
        <RadioContext.Provider value={state}>{children}</RadioContext.Provider>
      </div>
    </div>
  );
}

RadioGroup.Radio = Radio;
