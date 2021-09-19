import { atoms } from "./theme.css";

export const div = atoms({
  position: "absolute",
  zIndex: 100,
  width: "100%",
  overflow: "hidden",
  boxShadow: {
    lightMode: "borderAndShadow",
    darkMode: "darkBorder",
  },
  background: {
    lightMode: "white",
    darkMode: "gray-900",
  },
  borderRadius: "8px",
  marginTop: "m",
});
