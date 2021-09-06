import { style } from "@vanilla-extract/css";

import { atoms } from "../theme.css";

export const table = atoms({
  borderCollapse: "separate",
  borderSpacing: 0,
  borderRadius: "8px",
  boxShadow: "regularBorder",
});

export const tableHeaderRow = style({});

export const tableColumnHeader = atoms({
  color: "black",
  fontWeight: "bold",
  fontSize: "14px",
  height: "40px",
  cursor: "default",
  paddingLeft: "l",
  paddingRight: "l",
});

export const tableRow = atoms({});

export const lastRow = style({});

const roundedLastRowSelector = style({
  selectors: {
    [`${lastRow} > &:first-child`]: {
      borderBottomLeftRadius: 8, // TODO
    },
    [`${lastRow} > &:last-child`]: {
      borderBottomRightRadius: 8, // TODO
    },
  },
});

export const tableCell = style([
  atoms({
    fontSize: "14px",
    height: "40px",
    cursor: "default",
    paddingLeft: "l",
    paddingRight: "l",
  }),
  roundedLastRowSelector,
]);

export const checkboxInput = style([
  atoms({
    width: "16px",
    height: "16px",
    borderRadius: "4px",
    position: "absolute",
    margin: 0,
    outline: "none",
  }),
  style({
    WebkitAppearance: "none",
    top: 12,
    left: 16,
  }),
]);

export const tick = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: 15,
  left: 18,
  pointerEvents: "none",
});

export const mixed = style({
  height: 2,
  width: 10,
  position: "absolute",
  top: 4,
  left: 1,
  background: "white",
});

export const tableCheckboxCell = style([
  atoms({
    paddingLeft: "l",
    paddingRight: "l",
    position: "relative",
  }),
  style({
    width: "48px",
  }),
  roundedLastRowSelector,
]);
