import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { useRef, useState } from "react";
import { atoms } from "tonfisk";

import * as styles from "./CurrencyInList.css";

export function CurrencyInList({
  onSelect,
  name,
  acronym,
  icon,
}: {
  onSelect: (value: string) => void;
  name: string;
  acronym: string;
  icon: string;
}): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };

  const ref = useRef<HTMLButtonElement>(null);

  const { buttonProps, isPressed } = useButton(
    {
      onPress: () => {
        onSelect(acronym);
      },
    },
    ref
  );
  const { focusProps, isFocusVisible } = useFocusRing();

  const className = styles.button({
    background: isPressed
      ? "isPressed"
      : isHovered || isFocusVisible
      ? "isHoveredOrFocused"
      : "default",
  });

  return (
    <button
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={className}
      {...mergeProps(focusProps, buttonProps)}
    >
      <img className={styles.icon} src={icon} />
      <div className={styles.column}>
        <div className={styles.acronym}>{acronym}</div>
        <div className={styles.name}>{name}</div>
      </div>
      <div className={styles.value}>0.0</div>
    </button>
  );
}
