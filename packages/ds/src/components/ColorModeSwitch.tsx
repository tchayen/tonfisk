/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import { ReactElement } from "react";

import { Button } from "./Button";

export function ColorModeSwitch(props): ReactElement {
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
