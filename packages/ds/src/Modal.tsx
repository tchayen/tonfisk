/** @jsxRuntime classic */
/** @jsx jsx */
import { useButton } from "@react-aria/button";
import { OverlayContainer } from "@react-aria/overlays";
import { useOverlayTriggerState } from "@react-stately/overlays";
import { ReactElement, useRef } from "react";
import { Box, Grid, jsx, Themed } from "theme-ui";

import { Button } from "./components/Button";
import { Checkbox } from "./components/Checkbox";
import { horizontalLine } from "./components/horizontalLine";
import { Input } from "./components/Input";
import { ModalDialog } from "./components/ModalDialog";
import { Switch } from "./components/Switch";

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
            {horizontalLine}
            <Grid p={3} gap={3}>
              <Input label="Title" placeholder="Title" />
              <Input label="Description" placeholder="Description" />
            </Grid>
            {horizontalLine}
            <Switch p={3}>
              Enter a fixed price to allow people to purchase your NFT.
            </Switch>
            <Box bg="gray100" css={{ width: "100%", height: 1 }} />
            <Checkbox p={3}>
              I have the rights to publish this artwork, and understand it will
              be minted on the{" "}
              <Themed.strong sx={{ color: "black" }}>Polygon</Themed.strong>{" "}
              network.
            </Checkbox>
            {horizontalLine}
            <div
              sx={{
                display: "flex",
                p: 3,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span sx={{ fontSize: 1 }}>Last saved 2 minutes ago</span>
              <Button onPress={() => console.log("aaa")}>Create</Button>
            </div>
          </ModalDialog>
        </OverlayContainer>
      )}
    </div>
  );
}
