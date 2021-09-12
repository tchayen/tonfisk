import { useDialog } from "@react-aria/dialog";
import { FocusScope } from "@react-aria/focus";
import { DismissButton, useModal, useOverlay } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import React, { forwardRef } from "react";

import { atoms } from "../theme.css";

type Props = {
  /**
   * Whether popup is open.
   */
  isOpen?: boolean;
  /**
   * Called when closing.
   */
  onClose: () => void;
  /**
   * Components to display inside the popover.
   */
  children: React.ReactNode;
};

/**
 * Popover component for situations when content outside of the popover should
 * NOT be visible to screen readers.
 *
 * <Popover>Text</Popover>
 */
export const Popover = forwardRef((props: Props, ref) => {
  const { overlayProps } = useOverlay(
    {
      onClose: props.onClose,
      isOpen: props.isOpen,
      isDismissable: true,
    },
    ref
  );

  const { modalProps } = useModal();
  const { dialogProps /*, titleProps*/ } = useDialog({}, ref);

  const className = atoms({
    boxShadow: {
      lightMode: "borderAndShadow",
      darkMode: "darkBorder",
    },
    background: {
      lightMode: "white",
      darkMode: "gray-900",
    },
    borderRadius: "8px",
    outline: "none",
  });

  return (
    <FocusScope restoreFocus>
      <div
        {...mergeProps(overlayProps, dialogProps, modalProps)}
        ref={ref}
        className={className}
        style={props.style}
      >
        {/* <h3 {...titleProps}>{props.title}</h3> */}
        {props.children}
        <DismissButton onDismiss={props.onClose} />
      </div>
    </FocusScope>
  );
});
