import { style } from "@vanilla-extract/css";

import { atoms } from "../theme.css";

export const pageButton = style([
  atoms({
    fontFamily: "body",
    height: "32px",
    width: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    fontSize: "14px",
    border: "none",
    cursor: "pointer",
    outline: "none",
  }),
]);

export const directionButton = style([
  atoms({
    color: "black",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: "none",
    fontFamily: "body",
    fontSize: "14px",
    paddingLeft: "m",
    paddingRight: "m",
    borderRadius: "8px",
  }),
  style({
    ":active": {
      background: "gray-300",
    },
  }),
]);

export const rotateLeft = style({
  transform: "rotate(-90deg)",
});

export const rotateRight = style({
  transform: "rotate(90deg)",
});
