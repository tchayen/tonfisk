import { OverlayContainer } from "@react-aria/overlays";
import { useOverlayTriggerState } from "@react-stately/overlays";
import { atoms, Button, HorizontalLine, ModalDialog } from "ds";
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
            <div
              className={atoms({
                color: {
                  lightMode: "black",
                  darkMode: "gray-200",
                },
                padding: "l",
              })}
            >
              Test
            </div>
          </ModalDialog>
        </OverlayContainer>
      )}
    </div>
  );
}
