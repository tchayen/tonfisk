import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import React, { useRef, useState } from "react";

import { atoms } from "../theme.css";
import { pill } from "./Pill.css";

type Props = {
  /**
   * Optional icon that will show on the left.
   */
  iconUrl?: string;
  /**
   * Text in the pill.
   */
  children: string;
  /**
   * Callback when the pill is pressed.
   */
  onPress: () => void;
  /**
   * Whether user can interact with the pill.
   */
  isDisabled?: boolean;
};

/**
 *
 * ## Usage
 *
 * ```jsx
 * import { Pill } from "TODO_LIB_NAME";
 *
 * <Pill>Pill</Pill>
 * ```
 *
 * ## Example
 *
 * <div style={{ display: "flex", gap: "8px" }}>
 *   <Pill>Pill</Pill>
 *   <Pill iconUrl="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=013">Pill</Pill>
 * </div>
 */
export const Pill = (props: Props): JSX.Element => {
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

  // TODO: recipe
  const className = `${pill} ${atoms({
    color: {
      lightMode: isPressed ? "white" : "black",
      darkMode: "gray-200",
    },
    border: "none",
    cursor: props.isDisabled ? "default" : "pointer",
    opacity: props.isDisabled ? 0.5 : 1,
    background: {
      lightMode: isPressed ? "pink-500" : isHovered ? "pinkOutline" : "white",
      darkMode: isPressed ? "pink-500" : isHovered ? "pinkOutline" : "gray-900",
    },
    boxShadow: {
      lightMode:
        isFocusVisible || isPressed || isHovered ? "primary" : "regularBorder",
      darkMode:
        isFocusVisible || isPressed || isHovered ? "primary" : "darkBorder",
    },
    paddingLeft: props.iconUrl ? "m" : "l",
  })}`;

  return (
    <button
      ref={ref}
      {...mergeProps(focusProps, buttonProps)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={className}
    >
      {props.iconUrl && (
        <img
          // TODO: move to *.css.ts.
          className={atoms({
            width: "20px",
            height: "20px",
            borderRadius: "full",
          })}
          src={props.iconUrl}
        />
      )}
      {props.children}
    </button>
  );
};
