/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import { useTooltip, useTooltipTrigger } from "@react-aria/tooltip";
import { mergeProps } from "@react-aria/utils";
import { useTooltipTriggerState } from "@react-stately/tooltip";
import { ReactElement, ReactNode, useRef } from "react";

function TooltipBox({ state, ...props }): ReactElement {
  const { tooltipProps } = useTooltip(props, state);
  const theme = useTheme();
  const { fontSizes, space, radii } = theme;

  return (
    <span
      css={{
        position: "absolute",
        left: 0,
        top: "calc(100% + 8px)",
        fontSize: fontSizes[0],
        padding: space[1],
        borderRadius: radii[2],
        border: "1px solid var(--border)",
        color: "var(--secondary-text)",
        background: "var(--background)",
      }}
      {...mergeProps(props, tooltipProps)}
    >
      {/* <svg height="8" width="10" viewBox="0 0 100 100" fill="var(--background)">
        <polygon points="50,0 100,100 0,100" />
      </svg> */}

      {props.children}
    </span>
  );
}

type Props = {
  /**
   * Content of the tooltip.
   */
  tooltip: string;
  /**
   * Component that will have tooltip.
   */
  children: ReactNode;
};

/**
 * Tooltip can be attached to a button.
 *
 * ## Usage
 *
 * ```jsx
 * import { Tooltip } from "@tchayen/design-system";
 *
 * <Tooltip tooltip="You don't have to press if you don't want to.">
 *   <Button onPress={() => console.log("Thanks anyway!")}>Press me</Button>
 * </Tooltip>
 * ```
 *
 * ## Example
 * <Tooltip tooltip="You don't have to press if you don't want to">
 *   <Button onPress={() => console.log("Thanks anyway!")}>Press me</Button>
 * </Tooltip>
 */
export function Tooltip(props: Props): ReactElement {
  const { tooltip, children, direction } = props;
  const state = useTooltipTriggerState(props);
  const ref = useRef<HTMLButtonElement>(null);
  const theme = useTheme();
  const { fonts } = theme;

  // Get props for the trigger and its tooltip
  const { triggerProps, tooltipProps } = useTooltipTrigger(props, state, ref);

  return (
    <span css={{ position: "relative" }}>
      <button
        ref={ref}
        {...triggerProps}
        css={{
          fontFamily: fonts.body,
          background: "transparent",
          appearance: "none",
          border: "none",
          outline: "none",
        }}
      >
        {children}
      </button>
      {state.isOpen && (
        <TooltipBox state={state} {...tooltipProps} direction={direction}>
          {tooltip}
        </TooltipBox>
      )}
    </span>
  );
}
