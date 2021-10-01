import { AnimatePresence, motion } from "framer-motion";
import React, { ReactNode, useState } from "react";

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
 * function AccordionExample(): JSX.Element {
 *   return (
 *     <>
 *       <Accordion
 *         className={atoms({ marginTop: "l" })}
 *         header={<h2>Header 1</h2>}
 *       >
 *         Test
 *       </Accordion>
 *       <Accordion
 *         className={atoms({ marginTop: "l" })}
 *         header={<h2>Header 2</h2>}
 *       >
 *         Other test
 *       </Accordion>
 *     </>
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
  const [expanded, setExpanded] = useState(mountOpen || false);

  return (
    <>
      <motion.header
        initial={false}
        className={className}
        onClick={() => {
          setExpanded(!expanded);
          console.log("Clicked expanded");
        }}
      >
        {header}
      </motion.header>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {children}
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
