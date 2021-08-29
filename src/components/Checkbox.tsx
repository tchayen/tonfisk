import React, { useRef } from "react";
import { AriaCheckboxProps } from "@react-types/checkbox";
import { useCheckbox } from "@react-aria/checkbox";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { useToggleState } from "@react-stately/toggle";
import * as colors from "../colors";
import * as consts from "../consts";
import styled from "styled-components";

const Tick = () => (
  <svg
    width="13"
    height="10"
    viewBox="0 0 13 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ position: "absolute", top: 3, left: 2 }}
  >
    <path
      d="M4.5 8L3.79289 8.70711L4.5 9.41421L5.20711 8.70711L4.5 8ZM0.292893 5.20711L3.79289 8.70711L5.20711 7.29289L1.70711 3.79289L0.292893 5.20711ZM5.20711 8.70711L12.2071 1.70711L10.7929 0.292893L3.79289 7.29289L5.20711 8.70711Z"
      fill="white"
    />
  </svg>
);

// TODO:
// docs

type Props = {
  children?: any;
} & AriaCheckboxProps;

const SLabel = styled.label<{ isDisabled: boolean }>`
  display: block;
  position: relative;
  opacity: ${(props) => (props.isDisabled ? 0.5 : 1)};
`;

const SInput = styled.input<{
  isFocusVisible: boolean;
  isSelected: boolean;
}>`
  -webkit-appearance: none;
  width: ${consts.checkBoxSize}px;
  height: ${consts.checkBoxSize}px;
  border: 1px solid
    ${(props) =>
      props.isSelected || props.isFocusVisible
        ? colors.blue500
        : colors.gray100};
  margin: 0;
  border-radius: ${consts.checkBoxRadius}px;
  background: ${(props) => (props.isSelected ? colors.blue500 : colors.white)};
  box-shadow: ${(props) =>
    props.isFocusVisible ? `0 0 0 3px ${colors.purple500opacity}` : "none"};
  outline: none;
`;

const Checkbox = (props: Props) => {
  const { children } = props;
  const state = useToggleState(props);
  const ref = useRef(null);
  const { inputProps } = useCheckbox(props, state, ref);
  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <SLabel isDisabled={!!props.isDisabled}>
      <SInput
        {...mergeProps(inputProps, focusProps)}
        ref={ref}
        isFocusVisible={isFocusVisible}
        isSelected={state.isSelected}
      />
      {state.isSelected && <Tick />}
      {children}
    </SLabel>
  );
};

export default Checkbox;
