/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import { useFocusRing } from "@react-aria/focus";
import { useSwitch } from "@react-aria/switch";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useToggleState } from "@react-stately/toggle";
import { ReactElement, useRef } from "react";

type Props = {
  /**
   * TODO
   */
  onChange: (value: boolean) => void;
  /**
   * Label of the switch.
   */
  children?: ReactElement;
  /**
   * Whether user can interact with the switch.
   */
  isDisabled?: boolean;
};

/**
 * Switch component.
 *
 * ## Usage
 *
 * ```jsx
 * import { Switch } from "ds";
 *
 * <Switch>Label</Switch>
 * ```
 *
 * ## Example
 *
 * <Switch>Label</Switch>
 */
export function Switch(props: Props): ReactElement {
  const state = useToggleState(props);
  const ref = useRef<HTMLInputElement>(null);
  const { inputProps } = useSwitch(props, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();
  const theme = useTheme();
  const { space, fontSizes, radii, outline, tooltipDotShadow } = theme;

  return (
    <label
      css={{
        display: "flex",
        alignItems: "center",
        fontSize: fontSizes[1],
        justifyContent: "space-between",
      }}
    >
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      {props.children}
      <div
        css={{
          display: "flex",
          position: "relative",
          alignItems: "center",
          marginLeft: space[3],
          opacity: props.isDisabled ? 0.5 : 1,
        }}
      >
        <div
          css={{
            width: "32px",
            height: "12px",
            borderRadius: radii[3],
            background: state.isSelected ? "var(--outline)" : "var(--border)",
          }}
        />
        <div
          css={{
            width: "16px",
            height: "16px",
            borderRadius: radii[3],
            position: "absolute",
            right: state.isSelected ? 0 : 16,
            transition: "right 0.1s ease-in-out",
            boxShadow: isFocusVisible ? outline : tooltipDotShadow,
            background: state.isSelected
              ? "var(--primary)"
              : "var(--tooltip-dot)",
          }}
        />
      </div>
    </label>
  );
}
