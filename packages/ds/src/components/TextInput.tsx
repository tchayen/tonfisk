import { useTextField } from "@react-aria/textfield";
import React, { ReactElement, useRef, useState } from "react";

import { atoms } from "../theme.css";
import { label as labelClass } from "./Label.css";
import { div, input } from "./TextInput.css";

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
};

/**
 * Input component.
 *
 * ## Usage
 *
 * ```jsx
 * import { TextInput } from "ds";
 *
 * <TextInput label="First name" placeholder="John" />
 * ```
 *
 * ## Example
 *
 * <TextInput label="First name" placeholder="John" />
 */
export function TextInput(props: Props): ReactElement {
  const { label } = props;
  const ref = useRef<HTMLInputElement>(null);
  const { labelProps, inputProps } = useTextField(props, ref);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={`${div} ${atoms({ opacity: props.isDisabled ? 0.5 : 1 })}`}>
      <label {...labelProps} className={labelClass}>
        {label}
      </label>
      <input
        {...(inputProps as React.InputHTMLAttributes<HTMLInputElement>)}
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoFocus={props.autoFocus}
        className={`${input} ${atoms({
          border: {
            lightMode: isFocused ? "primary" : "regular",
            darkMode: isFocused ? "primary" : "regularDark",
          },
          boxShadow: {
            lightMode: isFocused ? "outline" : "none",
            darkMode: isFocused ? "outline" : "none",
          },
        })}`}
      />
    </div>
  );
}
