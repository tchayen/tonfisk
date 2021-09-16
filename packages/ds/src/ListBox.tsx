import { useListBox, useOption } from "@react-aria/listbox";
import React, { useRef } from "react";

import * as styles from "./ListBox.css";
import { atoms } from "./theme.css";

/**
 * ListBox component.
 */
export function ListBox(props: any): JSX.Element {
  const ref = useRef<HTMLUListElement>(null);
  const { listBoxRef = ref, state } = props;
  const { listBoxProps } = useListBox(props, state, listBoxRef);

  return (
    <ul {...listBoxProps} ref={listBoxRef} className={styles.listBox}>
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

  return (
    <li
      {...optionProps}
      ref={ref}
      className={styles.option({
        background: isSelected ? "selected" : isFocused ? "focused" : "default",
        color: isSelected ? "selected" : isFocused ? "focused" : "default",
        opacity: isDisabled ? "disabled" : "default",
      })}
    >
      {item.rendered}
    </li>
  );
}
