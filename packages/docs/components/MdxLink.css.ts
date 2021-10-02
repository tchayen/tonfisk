import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { atoms } from "tonfisk/src/theme.css";

export const preview = style([
  atoms({
    padding: "s",
    background: {
      lightMode: "gray-200",
      darkMode: "gray-700",
    },
    borderRadius: "8px",
    overflow: "hidden",
  }),
  style({
    width: 256 + 8,
    height: 144 + 8,
  }),
]);

export const image = style({
  width: 256,
  height: 144,
  borderRadius: 6,
});

export const link = recipe({
  base: [
    atoms({
      color: "blue-500",
      outline: "none",
      borderRadius: "4px",
      display: "inline-flex",
    }),
    style({
      ":hover": {
        textDecoration: "underline",
      },
    }),
  ],
  variants: {
    boxShadow: {
      focusVisible: atoms({ boxShadow: "outline" }),
      default: atoms({ boxShadow: "none" }),
    },
  },
});
