import { OverlayProvider } from "@react-aria/overlays";
import { SSRProvider } from "@react-aria/ssr";
import React, { createContext, ReactNode, useEffect, useState } from "react";

type Props = {
  /**
   * All your app code.
   */
  children: ReactNode;
};

export type ColorMode = "light" | "dark";
const themeKey = "colorMode";

type ColorModeContextValues = {
  colorMode: ColorMode;
  setColorMode: (colorMode: ColorMode) => void;
};

export const ColorModeContext = createContext<ColorModeContextValues>({
  colorMode: "light",
  // eslint-disable-next-line
  setColorMode: () => {},
});

const initialValue =
  typeof localStorage !== "undefined"
    ? (localStorage.getItem(themeKey) as ColorMode) || "light"
    : "light";

/**
 * Provider that is required for the design system to work. Call it in your main `App` component.
 *
 *  ## Usage
 *
 * ```jsx
 * import { TonfiskProvider } from "tonfisk";
 *
 * <TonfiskProvider>
 *   // Your app here.
 * </TonfiskProvider>
 * ```
 */
export function TonfiskProvider({ children }: Props): JSX.Element {
  const [colorMode, setColorMode] = useState<ColorMode>(initialValue);

  const setter = (c: ColorMode) => {
    setColorMode(c);

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(c);

    try {
      localStorage.setItem(themeKey, c);
      // eslint-disable-next-line
    } catch (error) {}
  };

  useEffect(() => {
    setter(colorMode);
  }, []);

  const handleChange = ({ matches }: MediaQueryListEvent) => {
    setter(matches ? "dark" : "light");
  };

  useEffect(() => {
    const darkMode = window.matchMedia("(prefers-color-scheme: dark)");
    darkMode.addEventListener("change", handleChange);
    return () => {
      darkMode.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <SSRProvider>
      <ColorModeContext.Provider
        value={{
          colorMode,
          setColorMode: setter,
        }}
      >
        <OverlayProvider>{children}</OverlayProvider>
      </ColorModeContext.Provider>
    </SSRProvider>
  );
}
