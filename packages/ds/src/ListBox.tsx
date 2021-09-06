import { useListBox, useOption } from "@react-aria/listbox";
import React, { ReactElement, useRef } from "react";

import { atoms } from "./theme.css";

/**
 * ListBox component.
 */
export function ListBox(props: any): ReactElement {
  const ref = useRef<HTMLUListElement>(null);
  const { listBoxRef = ref, state } = props;
  const { listBoxProps } = useListBox(props, state, listBoxRef);

  return (
    <ul
      {...listBoxProps}
      ref={listBoxRef}
      className={atoms({
        margin: "none",
        padding: "none",
        listStyle: "none",
        // maxHeight: "150px",
        overflow: "auto",
        outline: "none",
      })}
    >
      {[...state.collection].map((item) => (
        <Option key={item.key} item={item} state={state} />
      ))}
    </ul>
  );
}

/**
 * Option component.
 */
function Option({ item, state }: any) {
  const ref = useRef<HTMLLIElement>(null);
  const { optionProps, isSelected, isFocused, isDisabled } = useOption(
    { key: item.key },
    state,
    ref
  );

  let backgroundColor = "transparent";
  let color = "black";

  if (isSelected) {
    backgroundColor = "pink-500";
    color = "white";
  } else if (isFocused) {
    backgroundColor = "gray-200";
  } else if (isDisabled) {
    //
  }

  return (
    <li
      {...optionProps}
      ref={ref}
      className={atoms({
        background: backgroundColor,
        color,
        fontSize: "14px",
        paddingLeft: "m",
        paddingRight: "m",
        height: "32px",
        outline: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
      })}
    >
      {item.rendered}
    </li>
  );
}
