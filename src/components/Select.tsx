import React, { useRef } from "react";
import { HiddenSelect, useSelect } from "@react-aria/select";
import { useButton } from "@react-aria/button";
import { useSelectState } from "@react-stately/select";
import { AriaSelectProps } from "@react-types/select";

import ListBox from "./ListBox";
import Popover from "./Popover";
import * as colors from "../colors";
import * as consts from "../consts";
import { useFocusRing } from "@react-aria/focus";

export { Item } from "@react-stately/collections";

const Chevron = () => (
  <svg
    width="14"
    height="8"
    viewBox="0 0 14 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.0001 6.40001L6.4001 7.20001L7.0001 7.65001L7.6001 7.20001L7.0001 6.40001ZM9.76324e-05 2.40001L6.4001 7.20001L7.6001 5.60001L1.2001 0.800006L9.76324e-05 2.40001ZM7.6001 7.20001L14.0001 2.40001L12.8001 0.800006L6.4001 5.60001L7.6001 7.20001Z"
      fill="#777777"
    />
  </svg>
);

type Props = {} & AriaSelectProps<HTMLInputElement>;

export default function Select(props: Props) {
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
  let { buttonProps } = useButton(triggerProps, ref);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div {...labelProps} style={consts.text.label}>
        {props.label}
      </div>
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
        style={{
          height: consts.fieldHeight,
          width: "100%",
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          fontSize: consts.text.normal.fontSize,
          paddingLeft: consts.inputPaddings,
          paddingRight: consts.inputPaddings,
          fontFamily: consts.fontFamily,
          borderRadius: consts.fieldRadius,
          position: "relative",
          background: colors.white,
          WebkitAppearance: "none",
          border: `1px solid ${
            isFocusVisible ? colors.blue500 : colors.gray100
          }`,
          boxShadow: isFocusVisible
            ? `0 0 0 3px ${colors.purple500opacity}`
            : "none",
          outline: "none",
        }}
      >
        <span {...valueProps}>
          {state.selectedItem
            ? state.selectedItem.rendered
            : "Select an option"}
        </span>
        <span
          aria-hidden="true"
          style={{ position: "absolute", right: consts.inputPaddings }}
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
