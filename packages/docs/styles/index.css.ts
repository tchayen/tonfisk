import { style } from "@vanilla-extract/css";
import { atoms } from "ds/src/theme.css";

export const features = style([
  atoms({
    display: "flex",
    gap: "l",
    width: "96ch",
  }),
  style({
    "@media": {
      "screen and (max-width: 96ch)": {
        flexDirection: "column",
      },
    },
  }),
]);
