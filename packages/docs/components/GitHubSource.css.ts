import { recipe } from "@vanilla-extract/recipes";
import { atoms } from "tonfisk/src/theme.css";

export const div = atoms({ marginTop: "xl" });

export const base = atoms({
  color: "blue-500",
  display: "inline-flex",
  alignItems: "center",
  outline: "none",
  padding: "m",
  borderRadius: "8px",
  gap: "m",
});

export const anchor = recipe({
  base,
  variants: {
    boxShadow: {
      focusVisible: atoms({ boxShadow: "outline" }),
      default: atoms({ boxShadow: "none" }),
    },
  },
});
