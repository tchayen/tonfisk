import { createGlobalTheme } from "@vanilla-extract/css";

import colors from "./colors";

export const darkMode = "dark";

export const vars = createGlobalTheme(":root", {
  space: {
    0: "0",
    none: "0",
    xs: "2px",
    s: "4px",
    m: "8px",
    l: "16px",
    xl: "32px",
    "2xl": "64px",
    "3xl": "128px",
    "4xl": "256px",
  },
  size: {
    auto: "auto",
    "0": "0",
    "1px": "1px",
    "2px": "2px",
    "4px": "4px",
    "8px": "8px",
    "12px": "12px",
    "16px": "16px",
    "20px": "20px",
    "24px": "24px",
    "32px": "32px",
    "40px": "40px",
    "64px": "64px",
    "128px": "128px",
    "256px": "256px",
    "100%": "100%",
    "24ch": "24ch",
    "36ch": "36ch",
    "48ch": "48ch",
    "64ch": "64ch",
    "96ch": "96ch",
    "1100px": "1100px",
    "100vh": "100vh",
    "100vw": "100vw",
  },
  gridTemplateColumns: {
    three: "repeat(3, 1fr)",
    one: "repeat(1, 1fr)",
  },
  color: {
    none: "none",
    white: "#fff",
    black: "#000",
    transparent: "transparent",

    "gray-50": colors.coolGray[50],
    "gray-100": colors.coolGray[100],
    "gray-200": colors.coolGray[200],
    "gray-300": colors.coolGray[300],
    "gray-400": colors.coolGray[400],
    "gray-500": colors.coolGray[500],
    "gray-600": colors.coolGray[600],
    "gray-700": colors.coolGray[700],
    "gray-800": colors.coolGray[800],
    "gray-900": colors.coolGray[900],

    "blue-50": colors.blue[50],
    "blue-100": colors.blue[100],
    "blue-200": colors.blue[200],
    "blue-300": colors.blue[300],
    "blue-400": colors.blue[400],
    "blue-500": colors.blue[500],
    "blue-600": colors.blue[600],
    "blue-700": colors.blue[700],
    "blue-800": colors.blue[800],
    "blue-900": colors.blue[900],

    blueOutline: "rgba(59, 130, 246, 0.3)",
    // blueOutline: "rgba(236, 72, 153, 0.3)",

    backdropLight: "rgba(107, 114, 128, 0.35)", // gray-500
    backdropDark: "rgba(0, 0, 0, 0.35)",
  },
  borderRadius: {
    "0px": "0px",
    "4px": "4px",
    "8px": "8px",
    "16px": "16px",
    "32px": "32px",
    "64px": "64px",
    full: "99999px",
  },
  fontFamily: {
    body: 'Inter var, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    monospace: "Menlo, Consolas, Liberation Mono, monospace",
  },
  fontSize: {
    "12px": "12px",
    "14px": "14px",
    "16px": "16px",
    "18px": "18px",
    "20px": "20px",
    "24px": "24px",
    "32px": "32px",
    "64px": "64px",
  },
  fontWeight: {
    body: "400",
    bold: "600",
  },
  fontFeatureSettings: {
    numbers: "'ss01' on,'ss02' on,'cv01' on,'cv03' on",
  },
  border: {
    none: "none",
    primary: `1px solid ${colors.blue[500]}`, // TODO
    blueOutline: `1px solid rgba(59, 130, 246, 0.3)`, // TODO
    // blueOutline: `1px solid rgba(236, 72, 153, 0.3)`, // TODO
    regular: `1px solid ${colors.coolGray[200]}`, // TODO
    regularDark: `1px solid ${colors.coolGray[700]}`, // TODO
  },
  boxShadow: {
    none: "none",
    outline: "0 0 0 3px rgba(59, 130, 246, 0.3)", // TODO
    primary: `0 0 0 2px inset ${colors.blue[500]}`,
    // outline: "0 0 0 3px rgba(236, 72, 153, 0.3)", // TODO
    shadow: "0 2px 8px rgba(0, 0, 0, 0.1)", // TODO
    tooltipDotShadow: "0 1px 3px rgba(0, 0, 0, 0.25)", // TODO
    tableTopBorder: `0 1px 0 inset ${colors.coolGray[200]}`,
    tableTopBorderDark: `0 1px 0 inset ${colors.coolGray[700]}`,
    tableOutline: "0 0 0 2px #000", // TODO
    tableOutlineDark: `0 0 0 2px ${colors.coolGray[200]}`, // TODO
    regularBorder: `0 0 0 1px inset ${colors.coolGray[200]}`, // TODO
    darkBorder: `0 0 0 1px inset ${colors.coolGray[700]}`, // TODO
    borderAndShadow: `0 0 0 1px inset ${colors.coolGray[200]}, 0 2px 8px rgba(0, 0, 0, 0.1)`,
  },
  WebkitAppearance: {
    none: "none",
  },
  outline: {
    none: "none",
    table: "2px solid #000",
    tableDark: `2px solid ${colors.coolGray[200]}`,
  },
  lineHeight: {
    "1": "1",
  },
  textShadow: {
    light: "0 0 black",
    dark: "0 0 #fff",
  },
  transition: {
    color: "color 0.1s ease-out",
    background: "background 0.15s ease-out",
    all: "all 0.15s ease-out",
  },
});
