import { useButton } from "@react-aria/button";
import { useDialog } from "@react-aria/dialog";
import { FocusScope, useFocusRing } from "@react-aria/focus";
import { useModal, useOverlay, usePreventScroll } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { ReactNode, useRef } from "react";

import { Close } from "../icons/Close";
import * as styles from "./Modal.css";

const CloseButton = (props: { onPress?: () => void }) => {
  const { focusProps, isFocusVisible } = useFocusRing();
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, ref);

  return (
    <button
      {...mergeProps(focusProps, buttonProps)}
      ref={ref}
      className={styles.closeButton({
        boxShadow: isFocusVisible ? "focusVisible" : "default",
      })}
    >
      <Close />
    </button>
  );
};

type Props = {
  /**
   * Title of the modal.
   */
  title?: string;
  /**
   * Components to display inside the modal.
   */
  children: ReactNode;
  /**
   * Whether modal is open.
   */
  isOpen?: boolean;
  /**
   * Callback called when modal is closed (can happen with `ESC` key or clicking outside).
   */
  onClose?: () => void;
  /**
   * Whether modal can be dismissed by `ESC` or click outside.
   */
  isDismissable?: boolean;
};

function ModalDialog(props: Props): JSX.Element {
  const { title, children } = props;

  // Handle interacting outside the dialog and pressing
  // the Escape key to close the modal.
  const ref = useRef<HTMLDivElement>(null);
  const { overlayProps, underlayProps } = useOverlay(props, ref);

  // Prevent scrolling while the modal is open, and hide content
  // outside the modal from screen readers.
  usePreventScroll();
  const { modalProps } = useModal();

  // Get props for the dialog and its title
  const { dialogProps, titleProps } = useDialog({}, ref);

  return (
    <div className={styles.fullPageDiv} {...underlayProps}>
      <FocusScope contain restoreFocus autoFocus>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <motion.div
          key="modal"
          initial={{ opacity: 0, x: 0, y: -48 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 0, y: -48 }}
          transition={{ ease: "easeOut", duration: 0.15 }}
          style={{ position: "relative" }}
          ref={ref}
          {...mergeProps(overlayProps, dialogProps, modalProps)}
          className={styles.modalDiv}
        >
          <div className={styles.titleRow}>
            <h3 {...titleProps} className={styles.title}>
              {title}
            </h3>
            <CloseButton onPress={props.onClose} />
          </div>
          {children}
        </motion.div>
      </FocusScope>
    </div>
  );
}

/**
 * Modal component.
 *
 *  ## Usage
 *
 * ```jsx
 * import { useOverlayTriggerState } from "@react-stately/overlays";
 * import { Button, HorizontalLine, Modal } from "tonfisk";
 *
 * function ModalExample() {
 *   const state = useOverlayTriggerState({});
 *
 *   return (
 *     <>
 *       <Button onPress={() => state.open()}>Open modal</Button>
 *       <Modal
 *         title="A modal example"
 *         onClose={state.close}
 *         isOpen={state.isOpen}
 *         isDismissable
 *       >
 *         <HorizontalLine />
 *         <p
 *           className={atoms({
 *             padding: "l",
 *             margin: "none",
 *             color: {
 *               lightMode: "gray-600",
 *               darkMode: "gray-400",
 *             },
 *           })}
 *         >
 *           You can close this modal by clicking outside or using escape.
 *         </p>
 *       </Modal>
 *     </>
 *   );
 * }
 * ```
 *
 * ## Example
 *
 * <ModalExample />
 */
export function Modal(props: Props): JSX.Element {
  return (
    <AnimatePresence>
      {props.isOpen && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ModalDialog {...props} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
