/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import { useListBox, useOption } from "@react-aria/listbox";
import { ReactElement, useRef } from "react";

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
      css={{
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
  const theme = useTheme();
  const { space, sizes, fontSizes } = theme;

  let backgroundColor = "transparent";
  let color = "var(--primary-text)";

  if (isSelected) {
    backgroundColor = "var(--primary)";
    color = "var(--background)";
  } else if (isFocused) {
    backgroundColor = "var(--border)";
  } else if (isDisabled) {
    //
  }

  return (
    <li
      {...optionProps}
      ref={ref}
      css={{
        background: backgroundColor,
        fontSize: fontSizes[1],
        color,
        paddingLeft: space[2],
        paddingRight: space[2],
        outline: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        height: sizes[4],
      }}
    >
      {item.rendered}
    </li>
  );
}
