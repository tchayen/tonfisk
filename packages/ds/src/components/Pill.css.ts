import { style } from "@vanilla-extract/css";

import { atoms } from "../theme.css";

export const pill = style([
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
  }),
]);

export const icon = atoms({
  width: "20px",
  height: "20px",
  borderRadius: "full",
});
