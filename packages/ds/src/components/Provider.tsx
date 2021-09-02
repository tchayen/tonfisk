import { ThemeProvider } from "@emotion/react";
import { Global } from "@emotion/react";
import { OverlayProvider } from "@react-aria/overlays";
import { SSRProvider } from "@react-aria/ssr";
import React, { ReactElement, useEffect } from "react";
import useDarkModeLib from "use-dark-mode";

import theme from "../theme";

const toKebabCase = (s: string): string =>
  s.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

const useDarkMode = () => {
  const darkMode = useDarkModeLib(false, {
    storageKey: "color-mode",
    onChange: () => {},
  });

  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const prefersDarkFromMQ = mql.matches;
    const colorMode = prefersDarkFromMQ ? "dark" : "light";

    const root = document.documentElement;

    Object.entries(theme.colors.modes[colorMode]).forEach(([key, value]) => {
      root.style.setProperty(`--${toKebabCase(key)}`, value);
    });
  }, [darkMode, darkMode.value]);

  return null;
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
 * import { Provider } from "@tchayen/design-system";
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
      <ThemeProvider theme={theme}>
        <Global
          styles={{
            body: {
              backgroundColor: "var(--background)",
              color: "var(--secondary-text)",
            },
            h1: {
              color: "var(--primary-text)",
              fontWeight: theme.fontWeights.body,
            },
            h2: {
              color: "var(--primary-text)",
              fontWeight: theme.fontWeights.body,
            },
            h3: {
              color: "var(--primary-text)",
              fontWeight: theme.fontWeights.body,
            },
            strong: {
              color: "var(--primary-text)",
              fontWeight: theme.fontWeights.bold,
            },
            code: {
              fontSize: 14,
              fontFamily:
                "SF Mono, Menlo, Consolas, Liberation Mono, monospace",
              color: "var(--primary-text)",
              background: "var(--border)",
              padding: "2px 4px",
              borderRadius: theme.radii[2],
            },
            "::selection": {
              color: "var(--primary-text)",
              background: "var(--primary)",
            },
          }}
        />
        <OverlayProvider>{children}</OverlayProvider>
      </ThemeProvider>
    </SSRProvider>
  );
}
