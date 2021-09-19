import { recipe } from "@vanilla-extract/recipes";

import { atoms } from "../theme.css";

export const pill = recipe({
  base: [
    atoms({
      fontFamily: "body",
      height: "32px",
      borderRadius: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "m",
      paddingLeft: "m",
      paddingRight: "l",
      fontSize: "14px",
      cursor: "pointer",
      outline: "none",
      border: "none",
    }),
  ],
  variants: {
    color: {
      pressed: atoms({
        color: {
          lightMode: "white",
          darkMode: "gray-200",
        },
      }),
      default: atoms({
        color: {
          lightMode: "black",
          darkMode: "gray-200",
        },
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
    opacity: {
      disabled: atoms({
        opacity: 0.5,
      }),
      default: atoms({
        opacity: 1,
      }),
    },
    background: {
      pressed: atoms({
        background: "blue-500",
      }),
      hovered: atoms({
        background: "blueOutline",
      }),
      default: atoms({
        background: {
          lightMode: "white",
          darkMode: "gray-900",
        },
      }),
    },
    boxShadow: {
      focusedOrPressedOrHovered: atoms({
        boxShadow: "primary",
      }),
      default: atoms({
        boxShadow: {
          lightMode: "regularBorder",
          darkMode: "darkBorder",
        },
      }),
    },
    paddingLeft: {
      hasIcon: atoms({
        paddingLeft: "m",
      }),
      default: atoms({
        paddingLeft: "l",
      }),
    },
  },
});

export const icon = atoms({
  width: "20px",
  height: "20px",
  borderRadius: "full",
});
