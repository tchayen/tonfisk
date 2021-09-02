/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import { ReactNode } from "react";
import { ReactElement } from "react";

type Props = {
  /**
   *
   */
  children: ReactNode;
};

/**
 * Card component.
 */
export function Card(props: Props): ReactElement {
  const theme = useTheme();
  const { radii } = theme;
  return (
    <div
      css={{
        borderRadius: radii[3],
        border: "1px solid var(--border)",
      }}
    >
      {props.children}
    </div>
  );
}
