import { style } from "@vanilla-extract/css";

import { atoms } from "../theme.css";
import { checkboxLike } from "./Table.css";

export const checkbox = style([
  checkboxLike,
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
