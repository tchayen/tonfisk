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
  const darkMode = useDarkModeLib(false, { storageKey: null, onChange: null });

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

/**
 * Provider component.
 */
export function Provider({
  children,
}: {
  children?: React.ReactNode;
}): ReactElement {
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
          }}
        />
        <OverlayProvider>{children}</OverlayProvider>
      </ThemeProvider>
    </SSRProvider>
  );
}
