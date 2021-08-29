import React, { useRef } from "react";
import { HiddenSelect, useSelect } from "@react-aria/select";
import { useButton } from "@react-aria/button";
import { useSelectState } from "@react-stately/select";
import { AriaSelectProps } from "@react-types/select";

import ListBox from "./ListBox";
import Popover from "./Popover";
import * as colors from "../colors";
import * as consts from "../consts";
import { useFocusRing } from "@react-aria/focus";
import styled from "styled-components";

export { Item } from "@react-stately/collections";

const Chevron = () => (
  <svg
    width="14"
    height="8"
    viewBox="0 0 14 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.0001 6.40001L6.4001 7.20001L7.0001 7.65001L7.6001 7.20001L7.0001 6.40001ZM9.76324e-05 2.40001L6.4001 7.20001L7.6001 5.60001L1.2001 0.800006L9.76324e-05 2.40001ZM7.6001 7.20001L14.0001 2.40001L12.8001 0.800006L6.4001 5.60001L7.6001 7.20001Z"
      fill="#777777"
    />
  </svg>
);

const SButton = styled.button<{ isFocusVisible: boolean }>`
  height: ${consts.fieldHeight}px;
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: ${consts.text.normal.fontSize}px;
  padding-left: ${consts.inputPaddings}px;
  padding-right: ${consts.inputPaddings}px;
  font-family: ${consts.fontFamily};
  border-radius: ${consts.fieldRadius}px;
  position: relative;
  background: ${colors.white};
  -webkit-appearance: none;
  border: 1px solid
    ${(props) => (props.isFocusVisible ? colors.blue500 : colors.gray100)};
  box-shadow: ${(props) =>
    props.isFocusVisible ? `0 0 0 3px ${colors.purple500opacity}` : "none"};
  outline: none;
  margin-top: ${consts.labelMargin}px; // TODO: this assumes label above!
`;

const SDiv = styled.div`
  position: relative;
  display: inline-block;
`;

const SSpan = styled.span`
  position: absolute;
  right: ${consts.inputPaddings}px;
`;

const SLabel = styled.label`
  font-size: ${consts.text.label.fontSize}px;
  font-weight: ${consts.text.label.fontWeight};
`;

type Props = {} & AriaSelectProps<HTMLInputElement>;

export default function Select(props: Props) {
  const { isFocusVisible, focusProps } = useFocusRing();

  // Create state based on the incoming props
  const state = useSelectState(props);

  // Get props for child elements from useSelect
  const ref = useRef<HTMLButtonElement>(null);
  const { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    props,
    state,
    ref
  );

  // Get props for the button based on the trigger props from useSelect
  let { buttonProps } = useButton(triggerProps, ref);

  return (
    <SDiv>
      <SLabel {...labelProps}>{props.label}</SLabel>
      <HiddenSelect
        state={state}
        triggerRef={ref}
        label={props.label}
        name={props.name}
      />
      <SButton
        {...buttonProps}
        {...focusProps}
        ref={ref}
        isFocusVisible={isFocusVisible}
      >
        <span {...valueProps}>
          {state.selectedItem
            ? state.selectedItem.rendered
            : "Select an option"}
        </span>
        <SSpan aria-hidden="true">
          <Chevron />
        </SSpan>
      </SButton>
      {state.isOpen && (
        <Popover isOpen={state.isOpen} onClose={state.close}>
          <ListBox {...menuProps} state={state} />
        </Popover>
      )}
    </SDiv>
  );
}
