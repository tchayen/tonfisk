import { style } from "@vanilla-extract/css";
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
