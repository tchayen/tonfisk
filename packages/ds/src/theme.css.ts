import { globalStyle } from "@vanilla-extract/css";
import { createAtomicStyles, createAtomsFn } from "@vanilla-extract/sprinkles";

import { vars } from "./vars.css";

globalStyle("h1", {
  fontSize: "28px",
  fontWeight: 400,
});

globalStyle("h2", {
  fontSize: "24px",
  fontWeight: 400,
});

globalStyle("h3", {
  fontSize: "20px",
  fontWeight: 400,
});

const responsiveStyles = createAtomicStyles({
  conditions: {
    mobile: {},
    tablet: { "@media": "screen and (min-width: 768px)" },
    desktop: { "@media": "screen and (min-width: 1024px)" },
  },
  defaultCondition: "mobile",
  properties: {
    border: vars.border,
    borderLeft: vars.border,
    borderTop: vars.border,
    borderBottom: vars.border,
    borderRight: vars.border,
    outline: vars.outline,
    cursor: ["default", "pointer"],
    opacity: [0.5, 1],
    display: ["none", "block", "flex", "grid", "inline-block", "inline-flex"],
    position: ["fixed", "absolute", "relative"],
    zIndex: [100],
    top: vars.space,
    bottom: vars.space,
    left: vars.space,
    right: vars.space,
    visibility: ["hidden", "visible"],
    flexDirection: ["row", "column"],
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
    height: vars.size,
    borderRadius: vars.borderRadius,
    fontFamily: vars.fontFamily,
    appearance: ["none"],
    fontSize: vars.fontSize,
    fontWeight: vars.fontWeight,
    lineHeight: [1],
    textAlign: ["center", "left"],
    boxShadow: vars.boxShadow,
    borderCollapse: ["separate"],
    borderSpacing: [0],
  },
  shorthands: {
    padding: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"],
    paddingX: ["paddingLeft", "paddingRight"],
    paddingY: ["paddingTop", "paddingBottom"],
    placeItems: ["alignItems", "justifyContent"],
    typeSize: ["fontSize", "lineHeight"],
  },
});

const colorModeStyles = createAtomicStyles({
  conditions: {
    lightMode: {},
    darkMode: { "@media": "(prefers-color-scheme: dark)" },
  },
  defaultCondition: "lightMode",
  properties: {
    color: vars.color,
    background: vars.color,
  },
});

export const atoms = createAtomsFn(responsiveStyles, colorModeStyles);
