import { useFocusRing } from "@react-aria/focus";
import { ReactNode } from "react";
import { atoms } from "tonfisk";

import { hoverUnderline } from "../styles/theme.css";
import { toKebabCase } from "../utils/string";

type Props = {
  children?: ReactNode;
} & JSX.IntrinsicAttributes;

export function Header(
  HeaderNth: keyof JSX.IntrinsicElements
): (props: Props) => JSX.Element {
  const component = (props: Props) => {
    if (typeof props.children !== "string") {
      throw new Error("Header must have a string child as of now.");
    }
    const { focusProps, isFocusVisible } = useFocusRing();

    const slug = toKebabCase(props.children.replace(/\s+/g, "-") || "");

    return (
      <div
        // TODO: extract styles.
        className={atoms({
          marginTop: "xl",
          marginBottom: "l",
        })}
      >
        <a
          // TODO: extract styles.
          className={`${hoverUnderline} ${atoms({
            outline: "none",
            boxShadow: isFocusVisible ? "outline" : "none",
            borderRadius: "4px",
            display: "inline-block",
            // padding: "m",
          })}`}
          {...focusProps}
          href={`#${slug}`}
        >
          <HeaderNth
            id={slug}
            // TODO: extract styles.
            className={atoms({
              display: "inline",
              color: {
                lightMode: "black",
                darkMode: "gray-200",
              },
            })}
            {...props}
          />
        </a>
      </div>
    );
  };

  component.displayName = Header;
  return component;
}

export const Header1 = Header("h1");
export const Header2 = Header("h2");
export const Header3 = Header("h3");
export const Header4 = Header("h4");
