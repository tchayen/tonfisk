import { useDialog } from "@react-aria/dialog";
import { FocusScope } from "@react-aria/focus";
import { DismissButton, useModal, useOverlay } from "@react-aria/overlays";
import { OverlayContainer } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { ForwardedRef, forwardRef, ReactNode, RefObject } from "react";

import { atoms } from "../theme.css";

type Props = {
  /**
   * Called when closing.
   */
  onClose?: () => void;
  /**
   * Components to display inside the popover.
   */
  children?: ReactNode;
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
 * ## Usage
 *
 * ```jsx
 * import { Popover } from "tonfisk";
 *
 * function PopoverExample() {
 *   // ...
 * }
 * ```
 *
 * ## Example
 *
 * <PopoverExample />
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
      <AnimatePresence>
        {props.isOpen && (
          <OverlayContainer>
            <motion.div
              key="popover"
              initial={{ opacity: 0, x: 0, y: -16 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 0, y: -16 }}
              transition={{ ease: "easeOut", duration: 0.15 }}
              style={{ position: "relative" }}
            >
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
            </motion.div>
          </OverlayContainer>
        )}
      </AnimatePresence>
    );
  }
);
