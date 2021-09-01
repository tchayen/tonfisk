/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { useThemeUI } from "theme-ui";
import { Button } from "./Button";

export function ColorModeSwitch(props) {
  const {
    theme: { rawColors },
    setColorMode,
  } = useThemeUI();

  return (
    <div>
      {Object.entries(rawColors?.modes).map(([mode, values]) => (
        <Button
          key={mode}
          sx={{ bg: values.background, color: values.text }}
          onClick={() => setColorMode(mode)}
        >
          {mode}
        </Button>
      ))}
    </div>
  );
}
