import { style } from "@vanilla-extract/css";

import { option } from "../ListBox.css";
import { atoms } from "../theme.css";

export const menuPopup = style([
  atoms({
    outline: "none",
    margin: "none",
    padding: "none",
    position: "absolute",
    width: "100%",
    boxShadow: "shadow",
    background: "white",
    border: "regular",
    borderRadius: "8px",
    marginTop: "m",
  }),
  style({
    listStyle: "none",
    zIndex: 100,
    overflow: "hidden",
  }),
]);

export const menuItem = style([option]);

export const menuButton = atoms({
  background: "white",
  borderRadius: "16px",
  border: "regular",
  outline: "none",
  height: "32px",
  fontFamily: "body",
  fontSize: "14px",
  fontWeight: "bold",
  paddingLeft: "l",
  paddingRight: "l",
  lineHeight: 1,
  color: "black",
});
