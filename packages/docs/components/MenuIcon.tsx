import { useButton } from "@react-aria/button";
import { useDialog } from "@react-aria/dialog";
import { FocusScope, useFocusRing } from "@react-aria/focus";
import { useModal, useOverlay, usePreventScroll } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import { useOverlayTriggerState } from "@react-stately/overlays";
import React, { ReactNode, useRef, useState } from "react";

import * as styles from "./MenuIcon.css";

function CloseButton(props: { onPress: () => void }) {
  const { focusProps, isFocusVisible } = useFocusRing();
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, ref);

  return (
    <button
      {...mergeProps(focusProps, buttonProps)}
      ref={ref}
      className={styles.closeButton({
        boxShadow: isFocusVisible ? "focusVisible" : "focusVisible",
      })}
    >
      <div className={styles.closeIcon}>
        <div
          className={styles.closeBar}
          style={{
            transform: "translate(0, 14px) rotate(45deg)",
          }}
        />
        <div
          className={styles.closeBar}
          style={{
            transform: "translate(0, 14px) rotate(-45deg)",
          }}
        />
      </div>
    </button>
  );
}

function Menu({
  onClose,
  children,
}: {
  onClose: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { overlayProps, underlayProps } = useOverlay({}, ref);

  usePreventScroll();
  const { modalProps } = useModal();
  const { dialogProps } = useDialog({}, ref);

  return (
    <div className={styles.fullPageDiv} {...underlayProps}>
      <FocusScope contain restoreFocus autoFocus>
        <div
          ref={ref}
          className={styles.modalDiv}
          {...mergeProps(overlayProps, dialogProps, modalProps)}
        >
          <CloseButton onPress={onClose} />
          {children}
        </div>
      </FocusScope>
    </div>
  );
}

export function MenuIcon({ children }: { children: ReactNode }): JSX.Element {
  const state = useOverlayTriggerState({});

  // TODO: finish styling.
  const ref = useRef<HTMLButtonElement>(null);
  const [, setIsHovered] = useState(false);
  const { buttonProps } = useButton(
    {
      onPress: () => {
        state.open();
      },
    },
    ref
  );
  const { focusProps, isFocusVisible } = useFocusRing();

  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <button
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={styles.hamburger({
          boxShadow: isFocusVisible ? "focusVisible" : "default",
        })}
        {...mergeProps(buttonProps, focusProps)}
      >
        <div className={styles.bar} />
        <div className={styles.bar} />
        <div className={styles.bar} />
      </button>
      {state.isOpen && <Menu onClose={() => state.close()}>{children}</Menu>}
    </>
  );
}
