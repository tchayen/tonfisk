import { style } from "@vanilla-extract/css";

import { atoms } from "../theme.css";
import { inputLike } from "./TextInput.css";
import { label as labelBase } from "./TextInput.css";

export const select = atoms({
  position: "relative",
  display: "inline-block",
});

export const label = style([
  labelBase,
  atoms({
    display: "block",
  }),
]);

export const span = atoms({
  position: "absolute",
  right: "m",
});

export const button = style([
  inputLike,
  atoms({
    paddingLeft: "m",
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
    cursor: "pointer",
  }),
  style({
    WebkitAppearance: "none",
    paddingRight: `${8 * 2 + 14}px`, // 14 is the width of the chevron,
  }),
]);
