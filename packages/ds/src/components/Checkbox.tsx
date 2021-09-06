/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import { useCheckbox } from "@react-aria/checkbox";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { useToggleState } from "@react-stately/toggle";
import { ReactElement, ReactNode, useRef } from "react";

import { Tick } from "../icons/Tick";

type Props = {
  /**
   * TODO
   */
  onChange: (checked: boolean) => void;
  /**
   * Label of the checkbox.
   */
  children?: ReactNode;
  /**
   * Whether user can interact with the checkbox.
   */
  isDisabled?: boolean;
};

/**
 * Checkbox component.
 *
 * ## Usage
 *
 * ```jsx
 * import { Checkbox } from "@tchayen/design-system";
 *
 * <Checkbox>Label</Checkbox>
 * ```
 *
 * ## Example
 *
 * <CheckboxExample />
 */
export function Checkbox(props: Props): ReactElement {
  const { children } = props;
  const state = useToggleState(props);
  const ref = useRef(null);
  const { inputProps } = useCheckbox(props, state, ref);
  const { focusProps, isFocusVisible } = useFocusRing();

  const theme = useTheme();
  const { fontSizes, space, sizes, radii, outline } = theme;

  return (
    <label
      css={{
        display: "flex",
        alignItems: "center",
        position: "relative",
        fontSize: fontSizes[1],
      }}
    >
      <input
        {...mergeProps(inputProps, focusProps)}
        ref={ref}
        css={{
          WebkitAppearance: "none",
          minWidth: space[3],
          height: sizes[3],
          borderRadius: radii[2],
          border: `1px solid ${
            state.isSelected || isFocusVisible
              ? "var(--primary)"
              : "var(--border)"
          }`,
          margin: 0,
          background: state.isSelected ? "var(--primary)" : "var(--background)",
          boxShadow: `${isFocusVisible ? outline : "none"}`,
          outline: "none",
          opacity: props.isDisabled ? 0.5 : 1,
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
      <span css={{ marginLeft: space[3] }}>{children}</span>
    </label>
  );
}
