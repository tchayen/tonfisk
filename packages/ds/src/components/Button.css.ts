import { style } from "@vanilla-extract/css";

import { atoms } from "../theme.css";

const basicButton = atoms({
  border: "none",
  outline: "none",
  fontFamily: "body",
  fontSize: "14px",
  fontWeight: "bold",
  paddingLeft: "l",
  paddingRight: "l",
  height: "32px",
  lineHeight: 1,
  borderRadius: "16px",
  color: "white",
});

export const button = style([
  basicButton,
  style({
    ":active": {
      background: "pink-600",
    },
  }),
]);
