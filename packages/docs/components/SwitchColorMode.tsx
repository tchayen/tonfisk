import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import React, { useContext, useEffect, useRef, useState } from "react";
import { atoms } from "tonfisk";
import { ColorModeContext } from "tonfisk/src/Provider";

/**
 * In simpler solution where symbol was set inside the render and there was no
 * conditional rendering, it would error because from server's perspective user
 * is always in default light mode.
 *
 * So in case user visits page for the first time with (prefers-color-scheme: dark)
 * then there will be mismatch between server and client rendered parts.
 *
 * In order to avoid that I am setting symbol only in useEffect, so on server it
 * won't render and it will show up only in the client. div.style is to ensure
 * there won't be content shift in the client.
 */
export function SwitchColorMode(): JSX.Element {
  const { colorMode, setColorMode } = useContext(ColorModeContext);
  const [symbol, setSymbol] = useState<string | null>(null);

  useEffect(() => {
    setSymbol(colorMode === "dark" ? "🌙" : "☀️");
  }, []);

  useEffect(() => {
    setSymbol(colorMode === "dark" ? "🌙" : "☀️");
  }, [colorMode]);

  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(
    {
      onPress: () => {
        setColorMode(colorMode === "dark" ? "light" : "dark");
      },
    },
    ref
  );
  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <div style={{ width: 64, height: 64 }}>
      {symbol && (
        <button
          ref={ref}
          style={{
            color: "transparent",
            fontSize: 32,
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
          {symbol}
        </button>
      )}
    </div>
  );
}
