import React, { useRef } from "react";
import { AriaButtonProps } from "@react-types/button";
import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import * as colors from "../colors";
import * as consts from "../consts";
import styled from "styled-components";

// TODO:
// docs

const SButton = styled.button<{ isFocusVisible: boolean }>`
  padding: "0 12px";
  background: ${colors.blue500};
  color: ${colors.white};
  height: ${consts.fieldHeight}px;
  border-radius: ${consts.fieldHeight / 2}px;
  font-family: ${consts.fontFamily};
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  box-shadow: ${(props) =>
    props.isFocusVisible ? `0 0 0 3px ${colors.purple500opacity}` : "none"};
  outline: none;
`;

type Props = {
  isDisabled?: boolean;
  children: string;
  secondary?: boolean;
} & AriaButtonProps;

const Button = (props: Props) => {
  const ref = useRef(null);
  const { buttonProps, isPressed } = useButton(props, ref);
  const { focusProps, isFocusVisible } = useFocusRing();

  // TODO:
  // - hover
  // - focus
  // - active
  // - no double click on mobile

  return (
    <SButton
      ref={ref}
      isFocusVisible={isFocusVisible}
      {...mergeProps(focusProps, buttonProps)}
    >
      {props.children}
    </SButton>
  );
};

export default Button;
