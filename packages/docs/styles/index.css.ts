import { atoms } from "ds/src/theme.css";

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
  fontSize: "64px",
  marginTop: "2xl",
});

export const topParagraph = atoms({
  marginRight: "xl",
  paddingTop: "xl",
});

export const topParagraphElement = atoms({
  fontSize: "18px",
  lineHeight: 2,
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

export const features = atoms({
  display: "flex",
  gap: "l",
  width: "96ch",
  flexDirection: {
    desktop: "row",
    mobile: "column",
  },
});

export const flex1 = atoms({ flex: 1 });

export const footerText = atoms({
  marginBottom: "2xl",
  marginTop: "2xl",
  fontSize: "16px",
});

export const footerLink = atoms({
  fontWeight: "bold",
  color: {
    lightMode: "black",
    darkMode: "gray-200",
  },
});
