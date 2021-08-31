/** @jsx jsx */
import styled from "@emotion/styled";
import { useCheckbox } from "@react-aria/checkbox";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { useToggleState } from "@react-stately/toggle";
import { AriaCheckboxProps } from "@react-types/checkbox";
import { ReactElement, useRef } from "react";
import { space, SpaceProps } from "styled-system";
import { get, jsx } from "theme-ui";

const Tick = () => (
  <svg
    width="13"
    height="10"
    viewBox="0 0 13 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.5 8L3.79289 8.70711L4.5 9.41421L5.20711 8.70711L4.5 8ZM0.292893 5.20711L3.79289 8.70711L5.20711 7.29289L1.70711 3.79289L0.292893 5.20711ZM5.20711 8.70711L12.2071 1.70711L10.7929 0.292893L3.79289 7.29289L5.20711 8.70711Z"
      fill="white"
    />
  </svg>
);

// TODO:
// docs

const Label = styled("label")(space);

type Props = {
  children?: any;
} & AriaCheckboxProps &
  SpaceProps;

const Checkbox = (props: Props): ReactElement => {
  const { children } = props;
  const state = useToggleState(props);
  const ref = useRef(null);
  const { inputProps } = useCheckbox(props, state, ref);
  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <Label
      sx={{
        display: "flex",
        alignItems: "center",
        position: "relative",
        fontSize: 1,
      }}
      {...props}
    >
      <input
        {...mergeProps(inputProps, focusProps)}
        ref={ref}
        sx={{
          WebkitAppearance: "none",
          minWidth: 3,
          height: 3,
          borderRadius: 2,
          border: (t) => `1px solid
            ${
              state.isSelected || isFocusVisible
                ? get(t, "colors.blue500")
                : get(t, "colors.gray100")
            }`,
          margin: 0,
          bg: state.isSelected ? "blue500" : "white",
          boxShadow: (t) =>
            `${
              isFocusVisible
                ? `0 0 0 3px ${get(t, "colors.blue500opacity")}`
                : "none"
            }`,
          outline: "none",
        }}
      />
      {state.isSelected && (
        <div
          css={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "16px",
            top: 0,
          }}
        >
          <Tick />
        </div>
      )}
      <span sx={{ ml: 3 }}>{children}</span>
    </Label>
  );
};

export default Checkbox;
