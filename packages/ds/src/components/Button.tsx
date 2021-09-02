/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
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
};

/**
 * Component for main user interactions in the app.
 *
 * ## Usage
 *
 * ```jsx
 * import { Button } from "@tchayen/design-system";
 *
 * <Button onPress={() => console.log("I got pressed!")}>
 *   Press me
 * </Button>
 * ```
 *
 * ## Example
 *
 * <Button onPress={() => console.log("I got pressed!")}>Press me →</Button>
 */
export function Button(props: Props): ReactElement {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps, isPressed } = useButton(props, ref);
  const { focusProps, isFocusVisible } = useFocusRing();

  const theme = useTheme();
  const { fonts, fontSizes, fontWeights, space, sizes, radii, outline } = theme;

  return (
    <button
      ref={ref}
      css={{
        marginX: 100,
        border: "none",
        outline: "none",
        cursor: "pointer",
        fontFamily: fonts.body,
        fontSize: fontSizes[1],
        fontWeight: fontWeights.bold,
        paddingLeft: space[3],
        paddingRight: space[3],
        height: sizes[4],
        lineHeight: 1,
        borderRadius: radii[4],
        color: "var(--background)",
        background: isPressed ? "var(--pressed-button)" : "var(--primary)",
        boxShadow: isFocusVisible ? outline : "none",
        "&:hover": {
          background: "var(--hovered-button)",
        },
        "&:active": {
          background: "var(--pressed-button)",
        },
      }}
      {...mergeProps(focusProps, buttonProps)}
    >
      {props.children}
    </button>
  );
}
