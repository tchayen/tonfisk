// import "./theme.css";

import { useFocusRing } from "@react-aria/focus";
import { atoms } from "ds";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { ReactNode, useState } from "react";

import { getNavigation } from "../utils/mdx";
import { SwitchColorMode } from "./SwitchColorMode";

const ListItem = ({
  active,
  children,
  href,
}: {
  href: string;
  children: ReactNode;
  active?: boolean;
}): JSX.Element => {
  const { focusProps, isFocusVisible } = useFocusRing();
  const [isHovered, setIsHovered] = useState(false);

  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };

  const className = atoms({
    fontSize: "16px",
    fontWeight: active ? "bold" : "body",
    color: {
      lightMode: active ? "white" : isHovered ? "black" : "gray-600",
      darkMode: active || isHovered ? "gray-200" : "gray-400",
    },
    borderRadius: "8px",
    margin: "s",
    background: active ? "blue-500" : isHovered ? "blueOutline" : "transparent",
    height: "32px",
    paddingLeft: "m",
    paddingRight: "m",
    display: "flex",
    alignItems: "center",
    outline: "none",
    boxShadow: isFocusVisible ? "outline" : "none",
  });

  const props = {
    href,
    onMouseEnter,
    onMouseLeave,
    className,
    ...focusProps,
  };

  if (href.startsWith("https")) {
    return (
      <div className={atoms({ display: "flex" })}>
        <a {...props} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      </div>
    );
  }

  return (
    <div className={atoms({ display: "flex" })}>
      <Link href={href}>
        <a {...props}>{children}</a>
      </Link>
    </div>
  );
};

const NavLink = ({
  item,
}: {
  item: ReturnType<typeof getNavigation>["files"][0];
}) => {
  const router = useRouter();

  if ("title" in item) {
    const href = item.filePath;

    return (
      <ListItem href={href} active={router.asPath === href}>
        {item.title}
      </ListItem>
    );
  } else {
    return (
      <div
        className={atoms({
          display: "flex",
          flexDirection: "column",
          marginBottom: "xl",
        })}
      >
        <h3
          className={atoms({
            color: {
              lightMode: "black",
              darkMode: "gray-200",
            },
            padding: "m",
          })}
        >
          {item.name}
        </h3>
        {item.files.map((file, index) => (
          <NavLink key={index} item={file} />
        ))}
      </div>
    );
  }
};

export function Layout({
  navigation,
  children,
}: {
  navigation: ReturnType<typeof getNavigation>;
  children: ReactNode;
}): JSX.Element {
  return (
    <div
      style={{
        margin: "0 auto",
        // width: "106ch",
      }}
      className={atoms({
        width: {
          desktop: "106ch",
          mobile: "100vw",
        },
      })}
    >
      <div
        className={atoms({
          position: "fixed",
          width: "256px",
          height: "100vh",
          top: 0,
          bottom: 0,
          paddingTop: "xl",
          paddingBottom: "xl",
          overflowY: "scroll",
          visibility: {
            desktop: "visible",
            mobile: "hidden",
          },
        })}
      >
        <SwitchColorMode />
        {navigation.files.map((item, index) => {
          return <NavLink key={index} item={item} />;
        })}
        <h3
          className={atoms({
            color: {
              lightMode: "black",
              darkMode: "gray-200",
            },
            padding: "m",
          })}
        >
          Links
        </h3>
        <ListItem href="https://github.com/tchayen/design-system">
          GitHub ↗
        </ListItem>
        <ListItem href="https://twitter.com/tchayen">Twitter ↗</ListItem>
        {/* <ListItem href="#">Discord ↗</ListItem> */}
      </div>
      <div
        className={atoms({
          padding: "xl",
          paddingTop: "none",
          paddingRight: "none",
          marginRight: "none",
          marginLeft: {
            desktop: "4xl",
            mobile: "none",
          },
        })}
        style={{}}
      >
        {children}
      </div>
      <div />
    </div>
  );
}
