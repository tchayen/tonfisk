/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";

import { Button } from "./Button";

export function ColorModeSwitch(props) {
  return (
    <div>
      {/* {Object.entries(rawColors?.modes).map(([mode, values]) => (
        <Button
          key={mode}
          sx={{ bg: values.background, color: values.text }}
          onClick={() => setColorMode(mode)}
        >
          {mode}
        </Button>
      ))} */}
    </div>
  );
}
