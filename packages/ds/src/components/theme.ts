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

  background: "#FFFFFF",
  primaryText: "#000000",
  secondaryText: "#666666",
  primary: "#1D9BF0",
  pressedButton: "#177CC0",
  hoveredButton: "#34A5F2",
  border: "#DDDDDD",
  outline: "rgba(29, 155, 240, 0.35)",

  modes: {
    light: {
      background: "#FFFFFF",
      primaryText: "#000000",
      secondaryText: "#666666",
      primary: "#1D9BF0",
      pressedButton: "#177CC0",
      hoveredButton: "#34A5F2",
      border: "#DDDDDD",
      outline: "rgba(29, 155, 240, 0.35)",
    },
    dark: {
      background: "#111111",
      primaryText: "#FFFFFF",
      secondaryText: "#888888",
      primary: "#1D9BF0",
      pressedButton: "#177CC0",
      hoveredButton: "#34A5F2",
      border: "#222222",
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
  styles: {
    root: {
      fontFamily: "body",
      color: "secondaryText",
    },
    p: {
      fontSize: 2,
    },
    h1: {
      fontSize: 5,
      color: "primaryText",
      fontWeight: "body",
      m: 0,
    },
    h2: {
      fontSize: 4,
      color: "primaryText",
      fontWeight: "body",
    },
    h3: {
      fontSize: 3,
      color: "primaryText",
      fontWeight: "body",
      m: 0,
    },
    strong: {
      fontWeight: "bold",
      color: "primaryText",
    },
    code: {
      color: "primaryText",
    },
    label: {
      fontFamily: "body",
      fontSize: 0,
      fontWeight: "bold",
      color: "primaryText",
      mb: 1,
    },
  },
  forms: {
    label: {
      fontFamily: "body",
      fontSize: 0,
      fontWeight: "bold",
      color: "primaryText",
      mb: 1,
    },
  },
  buttons: {
    primary: {
      color: "background",
      fontSize: 1,
      height: 4,
      lineHeight: 0,
      borderRadius: 4,
      fontWeight: "body",
      fontFamily: "body",
      outline: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    },
  },
  radii: [0, 2, 4, 8, 16, 1000, "100%"],
};

type A = typeof theme;

declare module "@emotion/react" {
  export interface Theme extends A {}
}

export default theme;
