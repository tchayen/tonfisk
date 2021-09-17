import { atoms } from "ds";

import { toKebabCase } from "../utils/string";
import { header } from "./theme.css";

type Props = {
  children: string;
  props?: any;
};

export const Header = (HeaderNth: string): ((props: Props) => JSX.Element) => {
  const component = ({ children, ...props }: Props) => {
    return (
      <div
        className={atoms({
          marginTop: "xl",
          marginBottom: "l",
        })}
      >
        <a className={header} href={`#${toKebabCase(children)}`}>
          <HeaderNth
            id={toKebabCase(children)}
            className={atoms({
              display: "inline",
              color: {
                lightMode: "black",
                darkMode: "gray-200",
              },
            })}
            {...props}
          >
            {children}
          </HeaderNth>
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
