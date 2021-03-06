import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { atoms } from "tonfisk/src/theme.css";

export const centered = atoms({
  width: {
    desktop: "1100px",
    mobile: "100%",
  },
});

export const accordion = atoms({
  cursor: "pointer",
  marginTop: "xl",
  margin: "s",
  padding: "m",
  borderRadius: "8px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const h3 = atoms({
  color: {
    lightMode: "black",
    darkMode: "gray-200",
  },
});

export const sidebar = atoms({
  position: "fixed",
  width: "256px",
  height: "100vh",
  top: 0,
  bottom: 0,
  paddingTop: "xl",
  paddingBottom: "xl",
  overflowY: "scroll",
  display: {
    desktop: "block",
    mobile: "none",
  },
});

export const content = atoms({
  padding: "xl",
  paddingTop: "none",
  paddingRight: {
    desktop: "none",
    mobile: "xl",
  },
  marginRight: "none",
  marginLeft: {
    desktop: "4xl",
    mobile: "none",
  },
});

export const link = recipe({
  base: [
    atoms({
      fontSize: "16px",
      borderRadius: "8px",
      margin: "s",
      height: "32px",
      paddingLeft: "m",
      paddingRight: "m",
      display: "flex",
      alignItems: "center",
      outline: "none",
    }),
    style({
      transition: "background 0.1s ease-out",
    }),
  ],
  variants: {
    color: {
      active: atoms({
        color: "white",
      }),
      hovered: atoms({
        color: {
          lightMode: "black",
          darkMode: "gray-200",
        },
      }),
      default: atoms({
        color: {
          lightMode: "gray-600",
          darkMode: "gray-400",
        },
      }),
    },
    background: {
      active: atoms({
        background: "blue-500",
      }),
      hovered: atoms({
        background: "blueOutline",
      }),
      default: atoms({
        background: "transparent",
      }),
    },
    boxShadow: {
      focusVisible: atoms({
        boxShadow: "outline",
      }),
      default: atoms({
        boxShadow: "none",
      }),
    },
  },
});

export const flex = atoms({
  display: "flex",
});

export const column = atoms({
  display: "flex",
  flexDirection: "column",
});
