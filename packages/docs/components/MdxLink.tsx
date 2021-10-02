import { useFocusRing } from "@react-aria/focus";
import { useOverlayPosition, useOverlayTrigger } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import { useOverlayTriggerState } from "@react-stately/overlays";
import crypto from "crypto";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { ReactNode, useContext, useEffect, useRef } from "react";
import { Popover } from "tonfisk";
import { ColorModeContext } from "tonfisk/src/Provider";

import * as styles from "./MdxLink.css";

const hashLength = 12;

export function MdxLink({
  href,
  children,
  className,
}: {
  href: string;
  children?: ReactNode;
  className?: string;
}): JSX.Element {
  const router = useRouter();
  const { colorMode } = useContext(ColorModeContext);
  const { focusProps, isFocusVisible, isFocused } = useFocusRing({});

  const style = `${styles.link({
    boxShadow: isFocusVisible ? "focusVisible" : "default",
  })} ${className}`.trim();

  const state = useOverlayTriggerState({});
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isFocused && !state.isOpen) {
      state.open();
    } else if (!isFocused && state.isOpen) {
      state.close();
    }
  }, [isFocused]);

  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    state,
    triggerRef
  );

  const { overlayProps: positionProps } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef,
    placement: "top",
    offset: 24,
    isOpen: state.isOpen,
  });

  const onMouseEnter = () => {
    state.open();
  };

  const onMouseLeave = () => {
    state.close();
  };

  const isExternalLink = href.startsWith("https");
  const url = (
    isExternalLink
      ? href
      : href.startsWith("#")
      ? `http://localhost:3000${router.asPath}${href}`
      : `http://localhost:3000${href}`
  ).split("#")[0]; // We don't want any #part-of-url.

  const imagePath = `/miniatures/${crypto
    .createHash("md5")
    .update(`${colorMode}-${url}`)
    .digest("hex")
    .substring(0, hashLength)}.png?v=${process.env.CONFIG_BUILD_ID}`;

  useEffect(() => {
    new Image().src = imagePath;
  }, []);

  return (
    <>
      {isExternalLink ? (
        <a
          {...mergeProps(triggerProps, focusProps)}
          ref={triggerRef}
          href={href}
          className={style}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ) : (
        <Link href={href}>
          <a
            {...mergeProps(triggerProps, focusProps)}
            ref={triggerRef}
            href={href}
            className={style}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            {children}
          </a>
        </Link>
      )}
      <Popover
        {...mergeProps(overlayProps, positionProps)}
        ref={overlayRef}
        isOpen={state.isOpen}
        onClose={state.close}
        contain={false}
      >
        <div className={styles.preview}>
          <img src={imagePath} alt={href} className={styles.image} />
        </div>
      </Popover>
    </>
  );
}
