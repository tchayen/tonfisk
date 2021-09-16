import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { atoms } from "../theme.css";

export const label = atoms({
  fontSize: "14px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  color: {
    lightMode: "gray-600",
    darkMode: "gray-400",
  },
});

export const wrapper = recipe({
  base: atoms({
    display: "flex",
    position: "relative",
    alignItems: "center",
    marginLeft: "m",
  }),
  variants: {
    opacity: {
      isDisabled: atoms({ opacity: 0.5 }),
      default: atoms({ opacity: 1 }),
    },
  },
});

export const bar = recipe({
  base: [
    atoms({
      width: "32px",
      borderRadius: "full",
    }),
    style({
      height: "12px",
    }),
  ],
  variants: {
    background: {
      isSelected: atoms({
        background: {
          lightMode: "pinkOutline",
          darkMode: "pink-900",
        },
      }),
      default: atoms({
        background: {
          lightMode: "gray-200",
          darkMode: "gray-700",
        },
      }),
    },
  },
});

export const dot = recipe({
  base: [
    atoms({
      width: "16px",
      height: "16px",
      borderRadius: "full",
      position: "absolute",
    }),
    style({
      transition: "right 0.1s ease-in-out",
    }),
  ],
  variants: {
    boxShadow: {
      isFocusVisible: atoms({
        boxShadow: "outline",
      }),
      default: atoms({
        boxShadow: {
          lightMode: "tooltipDotShadow",
          darkMode: "none",
        },
      }),
    },
    background: {
      isSelected: atoms({
        background: "pink-500",
      }),
      default: atoms({
        background: {
          lightMode: "white",
          darkMode: "gray-500",
        },
      }),
    },
    right: {
      isSelected: atoms({
        right: "none",
      }),
      default: atoms({
        right: "l",
      }),
    },
  },
});
