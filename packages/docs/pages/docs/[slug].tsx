import rehypePrism from "@mapbox/rehype-prism";
import { atoms } from "ds";
import fs from "fs";
import matter from "gray-matter";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import React, { ReactElement } from "react";

import { components } from "../../components/components";
import { Layout } from "../../components/Layout";
import { DOCS_PATH, docsFilePaths, getNavigation } from "../../utils/mdx";

type Props = {
  navigation: ReturnType<typeof getNavigation>;
  source: MDXRemoteSerializeResult;
  frontMatter: { [key: string]: any };
};

export default function Doc({
  navigation,
  source,
  frontMatter,
}: Props): ReactElement {
  return (
    <Layout navigation={navigation}>
      <h1
        className={atoms({
          color: {
            lightMode: "black",
            darkMode: "gray-200",
          },
        })}
      >
        {frontMatter.title}
      </h1>
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

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string };
}): Promise<{ props: Props }> => {
  const postPath = path.join(DOCS_PATH, `${params.slug}.mdx`);
  const docFile = fs.readFileSync(postPath, "utf-8");

  const { content, data } = matter(docFile);
  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
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

export const getStaticPaths = async (): Promise<{
  paths: {
    params: {
      slug: string;
    };
  }[];
  fallback: false;
}> => {
  const paths = docsFilePaths
    .map((path) => path.replace(/\.mdx?$/, ""))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
