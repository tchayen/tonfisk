import React, { useRef } from "react";
import { AriaListBoxOptions, useListBox, useOption } from "@react-aria/listbox";
import * as colors from "../colors";
import * as consts from "../consts";

export default function ListBox(props) {
  let ref = useRef<HTMLUListElement>(null);
  let { listBoxRef = ref, state } = props;
  let { listBoxProps } = useListBox(props, state, listBoxRef);

  return (
    <ul
      {...listBoxProps}
      ref={listBoxRef}
      style={{
        margin: 0,
        padding: 0,
        listStyle: "none",
        // maxHeight: "150px",
        overflow: "auto",
        outline: "none",
      }}
    >
      {[...state.collection].map((item) => (
        <Option key={item.key} item={item} state={state} />
      ))}
    </ul>
  );
}

function Option({ item, state }) {
  let ref = useRef<HTMLLIElement>(null);
  let { optionProps, isSelected, isFocused, isDisabled } = useOption(
    { key: item.key },
    state,
    ref
  );

  let backgroundColor;
  let color = colors.black;

  if (isSelected) {
    backgroundColor = colors.blue500;
    color = colors.white;
  } else if (isFocused) {
    backgroundColor = colors.gray100;
  } else if (isDisabled) {
  }

  return (
    <li
      {...optionProps}
      ref={ref}
      style={{
        background: backgroundColor,
        fontSize: consts.text.normal.fontSize,
        color,
        paddingLeft: consts.inputPaddings,
        paddingRight: consts.inputPaddings,
        outline: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        height: consts.fieldHeight,
        borderRadius: consts.fieldRadius,
      }}
    >
      {item.rendered}
    </li>
  );
}
