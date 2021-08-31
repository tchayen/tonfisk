/** @jsx jsx */
import styled from "@emotion/styled";
import { useFocusRing } from "@react-aria/focus";
import { useSwitch } from "@react-aria/switch";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useToggleState } from "@react-stately/toggle";
import { AriaSwitchProps } from "@react-types/switch";
import { ReactElement, useRef } from "react";
import { space, SpaceProps } from "styled-system";
import { get, jsx } from "theme-ui";

const Label = styled("label")(space);

type Props = SpaceProps & AriaSwitchProps;

export default function Switch(props: Props): ReactElement {
  const state = useToggleState(props);
  const ref = useRef<HTMLInputElement>(null);
  const { inputProps } = useSwitch(props, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <Label
      sx={{
        display: "flex",
        alignItems: "center",
        fontSize: 1,
        justifyContent: "space-between",
      }}
      {...props}
    >
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      {props.children}
      <div
        sx={{
          display: "flex",
          position: "relative",
          alignItems: "center",
          ml: 3,
        }}
      >
        <div
          sx={{
            width: "32px",
            height: "12px",
            borderRadius: 3,
            bg: state.isSelected ? "blue500opacity" : "gray100",
          }}
        />
        <div
          sx={{
            width: "16px",
            height: "16px",
            borderRadius: 3,
            position: "absolute",
            right: state.isSelected ? 0 : 16,
            transition: "right 0.1s ease-in-out",
            boxShadow: (t) =>
              isFocusVisible
                ? `0 0 0 3px ${get(t, "colors.blue500opacity")}`
                : "0 1px 3px rgba(0, 0, 0, 0.25)",
            bg: state.isSelected ? "blue500" : "white",
          }}
        />
      </div>
    </Label>
  );
}
