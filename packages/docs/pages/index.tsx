import { atoms } from "ds";
import fs from "fs";
import React from "react";

import { Header1 } from "../components/Header";
import { Layout } from "../components/Layout";
import { Mdx } from "../components/Mdx";
import { getNavigation, readMdxFile } from "../utils/mdx";

// TODO: share with docs/[slug].tsx
type Props = {
  navigation: ReturnType<typeof getNavigation>;
  source: string;
  frontMatter: { [key: string]: string };
};

// TODO: probably share with docs/[slug].tsx
// Can we just re-export the component?
// Same with getStaticProps maybe?
export default function Home({
  navigation,
  source,
  frontMatter,
}: Props): JSX.Element {
  return (
    <Layout navigation={navigation}>
      <Header1>{frontMatter.title}</Header1>
      <p
        className={atoms({
          color: {
            lightMode: "gray-600",
            darkMode: "gray-400",
          },
        })}
      >
        {frontMatter.description}
      </p>
      <Mdx source={source} />
    </Layout>
  );
}

export const getStaticProps = async (): Promise<{ props: Props }> => {
  const docFile = fs.readFileSync("./pages/index.mdx", "utf-8");
  return {
    props: await readMdxFile(docFile),
  };
};
