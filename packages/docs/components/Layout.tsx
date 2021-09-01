/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import { ColorModeSwitch } from "ds";
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
  const { fontSizes, colors, sizes, space } = theme;
  return (
    <Link href={href}>
      <a
        href={href}
        css={{
          fontSize: fontSizes[1],
          color: active ? colors.primaryText : colors.secondaryText,
          background: active ? colors.outline : colors.background,
          height: sizes[4],
          // borderRight: `1px solid ${colors.outline}`,
          paddingLeft: space[3],
          paddingRight: space[3],
          display: "flex",
          alignItems: "center",
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
        <h3 css={{ padding: 3, my: 3 }}>{item.name}</h3>
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
  const { colors, space } = theme;
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
          borderRight: `1px solid ${colors.border}`,
          height: "100vh",
        }}
      >
        <ColorModeSwitch />
        {navigation.files.map((item, index) => {
          return <NavLink key={index} item={item} />;
        })}
        <h3 css={{ padding: space[3] }}>Community</h3>
        <ListItem href="https://github.com/tchayen/design-system">
          GitHub
        </ListItem>
        <ListItem href="">Discord</ListItem>
      </div>
      <div />
      <div css={{ padding: space[4] }}>{children}</div>
      <div />
    </div>
  );
}
