/** @jsxRuntime classic */
/** @jsx jsx */
import { FocusScope } from "@react-aria/focus";
import { DismissButton, useOverlay } from "@react-aria/overlays";
import { ReactElement, useRef } from "react";
import { get, jsx } from "theme-ui";

import * as consts from "../consts";

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
 * Popover component.
 */
export function Popover(props: Props): ReactElement {
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
        sx={{
          position: "absolute",
          zIndex: 100,
          width: "100%",
          overflow: "hidden",
          boxShadow: (t) =>
            `0 0 0 1px inset ${get(t, "colors.gray100")}, ${consts.boxShadow}`,
          borderRadius: `${consts.fieldRadius}px`,
          background: (t) => get(t, "colors.white"),
          marginTop: 2,
        }}
      >
        {children}
        <DismissButton onDismiss={onClose} />
      </div>
    </FocusScope>
  );
}
