const colors = {
  blue300: "#61B9F5",
  blue400: "#34A5F2",
  blue500: "#1D9BF0",
  blue600: "#177CC0",
  blue500opacity: "rgba(29, 155, 240, 0.35)",
  white: "#FFFFFF",
  gray100: "#DDDDDD",
  gray200: "#AAAAAA",
  gray600: "#555555",
  black: "#000000",
};

export default {
  breakpoints: ["40em", "52em", "64em"],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  sizes: [0, 4, 8, 16, 32, 64, 128, 256, 512],
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
      color: "gray600",
    },
  },
  forms: {
    label: {
      fontFamily: "body",
      fontSize: 0,
      fontWeight: "bold",
      color: "black",
      mb: 1,
    },
  },
  buttons: {
    primary: {
      color: "white",
      fontSize: 2,
      height: 4,
      fontWeight: "bold",
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
