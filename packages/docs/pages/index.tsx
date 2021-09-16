import rehypePrism from "@mapbox/rehype-prism";
import { atoms, commonStyles } from "ds";
import fs from "fs";
import matter from "gray-matter";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import React from "react";

import { components } from "../components/components";
import { Layout } from "../components/Layout";
import { getNavigation } from "../utils/mdx";

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

  const { content, data } = matter(docFile);
  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins.
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [rehypePrism],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      navigation: getNavigation(),
    },
  };
};
