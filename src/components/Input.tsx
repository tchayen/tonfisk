import React, { useRef, useState } from "react";
import { useTextField } from "@react-aria/textfield";
import { AriaTextFieldProps } from "@react-types/textfield";
import * as colors from "../colors";
import * as consts from "../consts";
import styled from "styled-components";

const SDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const SLabel = styled.label`
  font-size: ${consts.text.label.fontSize}px;
  font-weight: ${consts.text.label.fontWeight};
  margin-bottom: 4px;
`;

const SInput = styled.input<{ isFocused: boolean }>`
  padding-left: ${consts.inputPaddings}px;
  padding-right: ${consts.inputPaddings}px;
  font-size: ${consts.text.normal.fontSize}px;
  font-family: ${consts.fontFamily};
  height: ${consts.fieldHeight}px;
  border-radius: ${consts.fieldRadius}px;
  border: 1px solid
    ${(props) => (props.isFocused ? colors.blue500 : colors.gray100)};
  box-shadow: ${(props) =>
    props.isFocused ? `0 0 0 3px ${colors.purple500opacity}` : "none"};
  outline: none;
`;

type Props = {} & AriaTextFieldProps;

export default function Input(props: Props) {
  let { label } = props;
  let ref = useRef<HTMLInputElement>(null);
  let { labelProps, inputProps } = useTextField(props, ref);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <SDiv>
      <SLabel {...labelProps}>{label}</SLabel>
      <SInput
        {...(inputProps as React.InputHTMLAttributes<HTMLInputElement>)}
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
        isFocused={isFocused}
      />
    </SDiv>
  );
}
