import { FocusScope } from "@react-aria/focus";
import { DismissButton, useOverlay } from "@react-aria/overlays";
import React, { ReactNode, useRef } from "react";

import { div } from "./FormPopover.css";

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
   * Optional ref for popover's div.
   */
  popoverRef?: React.RefObject<HTMLDivElement>;
  /**
   * Components to display inside the popover.
   */
  children: ReactNode;
};

/**
 * Popover component for situations when content outside of the popover should
 * be visible to screen readers.
 *
 * <Popover>Text</Popover>
 */
export function FormPopover(props: Props): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const { popoverRef = ref, isOpen, onClose, children } = props;

  // Handle events that should cause the popup to close,
  // e.g. blur, clicking outside, or pressing the escape key.
  const { overlayProps } = useOverlay(
    {
      isOpen,
      onClose,
      shouldCloseOnBlur: true,
      isDismissable: true,
    },
    popoverRef
  );

  // Add a hidden <DismissButton> component at the end of the popover
  // to allow screen reader users to dismiss the popup easily.
  return (
    <FocusScope restoreFocus>
      <div {...overlayProps} ref={popoverRef} className={div}>
        {children}
        <DismissButton onDismiss={onClose} />
      </div>
    </FocusScope>
  );
}
