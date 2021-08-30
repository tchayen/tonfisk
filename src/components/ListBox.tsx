/** @jsx jsx */
import { jsx, useThemeUI } from "theme-ui";
import { useRef } from "react";
import { useListBox, useOption } from "@react-aria/listbox";

export default function ListBox(props) {
  let ref = useRef<HTMLUListElement>(null);
  let { listBoxRef = ref, state } = props;
  let { listBoxProps } = useListBox(props, state, listBoxRef);

  return (
    <ul
      {...listBoxProps}
      ref={listBoxRef}
      sx={{
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
  const { theme } = useThemeUI();

  let backgroundColor = "transparent";
  let color = theme.colors.black;

  if (isSelected) {
    backgroundColor = theme.colors.blue500;
    color = theme.colors.white;
  } else if (isFocused) {
    backgroundColor = theme.colors.gray100;
  } else if (isDisabled) {
  }

  return (
    <li
      {...optionProps}
      ref={ref}
      sx={{
        background: backgroundColor,
        fontSize: 1,
        color,
        paddingLeft: 2,
        paddingRight: 2,
        outline: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        height: 4,
      }}
    >
      {item.rendered}
    </li>
  );
}
