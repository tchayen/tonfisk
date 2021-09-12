import { style } from "@vanilla-extract/css";

import { atoms } from "../theme.css";

export const div = atoms({
  display: "flex",
  flexDirection: "column",
});

export const inputLike = atoms({
  height: "32px",
  fontSize: "14px",
  borderRadius: "8px",
  fontFamily: "body",
  outline: "none",
  background: {
    lightMode: "white",
    darkMode: "gray-900",
  },
  color: {
    lightMode: "black",
    darkMode: "gray-200",
  },
});

export const input = style([
  inputLike,
  atoms({
    paddingLeft: "m",
    paddingRight: "m",
  }),
]);
