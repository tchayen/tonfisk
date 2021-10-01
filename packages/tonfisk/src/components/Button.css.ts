import { recipe } from "@vanilla-extract/recipes";

import { atoms } from "../theme.css";

export const buttonLike = atoms({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  outline: "none",
  fontFamily: "body",
  fontSize: "14px",
  fontWeight: "bold",
  lineHeight: 1,
  height: "32px",
  transition: "background",
});

const basicButton = atoms({
  paddingLeft: "l",
  paddingRight: "l",
  borderRadius: "full",
  color: {
    lightMode: "white",
    darkMode: "gray-900",
  },
});

export const button = recipe({
  base: [buttonLike, basicButton],
  variants: {
    background: {
      default: atoms({
        background: "blue-500",
      }),
      hover: atoms({
        background: "blue-600",
      }),
      active: atoms({
        background: "blue-700",
      }),
      secondary: atoms({
        background: {
          lightMode: "gray-200",
          darkMode: "gray-500",
        },
      }),
      secondaryHover: atoms({
        background: {
          lightMode: "gray-300",
          darkMode: "gray-600",
        },
      }),
      secondaryActive: atoms({
        background: {
          lightMode: "gray-400",
          darkMode: "gray-700",
        },
      }),
    },
    color: {
      primary: atoms({
        color: {
          lightMode: "white",
          darkMode: "gray-900",
        },
      }),
      secondary: atoms({
        color: {
          lightMode: "black",
          darkMode: "gray-900",
        },
      }),
    },
    cursor: {
      disabled: atoms({ cursor: "default" }),
      active: atoms({ cursor: "pointer" }),
    },
    opacity: {
      disabled: atoms({ opacity: 0.5 }),
      active: atoms({ opacity: 1 }),
    },
    boxShadow: {
      focusVisible: atoms({ boxShadow: "outline" }),
      default: atoms({ boxShadow: "none" }),
    },
    size: {
      regular: atoms({
        fontSize: "14px",
        height: "32px",
      }),
      large: {
        fontSize: "16px",
        height: "40px",
      },
    },
    type: {
      link: atoms({
        display: "inline-flex",
      }),
    },
  },
});
