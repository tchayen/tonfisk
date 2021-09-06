import { OverlayContainer } from "@react-aria/overlays";
import { useOverlayTriggerState } from "@react-stately/overlays";
import { Button, HorizontalLine, ModalDialog } from "ds";
import { atoms } from "ds/src/theme.css";
import React, { ReactElement } from "react";

export default function Modal(): ReactElement {
  const state = useOverlayTriggerState({});

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
            <div className={atoms({ padding: "l" })}>Test</div>
          </ModalDialog>
        </OverlayContainer>
      )}
    </div>
  );
}
