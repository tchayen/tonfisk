import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { atoms } from "../theme.css";
import { checkboxLike } from "./Checkbox.css";

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

export const tableColumnHeader = recipe({
  base: atoms({
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
  }),
  variants: {
    textAlign: {
      wideColumn: atoms({ textAlign: "center" }),
      default: atoms({ textAlign: "left" }),
    },
    outline: {
      focusVisible: atoms({
        outline: {
          lightMode: "table",
          darkMode: "tableDark",
        },
      }),
      default: atoms({
        outline: "none",
      }),
    },
  },
});

export const tableRow = recipe({
  variants: {
    background: {
      selected: atoms({
        background: "pink-500",
      }),
      even: atoms({
        background: "none",
      }),
      default: atoms({
        background: "none",
      }),
    },
    boxShadow: {
      selected: atoms({
        boxShadow: "none",
      }),
      default: atoms({
        boxShadow: {
          lightMode: "tableTopBorder",
          darkMode: "tableTopBorderDark",
        },
      }),
    },
    outline: {
      focusVisible: atoms({
        outline: {
          lightMode: "table",
          darkMode: "tableDark",
        },
      }),
      default: atoms({
        outline: "none",
      }),
    },
  },
});

export const lastRow = atoms({});

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

export const tableCell = recipe({
  base: [
    atoms({
      fontSize: "14px",
      height: "40px",
      cursor: "default",
      paddingLeft: "l",
      paddingRight: "l",
    }),
    roundedLastRowSelector,
  ],
  variants: {
    color: {
      selected: atoms({
        color: "white",
      }),
      default: atoms({
        color: {
          lightMode: "black",
          darkMode: "gray-200",
        },
      }),
    },
    outline: {
      focusVisible: atoms({
        outline: {
          lightMode: "table",
          darkMode: "tableDark",
        },
      }),
      default: atoms({
        outline: "none",
      }),
    },
  },
});

export const checkboxInput = recipe({
  base: [
    checkboxLike,
    atoms({
      position: "absolute",
      WebkitAppearance: "none",
      margin: "none",
      outline: "none",
    }),
    style({
      top: 12,
      left: 16,
    }),
  ],
  variants: {
    border: {
      checkedOrFocused: atoms({
        border: "primary",
      }),
      default: atoms({
        border: {
          lightMode: "regular",
          darkMode: "regularDark",
        },
      }),
    },
    background: {
      checked: atoms({
        background: "pink-500",
      }),
      default: atoms({
        background: {
          lightMode: "white",
          darkMode: "gray-900",
        },
      }),
    },
    boxShadow: {
      focusedChecked: atoms({
        boxShadow: {
          lightMode: "tableOutline",
          darkMode: "tableOutlineDark",
        },
      }),
      focused: atoms({
        boxShadow: "outline",
      }),
      default: atoms({
        boxShadow: "none",
      }),
    },
  },
});

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
    background: "white",
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
