import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { atoms } from "tonfisk/src/theme.css";

export const bar = atoms({
  borderRadius: "4px",
  height: "4px",
  width: "32px",
  background: {
    lightMode: "gray-300",
    darkMode: "gray-700",
  },
});

export const hamburger = recipe({
  base: [
    style({ width: "48px", height: "48px" }),
    atoms({
      background: "transparent",
      border: "none",
      cursor: "pointer",
      display: {
        desktop: "none",
        mobile: "flex",
      },
      flexDirection: "column",
      justifyContent: "center",
      borderRadius: "full",
      gap: "s",
      position: "fixed",
      top: "xl",
      right: "xl",
      outline: "none",
      zIndex: 1000,
      padding: "m",
    }),
  ],
  variants: {
    boxShadow: {
      focusVisible: atoms({ boxShadow: "outline" }),
      default: atoms({ boxShadow: "none" }),
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
    lightMode: "white",
    darkMode: "gray-900",
  },
});

export const modalDiv = atoms({
  width: "100%",
  height: "100%",
  padding: "xl",
  overflowY: "scroll",
});

export const closeButton = recipe({
  base: [
    style({ width: "48px", height: "48px" }),
    atoms({
      borderRadius: "full",
      cursor: "pointer",
      padding: "m",
      border: "none",
      background: "transparent",
      outline: "none",
      position: "fixed",
      top: "xl",
      right: "xl",
    }),
  ],
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

export const closeIcon = atoms({
  width: "32px",
  height: "32px",
});

export const closeBar = atoms({
  borderRadius: "4px",
  height: "4px",
  width: "32px",
  background: {
    lightMode: "gray-300",
    darkMode: "gray-700",
  },
  position: "absolute",
});
