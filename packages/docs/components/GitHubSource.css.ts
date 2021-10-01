import { recipe } from "@vanilla-extract/recipes";
import { atoms } from "tonfisk/src/theme.css";

export const div = atoms({ marginTop: "xl" });

export const base = atoms({
  display: "inline-flex",
  alignItems: "center",
  outline: "none",
  padding: "m",
  borderRadius: "8px",
  gap: "m",
  transition: "color",
});

export const anchor = recipe({
  base,
  variants: {
    color: {
      default: atoms({
        color: "blue-500",
      }),
      hover: atoms({
        color: "blue-600",
      }),
      active: atoms({
        color: "blue-700",
      }),
    },
    boxShadow: {
      focusVisible: atoms({
        boxShadow: "outline",
      }),
      default: atoms({
        boxShadow: "none",
      }),
    },
  },
});
