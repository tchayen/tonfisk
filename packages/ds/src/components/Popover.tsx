import { useDialog } from "@react-aria/dialog";
import { FocusScope } from "@react-aria/focus";
import { DismissButton, useModal, useOverlay } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import React, { forwardRef, ReactNode } from "react";

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
  children: ReactNode;
};

/**
 * Popover component for situations when content outside of the popover should
 * **not** be visible to screen readers.
 *
 * See [Example](/example) for advanced example.
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
    <FocusScope contain restoreFocus>
      <div
        ref={ref}
        className={className}
        style={props.style} // TODO: is this necessary and/or working?
        {...mergeProps(overlayProps, dialogProps, modalProps)}
      >
        {/* <h3 {...titleProps}>{props.title}</h3> */}
        {props.children}
        <DismissButton onDismiss={props.onClose} />
      </div>
    </FocusScope>
  );
});
