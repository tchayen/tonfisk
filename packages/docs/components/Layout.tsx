/** @jsxRuntime classic */
/** @jsx jsx */
import { Grid, jsx } from "ds";
import Link from "next/link";
import React from "react";
import { Themed, Box, get } from "theme-ui";
import { getNavigation } from "../utils/mdx";

const NavLink = ({
  item,
}: {
  item: ReturnType<typeof getNavigation>["files"][0];
}) => {
  if ("title" in item) {
    return (
      <Box
        sx={{
          fontSize: 1,
          color: "black",
          height: 4,
          px: 3,
          display: "flex",
          alignItems: "center",
          // borderBottom: (t) => `1px solid ${get(t, "colors.gray100")}`,
          // "&:first-child": {
          //   borderTop: (t) => `1px solid ${get(t, "colors.gray100")}`,
          // },
        }}
      >
        <Link href={`/docs/${item.filePath}`}>
          <a>{item.title}</a>
        </Link>
      </Box>
    );
  } else {
    return (
      <Box>
        <Themed.h3 sx={{ px: 3, mt: 3 }}>{item.name}</Themed.h3>
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
}) {
  return (
    <Grid columns="0.1fr min(80ch, 100%)" gap={0}>
      <div
        sx={{
          borderRight: (t) => `1px solid ${get(t, "colors.gray100")}`,
          height: "100vh",
        }}
      >
        {navigation.files.map((item, index) => {
          return <NavLink key={index} item={item} />;
        })}
      </div>
      <div sx={{ p: 3 }}>{children}</div>
    </Grid>
  );
}
