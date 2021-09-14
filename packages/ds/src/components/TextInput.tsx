import { useTextField } from "@react-aria/textfield";
import React, {
  ChangeEventHandler,
  FocusEvent,
  ReactElement,
  useRef,
  useState,
} from "react";

import { atoms } from "../theme.css";
import { Label } from "./Label";
import { div, input } from "./TextInput.css";

type Props = {
  /**
   * Placeholder dislayed inside the input when it is empty.
   */
  placeholder?: string;
  /**
   * Label displayed above the input.
   */
  label?: string;
  /**
   * Whether user can interact with the input.
   */
  isDisabled?: boolean;
  /**
   * Whether input should focus on mount.
   */
  autoFocus?: boolean;
  /**
   * TODO
   */
  onChange?: ChangeEventHandler;
  /**
   * TODO
   */
  onFocus?: (event: React.FocusEvent) => void;
  /**
   * TODO
   */
  onBlur?: (event: React.FocusEvent) => void;
  /**
   * TODO
   */
  value?: string;
  /**
   *
   */
  onKeyPress?: (event: React.KeyboardEvent) => void;
  /**
   * TODO
   */
  "aria-label"?: string;
};

/**
 * Input component.
 *
 * ## Usage
 *
 * ```jsx
 * import { TextInput } from "ds";
 *
 * <TextInput label="First name" placeholder="John" />
 * ```
 *
 * ## Example
 *
 * <TextInput label="First name" placeholder="John" />
 */
export function TextInput(props: Props): ReactElement {
  const { label } = props;
  const ref = useRef<HTMLInputElement>(null);
  const { labelProps, inputProps } = useTextField(props, ref);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (event: FocusEvent) => {
    setIsFocused(true);
    if (props.onFocus) {
      props.onFocus(event);
    }
  };

  const handleBlur = (event: FocusEvent) => {
    setIsFocused(false);
    if (props.onBlur) {
      props.onBlur(event);
    }
  };

  return (
    <div className={`${div} ${atoms({ opacity: props.isDisabled ? 0.5 : 1 })}`}>
      {label && <Label {...labelProps}>{label}</Label>}
      <input
        {...inputProps}
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoFocus={props.autoFocus}
        onChange={props.onChange}
        onKeyPress={props.onKeyPress}
        // TODO: recipe, large variant
        className={`${input} ${atoms({
          padding: "xs",
          border: "none",
          boxShadow: {
            lightMode: isFocused ? "primary" : "regularBorder",
            darkMode: isFocused ? "primary" : "darkBorder",
          },
        })}`}
      />
    </div>
  );
}
