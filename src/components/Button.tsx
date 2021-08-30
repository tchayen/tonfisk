/** @jsx jsx */
import { get, jsx } from "theme-ui";
import { useRef } from "react";
import { AriaButtonProps } from "@react-types/button";
import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { Button as BButton } from "theme-ui";

// TODO:
// docs

type Props = {
  isDisabled?: boolean;
  children: string;
  secondary?: boolean;
} & AriaButtonProps;

const Button = (props: Props) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps, isPressed } = useButton(props, ref);
  const { focusProps, isFocusVisible } = useFocusRing();

  // TODO:
  // - hover
  // - focus
  // - active
  // - no double click on mobile

  return (
    <BButton
      ref={ref}
      sx={{
        boxShadow: (t) =>
          isFocusVisible
            ? `0 0 0 3px ${get(t, "colors.blue500opacity")}`
            : "none",
      }}
      {...mergeProps(focusProps, buttonProps)}
    >
      {props.children}
    </BButton>
  );
};

export default Button;
