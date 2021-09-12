import { style } from "@vanilla-extract/css";

import { option } from "../ListBox.css";
import { atoms } from "../theme.css";
import { inputLike } from "./TextInput.css";

export const menuPopup = style([
  atoms({
    outline: "none",
    margin: "none",
    padding: "none",
    position: "absolute",
    width: "100%",
    boxShadow: "shadow",
    background: {
      lightMode: "white",
      darkMode: "gray-900",
    },
    border: {
      lightMode: "regular",
      darkMode: "regularDark",
    },
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

export const menuButton = style([
  inputLike,
  atoms({
    display: "flex",
    alignItems: "center",
    borderRadius: "full",
    fontWeight: "bold",
    paddingLeft: "l",
    paddingRight: "l",
    lineHeight: 1,
  }),
]);
