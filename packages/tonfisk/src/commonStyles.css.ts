import { atoms } from "./theme.css";

export const primaryTextColor = atoms({
  color: {
    lightMode: "black",
    darkMode: "gray-200",
  },
});

export const secondaryTextColor = atoms({
  color: {
    lightMode: "gray-600",
    darkMode: "gray-400",
  },
});

export const flexColumn = atoms({
  display: "flex",
  flexDirection: "column",
  gap: "l",
  padding: "l",
});
