import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { ReactNode, RefObject, useRef, useState } from "react";

import { atoms } from "..";

type Props = {
  /**
   * If set, accordion will start open.
   */
  mountOpen?: boolean;
  /**
   * JSX for the component to be displayed as header. Enclosed in `<header>` tag.
   */
  header: ReactNode;
  /**
   * Accordion content that can be minimized and expanded. Enclosed in `<section>` tag.
   */
  children: ReactNode;
  /**
   * Styling of the header applied to the `<header>`.
   */
  className?: string;
};

/**
 * Accordion component can be minimized and expanded.
 *
 * Use `header` to provide the title of the accordion.
 *
 * ## Usage
 *
 * ```jsx
 * function AccordionExample() {
 *   return (
 *     <div>
 *       <Accordion header={<h2>Header 1</h2>}>
 *         Test
 *       </Accordion>
 *       <Accordion header={<h2>Header 2</h2>}>
 *         Other test
 *       </Accordion>
 *     </div>
 *   );
 * }
 * ```
 *
 * ## Example
 *
 * <AccordionExample />
 */
export function Accordion({
  header,
  className,
  mountOpen,
  children,
}: Props): JSX.Element {
  const ref = useRef<HTMLButtonElement>(null);
  const [expanded, setExpanded] = useState(mountOpen || false);
  const { focusProps, isFocusVisible } = useFocusRing();
  const { buttonProps } = useButton(
    {
      onPress: () => {
        setExpanded(!expanded);
      },
    },
    ref as RefObject<HTMLButtonElement>
  );

  return (
    <>
      <button
        ref={ref}
        className={`${atoms({
          outline: "none",
          background: "transparent",
          border: "none",
          textAlign: "left",
          margin: "none",
          padding: "none",
          display: "flex",
          boxShadow: isFocusVisible ? "outline" : "none",
        })} ${className}`.trim()}
        {...mergeProps(focusProps, buttonProps)}
      >
        {header}
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: {
                opacity: 1,
                height: "auto",
              },
              collapsed: {
                opacity: 0,
                height: 0,
              },
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
          >
            {children}
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
