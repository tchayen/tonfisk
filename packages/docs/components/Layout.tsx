/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import { useFocusRing } from "@react-aria/focus";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { ReactElement, ReactNode } from "react";

import { getNavigation } from "../utils/mdx";

const ListItem = ({
  active,
  children,
  href,
}: {
  href: string;
  children: ReactNode;
  active?: boolean;
}): ReactElement => {
  const theme = useTheme();
  const { fontSizes, sizes, space } = theme;
  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <Link href={href}>
      <a
        href={href}
        {...focusProps}
        css={{
          fontSize: fontSizes[1],
          color: active ? "var(--primary-text)" : "var(--secondary-text)",
          background: active ? "var(--outline)" : "var(--background)",
          height: sizes[4],
          // borderRight: '1px solid var(--outline)',
          paddingLeft: space[3],
          paddingRight: space[3],
          display: "flex",
          alignItems: "center",
          outline: isFocusVisible ? "2px solid var(--outline)" : "none",
        }}
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
  const theme = useTheme();
  const { space } = theme;

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
        <h3 css={{ paddingLeft: space[3] }}>{item.name}</h3>
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
  children: React.ReactNode;
}): ReactElement {
  const theme = useTheme();
  const { space } = theme;
  return (
    <div
      css={{
        display: "grid",
        gridTemplateColumns: "240px 1fr min(80ch, 100%) 1fr",
        gridGap: 0,
      }}
    >
      <div
        css={{
          borderRight: "1px solid var(--border)",
          height: "100vh",
        }}
      >
        {navigation.files.map((item, index) => {
          return <NavLink key={index} item={item} />;
        })}
        <h3 css={{ paddingLeft: space[3] }}>Community</h3>
        <ListItem href="https://github.com/tchayen/design-system">
          GitHub
        </ListItem>
        <ListItem href="https://twitter.com/tchayen">Twitter</ListItem>
      </div>
      <div />
      <div css={{ padding: space[4] }}>{children}</div>
      <div />
    </div>
  );
}
