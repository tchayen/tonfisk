import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { atoms } from "ds";
import { ColorModeContext } from "ds/src/Provider";
import React, { useContext, useRef } from "react";
import { useState } from "react";

export function SwitchColorMode(): JSX.Element {
  const { colorMode, setColorMode } = useContext(ColorModeContext);

  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps, isPressed } = useButton(
    {
      onPress: () => {
        setColorMode(colorMode === "dark" ? "light" : "dark");
      },
    },
    ref
  );
  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <button
      ref={ref}
      style={{
        color: "transparent",
        fontSize: 20,
      }}
      className={atoms({
        background: "transparent",
        border: "none",
        cursor: "pointer",
        outline: "none",
        borderRadius: "full",
        padding: "m",
        margin: "m",
        lineHeight: 1,
        textShadow: colorMode === "dark" ? "dark" : "light",
        boxShadow: isFocusVisible ? "outline" : "none",
      })}
      {...mergeProps(buttonProps, focusProps)}
    >
      {colorMode === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
