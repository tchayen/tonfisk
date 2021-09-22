import { recipe } from "@vanilla-extract/recipes";
import { atoms } from "tonfisk/src/theme.css";

export const button = recipe({
  base: atoms({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    padding: "l",
    paddingBottom: "m",
    paddingTop: "m",
    marginLeft: "s",
    marginRight: "xs",
    borderRadius: "8px",
    border: "none",
    textAlign: "left",
    fontFamily: "body",
    outline: "none",
  }),
  variants: {
    background: {
      isPressed: atoms({
        background: {
          lightMode: "gray-300",
          darkMode: "gray-700",
        },
      }),
      isHoveredOrFocused: atoms({
        background: {
          lightMode: "gray-200",
          darkMode: "gray-800",
        },
      }),
      default: atoms({
        background: "transparent",
      }),
    },
  },
});

export const icon = atoms({
  width: "32px",
  height: "32px",
  borderRadius: "full",
  marginRight: "m",
});

export const acronym = atoms({
  fontSize: "16px",
  fontWeight: "bold",
  color: {
    lightMode: "black",
    darkMode: "gray-200",
  },
});

export const name = atoms({
  fontSize: "14px",
  color: {
    lightMode: "gray-600",
    darkMode: "gray-500",
  },
});

export const value = atoms({
  fontSize: "16px",
  color: {
    lightMode: "gray-500",
    darkMode: "gray-400",
  },
});

export const column = atoms({
  display: "flex",
  flexDirection: "column",
  flex: 1,
});
