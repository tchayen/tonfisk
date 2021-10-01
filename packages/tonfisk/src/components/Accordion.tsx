import { AnimatePresence, motion } from "framer-motion";
import React, { ReactNode, useState } from "react";

type Props = {
  mountOpen?: boolean;
  header: ReactNode;
  children: ReactNode;
};

/**
 * Accordion component can be minimized and expanded.
 *
 * <AccordionExample />
 */
export function Accordion({ header, mountOpen, children }: Props): JSX.Element {
  const [expanded, setExpanded] = useState(mountOpen || false);

  return (
    <>
      <motion.header
        initial={false}
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
