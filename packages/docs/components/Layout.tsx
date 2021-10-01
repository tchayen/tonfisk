import { useFocusRing } from "@react-aria/focus";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { ReactNode, useState } from "react";
import { Accordion } from "tonfisk";
import { Chevron } from "tonfisk/src/icons/Chevron";

import { getNavigation } from "../utils/mdx";
import * as styles from "./Layout.css";
import { Logo } from "./Logo";
import { MenuIcon } from "./MenuIcon";
import { SwitchColorMode } from "./SwitchColorMode";

function ListItem({
  active,
  children,
  href,
}: {
  href: string;
  children: ReactNode;
  active?: boolean;
}): JSX.Element {
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
      <div className={styles.flex}>
        <a {...props} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      </div>
    );
  }

  return (
    <div className={styles.flex}>
      <Link href={href}>
        <a {...props}>{children}</a>
      </Link>
    </div>
  );
}

function NavLink({
  item,
}: {
  item: ReturnType<typeof getNavigation>["files"][0];
}) {
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
      <div className={styles.column}>
        <Accordion
          mountOpen
          className={styles.accordion}
          header={
            <>
              <h3 className={styles.h3}>{item.name}</h3>
              <Chevron />
            </>
          }
        >
          {item.files.map((file, index) => (
            <NavLink key={index} item={file} />
          ))}
        </Accordion>
      </div>
    );
  }
}

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
