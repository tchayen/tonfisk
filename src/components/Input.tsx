import React, { useRef, useState } from "react";
import { useTextField } from "@react-aria/textfield";
import { AriaTextFieldProps } from "@react-types/textfield";
import * as colors from "../colors";
import * as consts from "../consts";

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
      style={{
        display: "flex",
        flexDirection: "column",
        width: 200,
      }}
    >
      <label {...labelProps} style={{ ...consts.text.label, marginBottom: 4 }}>
        {label}
      </label>
      <input
        {...(inputProps as React.InputHTMLAttributes<HTMLInputElement>)}
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          paddingLeft: consts.inputPaddings,
          paddingRight: consts.inputPaddings,
          fontSize: consts.text.normal.fontSize,
          fontFamily: consts.fontFamily,
          height: consts.fieldHeight,
          borderRadius: consts.fieldRadius,
          border: `1px solid ${isFocused ? colors.blue500 : colors.gray100}`,
          boxShadow: isFocused
            ? `0 0 0 3px ${colors.purple500opacity}`
            : "none",
          outline: "none",
        }}
      />
    </div>
  );
}
