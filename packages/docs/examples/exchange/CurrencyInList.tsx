import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { atoms } from "ds";
import { useRef, useState } from "react";

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

  const className = atoms({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    padding: "l",
    paddingBottom: "m",
    paddingTop: "m",
    marginLeft: "s",
    marginRight: "xs",
    borderRadius: "8px",
    border: "none",
    textAlign: "left",
    fontFamily: "body",
    background: {
      lightMode: isPressed
        ? "gray-300"
        : isFocusVisible || isHovered
        ? "gray-200"
        : "transparent",
      darkMode: isPressed
        ? "gray-700"
        : isFocusVisible || isHovered
        ? "gray-800"
        : "transparent",
    },
    outline: "none",
  });

  return (
    <button
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={className}
      {...mergeProps(focusProps, buttonProps)}
    >
      <img
        className={atoms({
          width: "32px",
          height: "32px",
          borderRadius: "full",
          marginRight: "m",
        })}
        src={icon}
      />
      <div
        className={atoms({
          display: "flex",
          flexDirection: "column",
          flex: 1,
        })}
      >
        <div
          className={atoms({
            fontWeight: "bold",
            color: {
              lightMode: "black",
              darkMode: "gray-200",
            },
          })}
        >
          {acronym}
        </div>
        <div
          className={atoms({
            fontSize: "12px",
            color: {
              lightMode: "gray-600",
              darkMode: "gray-500",
            },
          })}
        >
          {name}
        </div>
      </div>
      <div
        className={atoms({
          fontSize: "16px",
          color: {
            lightMode: "gray-500",
            darkMode: "gray-400",
          },
          fontFeatureSettings: "numbers",
        })}
      >
        0.0
      </div>
    </button>
  );
}
