import { style } from "@vanilla-extract/css";

import { atoms } from "../theme.css";

export const label = atoms({
  fontSize: "14px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  color: {
    lightMode: "black",
    darkMode: "gray-200",
  },
});

export const wrapper = atoms({
  display: "flex",
  position: "relative",
  alignItems: "center",
  marginLeft: "m",
});

export const bar = style([
  atoms({
    width: "32px",
    borderRadius: "full",
  }),
  style({
    height: "12px",
  }),
]);

export const dot = style([
  atoms({
    width: "16px",
    height: "16px",
    borderRadius: "full",
    position: "absolute",
  }),
  style({
    transition: "right 0.1s ease-in-out",
  }),
]);
