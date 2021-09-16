import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { atoms } from "../theme.css";

export const checkboxLike = atoms({
  height: "16px",
  minWidth: "16px",
  borderRadius: "4px",
  margin: "none",
  outline: "none",
  WebkitAppearance: "none",
});

export const label = atoms({
  display: "flex",
  alignItems: "center",
  position: "relative",
  fontSize: "14px",
  color: {
    lightMode: "gray-600",
    darkMode: "gray-400",
  },
});

export const checkbox = recipe({
  base: checkboxLike,
  variants: {
    border: {
      focusVisible: atoms({ border: "primary" }),
      default: atoms({
        border: {
          lightMode: "regular",
          darkMode: "regularDark",
        },
      }),
    },
    background: {
      selected: atoms({ background: "pink-500" }),
      default: atoms({
        background: {
          lightMode: "white",
          darkMode: "gray-900",
        },
      }),
    },
    boxShadow: {
      focusVisible: atoms({ boxShadow: "outline" }),
      default: atoms({ boxShadow: "none" }),
    },
    opacity: {
      disabled: atoms({ opacity: 0.5 }),
      active: atoms({ opacity: 1 }),
    },
  },
});

export const tick = style([
  atoms({
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "16px",
  }),
  style({
    top: 0,
  }),
]);
