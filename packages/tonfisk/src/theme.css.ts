import "./globals.css";

import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";

import { darkMode, vars } from "./vars.css";

const responsiveProperties = defineProperties({
  conditions: {
    desktop: { "@media": "screen and (min-width: 1200px)" },
    mobile: {},
  },
  defaultCondition: "mobile",
  properties: {
    top: vars.space,
    bottom: vars.space,
    left: vars.space,
    right: vars.space,
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
    gridTemplateColumns: vars.gridTemplateColumns,
    position: ["fixed", "absolute", "relative", "sticky"],
    alignItems: ["stretch", "flex-start", "center", "flex-end"],
    justifyContent: [
      "stretch",
      "flex-start",
      "center",
      "flex-end",
      "space-between",
    ],
    flexDirection: ["row", "column"],
    textAlign: ["center", "left", "right"],
    display: [
      "none",
      "block",
      "flex",
      "grid",
      "inline-block",
      "inline",
      "inline-flex",
    ],
    visibility: ["hidden", "visible"],
  },
  shorthands: {
    padding: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"],
    paddingX: ["paddingLeft", "paddingRight"],
    paddingY: ["paddingTop", "paddingBottom"],
  },
});

const colorProperties = defineProperties({
  conditions: {
    lightMode: {},
    darkMode: { selector: `.${darkMode} &` },
  },
  defaultCondition: "lightMode",
  properties: {
    color: vars.color,
    outline: vars.outline,
    background: vars.color,
    border: vars.border,
    borderLeft: vars.border,
    borderTop: vars.border,
    borderBottom: vars.border,
    borderRight: vars.border,
    boxShadow: vars.boxShadow,
    textShadow: vars.textShadow,
    fill: vars.color,
    stroke: vars.color,
  },
});

const fontProperties = defineProperties({
  properties: {
    textDecoration: ["none", "underline"],
    fontFamily: vars.fontFamily,
    fontSize: vars.fontSize,
    fontWeight: vars.fontWeight,
    fontFeatureSettings: vars.fontFeatureSettings,
    lineHeight: [1, 1.5, 1.75, 2],
  },
});

const otherProperties = defineProperties({
  properties: {
    borderRadius: vars.borderRadius,
    cursor: ["default", "pointer"],
    opacity: [0.5, 1],
    overflowY: ["auto", "hidden", "scroll"],
    zIndex: [1, 10, 100, 1000, 10000, 100000],
    flex: [1],
    listStyle: ["none"],
    overflow: ["auto", "hidden", "scroll"],
    WebkitAppearance: vars.WebkitAppearance,
    borderCollapse: ["separate", "collapse"],
    borderSpacing: [0],
    appearance: ["none"],
  },
});

export const atoms = createSprinkles(
  responsiveProperties,
  colorProperties,
  fontProperties,
  otherProperties
);
