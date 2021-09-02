/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import { useButton } from "@react-aria/button";
import { useDialog } from "@react-aria/dialog";
import { FocusScope, useFocusRing } from "@react-aria/focus";
import { useModal, useOverlay, usePreventScroll } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import { ReactElement, ReactNode, useRef } from "react";

import { Close } from "../icons/Close";

const CloseButton = (props: any) => {
  const { focusProps, isFocusVisible } = useFocusRing();
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, ref);
  const theme = useTheme();
  const { space, radii, sizes, outline } = theme;

  return (
    <button
      {...mergeProps(focusProps, buttonProps)}
      ref={ref}
      css={{
        padding: space[2],
        borderRadius: radii[4],
        width: sizes[4],
        height: sizes[4],
        cursor: "pointer",
        border: "none",
        background: "transparent",
        boxShadow: isFocusVisible ? outline : "none",
        outline: "none",
        "&:hover": {
          background: "var(--border)",
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
 *
 *  ## Usage
 *
 * ```jsx
 * import { ModalDialog } from "@tchayen/design-system";
 *
 * <ModalDialog />
 * ```
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

  const theme = useTheme();
  const { space, radii, boxShadow } = theme;

  return (
    <div
      css={{
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
          css={{
            background: "var(--background)",
            borderRadius: radii[3],
            width: "48ch",
            border: "1px solid var(--border)",
            boxShadow,
            outline: "none",
          }}
        >
          <div
            css={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingRight: space[2],
            }}
          >
            <h3 {...titleProps} css={{ margin: space[3] }}>
              {title}
            </h3>
            <CloseButton onPress={props.onClose} />
          </div>
          {children}
        </div>
      </FocusScope>
    </div>
  );
}
