/** @jsxRuntime classic */
/** @jsx jsx */
import { useTextField } from "@react-aria/textfield";
import { AriaTextFieldProps } from "@react-types/textfield";
import { ReactElement, useRef, useState } from "react";
import { get, jsx } from "theme-ui";
import { Label } from "theme-ui";

import * as consts from "../consts";

type Props = AriaTextFieldProps;

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
    <div
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Label {...labelProps}>{label}</Label>
      <input
        {...(inputProps as React.InputHTMLAttributes<HTMLInputElement>)}
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
        sx={{
          bg: "background",
          color: "primaryText",
          paddingLeft: `${consts.inputPaddings}px`,
          paddingRight: `${consts.inputPaddings}px`,
          fontSize: `${consts.text.normal.fontSize}px`,
          fontFamily: `${consts.fontFamily}`,
          height: `${consts.fieldHeight}px`,
          borderRadius: `${consts.fieldRadius}px`,
          border: (t) => `1px solid
            ${isFocused ? get(t, "colors.primary") : get(t, "colors.border")}`,
          boxShadow: (t) =>
            isFocused ? `0 0 0 3px ${get(t, "colors.outline")}` : "none",
          outline: "none",
          "::placeholder": {
            color: "secondaryText",
          },
        }}
      />
    </div>
  );
}
