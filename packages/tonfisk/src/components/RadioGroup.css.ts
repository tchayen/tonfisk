import { recipe } from "@vanilla-extract/recipes";

import { atoms } from "../theme.css";

export const radio = recipe({
  base: atoms({
    height: "16px",
    width: "16px",
    borderRadius: "8px",
    margin: "none",
    outline: "none",
    WebkitAppearance: "none",
    position: "relative",
  }),
  variants: {
    background: {
      selected: atoms({ background: "white" }),
      default: atoms({
        background: {
          lightMode: "white",
          darkMode: "gray-900",
        },
      }),
    },
    boxShadow: {
      selected: atoms({ boxShadow: "primary" }),
      default: atoms({
        boxShadow: {
          lightMode: "regularBorder",
          darkMode: "darkBorder",
        },
      }),
    },
    opacity: {
      disabled: atoms({ opacity: 0.5 }),
      active: atoms({ opacity: 1 }),
    },
  },
});
