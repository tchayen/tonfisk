import { style } from "@vanilla-extract/css";
import { globalStyle } from "@vanilla-extract/css";

import colors from "../../tonfisk/src/colors";
import { darkMode } from "../../tonfisk/src/vars.css";

globalStyle(`html.${darkMode} code`, {
  background: colors.coolGray[800],
});

globalStyle("code", {
  fontSize: "15px",
  fontFamily: "Menlo, Consolas, Liberation Mono, monospace",
  padding: 4,
  borderRadius: 4,
  background: colors.coolGray[100],
});

globalStyle("pre code", {
  fontSize: "15px",
  fontFamily: "Menlo, Consolas, Liberation Mono, monospace",
  lineHeight: 1.5,
  padding: 0,
  margin: 0,
  borderRadius: 0,
  background: "none",
});

globalStyle("pre", {
  margin: 0,
});

// Basically enforce dark mode scrollbar on `pre` elements.
globalStyle(`pre::-webkit-scrollbar`, {
  background: colors.coolGray[800],
});

globalStyle(`pre::-webkit-scrollbar-thumb`, {
  backgroundColor: colors.coolGray[600],
  boxShadow: `0 0 0 2px inset ${colors.coolGray[800]}`,
});

globalStyle(`html.${darkMode} pre::-webkit-scrollbar`, {
  background: colors.coolGray[800],
});

globalStyle(`html.${darkMode} pre::-webkit-scrollbar-thumb`, {
  backgroundColor: colors.coolGray[600],
  boxShadow: `0 0 0 2px inset ${colors.coolGray[800]}`,
});

// , .token.punctuation, .token.class-name, .token.method.function.property-access, .token.attr-value, .token.maybe-class-name, .token.arrow.operator
globalStyle(
  `
  .token.keyword,
  .token.boolean,
  .token.tag
`,
  {
    color: colors.blue[500],
  }
);

globalStyle(
  `
  .token.comment
`,
  {
    color: colors.coolGray[600],
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
    color: colors.coolGray[400],
  }
);

globalStyle(
  `
  .token.function,
  .token.constant
`,
  {
    color: colors.coolGray[300],
  }
);

globalStyle(".language-javascript", {
  color: colors.coolGray[200],
});

globalStyle("html", {
  scrollPaddingTop: 32,
});

export const hoverUnderline = style({
  ":hover": {
    textDecoration: "underline",
  },
});

// pre code {
//   font-size: 14px;
//   background-color: var(--background);
//   padding: 0;
//   font-family: SF Mono, Menlo, Consolas, Liberation Mono, monospace;
// }

// .token.keyword,
// .token.punctuation,
// .token.class-name,
// .token.method.function.property-access,
// .token.attr-value,
// .token.maybe-class-name,
// .token.arrow.operator {
//   color: var(--primary);
// }

// .token.string,
// .token.plain-text,
// .token.parameter {
//   color: var(--secondary-text);
// }

// .token.comment {
//   color: var(--secondary-text);
// }
