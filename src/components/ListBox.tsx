import React, { useRef } from "react";
import { AriaListBoxOptions, useListBox, useOption } from "@react-aria/listbox";
import * as colors from "../colors";
import * as consts from "../consts";
import styled from "styled-components";

const SUl = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  // maxHeight: "150px",
  overflow: auto;
  outline: none;
`;

export default function ListBox(props) {
  let ref = useRef<HTMLUListElement>(null);
  let { listBoxRef = ref, state } = props;
  let { listBoxProps } = useListBox(props, state, listBoxRef);

  return (
    <SUl {...listBoxProps} ref={listBoxRef}>
      {[...state.collection].map((item) => (
        <Option key={item.key} item={item} state={state} />
      ))}
    </SUl>
  );
}

const SLi = styled.li<{ backgroundColor: string; color: string }>`
  background: ${(props) => props.backgroundColor};
  font-size: ${consts.text.normal.fontSize}px;
  color: ${(props) => props.color};
  padding-left: ${consts.inputPaddings}px;
  padding-right: ${consts.inputPaddings}px;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  height: ${consts.fieldHeight}px;
`;

function Option({ item, state }) {
  let ref = useRef<HTMLLIElement>(null);
  let { optionProps, isSelected, isFocused, isDisabled } = useOption(
    { key: item.key },
    state,
    ref
  );

  let backgroundColor = "transparent";
  let color = colors.black;

  if (isSelected) {
    backgroundColor = colors.blue500;
    color = colors.white;
  } else if (isFocused) {
    backgroundColor = colors.gray100;
  } else if (isDisabled) {
  }

  return (
    <SLi
      {...optionProps}
      ref={ref}
      backgroundColor={backgroundColor}
      color={color}
    >
      {item.rendered}
    </SLi>
  );
}
