import { OverlayProvider } from "@react-aria/overlays";
import { SSRProvider } from "@react-aria/ssr";
import React, { ReactNode } from "react";

type Props = {
  /**
   * All your app code.
   */
  children: ReactNode;
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
export function Provider({ children }: Props): JSX.Element {
  return (
    <SSRProvider>
      <OverlayProvider>{children}</OverlayProvider>
    </SSRProvider>
  );
}
