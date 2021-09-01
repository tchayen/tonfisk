/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import { useFocusRing } from "@react-aria/focus";
import { useSwitch } from "@react-aria/switch";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useToggleState } from "@react-stately/toggle";
import { AriaSwitchProps } from "@react-types/switch";
import { ReactElement, useRef } from "react";

type Props = AriaSwitchProps;

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
  const { space, fontSizes, radii, colors } = theme;

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
        }}
      >
        <div
          css={{
            width: "32px",
            height: "12px",
            borderRadius: radii[3],
            background: state.isSelected ? colors.outline : colors.border,
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
            boxShadow: isFocusVisible
              ? `0 0 0 3px ${colors.outline}`
              : "0 1px 3px rgba(0, 0, 0, 0.25)",
            background: state.isSelected ? colors.primary : colors.background,
          }}
        />
      </div>
    </label>
  );
}
