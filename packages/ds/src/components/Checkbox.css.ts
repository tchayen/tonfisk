import { style } from "@vanilla-extract/css";

import { atoms } from "../theme.css";

export const checkbox = style([
  atoms({
    height: "16px",
    minWidth: "16px",
    borderRadius: "4px",
    margin: "none",
    outline: "none",
  }),
  style({
    WebkitAppearance: "none",
  }),
]);

export const tick = style([
  atoms({
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "16px",
  }),
  style({
    top: 0,
  }),
]);
