import { style } from "@vanilla-extract/css";

import { atoms } from "../theme.css";
import { buttonLike } from "./Button.css";

export const pageButton = style([
  buttonLike,
  atoms({
    width: "32px",
    cursor: "pointer",
    borderRadius: "8px",
  }),
]);

export const directionButton = style([
  buttonLike,
  atoms({
    paddingLeft: "l",
    paddingRight: "l",
    borderRadius: "16px",
    background: {
      lightMode: "gray-200",
      darkMode: "gray-600",
    },
    color: {
      lightMode: "black",
      darkMode: "gray-200",
    },
    gap: "m",
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
