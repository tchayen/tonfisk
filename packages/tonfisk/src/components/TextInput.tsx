import { useTextField } from "@react-aria/textfield";
import React, { FocusEvent, useRef, useState } from "react";

import { atoms } from "..";
import colors from "../colors";
import { Label } from "./Label";
import * as styles from "./TextInput.css";

type Props = {
  /**
   * Placeholder dislayed inside the input when it is empty.
   */
  placeholder?: string;
  /**
   * Label displayed above the input.
   */
  label?: string;
  /**
   * Whether user can interact with the input.
   */
  isDisabled?: boolean;
  /**
   * Whether input should focus on mount.
   */
  autoFocus?: boolean;
  /**
   * Callback called when value of the input changes.
   */
  onChange?: (value: string) => void;
  /**
   * Callback called when input gains focus.
   */
  onFocus?: (event: React.FocusEvent) => void;
  /**
   * Callback called when input loses focus.
   */
  onBlur?: (event: React.FocusEvent) => void;
  /**
   * Value of the input in case user wants to control it from outside of the component.
   */
  value?: string;
  /**
   * Callback called when key is pressed. Can be used for example to learn when enter key is pressed.
   */
  onKeyPress?: (event: React.KeyboardEvent) => void;
  /**
   * TODO
   */
  description?: string;
  /**
   * TODO
   */
  errorMessage?: string;
  /**
   * Value used to describe the table to screen readers. Required if `label` is missing.
   */
  "aria-label"?: string;
};

/**
 * Input component.
 *
 * For usage with Formik check [Formik](/docs/guides/formik) guide.
 *
 * ## Usage
 *
 * ```jsx
 * import { TextInput } from "tonfisk";
 *
 * function TextInputExample() {
 *   return <TextInput label="First name" placeholder="John" />;
 * }
 * ```
 *
 * ## Example
 *
 * <TextInput
 *   label="First name"
 *   placeholder="John"
 *   description="Your first name as in the official documents."
 *   errorMessage="This seems to be incorrect."
 * />
 */
export function TextInput(props: Props): JSX.Element {
  const { label, description, errorMessage } = props;
  const ref = useRef<HTMLInputElement>(null);
  const { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(props, ref);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (event: FocusEvent) => {
    setIsFocused(true);
    if (props.onFocus) {
      props.onFocus(event);
    }
  };

  const handleBlur = (event: FocusEvent) => {
    setIsFocused(false);
    if (props.onBlur) {
      props.onBlur(event);
    }
  };

  return (
    <div
      className={styles.div({
        opacity: props.isDisabled ? "disabled" : "default",
      })}
    >
      {label && <Label {...labelProps}>{label}</Label>}
      <input
        {...(inputProps as React.InputHTMLAttributes<HTMLInputElement>)}
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoFocus={props.autoFocus}
        onKeyPress={props.onKeyPress}
        className={styles.input({
          boxShadow: isFocused ? "focused" : "default",
        })}
      />
      {description && (
        <div
          {...descriptionProps}
          className={atoms({
            fontSize: "14px",
            color: {
              lightMode: "gray-600",
              darkMode: "gray-400",
            },
          })}
        >
          {description}
        </div>
      )}
      {errorMessage && (
        <div
          {...errorMessageProps}
          className={atoms({ fontSize: "14px" })}
          style={{ color: colors.red[500] }}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
}
