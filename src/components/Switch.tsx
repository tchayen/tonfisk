import React, { useRef } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useToggleState } from "@react-stately/toggle";
import { useFocusRing } from "@react-aria/focus";
import { useSwitch } from "@react-aria/switch";
import { AriaSwitchProps } from "@react-types/switch";
import * as colors from "../colors";

type Props = {} & AriaSwitchProps;

export default function Switch(props: Props) {
  let state = useToggleState(props);
  let ref = useRef<HTMLInputElement>(null);
  let { inputProps } = useSwitch(props, state, ref);
  let { isFocusVisible, focusProps } = useFocusRing();

  return (
    <label style={{ display: "flex", alignItems: "center" }}>
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      <div
        style={{ display: "flex", alignItems: "center", position: "relative" }}
      >
        <div
          style={{
            width: 32,
            height: 12,
            borderRadius: 6,
            background: state.isSelected
              ? colors.purple500opacity
              : colors.gray100,
          }}
        />
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: 8,
            position: "absolute",
            right: state.isSelected ? 0 : 16,
            transition: "right 0.1s ease-in-out",
            boxShadow: isFocusVisible
              ? `0 0 0 3px ${colors.purple500opacity}`
              : "0 1px 3px rgba(0, 0, 0, 0.25)",
            background: state.isSelected ? colors.blue500 : colors.white,
          }}
        ></div>
      </div>
      {props.children}
    </label>
  );
}
