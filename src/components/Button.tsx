/** @jsx jsx */
import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { AriaButtonProps } from "@react-types/button";
import { ReactElement } from "react";
import { useRef } from "react";
import { get, jsx } from "theme-ui";
import { Button as BButton } from "theme-ui";

// TODO:
// docs

type Props = {
  isDisabled?: boolean;
  children: string;
  secondary?: boolean;
} & AriaButtonProps;

const Button = (props: Props): ReactElement => {
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
        bg: isPressed ? "blue600" : "blue500",
        boxShadow: (t) =>
          isFocusVisible
            ? `0 0 0 3px ${get(t, "colors.blue500opacity")}`
            : "none",
        "&:hover": {
          bg: "blue400",
        },
        "&:active": {
          bg: "blue600",
        },
      }}
      {...mergeProps(focusProps, buttonProps)}
    >
      {props.children}
    </BButton>
  );
};

export default Button;
