import { useTextField } from "@react-aria/textfield";
import React, { useRef } from "react";
import { atoms } from "tonfisk";

type Props = {
  isDisabled?: boolean;
  autoFocus?: boolean;
  placeholder: string;
};

export function BorderlessInput(props: Props): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);
  const { inputProps } = useTextField(props, ref);

  return (
    // TODO: extract styles.
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
