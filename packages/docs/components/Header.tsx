import { atoms } from "ds";

import { hoverUnderline } from "../styles/theme.css";
import { toKebabCase } from "../utils/string";

type Props = {
  children: string;
} & JSX.IntrinsicAttributes;

export const Header = (
  HeaderNth: keyof JSX.IntrinsicElements
): ((props: Props) => JSX.Element) => {
  const component = (props: Props) => {
    return (
      <div
        className={atoms({
          marginTop: "xl",
          marginBottom: "l",
        })}
      >
        <a
          className={hoverUnderline}
          href={`#${toKebabCase(props.children || "")}`}
        >
          <HeaderNth
            id={toKebabCase(props.children)}
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
