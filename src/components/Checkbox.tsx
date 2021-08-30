/** @jsx jsx */
import { get, jsx } from "theme-ui";
import { useRef } from "react";
import { AriaCheckboxProps } from "@react-types/checkbox";
import { useCheckbox } from "@react-aria/checkbox";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { useToggleState } from "@react-stately/toggle";
import { Label } from "theme-ui";

const Tick = () => (
  <svg
    width="13"
    height="10"
    viewBox="0 0 13 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ position: "absolute", top: 3, left: 2 }}
  >
    <path
      d="M4.5 8L3.79289 8.70711L4.5 9.41421L5.20711 8.70711L4.5 8ZM0.292893 5.20711L3.79289 8.70711L5.20711 7.29289L1.70711 3.79289L0.292893 5.20711ZM5.20711 8.70711L12.2071 1.70711L10.7929 0.292893L3.79289 7.29289L5.20711 8.70711Z"
      fill="white"
    />
  </svg>
);

// TODO:
// docs

type Props = {
  children?: any;
} & AriaCheckboxProps;

const Checkbox = (props: Props) => {
  const { children } = props;
  const state = useToggleState(props);
  const ref = useRef(null);
  const { inputProps } = useCheckbox(props, state, ref);
  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <Label sx={{ display: "block", position: "relative" }}>
      <input
        {...mergeProps(inputProps, focusProps)}
        ref={ref}
        sx={{
          WebkitAppearance: "none",
          width: 3,
          height: 3,
          borderRadius: 2,
          border: (t) => `1px solid
            ${
              state.isSelected || isFocusVisible
                ? get(t, "colors.blue500")
                : get(t, "colors.gray100")
            }`,
          margin: 0,
          background: (t) =>
            `${
              state.isSelected
                ? get(t, "colors.blue500")
                : get(t, "colors.white")
            }`,
          boxShadow: (t) =>
            `${
              isFocusVisible
                ? `0 0 0 3px ${get(t, "colors.blue500opacity")}`
                : "none"
            }`,
          outline: "none",
        }}
      />
      {state.isSelected && <Tick />}
      {children}
    </Label>
  );
};

export default Checkbox;
