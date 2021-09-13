import { style } from "@vanilla-extract/css";

import { atoms } from "../theme.css";

export const tooltipBox = style([
  atoms({
    position: "absolute",
    left: 0,
    fontSize: "14px",
    padding: "m",
    borderRadius: "4px",
    border: {
      lightMode: "regular",
      darkMode: "regularDark",
    },
    color: {
      lightMode: "gray-600",
      darkMode: "gray-400",
    },
    background: {
      lightMode: "white",
      darkMode: "gray-900",
    },
  }),
  style({
    top: "calc(100% + 16px)",
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
