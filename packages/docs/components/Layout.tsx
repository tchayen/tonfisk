import "./theme.css";

import { useFocusRing } from "@react-aria/focus";
import { atoms } from "ds";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { ReactNode, useState } from "react";

import { getNavigation } from "../utils/mdx";

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

  return (
    <Link href={href}>
      <a
        href={href}
        {...focusProps}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={atoms({
          fontSize: "14px",
          fontWeight: active ? "bold" : "body",
          color: {
            lightMode: active ? "white" : "black",
            darkMode: active ? "gray-200" : "gray-200",
          },
          borderRadius: "8px",
          margin: "s",
          background: active
            ? "pink-500"
            : isHovered
            ? "pinkOutline"
            : "transparent",
          height: "32px",
          paddingLeft: "l",
          paddingRight: "l",
          display: "flex",
          alignItems: "center",
          outline: "none",
          boxShadow: isFocusVisible ? "outline" : "none",
        })}
      >
        {children}
      </a>
    </Link>
  );
};

const NavLink = ({
  item,
}: {
  item: ReturnType<typeof getNavigation>["files"][0];
}) => {
  const router = useRouter();

  if ("title" in item) {
    const href = `/docs/${item.filePath}`;
    return (
      <ListItem href={href} active={router.asPath === href}>
        {item.title}
      </ListItem>
    );
  } else {
    return (
      <div>
        <h3
          className={atoms({
            color: {
              lightMode: "black",
              darkMode: "gray-200",
            },
            padding: "l",
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
        width: "106ch",
      }}
    >
      <div
        className={atoms({
          width: "24ch",
          marginTop: "l",
          marginBottom: "l",
          position: "fixed",
        })}
      >
        {navigation.files.map((item, index) => {
          return <NavLink key={index} item={item} />;
        })}
        <h3
          className={atoms({
            color: {
              lightMode: "black",
              darkMode: "gray-200",
            },
            padding: "l",
          })}
        >
          Links
        </h3>
        <ListItem href="https://github.com/tchayen/design-system">
          GitHub ↗
        </ListItem>
        <ListItem href="https://twitter.com/tchayen">Twitter ↗</ListItem>
      </div>
      <div
        className={atoms({
          padding: "xl",
          paddingRight: "none",
          marginRight: "none",
        })}
        style={{
          marginLeft: "24ch",
        }}
      >
        {children}
      </div>
      <div />
    </div>
  );
}
