import React, { useRef } from "react";
import { AriaButtonProps } from "@react-types/button";
import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import * as colors from "../colors";

// TODO:
// docs

type Props = {
  isDisabled?: boolean;
  children: string;
  secondary?: boolean;
} & AriaButtonProps;

const Button = (props: Props) => {
  const ref = useRef(null);
  const { buttonProps, isPressed } = useButton(props, ref);
  const { focusProps, isFocusVisible } = useFocusRing();

  // TODO:
  // - hover
  // - focus
  // - active
  // - no double click on mobile

  return (
    <button
      ref={ref}
      style={{
        padding: "0 12px",
        background: colors.blue500,
        color: colors.white,
        height: 32,
        borderRadius: 16,
        fontFamily: "Inter var",
        fontSize: 16,
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        border: "none",
        boxShadow: isFocusVisible
          ? `0 0 0 3px ${colors.purple500opacity}`
          : "none",
        outline: "none",
      }}
      {...mergeProps(focusProps, buttonProps)}
    >
      {props.children}
    </button>
  );
};

export default Button;
