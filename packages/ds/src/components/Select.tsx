import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { HiddenSelect, useSelect } from "@react-aria/select";
import { useSelectState } from "@react-stately/select";
import React, { ReactElement, useRef } from "react";

import colors from "../colors";
import { FormPopover } from "../FormPopover";
import { Chevron } from "../icons/Chevron";
import { ListBox } from "../ListBox";
import { atoms } from "../theme.css";
import { Label } from "./Label";
import { button, label, select, span } from "./Select.css";

export { Item } from "@react-stately/collections";

type Props = {
  /**
   * Whether user can interact with the select.
   */
  isDisabled?: boolean;
  /**
   * Label displayed above the select component.
   */
  label: string;
  /**
   * Name of the select.
   */
  name: string;
  /**
   * Default is "Select an option".
   */
  placeholder: string;
  /**
   * TODO
   */
  children: ReactElement;
};

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
 * <SelectExample />
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
  const { buttonProps } = useButton(
    { ...triggerProps, isDisabled: props.isDisabled },
    ref
  );

  return (
    <div className={select}>
      <label {...labelProps} className={label}>
        {props.label}
      </label>
      <Label {...labelProps}>{props.label}</Label>
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
        className={`${button} ${atoms({
          border: {
            lightMode: isFocusVisible ? "primary" : "regular",
            darkMode: isFocusVisible ? "primary" : "regularDark",
          },
          boxShadow: isFocusVisible ? "outline" : "none",
          color: state.selectedItem ? "black" : "gray-600",
          opacity: props.isDisabled ? 0.5 : 1,
        })}`}
      >
        <span {...valueProps}>
          {state.selectedItem
            ? state.selectedItem.rendered
            : props.placeholder || "Select an option"}
        </span>
        <span aria-hidden="true" className={span}>
          <Chevron />
        </span>
      </button>
      {state.isOpen && (
        <FormPopover isOpen={state.isOpen} onClose={state.close}>
          <ListBox {...menuProps} state={state} />
        </FormPopover>
      )}
    </div>
  );
}
