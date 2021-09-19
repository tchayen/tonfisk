/* eslint-disable @typescript-eslint/ban-types */
import { AriaListBoxOptions, useListBox, useOption } from "@react-aria/listbox";
import { ListState } from "@react-stately/list/dist/types";
import { Node } from "@react-types/shared/src/collections";
import React, { useRef } from "react";

import * as styles from "./ListBox.css";

type Props = {
  state: ListState<object>;
} & AriaListBoxOptions<object>;

/**
 * ListBox component.
 */
export function ListBox(props: Props): JSX.Element {
  const ref = useRef<HTMLUListElement>(null);
  const { state } = props;
  const { listBoxProps } = useListBox(props, state, ref);

  return (
    <ul {...listBoxProps} ref={ref} className={styles.listBox}>
      {Array.from(state.collection).map((item) => (
        <Option key={item.key} item={item} state={state} />
      ))}
    </ul>
  );
}

/**
 * Option component.
 */
function Option({
  item,
  state,
}: {
  item: Node<object>;
  state: ListState<object>;
}) {
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
