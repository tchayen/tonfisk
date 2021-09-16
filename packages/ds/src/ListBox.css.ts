import { recipe } from "@vanilla-extract/recipes";

import { atoms } from "./theme.css";

export const optionBase = atoms({
  fontSize: "14px",
  paddingLeft: "m",
  paddingRight: "m",
  height: "32px",
  outline: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
});

export const option = recipe({
  base: optionBase,
  variants: {
    background: {
      selected: atoms({
        background: "pink-500",
      }),
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
      selected: atoms({
        color: {
          lightMode: "white",
          darkMode: "gray-200",
        },
      }),
      focused: atoms({
        color: {
          lightMode: "black",
          darkMode: "gray-200",
        },
      }),
      default: atoms({
        color: {
          lightMode: "black",
          darkMode: "gray-400",
        },
      }),
    },
    opacity: {
      disabled: atoms({
        opacity: 0.5,
      }),
      default: atoms({
        opacity: 1,
      }),
    },
  },
});

export const listBox = atoms({
  margin: "none",
  padding: "none",
  listStyle: "none",
  // maxHeight: "150px",
  overflow: "auto",
  outline: "none",
});
