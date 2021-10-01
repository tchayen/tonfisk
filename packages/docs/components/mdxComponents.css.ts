import { style } from "@vanilla-extract/css";
import { globalStyle } from "@vanilla-extract/css";
import { atoms } from "tonfisk/src/theme.css";

export const li = atoms({
  marginBottom: "l",
  marginTop: "l",
});

export const blockquote = atoms({
  margin: "none",
  position: "relative",
  padding: "l",
  background: {
    lightMode: "gray-100",
    darkMode: "gray-800",
  },
  borderRadius: "8px",
  overflow: "hidden",
});

globalStyle(`${blockquote} > p`, {
  margin: 0,
});

export const flexRow = atoms({
  display: "flex",
  gap: "l",
});

export const p = atoms({
  color: {
    lightMode: "gray-600",
    darkMode: "gray-400",
  },
  lineHeight: 1.5,
  marginTop: "l",
  marginBottom: "l",
});

export const strong = atoms({
  fontWeight: "bold",
  color: {
    lightMode: "black",
    darkMode: "gray-200",
  },
});

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
