import React, { useRef } from "react";
import { DismissButton, useOverlay } from "@react-aria/overlays";
import { FocusScope } from "@react-aria/focus";
import * as colors from "../colors";
import * as consts from "../consts";
import styled from "styled-components";

const SDiv = styled.div`
  position: absolute;
  z-index: 100;
  width: 100%;
  overflow: hidden;
  box-shadow: 0 0 0 1px inset ${colors.gray100}, ${consts.boxShadow};
  border-radius: ${consts.fieldRadius}px;
  background: ${colors.white};
  margin-top: ${consts.inputPaddings}px;
`;

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  popoverRef?: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
};

export default function Popover(props: Props) {
  let ref = useRef<HTMLDivElement>(null);
  let { popoverRef = ref, isOpen, onClose, children } = props;

  // Handle events that should cause the popup to close,
  // e.g. blur, clicking outside, or pressing the escape key.
  let { overlayProps } = useOverlay(
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
      <SDiv {...overlayProps} ref={popoverRef}>
        {children}
        <DismissButton onDismiss={onClose} />
      </SDiv>
    </FocusScope>
  );
}
