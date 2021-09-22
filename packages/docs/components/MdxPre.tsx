import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { ReactNode, useRef, useState } from "react";
import { atoms } from "tonfisk";

export function MdxPre({ children }: { children?: ReactNode }): JSX.Element {
  const ref = useRef<HTMLPreElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [isHovered, setIsHovered] = useState(false);

  const { focusProps, isFocusVisible } = useFocusRing();
  const { buttonProps, isPressed } = useButton(
    {
      onPress: () => {
        const content = ref.current!.textContent || "";
        navigator.clipboard.writeText(content.substring(0, content.length));
      },
    },
    buttonRef
  );

  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };

  const wrapperClassName = atoms({
    borderRadius: "8px",
    background: "gray-800",
    position: "relative",
    overflow: "hidden",
    padding: "l",
  });

  const preClassName = atoms({
    color: "gray-200",
    overflow: "auto",
    padding: "l",
  });

  const buttonClassName = atoms({
    fontFamily: "body",
    color: isPressed ? "gray-200" : isHovered ? "gray-300" : "gray-400",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    position: "absolute",
    background: isPressed ? "gray-500" : isHovered ? "gray-600" : "gray-700",
    padding: "s",
    paddingLeft: "m",
    paddingRight: "m",
    border: "none",
    bottom: "m",
    right: "m",
    outline: "none",
    borderRadius: "4px",
    boxShadow: isFocusVisible ? "outline" : "none",
  });

  return (
    <div className={wrapperClassName}>
      <pre ref={ref} className={preClassName}>
        {children}
      </pre>
      <button
        {...mergeProps(focusProps, buttonProps)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={buttonRef}
        className={buttonClassName}
      >
        Copy
      </button>
    </div>
  );
}
