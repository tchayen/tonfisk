/** @jsx jsx */
import { get, jsx } from "theme-ui";
import { useRef } from "react";
import { HiddenSelect, useSelect } from "@react-aria/select";
import { useButton } from "@react-aria/button";
import { useSelectState } from "@react-stately/select";
import { AriaSelectProps } from "@react-types/select";

import ListBox from "./ListBox";
import Popover from "./Popover";
import * as consts from "../consts";
import { useFocusRing } from "@react-aria/focus";
import { Label } from "theme-ui";

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
          background: (t) => get(t, "colors.white"),
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
