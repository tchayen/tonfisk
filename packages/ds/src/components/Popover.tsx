import { useDialog } from "@react-aria/dialog";
import { FocusScope } from "@react-aria/focus";
import { DismissButton, useModal, useOverlay } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import React, { ForwardedRef, forwardRef, ReactNode, RefObject } from "react";

import { atoms } from "../theme.css";

type Props = {
  /**
   * Called when closing.
   */
  onClose: () => void;
  /**
   * Components to display inside the popover.
   */
  children: ReactNode;
  /**
   * Whether popup is open.
   */
  isOpen?: boolean;
  /**
   * Used in some cases to style position and size of the popover.
   */
  style?: React.CSSProperties;
};

/**
 * Popover component for situations when content outside of the popover should
 * **not** be visible to screen readers.
 *
 * See [Example](/example) for advanced example.
 */
export const Popover = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLDivElement>) => {
    const { overlayProps } = useOverlay(
      {
        onClose: props.onClose,
        isOpen: props.isOpen,
        isDismissable: true,
      },
      ref as RefObject<HTMLDivElement>
    );

    const { modalProps } = useModal();
    const { dialogProps } = useDialog({}, ref as RefObject<HTMLDivElement>);

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
          ref={ref as RefObject<HTMLDivElement>}
          className={className}
          style={props.style}
          {...mergeProps(overlayProps, dialogProps, modalProps)}
        >
          {props.children}
          <DismissButton onDismiss={props.onClose} />
        </div>
      </FocusScope>
    );
  }
);
