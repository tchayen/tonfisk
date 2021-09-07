import { style } from "@vanilla-extract/css";

import { atoms } from "../theme.css";

export const buttonLike = atoms({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  outline: "none",
  fontFamily: "body",
  fontSize: "14px",
  fontWeight: "bold",
  lineHeight: 1,
  height: "32px",
});

const basicButton = atoms({
  paddingLeft: "l",
  paddingRight: "l",
  borderRadius: "16px",
  color: "white",
});

export const button = style([
  buttonLike,
  basicButton,
  style({
    ":active": {
      background: "pink-600",
    },
  }),
]);
