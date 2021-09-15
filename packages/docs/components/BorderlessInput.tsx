import { useTextField } from "@react-aria/textfield";
import { atoms } from "ds";
import React, { useRef } from "react";

export function BorderlessInput(props): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);
  const { inputProps } = useTextField(props, ref);

  return (
    <div
      className={atoms({
        opacity: props.isDisabled ? 0.5 : 1,
        display: "flex",
        width: "64px",
      })}
    >
      <input
        {...(inputProps as React.InputHTMLAttributes<HTMLInputElement>)}
        ref={ref}
        autoFocus={props.autoFocus}
        className={`${atoms({
          width: "64px",
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
