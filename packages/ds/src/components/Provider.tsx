import { OverlayProvider } from "@react-aria/overlays";
import { SSRProvider } from "@react-aria/ssr";
import React, { ReactElement, useEffect } from "react";
import useDarkModeLib from "use-dark-mode";
import { atoms } from "../theme.css";

const toKebabCase = (s: string): string =>
  s.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

const useDarkMode = () => {
  const darkMode = useDarkModeLib(false, {
    storageKey: "color-mode",
    onChange: () => {},
  });

  // useEffect(() => {
  //   const mql = window.matchMedia("(prefers-color-scheme: dark)");
  //   const prefersDarkFromMQ = mql.matches;
  //   const colorMode = prefersDarkFromMQ ? "dark" : "light";

  //   const root = document.documentElement;

  //   Object.entries(theme.colors.modes[colorMode]).forEach(([key, value]) => {
  //     root.style.setProperty(`--${toKebabCase(key)}`, value);
  //   });
  // }, [darkMode, darkMode.value]);
};

type Props = {
  /**
   * All your app code.
   */
  children: React.ReactNode;
};

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
export function Provider({ children }: Props): ReactElement {
  useDarkMode();

  return (
    <SSRProvider>
      <OverlayProvider>
        <div
          // TODO: move to *.css.ts.
          className={atoms({
            background: {
              lightMode: "white",
              darkMode: "gray-900",
            },
            minHeight: "100vh",
          })}
        >
          {children}
        </div>
      </OverlayProvider>
    </SSRProvider>
  );
}
