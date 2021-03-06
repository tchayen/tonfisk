import { useTooltip, useTooltipTrigger } from "@react-aria/tooltip";
import { mergeProps } from "@react-aria/utils";
import { useTooltipTriggerState } from "@react-stately/tooltip";
import { TooltipTriggerState } from "@react-stately/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import React, { ReactNode, useRef } from "react";

import { tooltipBox, tooltipButton, tooltipSpan } from "./Tooltip.css";

function TooltipBox({
  state,
  ...props
}: {
  state: TooltipTriggerState;
  children: ReactNode;
}): JSX.Element {
  const { tooltipProps } = useTooltip({}, state);

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <motion.div
      key="popover"
      initial={{ opacity: 0, x: 0, y: -8 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: 0, y: -8 }}
      transition={{ ease: "easeOut", duration: 0.15 }}
      className={tooltipBox}
      {...mergeProps(props, tooltipProps)}
    >
      {props.children}
    </motion.div>
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
 * > **Warning:** this component is not fully implemented and generates not semantic markup.
 *
 * Tooltip can be attached to a button.
 *
 * ## Usage
 *
 * ```jsx
 * import { Tooltip } from "tonfisk";
 *
 * function TooltipExample() {
 *   return (
 *     <Tooltip tooltip="You don't have to press if you don't want to.">
 *       <Button onPress={() => console.log("Thanks anyway!")}>
 *         Press me →
 *       </Button>
 *     </Tooltip>
 *   );
 * }
 * ```
 *
 * ## Example
 *
 * <Tooltip tooltip="You don't have to press if you don't want to.">
 *   <Button onPress={() => console.log("Thanks anyway!")}>Press me →</Button>
 * </Tooltip>
 */
export function Tooltip(props: Props): JSX.Element {
  const { tooltip, children } = props;
  const state = useTooltipTriggerState();
  const ref = useRef<HTMLButtonElement>(null);

  // Get props for the trigger and its tooltip
  const { triggerProps, tooltipProps } = useTooltipTrigger({}, state, ref);

  return (
    <span className={tooltipSpan}>
      <button ref={ref} {...triggerProps} className={tooltipButton}>
        {children}
      </button>
      <AnimatePresence>
        {state.isOpen && (
          <TooltipBox state={state} {...tooltipProps}>
            {tooltip}
          </TooltipBox>
        )}
      </AnimatePresence>
    </span>
  );
}
