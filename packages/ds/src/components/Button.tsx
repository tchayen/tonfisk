import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import React, { ReactElement, useRef } from "react";
import { useState } from "react";

import { button } from "./Button.css";

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
  const [isHovered, setIsHovered] = useState(false);
  const { buttonProps, isPressed } = useButton(props, ref);
  const { focusProps, isFocusVisible } = useFocusRing();

  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };

  const className = button({
    cursor: props.isDisabled ? "disabled" : "active",
    boxShadow: isFocusVisible && !props.isDisabled ? "focusVisible" : "default",
    opacity: props.isDisabled ? "disabled" : "active",
    background: isPressed ? "active" : isHovered ? "hover" : "default",
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
