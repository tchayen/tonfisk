import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import React, { useRef } from "react";
import { useState } from "react";

import * as styles from "./Button.css";

type Props = {
  /**
   * Text of the button.
   */
  children: string;
  /**
   * Callback for interaction.
   */
  onPress?: () => void;
  /**
   * Whether user can interact with the button.
   */
  isDisabled?: boolean;
  /**
   * When button should act as submit button for a form.
   */
  type?: "submit";
  /**
   * Defaults to "regular".
   */
  size?: "regular" | "large";
};

/**
 * Component for main user interactions in the app.
 *
 * ## Usage
 *
 * ```jsx
 * import { Button } from "TODO_LIB_NAME";
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
export function Button(props: Props): JSX.Element {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { buttonProps, isPressed } = useButton(props, ref);
  const { focusProps, isFocusVisible } = useFocusRing();

  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };

  const className = styles.button({
    cursor: props.isDisabled ? "disabled" : "active",
    boxShadow: isFocusVisible && !props.isDisabled ? "focusVisible" : "default",
    opacity: props.isDisabled ? "disabled" : "active",
    background: isPressed ? "active" : isHovered ? "hover" : "default",
    size: props.size || "regular",
  });

  return (
    <button
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={className}
      ref={ref}
      {...mergeProps(focusProps, buttonProps)}
    >
      {props.children}
    </button>
  );
}
