/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import { useTextField } from "@react-aria/textfield";
import { AriaTextFieldProps } from "@react-types/textfield";
import { ReactElement, useRef, useState } from "react";

type Props = AriaTextFieldProps;

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
  const { colors, space, fontSizes, sizes, radii, fonts } = theme;

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
      }}
    >
      <label {...labelProps}>{label}</label>
      <input
        {...(inputProps as React.InputHTMLAttributes<HTMLInputElement>)}
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
        css={{
          background: colors.background,
          color: colors.primaryText,
          paddingLeft: space[2],
          paddingRight: space[2],
          fontSize: fontSizes[1],
          fontFamily: fonts.body,
          height: sizes[4],
          borderRadius: radii[3],
          border: `1px solid
            ${isFocused ? colors.primary : colors.border}`,
          boxShadow: isFocused ? `0 0 0 3px ${colors.outline}` : "none",
          outline: "none",
          "::placeholder": {
            color: colors.secondaryText,
          },
        }}
      />
    </div>
  );
}
