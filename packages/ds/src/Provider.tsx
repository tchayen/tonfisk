import { OverlayProvider } from "@react-aria/overlays";
import { SSRProvider } from "@react-aria/ssr";
import React, { createContext, ReactNode, useState } from "react";

type Props = {
  /**
   * All your app code.
   */
  children: ReactNode;
};

type ColorMode = "light" | "dark";
const themeKey = "colorMode";

type ColorModeContextValues = {
  colorMode: ColorMode | null;
  setColorMode: (colorMode: ColorMode) => void;
};

export const ColorModeContext = createContext<ColorModeContextValues>({
  colorMode: null,
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
 * import { Provider } from "TODO_LIB_NAME";
 *
 * <Provider>
 *   // Your app here.
 * </Provider>
 * ```
 */
export function Provider({ children }: Props): JSX.Element {
  const [colorMode, setColorMode] = useState<ColorMode>(initialValue);

  const setter = (c: ColorMode) => {
    setColorMode(c);

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(c);

    try {
      localStorage.setItem(themeKey, c);
    } catch (error) {}
  };

  return (
    <div className={colorMode || ""}>
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
    </div>
  );
}
