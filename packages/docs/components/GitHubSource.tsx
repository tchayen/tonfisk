import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { useRef, useState } from "react";
import { atoms } from "tonfisk";

import { GitHub } from "../../tonfisk/src/icons/GitHub";
import * as styles from "./GitHubSource.css";

export function GitHubSource(
  props:
    | {
        codeFileName: string;
      }
    | {
        path: string;
      }
): JSX.Element {
  const ref = useRef<HTMLAnchorElement>(null);
  const { focusProps, isFocusVisible } = useFocusRing();
  const [isHovered, setIsHovered] = useState(false);
  const { buttonProps, isPressed } = useButton({}, ref);

  const onMouseEnter = () => {
    console.log("hello");
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    console.log("not hello");
    setIsHovered(false);
  };

  const url =
    "codeFileName" in props
      ? `https://github.com/tchayen/tonfisk/blob/main/packages/tonfisk/src/components/${props.codeFileName}`
      : `https://github.com/tchayen/tonfisk/blob/main/${props.path}`;

  return (
    <div className={styles.div}>
      <a
        ref={ref}
        target="_blank"
        rel="noopener noreferrer"
        href={url}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={styles.anchor({
          color: isPressed ? "active" : isHovered ? "hover" : "default",
          boxShadow: isFocusVisible ? "focusVisible" : "default",
        })}
        {...mergeProps(focusProps, buttonProps)}
      >
        {/* TODO: extract styles. */}
        <GitHub
          className={atoms({
            fill: isPressed ? "blue-700" : isHovered ? "blue-600" : "blue-500",
          })}
        />
        Source code
      </a>
    </div>
  );
}
