import { atoms, commonStyles } from "ds";
import fs from "fs";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import path from "path";
import React from "react";

import { components } from "../../components/components";
import { Header1 } from "../../components/Header";
import { Layout } from "../../components/Layout";
import {
  DOCS_PATH,
  docsFilePaths,
  getNavigation,
  readMdxFile,
} from "../../utils/mdx";

type Props = {
  navigation: ReturnType<typeof getNavigation>;
  source: MDXRemoteSerializeResult;
  frontMatter: { [key: string]: any };
};

export default function Doc({
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

  return {
    props: await readMdxFile(docFile),
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
