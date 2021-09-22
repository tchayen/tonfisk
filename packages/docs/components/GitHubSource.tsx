import { useFocusRing } from "@react-aria/focus";
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
  const { focusProps, isFocusVisible } = useFocusRing();

  const url =
    "codeFileName" in props
      ? `https://github.com/tchayen/tonfisk/blob/main/packages/tonfisk/src/components/${props.codeFileName}`
      : `https://github.com/tchayen/tonfisk/blob/main/${props.path}`;

  return (
    <div className={styles.div}>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={url}
        className={styles.anchor({
          boxShadow: isFocusVisible ? "focusVisible" : "default",
        })}
        {...focusProps}
      >
        {/* TODO: extract styles. */}
        <GitHub className={atoms({ fill: "blue-500" })} />
        Source code
      </a>
    </div>
  );
}
