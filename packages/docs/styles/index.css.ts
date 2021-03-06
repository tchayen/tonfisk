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
  zIndex: 1000,
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
    mobile: "xl",
  },
  flexDirection: {
    desktop: "row",
    mobile: "column",
  },
  marginBottom: {
    desktop: "2xl",
  },
  marginTop: {
    desktop: "2xl",
  },
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
  marginBottom: {
    mobile: "xl",
  },
});

export const topParagraphElement = atoms({
  fontSize: "18px",
  lineHeight: 2,
  marginTop: "none",
  maxWidth: "64ch",
  textAlign: {
    desktop: "left",
    mobile: "center",
  },
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

export const preWrapper = style({
  maxWidth: "100%",
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
      mobile: "xl",
    },
  }),
  style({
    gridTemplateColumns: "repeat(3, 1fr)",
  }),
]);

export const flex1 = atoms({ flex: 1 });

export const footerText = atoms({
  marginBottom: "xl",
  marginTop: {
    desktop: "2xl",
  },
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

export const footerLink = style([
  atoms({
    color: {
      lightMode: "gray-400",
      darkMode: "gray-600",
    },
  }),
  style({
    ":hover": {
      textDecoration: "underline",
    },
  }),
]);

export const footerLinkRow = atoms({
  display: "flex",
  flexDirection: "row",
  gap: "l",
  marginBottom: "2xl",
  color: {
    darkMode: "gray-700",
    lightMode: "gray-200",
  },
});

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
