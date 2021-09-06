const palette = {
  blue300: "#61b9f5",
  blue400: "#34a5f2",
  blue500: "#1d9bf0",
  blue600: "#177cc0",
  blue500opacity: "rgba(29, 155, 240, 0.35)",
  white: "#fff",
  whiteOpacity: "rgba(255, 255, 255, 0.3)",
  gray100: "#ddd",
  gray200: "#aaa",
  gray500: "#777",
  gray600: "#666",
  gray800: "#24292e",
  black: "#000",
  blackOpacity: "rgba(0, 0, 0, 0.3)",
};

const colors = {
  modes: {
    light: {
      background: palette.white,
      backgroundOpacity: palette.whiteOpacity,
      primaryText: palette.black,
      secondaryText: palette.gray600,
      primary: palette.blue500,
      pressedButton: palette.blue600,
      hoveredButton: palette.blue400,
      border: palette.gray100,
      outline: palette.blue500opacity,
      tooltipDot: palette.white,
      tagBackground: palette.blue300,
      hoverGray: palette.gray200,
    },
    dark: {
      background: palette.black,
      backgroundOpacity: palette.blackOpacity,
      primaryText: palette.white,
      secondaryText: palette.gray500,
      primary: palette.blue500,
      pressedButton: palette.blue600,
      hoveredButton: palette.blue400,
      border: palette.gray800,
      outline: palette.blue500opacity,
      tooltipDot: palette.gray200,
      tagBackground: palette.blue300,
      hoverGray: palette.gray600,
    },
  },
};

const theme = {
  outline: "0 0 0 3px var(--outline)",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  tooltipDotShadow: "0 1px 3px rgba(0, 0, 0, 0.25)",
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
