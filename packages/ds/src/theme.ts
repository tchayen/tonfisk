const colors = {
  blue300: "#61B9F5",
  blue400: "#34A5F2",
  blue500: "#1D9BF0",
  blue600: "#177CC0",
  blue500opacity: "rgba(29, 155, 240, 0.35)",
  white: "#FFFFFF",
  gray100: "#DDDDDD",
  gray200: "#AAAAAA",
  gray600: "#666666",
  black: "#000000",

  modes: {
    light: {
      background: "#fff",
      primaryText: "#000",
      secondaryText: "#666",
      primary: "#1d9bf0",
      pressedButton: "#177cc0",
      hoveredButton: "#34a5f2",
      border: "#ddd",
      outline: "rgba(29, 155, 240, 0.35)",
    },
    dark: {
      background: "#000",
      primaryText: "#fff",
      secondaryText: "#888",
      primary: "#1d9bf0",
      pressedButton: "#177cc0",
      hoveredButton: "#34a5f2",
      border: "#222",
      outline: "rgba(29, 155, 240, 0.35)",
    },
  },
};

const theme = {
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  sizes: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  lineHeights: [1],
  fonts: {
    body: "Inter var",
  },
  fontSizes: [12, 14, 16, 20, 24, 32],
  fontWeights: {
    body: 400,
    bold: 600,
  },
  colors,
  radii: [0, 2, 4, 8, 16, 1000, "100%"],
};

export type TTheme = typeof theme;

declare module "@emotion/react" {
  export interface Theme extends TTheme {}
}

export default theme;
