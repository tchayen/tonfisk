/** @jsxRuntime classic */
/** @jsx jsx */
import styled from "@emotion/styled";
import { useCheckbox } from "@react-aria/checkbox";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { useToggleState } from "@react-stately/toggle";
import { AriaCheckboxProps } from "@react-types/checkbox";
import { ReactElement, useRef } from "react";
import { space, SpaceProps } from "styled-system";
import { get, jsx } from "theme-ui";

import { Tick } from "../icons/Tick";

const Label = styled("label")(space);

type Props = {
  /**
   * Label of the checkbox.
   */
  children?: any;
} & AriaCheckboxProps &
  SpaceProps;

/**
 * Checkbox component.
 *
 * ## Usage
 *
 * ```jsx
 * import { Checkbox } from "ds";
 *
 * <Checkbox>Label</Checkbox>
 * ```
 *
 * <Checkbox>Label</Checkbox>
 */
export function Checkbox(props: Props): ReactElement {
  const { children } = props;
  const state = useToggleState(props);
  const ref = useRef(null);
  const { inputProps } = useCheckbox(props, state, ref);
  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <Label
      sx={{
        display: "flex",
        alignItems: "center",
        position: "relative",
        fontSize: 1,
      }}
      {...props}
    >
      <input
        {...mergeProps(inputProps, focusProps)}
        ref={ref}
        sx={{
          WebkitAppearance: "none",
          minWidth: 3,
          height: 3,
          borderRadius: 2,
          border: (t) => `1px solid
            ${
              state.isSelected || isFocusVisible
                ? get(t, "colors.blue500")
                : get(t, "colors.gray100")
            }`,
          margin: 0,
          bg: state.isSelected ? "blue500" : "white",
          boxShadow: (t) =>
            `${
              isFocusVisible
                ? `0 0 0 3px ${get(t, "colors.blue500opacity")}`
                : "none"
            }`,
          outline: "none",
        }}
      />
      {state.isSelected && (
        <div
          css={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "16px",
            top: 0,
          }}
        >
          <Tick />
        </div>
      )}
      <span sx={{ ml: 3 }}>{children}</span>
    </Label>
  );
}
