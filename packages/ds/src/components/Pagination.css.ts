import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { atoms } from "../theme.css";
import { buttonLike } from "./Button.css";

export const pageButton = recipe({
  base: [
    buttonLike,
    atoms({
      width: "32px",
      cursor: "pointer",
      borderRadius: "8px",
    }),
  ],
  variants: {
    color: {
      selected: atoms({
        color: {
          lightMode: "gray-600",
          darkMode: "gray-500",
        },
      }),
      default: atoms({
        color: {
          lightMode: "black",
          darkMode: "gray-500",
        },
      }),
    },
    background: {
      selected: atoms({
        background: "pink-500",
      }),
      selectedPressed: atoms({
        background: "pink-700",
      }),
      selectedHovered: atoms({
        background: "pink-600",
      }),
      default: atoms({
        background: {
          lightMode: "white",
          darkMode: "gray-900",
        },
      }),
      pressed: atoms({
        background: {
          lightMode: "gray-300",
          darkMode: "gray-700",
        },
      }),
      hovered: atoms({
        background: {
          lightMode: "gray-200",
          darkMode: "gray-800",
        },
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

export const directionButton = recipe({
  base: [
    buttonLike,
    atoms({
      paddingLeft: "l",
      paddingRight: "l",
      borderRadius: "16px",
      color: {
        lightMode: "black",
        darkMode: "gray-200",
      },
      gap: "m",
    }),
    style({
      ":active": {
        background: "gray-300",
      },
    }),
  ],
  variants: {
    cursor: {
      disabled: atoms({
        cursor: "default",
      }),
      default: atoms({
        cursor: "pointer",
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
    boxShadow: {
      focusVisible: atoms({
        boxShadow: "outline",
      }),
      default: atoms({
        boxShadow: "none",
      }),
    },
    background: {
      pressed: atoms({
        background: {
          lightMode: "gray-400",
          darkMode: "gray-800",
        },
      }),
      hovered: atoms({
        background: {
          lightMode: "gray-300",
          darkMode: "gray-700",
        },
      }),
      default: atoms({
        background: {
          lightMode: "gray-200",
          darkMode: "gray-600",
        },
      }),
    },
  },
});

export const rotateLeft = style({
  transform: "rotate(-90deg)",
});

export const rotateRight = style({
  transform: "rotate(90deg)",
});

export const pagination = atoms({
  display: "flex",
  gap: "m",
});
