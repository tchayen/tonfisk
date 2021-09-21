import fs from "fs";
import path from "path";
import React from "react";
import { atoms } from "tonfisk";

import { Header1 } from "../../components/Header";
import { Layout } from "../../components/Layout";
import { Mdx } from "../../components/Mdx";
import { SocialCardsHeader } from "../../components/SocialCardsHeader";
import {
  DOCS_PATH,
  docsFilePaths,
  getNavigation,
  readMdxFile,
} from "../../utils/mdx";

type Props = {
  slug: string;
  navigation: ReturnType<typeof getNavigation>;
  source: string;
  frontMatter: { [key: string]: string };
};

export default function Doc({
  slug,
  navigation,
  source,
  frontMatter,
}: Props): JSX.Element {
  return (
    <>
      <SocialCardsHeader slug={slug} />
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
    </>
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
    props: {
      slug: params.slug,
      ...(await readMdxFile(docFile)),
    },
  };
};

export const getStaticPaths = async (): Promise<{
  paths: Array<{
    params: {
      slug: string;
    };
  }>;
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
