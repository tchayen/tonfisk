import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import React, { useRef, useState } from "react";

import * as styles from "./Pill.css";

type Props = {
  /**
   * Optional icon that will show on the left.
   */
  iconUrl?: string;
  /**
   * Text in the pill.
   */
  children?: string;
  /**
   * Callback when the pill is pressed.
   */
  onPress?: () => void;
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
 * import { Pill } from "tonfisk";
 *
 * function PillExample() {
 *   return <Pill>Pill</Pill>;
 * }
 * ```
 *
 * ## Example
 *
 * <div style={{ display: "flex", gap: "8px" }}>
 *   <Pill>Pill</Pill>
 *   <Pill iconUrl="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=013">Pill</Pill>
 * </div>
 */
export function Pill(props: Props): JSX.Element {
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

  const className = styles.pill({
    color: isPressed ? "pressed" : "default",
    background: isPressed ? "pressed" : isHovered ? "hovered" : "default",
    boxShadow:
      isFocusVisible || isPressed || isHovered
        ? "focusedOrPressedOrHovered"
        : "default",
    cursor: props.isDisabled ? "disabled" : "default",
    opacity: props.isDisabled ? "disabled" : "default",
    paddingLeft: props.iconUrl ? "hasIcon" : "default",
  });

  return (
    <button
      ref={ref}
      {...mergeProps(focusProps, buttonProps)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={className}
    >
      {props.iconUrl && <img className={styles.icon} src={props.iconUrl} />}
      {props.children}
    </button>
  );
}
