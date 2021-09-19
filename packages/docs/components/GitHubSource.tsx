import { useFocusRing } from "@react-aria/focus";
import { atoms } from "tonfisk";

import { GitHub } from "../../tonfisk/src/icons/GitHub";
import * as styles from "./GitHubSource.css";

export function GitHubSource({
  codeFileName,
}: {
  codeFileName: string;
}): JSX.Element {
  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <div className={styles.div}>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`https://github.com/tchayen/tonfisk/blob/main/packages/tonfisk/src/components/${codeFileName}`}
        className={styles.anchor({
          boxShadow: isFocusVisible ? "focusVisible" : "default",
        })}
        {...focusProps}
      >
        <GitHub className={atoms({ fill: "blue-500" })} />
        Source code
      </a>
    </div>
  );
}
