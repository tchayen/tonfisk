import { useTooltip, useTooltipTrigger } from "@react-aria/tooltip";
import { mergeProps } from "@react-aria/utils";
import { useTooltipTriggerState } from "@react-stately/tooltip";
import React, { ReactNode, useRef } from "react";

import { tooltipBox, tooltipButton, tooltipSpan } from "./Tooltip.css";

// TODO: TS
function TooltipBox({ state, ...props }): JSX.Element {
  const { tooltipProps } = useTooltip(props, state);

  return (
    <span className={tooltipBox} {...mergeProps(props, tooltipProps)}>
      {/* <svg height="8" width="10" viewBox="0 0 100 100" fill="white">
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
 * import { Tooltip } from "TODO_LIB_NAME";
 *
 * <Tooltip tooltip="You don't have to press if you don't want to.">
 *   <Button onPress={() => console.log("Thanks anyway!")}>Press me →</Button>
 * </Tooltip>
 * ```
 *
 * ## Example
 * <Tooltip tooltip="You don't have to press if you don't want to.">
 *   <Button onPress={() => console.log("Thanks anyway!")}>Press me →</Button>
 * </Tooltip>
 */
export function Tooltip(props: Props): JSX.Element {
  const { tooltip, children, direction } = props;
  const state = useTooltipTriggerState(props);
  const ref = useRef<HTMLButtonElement>(null);

  // Get props for the trigger and its tooltip
  const { triggerProps, tooltipProps } = useTooltipTrigger(props, state, ref);

  return (
    <span className={tooltipSpan}>
      <button ref={ref} {...triggerProps} className={tooltipButton}>
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
