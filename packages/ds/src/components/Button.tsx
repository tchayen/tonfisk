/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { AriaButtonProps } from "@react-types/button";
import { ReactElement, useRef } from "react";

type Props = {
  /**
   * Callback for interaction.
   */
  onPress: () => void;
  /**
   * Text of the button.
   */
  children: string;
  /**
   * Whether user can interact with the button.
   */
  isDisabled?: boolean;
} & AriaButtonProps;

/**
 * Component for main user interactions in the app.
 *
 * ## Usage
 *
 * ```jsx
 * import { Button } from "ds";
 *
 * <Button onPress={() => console.log("I got pressed!")}>
 *   Press me
 * </Button>
 * ```
 *
 * ## Example
 *
 * <Button onPress={() => console.log("I got pressed!")}>Press me</Button>
 */
export function Button(props: Props): ReactElement {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps, isPressed } = useButton(props, ref);
  const { focusProps, isFocusVisible } = useFocusRing();

  const theme = useTheme();
  const { fonts, fontSizes, fontWeights, space, sizes, colors, radii } = theme;

  return (
    <button
      ref={ref}
      css={{
        border: "none",
        outline: "none",
        cursor: "pointer",
        fontFamily: fonts.body,
        fontSize: fontSizes[1],
        fontWeight: fontWeights.bold,
        paddingLeft: space[3],
        paddingRight: space[3],
        height: sizes[4],
        lineHeight: `${sizes[4]}px`,
        borderRadius: radii[4],
        color: colors.background,
        background: isPressed ? colors.pressedButton : colors.primary,
        boxShadow: isFocusVisible ? `0 0 0 3px ${colors.outline}` : "none",
        "&:hover": {
          background: colors.hoveredButton,
        },
        "&:active": {
          background: colors.pressedButton,
        },
      }}
      {...mergeProps(focusProps, buttonProps)}
    >
      {props.children}
    </button>
  );
}
