import React, { useRef } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useToggleState } from "@react-stately/toggle";
import { useFocusRing } from "@react-aria/focus";
import { useSwitch } from "@react-aria/switch";
import { AriaSwitchProps } from "@react-types/switch";
import * as colors from "../colors";
import styled from "styled-components";

const SLabel = styled.label`
  display: flex;
  align-items: center;
`;

const SDiv = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const SBar = styled.div<{ isSelected: boolean }>`
  width: 32px;
  height: 12px;
  border-radius: 6px;
  background: ${(props) =>
    props.isSelected ? colors.purple500opacity : colors.gray100};
`;

const SDot = styled.div<{ isSelected: boolean; isFocusVisible: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  position: absolute;
  right: ${(props) => (props.isSelected ? 0 : 16)}px;
  transition: right 0.1s ease-in-out;
  box-shadow: ${(props) =>
    props.isFocusVisible
      ? `0 0 0 3px ${colors.purple500opacity}`
      : "0 1px 3px rgba(0, 0, 0, 0.25)"};
  background: ${(props) => (props.isSelected ? colors.blue500 : colors.white)};
`;

type Props = {} & AriaSwitchProps;

export default function Switch(props: Props) {
  let state = useToggleState(props);
  let ref = useRef<HTMLInputElement>(null);
  let { inputProps } = useSwitch(props, state, ref);
  let { isFocusVisible, focusProps } = useFocusRing();

  return (
    <SLabel>
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      <SDiv>
        <SBar isSelected={state.isSelected} />
        <SDot isSelected={state.isSelected} isFocusVisible={isFocusVisible} />
      </SDiv>
      {props.children}
    </SLabel>
  );
}
