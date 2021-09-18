import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import React, { ForwardedRef, RefObject, useRef } from "react";
import { useState } from "react";
import { atoms } from "../theme.css";

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
   * Defaults to `"regular"`.
   */
  size?: "regular" | "large";
  /**
   * Defaults to `"primary"`.
   */
  variant?: "primary" | "secondary";
};

function ButtonLink_(
  props: Omit<Props, "onPress"> & { href: string },
  ref: ForwardedRef<HTMLAnchorElement>
): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const { buttonProps, isPressed } = useButton(
    props,
    ref as RefObject<HTMLAnchorElement>
  );
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
    color: props.variant,
    background:
      props.variant !== "secondary"
        ? isPressed
          ? "active"
          : isHovered
          ? "hover"
          : "default"
        : isPressed
        ? "secondaryActive"
        : isHovered
        ? "secondaryHover"
        : "secondary",
    size: props.size || "regular",
    type: "link",
  });

  return (
    <a
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={className}
      ref={ref}
      {...mergeProps(focusProps, buttonProps)}
      href={props.href}
    >
      {props.children}
    </a>
  );
}

export const ButtonLink = React.forwardRef(ButtonLink_);

/**
 * Component for main user interactions in the app.
 *
 * ## Usage
 *
 * ```jsx
 * import { Button } from "TODO_LIB_NAME";
 *
 * function ButtonExample() {
 *   return (
 *     <Button onPress={() => console.log("I got pressed!")}>Press me →</Button>
 *   );
 * ```
 *
 * ## Example
 *
 * <Button onPress={() => console.log("I got pressed!")}>Press me →</Button>
 *
 * # ButtonLink
 *
 * Works exactly the same as regular button, but serves as a link.
 *
 * ## Props
 *
 * All props for `Button` are valid except `onPress`, with addition of:
 *
 * | Name | Type | Description |
 * | --- | --- | --- |
 * | href | `string` | The link target. |
 *
 * ## Usage
 *
 * ```jsx
 * import { Button } from "TODO_LIB_NAME";
 *
 * function ButtonLinkExample() {
 *   return (
 *     <ButtonLink href="/docs/getting-started">Getting started ↗</ButtonLink>
 *   );
 * ```
 *
 * ## Example
 *
 * <Link href="/docs/getting-started">
 *   <ButtonLink href="/docs/getting-started">Getting started ↗</ButtonLink>
 * </Link>
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
