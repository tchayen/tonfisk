import { globalFontFace, globalStyle } from "@vanilla-extract/css";

import colors from "./colors";
import { darkMode } from "./vars.css";

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
