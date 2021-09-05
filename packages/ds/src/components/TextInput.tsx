/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import { useTextField } from "@react-aria/textfield";
import { ReactElement, useRef, useState } from "react";

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
  const theme = useTheme();
  const { space, fontSizes, fontWeights, sizes, radii, fonts, outline } = theme;

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        opacity: props.isDisabled ? 0.5 : 1,
      }}
    >
      <label
        {...labelProps}
        css={{
          fontSize: fontSizes[0],
          color: "var(--primary-text)",
          fontWeight: fontWeights.bold,
          marginBottom: space[1],
        }}
      >
        {label}
      </label>
      <input
        {...(inputProps as React.InputHTMLAttributes<HTMLInputElement>)}
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
        css={{
          height: sizes[4],
          fontSize: fontSizes[1],
          borderRadius: radii[3],
          fontFamily: fonts.body,
          outline: "none",
          background: "var(--background)",
          border: `1px solid
            ${isFocused ? "var(--primary)" : "var(--border)"}`,
          boxShadow: isFocused ? outline : "none",
          paddingLeft: space[2],
          paddingRight: space[2],
          color: "var(--primary-text)",
          "::placeholder": {
            color: "var(--secondary-text)",
          },
        }}
      />
    </div>
  );
}
