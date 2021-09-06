import { style } from "@vanilla-extract/css";

import { atoms } from "../theme.css";

export const tag = style([
  atoms({
    color: "black",
    fontSize: "12px",
    fontWeight: "bold",
    background: "pink-300",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
    paddingLeft: "m",
    paddingRight: "m",
  }),
  style({
    height: 20,
    borderRadius: 10,
  }),
]);
