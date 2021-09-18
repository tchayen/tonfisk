import { globalStyle } from "@vanilla-extract/css";
import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";

import colors from "./colors";
import { vars } from "./vars.css";

globalStyle("html", {
  "@media": {
    "(prefers-color-scheme: dark)": {
      background: colors.coolGray[900],
      color: colors.coolGray[400],
    },
  },
  fontFeatureSettings: "'ss01' on,'ss02' on,'cv01' on,'cv03' on",
  background: colors.white,
  color: colors.coolGray[600],
});

globalStyle("::selection", {
  "@media": {
    "(prefers-color-scheme: dark)": {},
  },
  background: colors.blue[500],
  color: colors.black,
});

globalStyle("::placeholder", {
  "@media": {
    "(prefers-color-scheme: dark)": {
      color: colors.coolGray[500],
    },
  },
  color: colors.coolGray[400],
  opacity: 1,
});

globalStyle("*::-webkit-scrollbar", {
  "@media": {
    "(prefers-color-scheme: dark)": {
      background: colors.coolGray[900],
    },
  },
  background: colors.white,
  width: 12,
  height: 12,
});

globalStyle("*::-webkit-scrollbar-corner", {
  "@media": {
    "(prefers-color-scheme: dark)": {
      background: colors.coolGray[900],
    },
  },
  background: colors.white,
});

globalStyle("*::-webkit-scrollbar-thumb", {
  "@media": {
    "(prefers-color-scheme: dark)": {
      backgroundColor: colors.coolGray[700],
      boxShadow: `0 0 0 2px inset ${colors.coolGray[900]}`,
    },
  },
  backgroundColor: colors.coolGray[300],
  boxShadow: "0 0 0 2px inset white",
  borderRadius: 6,
});

globalStyle("h1", {
  fontSize: "32px",
  fontWeight: 600,
  margin: 0,
});

globalStyle("h2", {
  fontSize: "24px",
  fontWeight: 600,
  margin: 0,
});

globalStyle("h3", {
  fontSize: "20px",
  fontWeight: 600,
  margin: 0,
});

globalStyle("h4", {
  fontSize: "16px",
  fontWeight: 600,
  margin: 0,
});

const responsiveStyles = defineProperties({
  conditions: {
    lightMode: {},
    darkMode: { "@media": "(prefers-color-scheme: dark)" },
  },
  defaultCondition: "lightMode",
  properties: {
    color: vars.color,
    background: vars.color,
    border: vars.border,
    borderLeft: vars.border,
    borderTop: vars.border,
    borderBottom: vars.border,
    borderRight: vars.border,
    outline: vars.outline,
    cursor: ["default", "pointer"],
    opacity: [0.5, 1],
    display: [
      "none",
      "block",
      "flex",
      "grid",
      "inline-block",
      "inline",
      "inline-flex",
    ],
    position: ["fixed", "absolute", "relative", "sticky"],
    overflowY: ["auto", "hidden", "scroll"],
    zIndex: [1, 10, 100, 1000, 10000, 100000],
    top: vars.space,
    bottom: vars.space,
    left: vars.space,
    right: vars.space,
    visibility: ["hidden", "visible"],
    flexDirection: ["row", "column"],
    flex: [1],
    alignItems: ["stretch", "flex-start", "center", "flex-end"],
    justifyContent: [
      "stretch",
      "flex-start",
      "center",
      "flex-end",
      "space-between",
    ],
    listStyle: ["none"],
    overflow: ["auto", "hidden"],
    gap: vars.space,
    paddingTop: vars.space,
    paddingBottom: vars.space,
    paddingLeft: vars.space,
    paddingRight: vars.space,
    margin: vars.space,
    marginLeft: vars.space,
    marginRight: vars.space,
    marginTop: vars.space,
    marginBottom: vars.space,
    width: vars.size,
    minWidth: vars.size,
    maxWidth: vars.size,
    height: vars.size,
    minHeight: vars.size,
    maxHeight: vars.size,
    borderRadius: vars.borderRadius,
    fontFamily: vars.fontFamily,
    appearance: ["none"],
    fontSize: vars.fontSize,
    fontWeight: vars.fontWeight,
    fontFeatureSettings: vars.fontFeatureSettings,
    lineHeight: [1, 1.5, 1.75, 2],
    textAlign: ["center", "left", "right"],
    boxShadow: vars.boxShadow,
    borderCollapse: ["separate", "collapse"],
    borderSpacing: [0],
    fill: vars.color,
    stroke: vars.color,
    WebkitAppearance: vars.WebkitAppearance,
    textDecoration: ["none", "underline"],
  },
  shorthands: {
    padding: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"],
    paddingX: ["paddingLeft", "paddingRight"],
    paddingY: ["paddingTop", "paddingBottom"],
    placeItems: ["alignItems", "justifyContent"],
    typeSize: ["fontSize", "lineHeight"],
  },
});

export const atoms = createSprinkles(responsiveStyles);
