import { globalStyle } from "@vanilla-extract/css";

globalStyle("pre", {
  padding: "16px",
  borderRadius: "8px",
  border: "1px solid #eee",
  color: "black",
});

globalStyle("code", {
  fontSize: "14px",
  fontFamily: "SF Mono, Menlo, Consolas, Liberation Mono, monospace",
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
