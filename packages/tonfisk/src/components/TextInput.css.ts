import { recipe } from "@vanilla-extract/recipes";

import { atoms } from "../theme.css";

export const div = recipe({
  base: atoms({
    display: "flex",
    flexDirection: "column",
    gap: "s",
  }),
  variants: {
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

export const inputLike = atoms({
  height: "32px",
  fontSize: "16px",
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
  transition: "all",
});

export const input = recipe({
  base: [
    inputLike,
    atoms({
      paddingLeft: "m",
      paddingRight: "m",
      padding: "xs",
      border: "none",
      WebkitAppearance: "none",
    }),
  ],
  variants: {
    boxShadow: {
      focused: atoms({
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
