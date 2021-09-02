/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { HiddenSelect, useSelect } from "@react-aria/select";
import { useSelectState } from "@react-stately/select";
import { AriaSelectProps } from "@react-types/select";
import { ReactElement, useRef } from "react";

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
 * <Select
 *   label="Select"
 *   onSelectionChange={(key) => console.log(key)}
 * >
 *  <Item key={0}>Item 1</Item>
 * </Select>
 * ```
 *
 * ## Example
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

  const theme = useTheme();
  const { space, fonts, sizes, fontSizes, fontWeights, radii, outline } = theme;

  // Get props for the button based on the trigger props from useSelect
  const { buttonProps } = useButton(triggerProps, ref);

  return (
    <div css={{ position: "relative", display: "inline-block" }}>
      <label
        {...labelProps}
        css={{
          fontSize: fontSizes[0],
          color: "var(--primary-text)",
          fontWeight: fontWeights.bold,
          marginBottom: space[1],
        }}
      >
        {props.label}
      </label>
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
        css={{
          width: "100%",
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          height: sizes[4],
          fontSize: fontSizes[1],
          borderRadius: radii[3],
          paddingLeft: space[2],
          paddingRight: `${space[2] * 2 + 14}px`, // 14 is the width of the chevron,
          fontFamily: fonts.body,
          outline: "none",
          background: "var(--background)",
          border: `1px solid
            ${isFocusVisible ? "var(--primary)" : "var(--border)"}`,
          boxShadow: `${isFocusVisible ? outline : "none"}`,
          position: "relative",
          color: state.selectedItem
            ? "var(--primary-text)"
            : "var(--secondary-text)",
          WebkitAppearance: "none",
        }}
      >
        <span {...valueProps}>
          {state.selectedItem
            ? state.selectedItem.rendered
            : "Select an option"}
        </span>
        <span
          aria-hidden="true"
          css={{ position: "absolute", right: space[2] }}
        >
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
