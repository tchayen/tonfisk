import { globalStyle } from "@vanilla-extract/css";
import { createAtomicStyles, createAtomsFn } from "@vanilla-extract/sprinkles";

import colors from "./colors";
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

// , .token.punctuation, .token.class-name, .token.method.function.property-access, .token.attr-value, .token.maybe-class-name, .token.arrow.operator
globalStyle(
  `
  .token.keyword,
  .token.boolean,
  .token.tag
`,
  {
    color: colors.pink[500],
  }
);

globalStyle(
  `
  .token.punctuation,
  .token.tag .token.punctuation,
  .token.attr-name,
  .token.operator
`,
  {
    color: colors.gray[500],
  }
);

globalStyle(
  `
  .token.function,
  .token.constant
`,
  {
    color: colors.gray[400],
  }
);

globalStyle(".language-javascript", {
  color: colors.gray[200],
});

const responsiveStyles = createAtomicStyles({
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
    minHeight: vars.size,
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

export const atoms = createAtomsFn(responsiveStyles);
