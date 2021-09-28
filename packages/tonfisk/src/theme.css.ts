import { globalFontFace, globalStyle } from "@vanilla-extract/css";
import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";

import colors from "./colors";
import { darkMode, vars } from "./vars.css";

globalStyle("body, body *", {
  boxSizing: "border-box",
});

globalFontFace("Inter var", {
  fontStyle: "normal",
  fontWeight: "100 900",
  fontDisplay: "swap",
  src: "url('https://rsms.me/inter/font-files/Inter-roman.var.woff2?v=3.19') format('woff2')",
});

globalFontFace("Inter var", {
  fontStyle: "italic",
  fontWeight: "100 900",
  fontDisplay: "swap",
  src: "url('https://rsms.me/inter/font-files/Inter-italic.var.woff2?v=3.19') format('woff2')",
});

globalStyle(`.${darkMode}`, {
  background: colors.coolGray[900],
  color: colors.coolGray[400],
});

globalStyle("html", {
  fontFamily:
    'Inter var, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  fontFeatureSettings: "'ss01' on,'ss02' on,'cv01' on,'cv03' on",
  textRendering: "optimizeLegibility",
  WebkitFontSmoothing: "antialiased",
  background: colors.white,
  color: colors.coolGray[600],
});

globalStyle("body", {
  margin: 0,
});

// globalStyle("::selection", {
//   background: colors.blue[500],
//   color: colors.black,
// });

globalStyle(`html.${darkMode} ::placeholder`, {
  color: colors.coolGray[600],
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

globalStyle("a", {
  color: "inherit",
  textDecoration: "none",
});

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
    fontStyle: ["normal", "italic"],
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
