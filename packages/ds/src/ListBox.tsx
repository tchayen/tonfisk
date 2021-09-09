import { useListBox, useOption } from "@react-aria/listbox";
import React, { ReactElement, useRef } from "react";

import { listBox, option } from "./ListBox.css";
import { atoms } from "./theme.css";

/**
 * ListBox component.
 */
export function ListBox(props: any): ReactElement {
  const ref = useRef<HTMLUListElement>(null);
  const { listBoxRef = ref, state } = props;
  const { listBoxProps } = useListBox(props, state, listBoxRef);

  return (
    <ul {...listBoxProps} ref={listBoxRef} className={listBox}>
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
  let color = {
    lightMode: "black",
    darkMode: "gray-400",
  };

  if (isSelected) {
    backgroundColor = "pink-500";
    color = {
      lightMode: "white",
      darkMode: "gray-200",
    };
  } else if (isFocused) {
    color = {
      lightMode: "black",
      darkMode: "gray-200",
    };
    backgroundColor = {
      lightMode: "gray-200",
      darkMode: "gray-600",
    };
  } else if (isDisabled) {
    //
  }

  return (
    <li
      {...optionProps}
      ref={ref}
      className={`${option} ${atoms({
        background: backgroundColor,
        color,
      })}`}
    >
      {item.rendered}
    </li>
  );
}
