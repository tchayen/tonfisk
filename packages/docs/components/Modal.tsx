/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import { OverlayContainer } from "@react-aria/overlays";
import { useOverlayTriggerState } from "@react-stately/overlays";
import { Button, HorizontalLine, ModalDialog } from "ds";
import { ReactElement } from "react";

export default function Modal(): ReactElement {
  const state = useOverlayTriggerState({});

  const theme = useTheme();
  const { space } = theme;

  return (
    <div>
      <Button onPress={() => state.open()}>Open Dialog</Button>
      {state.isOpen && (
        <OverlayContainer>
          <ModalDialog
            title="Enter your name"
            isOpen
            onClose={state.close}
            isDismissable
          >
            <HorizontalLine />
            <div css={{ padding: space[3] }}>Test</div>
          </ModalDialog>
        </OverlayContainer>
      )}
    </div>
  );
}
