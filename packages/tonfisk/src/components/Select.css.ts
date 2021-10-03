import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { atoms } from "../theme.css";
import { inputLike } from "./TextInput.css";

export const select = atoms({
  position: "relative",
  display: "inline-flex",
  flexDirection: "column",
  gap: "s",
});

export const span = style([
  atoms({
    position: "absolute",
    right: "m",
  }),
  style({
    top: 6,
  }),
]);

const button = style([
  inputLike,
  atoms({
    paddingLeft: "m",
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
    cursor: "pointer",
    WebkitAppearance: "none",
    border: "none",
  }),
  style({
    paddingRight: `${8 * 2 + 14}px`, // 14 is the width of the chevron,
  }),
]);

export const selectButton = recipe({
  base: button,
  variants: {
    boxShadow: {
      focusVisible: atoms({
        boxShadow: "primary",
      }),
      default: atoms({
        boxShadow: {
          lightMode: "regularBorder",
          darkMode: "darkBorder",
        },
      }),
    },
    color: {
      selected: atoms({
        color: {
          lightMode: "black",
          darkMode: "gray-200",
        },
      }),
      empty: atoms({
        color: {
          lightMode: "gray-600",
          darkMode: "gray-400",
        },
      }),
    },
    opacity: {
      disabled: atoms({ opacity: 0.5 }),
      active: atoms({ opacity: 1 }),
    },
  },
});
