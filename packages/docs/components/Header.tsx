import { atoms } from "ds";
import { ReactNode } from "react";

import { hoverUnderline } from "../styles/theme.css";
import { toKebabCase } from "../utils/string";

type Props = {
  children?: ReactNode;
} & JSX.IntrinsicAttributes;

export const Header = (
  HeaderNth: keyof JSX.IntrinsicElements
): ((props: Props) => JSX.Element) => {
  const component = (props: Props) => {
    if (typeof props.children !== "string") {
      throw new Error("Header must have a string child as of now.");
    }

    const slug = toKebabCase(props.children.replace(/\s+/g, "-") || "");

    return (
      <div
        className={atoms({
          marginTop: "xl",
          marginBottom: "l",
        })}
      >
        <a className={hoverUnderline} href={`#${slug}`}>
          <HeaderNth
            id={slug}
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
};

export const Header1 = Header("h1");
export const Header2 = Header("h2");
export const Header3 = Header("h3");
export const Header4 = Header("h4");