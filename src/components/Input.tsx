/** @jsx jsx */
import { get, jsx } from "theme-ui";
import { useRef, useState } from "react";
import { useTextField } from "@react-aria/textfield";
import { AriaTextFieldProps } from "@react-types/textfield";
import * as consts from "../consts";
import { Label } from "theme-ui";

type Props = {} & AriaTextFieldProps;

export default function Input(props: Props) {
  let { label } = props;
  let ref = useRef<HTMLInputElement>(null);
  let { labelProps, inputProps } = useTextField(props, ref);
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
          paddingLeft: `${consts.inputPaddings}px`,
          paddingRight: `${consts.inputPaddings}px`,
          fontSize: `${consts.text.normal.fontSize}px`,
          fontFamily: `${consts.fontFamily}`,
          height: `${consts.fieldHeight}px`,
          borderRadius: `${consts.fieldRadius}px`,
          border: (t) => `1px solid
            ${isFocused ? get(t, "colors.blue500") : get(t, "colors.gray100")}`,
          boxShadow: (t) =>
            isFocused ? `0 0 0 3px ${get(t, "colors.blue500opacity")}` : "none",
          outline: "none",
        }}
      />
    </div>
  );
}
