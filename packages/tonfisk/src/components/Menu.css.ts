import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { optionBase } from "../ListBox.css";
import { atoms } from "../theme.css";
import { inputLike } from "./TextInput.css";

export const div = atoms({ position: "relative", display: "inline-block" });

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

export const menuItem = recipe({
  base: optionBase,
  variants: {
    background: {
      focused: atoms({
        background: {
          lightMode: "gray-200",
          darkMode: "gray-600",
        },
      }),
      default: atoms({
        background: "transparent",
      }),
    },
    color: {
      focused: atoms({
        color: {
          lightMode: "black",
          darkMode: "gray-200",
        },
      }),
      default: atoms({
        color: {
          lightMode: "gray-600",
          darkMode: "gray-400",
        },
      }),
    },
  },
});

export const chevronPadding = atoms({ paddingLeft: "m" });

export const menuButton = recipe({
  base: [
    inputLike,
    atoms({
      display: "flex",
      alignItems: "center",
      borderRadius: "8px",
      // fontWeight: "bold",
      paddingLeft: "m",
      paddingRight: "m",
      lineHeight: 1,
      border: "none",
    }),
  ],
  variants: {
    opacity: {
      disabled: atoms({
        opacity: 0.5,
      }),
      default: atoms({
        opacity: 1,
      }),
    },
    cursor: {
      disabled: atoms({
        cursor: "default",
      }),
      default: atoms({
        cursor: "pointer",
      }),
    },
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
  },
});
