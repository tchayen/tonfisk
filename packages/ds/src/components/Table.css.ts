import { style } from "@vanilla-extract/css";

import { atoms } from "../theme.css";

export const table = atoms({
  borderCollapse: "separate",
  borderSpacing: 0,
  borderRadius: "8px",
  boxShadow: {
    lightMode: "regularBorder",
    darkMode: "darkBorder",
  },
});

export const tableHeaderRow = style({});

export const tableColumnHeader = atoms({
  color: {
    lightMode: "black",
    darkMode: "gray-200",
  },
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
    color: {
      lightMode: "black",
      darkMode: "gray-200",
    },
  }),
  roundedLastRowSelector,
]);

export const checkboxLike = atoms({
  height: "16px",
  minWidth: "16px",
  borderRadius: "4px",
  margin: "none",
  outline: "none",
});

export const checkboxInput = style([
  checkboxLike,
  atoms({
    position: "absolute",
  }),
  style({
    WebkitAppearance: "none",
    top: 12,
    left: 16,
  }),
]);

export const tick = style({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  top: 15,
  left: 18,
  pointerEvents: "none",
});

export const mixed = style([
  style({
    height: 2,
    width: 10,
    position: "absolute",
    top: 4,
    left: 1,
  }),
  atoms({
    background: {
      lightMode: "white",
      darkMode: "gray-900",
    },
  }),
]);

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
