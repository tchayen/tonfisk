import { globalStyle } from "@vanilla-extract/css";
import colors from "ds/src/colors";

globalStyle("code", {
  fontSize: "16px",
  fontFamily: "SF Mono, Menlo, Consolas, Liberation Mono, monospace",
  // background: "gray-200",
});

// globalStyle("pre code", {
//   background: "transparent",
// });

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
    color: colors.gray[600],
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
    color: colors.gray[400],
  }
);

globalStyle(
  `
  .token.function,
  .token.constant
`,
  {
    color: colors.gray[300],
  }
);

globalStyle(".language-javascript", {
  color: colors.gray[200],
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
