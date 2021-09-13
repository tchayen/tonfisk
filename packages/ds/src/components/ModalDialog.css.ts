import { style } from "@vanilla-extract/css";

import { atoms } from "../theme.css";

export const closeButton = style([
  atoms({
    padding: "m",
    borderRadius: "16px",
    width: "32px",
    height: "32px",
    cursor: "pointer",
    border: "none",
    background: "transparent",
    outline: "none",
  }),
  style({
    ":hover": {
      background: "gray-200",
    },
  }),
]);

export const fullPageDiv = style([
  atoms({
    position: "fixed",
    zIndex: 100000,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  style({
    background: "rgba(0, 0, 0, 0.2)",
    // backdropFilter: "blur(30px)",
  }),
]);

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
  boxShadow: "shadow",
  outline: "none",
});
