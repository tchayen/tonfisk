import { style } from "@vanilla-extract/css";
import { globalStyle } from "@vanilla-extract/css";
import { atoms } from "tonfisk/src/theme.css";

export const li = atoms({
  marginBottom: "l",
  marginTop: "l",
});

export const blockquote = atoms({
  margin: "none",
  fontStyle: "italic",
  position: "relative",
  paddingLeft: "xl",
  paddingTop: "l",
  paddingBottom: "l",
});

globalStyle(`${blockquote} > p`, {
  margin: 0,
});

export const blockPipe = atoms({
  borderRadius: "4px",
  position: "absolute",
  width: "4px",
  left: 0,
  top: 0,
  height: "100%",
  background: {
    darkMode: "gray-700",
    lightMode: "gray-200",
  },
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
