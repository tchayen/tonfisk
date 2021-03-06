import { recipe } from "@vanilla-extract/recipes";

import { atoms } from "../theme.css";

export const closeButton = recipe({
  base: atoms({
    padding: "m",
    borderRadius: "16px",
    width: "32px",
    height: "32px",
    cursor: "pointer",
    border: "none",
    background: "transparent",
    outline: "none",
  }),
  variants: {
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

export const fullPageDiv = atoms({
  position: "fixed",
  zIndex: 100000,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: {
    lightMode: "backdropLight",
    darkMode: "backdropDark",
  },
});

export const modalDiv = atoms({
  background: {
    lightMode: "white",
    darkMode: "gray-900",
  },
  overflow: "hidden",
  borderRadius: "8px",
  width: "48ch",
  border: {
    lightMode: "none",
    darkMode: "regularDark",
  },
  margin: {
    mobile: "l",
  },
  boxShadow: "shadow",
  outline: "none",
});

export const titleRow = atoms({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingRight: "m",
});

export const title = atoms({
  color: {
    lightMode: "black",
    darkMode: "gray-200",
  },
  margin: "l",
});
