import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import React, { ReactElement, useRef } from "react";
import { useState } from "react";

import { atoms } from "../theme.css";
import { button } from "./Button.css";

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
  const [isHovered, setIsHovered] = useState(false);
  const { buttonProps, isPressed } = useButton(props, ref);
  const { focusProps, isFocusVisible } = useFocusRing();

  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };

  const className = `${button} ${atoms({
    cursor: props.isDisabled ? "default" : "pointer",
    opacity: props.isDisabled ? 0.5 : 1,
    background: isPressed ? "pink-600" : isHovered ? "pink-400" : "pink-500",
    boxShadow: isFocusVisible ? "outline" : "none",
  })}`;

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
