import { ThemeProvider } from "@emotion/react";
import { OverlayProvider } from "@react-aria/overlays";
import { SSRProvider } from "@react-aria/ssr";
import React, { ReactElement } from "react";

import theme from "./theme";

/**
 * Provider component.
 */
export function Provider({
  children,
}: {
  children?: React.ReactNode;
}): ReactElement {
  return (
    <SSRProvider>
      <ThemeProvider theme={theme}>
        <OverlayProvider>{children}</OverlayProvider>
      </ThemeProvider>
    </SSRProvider>
  );
}