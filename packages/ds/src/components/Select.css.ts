import { style } from "@vanilla-extract/css";

import { atoms } from "../theme.css";

export const select = atoms({
  position: "relative",
  display: "inline-block",
});

export const label = atoms({
  fontSize: "14px",
  color: "black",
  fontWeight: "bold",
  marginBottom: "s",
  display: "block",
});

export const span = atoms({
  position: "absolute",
  right: "m",
});

export const button = style([
  atoms({
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "32px",
    fontSize: "14px",
    borderRadius: "8px",
    paddingLeft: "m",
    fontFamily: "body",
    outline: "none",
    background: "white",
    position: "relative",
    cursor: "pointer",
  }),
  style({
    WebkitAppearance: "none",
    paddingRight: `${8 * 2 + 14}px`, // 14 is the width of the chevron,
  }),
]);
