import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { atoms } from "../theme.css";

export const ol = atoms({
  display: "flex",
  listStyle: "none",
  margin: "none",
  padding: "none",
});

export const li = recipe({
  base: atoms({}),
  variants: {
    textDecoration: {
      current: {},
      default: style({
        ":hover": {
          textDecoration: "underline",
        },
      }),
    },
    fontWeight: {
      current: atoms({
        fontWeight: "bold",
      }),
      default: atoms({
        fontWeight: "body",
      }),
    },
    cursor: {
      current: atoms({
        cursor: "default",
      }),
      default: atoms({
        cursor: "pointer",
      }),
    },
  },
});
