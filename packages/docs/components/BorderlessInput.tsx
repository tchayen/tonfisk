import { useTextField } from "@react-aria/textfield";
import { atoms } from "ds";
import React, { ReactElement, useRef } from "react";

export function BorderlessInput(props): ReactElement {
  const ref = useRef<HTMLInputElement>(null);
  const { inputProps } = useTextField(props, ref);

  return (
    <div className={atoms({ opacity: props.isDisabled ? 0.5 : 1 })}>
      <input
        {...(inputProps as React.InputHTMLAttributes<HTMLInputElement>)}
        ref={ref}
        autoFocus={props.autoFocus}
        className={`${atoms({
          fontFamily: "body",
          fontSize: "18px",
          outline: "none",
          border: "none",
          background: "transparent",
          fontFeatureSettings: "numbers",
          textAlign: "right",
          color: {
            lightMode: "black",
            darkMode: "gray-200",
          },
        })}`}
      />
    </div>
  );
}
