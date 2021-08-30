/** @jsx jsx */
import { get, jsx } from "theme-ui";
import { useRef } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useToggleState } from "@react-stately/toggle";
import { useFocusRing } from "@react-aria/focus";
import { useSwitch } from "@react-aria/switch";
import { AriaSwitchProps } from "@react-types/switch";

type Props = {} & AriaSwitchProps;

export default function Switch(props: Props) {
  let state = useToggleState(props);
  let ref = useRef<HTMLInputElement>(null);
  let { inputProps } = useSwitch(props, state, ref);
  let { isFocusVisible, focusProps } = useFocusRing();

  return (
    <label sx={{ display: "flex", alignItems: "center" }}>
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      <div sx={{ display: "flex", position: "relative", alignItems: "center" }}>
        <div
          sx={{
            width: 32,
            height: 12,
            borderRadius: 3,
            background: (t) =>
              state.isSelected
                ? get(t, "colors.blue500opacity")
                : get(t, "colors.gray100"),
          }}
        />
        <div
          sx={{
            width: 16,
            height: 16,
            borderRadius: 3,
            position: "absolute",
            right: state.isSelected ? 0 : 16,
            transition: "right 0.1s ease-in-out",
            boxShadow: (t) =>
              isFocusVisible
                ? `0 0 0 3px ${get(t, "colors.blue500opacity")}`
                : "0 1px 3px rgba(0, 0, 0, 0.25)",
            background: (t) =>
              state.isSelected
                ? get(t, "colors.blue500")
                : get(t, "colors.white"),
          }}
        />
      </div>
      {props.children}
    </label>
  );
}
