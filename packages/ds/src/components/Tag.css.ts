import { style } from "@vanilla-extract/css";

import { atoms } from "../theme.css";

export const tag = style([
  atoms({
    color: {
      lightMode: "black",
      darkMode: "gray-200",
    },
    fontSize: "12px",
    fontWeight: "bold",
    background: {
      lightMode: "pink-300",
      darkMode: "pink-800",
    },
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
