/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import { useButton } from "@react-aria/button";
import { OverlayContainer } from "@react-aria/overlays";
import { useOverlayTriggerState } from "@react-stately/overlays";
import { ReactElement, useRef } from "react";

import { Button } from "./components/Button";
import { Checkbox } from "./components/Checkbox";
import { HorizontalLine } from "./components/HorizontalLine";
import { ModalDialog } from "./components/ModalDialog";
import { Switch } from "./components/Switch";
import { TextInput } from "./components/TextInput";

export default function Modal(): ReactElement {
  const state = useOverlayTriggerState({});
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // useButton ensures that focus management is handled correctly,
  // across all browsers. Focus is restored to the button once the
  // dialog closes.
  const { buttonProps: openButtonProps } = useButton(
    {
      onPress: () => state.open(),
    },
    openButtonRef
  );

  const { buttonProps: closeButtonProps } = useButton(
    {
      onPress: () => state.close(),
    },
    closeButtonRef
  );

  const theme = useTheme();
  const { space, colors, fontSizes } = theme;

  return (
    <div>
      <button {...openButtonProps} ref={openButtonRef}>
        Open Dialog
      </button>
      {state.isOpen && (
        <OverlayContainer>
          <ModalDialog
            title="Enter your name"
            isOpen
            onClose={state.close}
            isDismissable
          >
            <HorizontalLine />
            <div css={{ display: "grid", padding: space[3], gap: space[3] }}>
              <TextInput label="Title" placeholder="Title" />
              <TextInput label="Description" placeholder="Description" />
            </div>
            <HorizontalLine />
            <Switch>
              Enter a fixed price to allow people to purchase your NFT.
            </Switch>
            <HorizontalLine />
            <Checkbox>
              I have the rights to publish this artwork, and understand it will
              be minted on the{" "}
              <strong css={{ color: colors.primaryText }}>Polygon</strong>{" "}
              network.
            </Checkbox>
            <HorizontalLine />
            <div
              css={{
                display: "flex",
                p: space[3],
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span css={{ fontSize: fontSizes[1] }}>
                Last saved 2 minutes ago
              </span>
              <Button onPress={() => console.log("aaa")}>Create</Button>
            </div>
          </ModalDialog>
        </OverlayContainer>
      )}
    </div>
  );
}
