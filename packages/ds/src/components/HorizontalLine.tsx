/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";

export const HorizontalLine = () => {
  const theme = useTheme();
  return (
    <div css={{ background: theme.colors.border, width: "100%", height: 1 }} />
  );
};
