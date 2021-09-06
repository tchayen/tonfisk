import { globalStyle } from "@vanilla-extract/css";

import { atoms } from "../theme.css";

export const div = atoms({
  display: "flex",
  flexDirection: "column",
});

export const label = atoms({
  fontSize: "12px",
  color: "black",
  fontWeight: "bold",
  marginBottom: "s",
});

export const input = atoms({
  height: "32px",
  fontSize: "14px",
  borderRadius: "8px",
  fontFamily: "body",
  outline: "none",
  background: "white",
  paddingLeft: "m",
  paddingRight: "m",
  color: "black",
});

// TODO: it doesn't work.
globalStyle("::placeholder", {
  color: "pink-600",
});
