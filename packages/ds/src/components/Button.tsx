/** @jsxRuntime classic */
/** @jsx jsx */
import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { AriaButtonProps } from "@react-types/button";
import { ReactElement } from "react";
import { useRef } from "react";
import { get, jsx } from "theme-ui";
import { Button as BButton } from "theme-ui";

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

  return (
    <BButton
      ref={ref}
      sx={{
        bg: isPressed ? "pressedButton" : "primary",
        boxShadow: (t) =>
          isFocusVisible ? `0 0 0 3px ${get(t, "colors.outline")}` : "none",
        "&:hover": {
          bg: "hoveredButton",
        },
        "&:active": {
          bg: "pressedButton",
        },
      }}
      {...mergeProps(focusProps, buttonProps)}
    >
      {props.children}
    </BButton>
  );
}
