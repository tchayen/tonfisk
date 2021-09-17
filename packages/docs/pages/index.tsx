import { atoms, commonStyles } from "ds";
import fs from "fs";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import React from "react";

import { components } from "../components/components";
import { Layout } from "../components/Layout";
import { getNavigation, readMdxFile } from "../utils/mdx";

type Props = {
  navigation: ReturnType<typeof getNavigation>;
  source: MDXRemoteSerializeResult;
  frontMatter: { [key: string]: any };
};

export default function Home({
  navigation,
  source,
  frontMatter,
}: Props): JSX.Element {
  return (
    <Layout navigation={navigation}>
      <h1 className={commonStyles.primaryTextColor}>{frontMatter.title}</h1>
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
      <MDXRemote {...source} components={components} />
    </Layout>
  );
}

export const getStaticProps = async (): Promise<{ props: Props }> => {
  const docFile = fs.readFileSync("./pages/index.mdx", "utf-8");
  return {
    props: await readMdxFile(docFile),
  };
};
