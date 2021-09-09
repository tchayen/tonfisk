import { style } from "@vanilla-extract/css";

import { atoms } from "../theme.css";

export const tooltipBox = style([
  atoms({
    position: "absolute",
    left: 0,
    fontSize: "12px",
    padding: "s",
    borderRadius: "4px",
    border: {
      lightMode: "regular",
      darkMode: "regularDark",
    },
    color: "gray-600",
    background: {
      lightMode: "white",
      darkMode: "gray-900",
    },
  }),
  style({
    top: "calc(100% + 8px)",
  }),
]);

export const tooltipSpan = atoms({ position: "relative" });

export const tooltipButton = atoms({
  fontFamily: "body",
  background: "transparent",
  appearance: "none",
  border: "none",
  outline: "none",
});