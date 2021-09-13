import { FocusScope } from "@react-aria/focus";
import { DismissButton, useOverlay } from "@react-aria/overlays";
import React, { ReactElement, useRef } from "react";

import { atoms } from "./theme.css";

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
  children: React.ReactNode;
};

/**
 * Popover component for situations when content outside of the popover should
 * be visible to screen readers.
 *
 * <Popover>Text</Popover>
 */
export function FormPopover(props: Props): ReactElement {
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
      <div
        {...overlayProps}
        ref={popoverRef}
        // TODO: move to *.css.ts.
        className={atoms({
          position: "absolute",
          zIndex: 100,
          width: "100%",
          overflow: "hidden",
          boxShadow: {
            lightMode: "borderAndShadow",
            darkMode: "darkBorder",
          },
          background: {
            lightMode: "white",
            darkMode: "gray-900",
          },
          borderRadius: "8px",
          marginTop: "m",
        })}
      >
        {children}
        <DismissButton onDismiss={onClose} />
      </div>
    </FocusScope>
  );
}
