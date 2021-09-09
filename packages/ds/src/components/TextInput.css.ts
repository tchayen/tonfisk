import { globalStyle, style } from "@vanilla-extract/css";

import { atoms } from "../theme.css";

export const div = atoms({
  display: "flex",
  flexDirection: "column",
});

export const label = atoms({
  fontSize: "12px",
  color: {
    lightMode: "black",
    darkMode: "gray-200",
  },
  fontWeight: "bold",
  marginBottom: "s",
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

// TODO: it doesn't work.
globalStyle("::placeholder", {
  color: "pink-600",
});
