import { style } from "@vanilla-extract/css";
import { atoms } from "tonfisk/src/theme.css";

export const page = atoms({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export const content = atoms({
  position: "fixed",
  top: "xl",
  right: "xl",
});

export const h1 = atoms({
  marginTop: "2xl",
});

export const mainBanner = atoms({
  width: {
    desktop: "1100px",
    mobile: "100%",
  },
  padding: {
    desktop: "none",
    mobile: "xl",
  },
  flexDirection: {
    desktop: "row",
    mobile: "column",
  },
  marginBottom: "2xl",
  marginTop: "2xl",
  display: "flex",
  alignItems: "center",
  gap: "xl",
});

export const topParagraphDiv = atoms({
  display: "flex",
  flexDirection: "column",
  alignItems: {
    desktop: "flex-start",
    mobile: "center",
  },
});

export const topParagraphElement = atoms({
  fontSize: "18px",
  lineHeight: 2,
  marginTop: "none",
  maxWidth: "64ch",
});

export const strong = atoms({
  color: {
    lightMode: "black",
    darkMode: "gray-200",
  },
});

export const code = atoms({
  fontSize: "16px",
});

export const pre = atoms({
  fontFamily: "monospace",
  background: "gray-800",
  borderRadius: "8px",
  color: "gray-400",
  padding: "l",
  display: "inline-flex",
});

export const promptChar = atoms({
  color: "gray-600",
  marginRight: "m",
});

export const linkButtons = atoms({
  marginTop: "l",
  display: "flex",
  gap: "l",
  alignItems: "center",
});

export const mdxPre = atoms({
  margin: "none",
  outline: "none",
});

export const features = style([
  atoms({
    display: {
      desktop: "grid",
      mobile: "flex",
    },
    flexDirection: "column",
    gap: "xl",
    width: {
      desktop: "1100px",
      mobile: "100%",
    },
    maxWidth: {
      desktop: "1100px",
      mobile: "48ch",
    },
    padding: {
      desktop: "none",
      mobile: "xl",
    },
    // gridTemplateColumns: {
    //   desktop: "three",
    //   mobile: "one",
    // },
  }),
  style({
    gridTemplateColumns: "repeat(3, 1fr)",
  }),
]);

export const flex1 = atoms({ flex: 1 });

export const footerText = atoms({
  marginBottom: "2xl",
  marginTop: "2xl",
  fontSize: "16px",
});

export const link = style([
  atoms({
    color: "blue-500",
  }),
  style({
    ":hover": {
      textDecoration: "underline",
    },
  }),
]);

export const tweetsWrapper = atoms({
  marginTop: "xl",
  marginBottom: "xl",
  background: "blue-100",
  paddingTop: "xl",
  paddingBottom: "xl",
  width: "100%",
});

export const tweets = style([
  atoms({
    display: "grid",
    gap: "xl",
  }),
  style({
    gridTemplateColumns: "repeat(2, 1fr)",
  }),
]);

export const subheader = atoms({
  fontSize: "20px",
  color: {
    lightMode: "black",
    darkMode: "gray-200",
  },
});

export const paragraph = atoms({
  fontSize: "16px",
  lineHeight: 1.75,
});
