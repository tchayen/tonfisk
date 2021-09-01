/** @jsxRuntime classic */
/** @jsx jsx */
import { Grid, jsx } from "ds";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { ReactElement, ReactNode } from "react";
import { Box, get, Themed } from "theme-ui";

import { getNavigation } from "../utils/mdx";

const ListItem = ({
  active,
  children,
  href,
}: {
  href: string;
  children: ReactNode;
  active?: boolean;
}): ReactElement => (
  <Link href={href}>
    <a
      href={href}
      sx={{
        fontSize: 1,
        color: active ? "black" : "gray600",
        bg: active ? "blue500opacity" : "white",
        height: 4,
        // borderRight: (t) => `1px solid ${get(t, "colors.blue500opacity")}`,
        px: 3,
        display: "flex",
        alignItems: "center",
      }}
    >
      {children}
    </a>
  </Link>
);

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
      <Box>
        <Themed.h3 sx={{ px: 3, my: 3 }}>{item.name}</Themed.h3>
        {item.files.map((file, index) => (
          <NavLink key={index} item={file} />
        ))}
      </Box>
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
  return (
    <Grid columns="240px 1fr min(80ch, 100%) 1fr" gap={0}>
      <div
        sx={{
          borderRight: (t) => `1px solid ${get(t, "colors.gray100")}`,
          height: "100vh",
        }}
      >
        {navigation.files.map((item, index) => {
          return <NavLink key={index} item={item} />;
        })}
        <Themed.h3 sx={{ px: 3, my: 3 }}>Community</Themed.h3>
        <ListItem href="https://github.com/tchayen/design-system">
          GitHub
        </ListItem>
        <ListItem href="">Discord</ListItem>
      </div>
      <div />
      <div sx={{ p: 4 }}>{children}</div>
      <div />
    </Grid>
  );
}
