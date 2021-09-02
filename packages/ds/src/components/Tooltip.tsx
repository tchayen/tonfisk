/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import { useTooltip, useTooltipTrigger } from "@react-aria/tooltip";
import { mergeProps } from "@react-aria/utils";
import { useTooltipTriggerState } from "@react-stately/tooltip";
import { ReactElement, ReactNode, useRef } from "react";

function TooltipBox({
  state,
  direction,
  ...props
}: {
  direction: Direction;
}): ReactElement {
  const { tooltipProps } = useTooltip(props, state);
  const theme = useTheme();
  const { fontSizes, space, radii } = theme;

  let pos;

  switch (direction) {
    case "top":
      pos = {
        bottom: "calc(100% + 8px)",
        left: "50%",
      };
      break;
    case "bottom":
      pos = {
        top: "calc(100% + 8px)",
        left: "50%",
      };
      break;
    case "left":
      pos = {
        right: "calc(100% + 8px)",
        top: "50%",
      };
      break;
    case "right":
      pos = {
        left: "calc(100% + 8px)",
        top: "50%",
      };
      break;
    case "left-bottom":
      pos = {
        right: "calc(100% + 8px)",
        bottom: 0,
      };
      break;
    case "left-top":
      pos = {
        right: "calc(100% + 8px)",
        top: 0,
      };
      break;
    case "right-bottom":
      pos = {
        left: "calc(100% + 8px)",
        bottom: 0,
      };
      break;
    case "right-top":
      pos = {
        left: "calc(100% + 8px)",
        top: 0,
      };
      break;
    case "top-left":
      pos = {
        bottom: "calc(100% + 8px)",
        left: 0,
      };
      break;
    case "bottom-left":
      pos = {
        top: "calc(100% + 8px)",
        left: 0,
      };
      break;
    case "top-right":
      pos = {
        bottom: "calc(100% + 8px)",
        right: 0,
      };
      break;
    case "bottom-right":
      pos = {
        top: "calc(100% + 8px)",
        right: 0,
      };
      break;
  }

  return (
    <span
      css={{
        position: "absolute",
        // left: 0,
        // top: "calc(100% + 8px)",
        ...pos,
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

type Direction =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "left-bottom"
  | "left-top"
  | "right-bottom"
  | "right-top"
  | "top-left"
  | "bottom-left"
  | "top-right"
  | "bottom-right";

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
 * Tooltip component.
 *
 *
 * <div style={{ display:'flex', flexDirection:'column', width:200}}>
 * <Tooltip tooltip="Tooltip" direction="top">top</Tooltip>
 * <Tooltip tooltip="Tooltip" direction="bottom">bottom</Tooltip>
 * <Tooltip tooltip="Tooltip" direction="left">left</Tooltip>
 * <Tooltip tooltip="Tooltip" direction="right">right</Tooltip>
 * <Tooltip tooltip="Tooltip" direction="left-bottom">left-bottom</Tooltip>
 * <Tooltip tooltip="Tooltip" direction="left-top">left-top</Tooltip>
 * <Tooltip tooltip="Tooltip" direction="right-bottom">right-bottom</Tooltip>
 * <Tooltip tooltip="Tooltip" direction="right-top">right-top</Tooltip>
 * <Tooltip tooltip="Tooltip" direction="top-left">top-left</Tooltip>
 * <Tooltip tooltip="Tooltip" direction="bottom-left">bottom-left</Tooltip>
 * <Tooltip tooltip="Tooltip" direction="top-right">top-right</Tooltip>
 * <Tooltip tooltip="Tooltip" direction="bottom-right">bottom-right</Tooltip></div>
 */
export function Tooltip(props): ReactElement {
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
          background: "gray",
          appearance: "none",
          border: "none",
          outline: "none",
          height: 200,
          width: 200,
        }}
      >
        {children}
      </button>
      {
        /*state.isOpen*/ true && (
          <TooltipBox state={state} {...tooltipProps} direction={direction}>
            {tooltip}
          </TooltipBox>
        )
      }
    </span>
  );
}
