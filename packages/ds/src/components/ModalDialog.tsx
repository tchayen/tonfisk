/** @jsxRuntime classic */
/** @jsx jsx */
import { useButton } from "@react-aria/button";
import { useDialog } from "@react-aria/dialog";
import { FocusScope, useFocusRing } from "@react-aria/focus";
import { useModal, useOverlay, usePreventScroll } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import { ReactElement, ReactNode, useRef } from "react";
import { get, jsx, Themed } from "theme-ui";

import * as consts from "../consts";

const Close = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.00012 3.50006L13.0001 13.5001M13.0001 3.50006L3 13.5001"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const CloseButton = (props: any) => {
  const { focusProps, isFocusVisible } = useFocusRing();
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, ref);

  return (
    <button
      {...mergeProps(focusProps, buttonProps)}
      ref={ref}
      sx={{
        p: 2,
        borderRadius: 4,
        width: 4,
        height: 4,
        cursor: "pointer",
        border: "none",
        background: "transparent",
        boxShadow: (t) =>
          isFocusVisible
            ? `0 0 0 3px ${get(t, "colors.blue500opacity")}`
            : "none",
        outline: "none",
        "&:hover": {
          bg: "gray100",
        },
      }}
    >
      <Close />
    </button>
  );
};

type Props = {
  /**
   * Title of the modal.
   */
  title: string;
  /**
   * Components to display inside the modal.
   */
  children: ReactNode;
};

/**
 * ModalDialog component.
 */
export function ModalDialog(props: Props): ReactElement {
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
  const { dialogProps, titleProps } = useDialog(props, ref);

  return (
    <div
      sx={{
        position: "fixed",
        zIndex: 100,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        // background: "rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(15px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      {...underlayProps}
    >
      <FocusScope contain restoreFocus autoFocus>
        <div
          {...overlayProps}
          {...dialogProps}
          {...modalProps}
          ref={ref}
          sx={{
            background: "white",
            borderRadius: 3,
            width: "48ch",
            border: (t) => `1px solid ${get(t, "colors.gray100")}`,
            boxShadow: consts.boxShadow,
            outline: "none",
          }}
        >
          <div
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pr: 2,
            }}
          >
            <Themed.h3 {...titleProps} sx={{ m: 3 }}>
              {title}
            </Themed.h3>
            <CloseButton onPress={props.onClose} />
          </div>
          {children}
        </div>
      </FocusScope>
    </div>
  );
}
