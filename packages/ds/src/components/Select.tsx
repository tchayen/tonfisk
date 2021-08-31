/** @jsxRuntime classic */
/** @jsx jsx */
import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { HiddenSelect, useSelect } from "@react-aria/select";
import { useSelectState } from "@react-stately/select";
import { AriaSelectProps } from "@react-types/select";
import { ReactElement, useRef } from "react";
import { get, jsx } from "theme-ui";
import { Label } from "theme-ui";

import * as consts from "../consts";
import { Chevron } from "../icons/Chevron";
import { ListBox } from "./ListBox";
import { Popover } from "./Popover";

export { Item } from "@react-stately/collections";

type Props = AriaSelectProps<HTMLInputElement>;

/**
 * Select component.
 *
 * ## Usage
 *
 * ```jsx
 * import { Select, Item } from "ds";
 *
 * <Select label="Select" onSelectionChange={(key) => console.log(key)}>
 *  <Item key={0}>Item 1</Item>
 * </Select>
 * ```
 *
 * <Select label="Fruits" onSelectionChange={(key) => {}}>
 *   {[
 *     { id: 1, name: "Apple" },
 *     { id: 2, name: "Orange" },
 *     { id: 3, name: "Plum" },
 *   ].map((item) => (
 *     123 // TODO: fix this - <Item key={item.id}>{item.name}</Item>
 *   ))}
 * </Select>
 */
export function Select(props: Props): ReactElement {
  const { isFocusVisible, focusProps } = useFocusRing();

  // Create state based on the incoming props
  const state = useSelectState(props);

  // Get props for child elements from useSelect
  const ref = useRef<HTMLButtonElement>(null);
  const { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    props,
    state,
    ref
  );

  // Get props for the button based on the trigger props from useSelect
  const { buttonProps } = useButton(triggerProps, ref);

  return (
    <div sx={{ position: "relative", display: "inline-block" }}>
      <Label {...labelProps} mb={1}>
        {props.label}
      </Label>
      <HiddenSelect
        state={state}
        triggerRef={ref}
        label={props.label}
        name={props.name}
      />
      <button
        {...buttonProps}
        {...focusProps}
        ref={ref}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          height: 4,
          fontSize: 1,
          borderRadius: 3,
          paddingLeft: 2,
          paddingRight: `${consts.inputPaddings * 2 + 14}px`, // 14 is the width of the chevron,
          fontFamily: "body",
          position: "relative",
          bg: "white",
          color: state.selectedItem ? "black" : "gray600",
          WebkitAppearance: "none",
          border: (t) => `1px solid
            ${
              isFocusVisible
                ? get(t, "colors.blue500")
                : get(t, "colors.gray100")
            }`,
          boxShadow: (t) =>
            `${
              isFocusVisible
                ? `0 0 0 3px ${get(t, "colors.blue500opacity")}`
                : "none"
            }`,
          outline: "none",
        }}
      >
        <span {...valueProps}>
          {state.selectedItem
            ? state.selectedItem.rendered
            : "Select an option"}
        </span>
        <span aria-hidden="true" sx={{ position: "absolute", right: 2 }}>
          <Chevron />
        </span>
      </button>
      {state.isOpen && (
        <Popover isOpen={state.isOpen} onClose={state.close}>
          <ListBox {...menuProps} state={state} />
        </Popover>
      )}
    </div>
  );
}
