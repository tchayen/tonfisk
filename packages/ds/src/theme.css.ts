import { globalStyle } from "@vanilla-extract/css";
import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";

import colors from "./colors";
import { vars } from "./vars.css";

export const darkMode = "dark";

globalStyle(`.${darkMode}`, {
  background: colors.coolGray[900],
  color: colors.coolGray[400],
});

globalStyle("html", {
  fontFeatureSettings: "'ss01' on,'ss02' on,'cv01' on,'cv03' on",
  background: colors.white,
  color: colors.coolGray[600],
});

globalStyle("::selection", {
  background: colors.blue[500],
  color: colors.black,
});

globalStyle(`${darkMode} ::placeholder`, {
  color: colors.coolGray[500],
});

globalStyle("::placeholder", {
  color: colors.coolGray[400],
  opacity: 1,
});

// NOTE: -webkit-* for some reason doesn't work with just .dark, requires element.dark.
globalStyle(`html.${darkMode} *::-webkit-scrollbar`, {
  background: colors.coolGray[900],
});

globalStyle("*::-webkit-scrollbar", {
  background: colors.white,
  width: 12,
  height: 12,
});

globalStyle(`html.${darkMode} *::-webkit-scrollbar-corner`, {
  background: colors.coolGray[900],
});

globalStyle("*::-webkit-scrollbar-corner", {
  background: colors.white,
});

globalStyle(`html.${darkMode} *::-webkit-scrollbar-thumb`, {
  backgroundColor: colors.coolGray[700],
  boxShadow: `0 0 0 2px inset ${colors.coolGray[900]}`,
});

globalStyle("*::-webkit-scrollbar-thumb", {
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
    darkMode: { selector: `.${darkMode} &` },
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
    textShadow: vars.textShadow,
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
