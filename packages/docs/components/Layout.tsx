import { useFocusRing } from "@react-aria/focus";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { ReactNode, useState } from "react";
import { atoms } from "tonfisk";

import { getNavigation } from "../utils/mdx";
import * as styles from "./Layout.css";
import { Logo } from "./Logo";
import { MenuIcon } from "./MenuIcon";
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

  const className = styles.link({
    color: active ? "active" : isHovered ? "hovered" : "default",
    background: active ? "active" : isHovered ? "hovered" : "default",
    boxShadow: isFocusVisible ? "focusVisible" : "default",
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
        <h3 className={styles.h3}>{item.name}</h3>
        {item.files.map((file, index) => (
          <NavLink key={index} item={file} />
        ))}
      </div>
    );
  }
};

function Sidebar({
  navigation,
}: {
  navigation: ReturnType<typeof getNavigation>;
}) {
  return (
    <>
      <Logo size={32} />
      <SwitchColorMode />
      {navigation.files.map((item, index) => {
        return <NavLink key={index} item={item} />;
      })}
      <h3 className={styles.h3}>Links</h3>
      <ListItem href="https://github.com/tchayen/tonfisk">GitHub ↗</ListItem>
      <ListItem href="https://twitter.com/tchayen">Twitter ↗</ListItem>
      {/* <ListItem href="#">Discord ↗</ListItem> */}
    </>
  );
}

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
      }}
      className={styles.centered}
    >
      <MenuIcon>
        <Sidebar navigation={navigation} />
      </MenuIcon>
      <div className={styles.sidebar}>
        <Sidebar navigation={navigation} />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
