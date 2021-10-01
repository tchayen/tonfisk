import Head from "next/head";
import React from "react";

import { GitHubSource } from "../../../components/GitHubSource";
import { Header1 } from "../../../components/Header";
import { Layout } from "../../../components/Layout";
import { Mdx } from "../../../components/Mdx";
import { SocialCardsHeader } from "../../../components/SocialCardsHeader";
import {
  componentsFilePaths,
  getNavigation,
  getSourceMetadata,
  Metadata,
  prepareMdx,
} from "../../../utils/mdx";
import { toKebabCase } from "../../../utils/string";

type Props = {
  slug: string;
  navigation: ReturnType<typeof getNavigation>;
  source: string;
  metadata: Metadata;
};

export default function Doc({
  slug,
  navigation,
  source,
  metadata,
}: Props): JSX.Element {
  return (
    <>
      <Head>
        <title>{metadata.displayName} – Tonfisk</title>
      </Head>
      <SocialCardsHeader slug={`components/${slug}`} />
      <Layout navigation={navigation}>
        <Header1>{metadata.displayName}</Header1>
        <Mdx source={source} />
        <GitHubSource codeFileName={metadata.codeFileName} />
      </Layout>
    </>
  );
}

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string };
}): Promise<{ props: Props }> => {
  const metadata = getSourceMetadata(params.slug);
  const escaped = (value: string) => {
    const cleanStartingSlash = value.startsWith("| ")
      ? value.substring(2, value.length)
      : value;
    return cleanStartingSlash.replace(/\|/g, "\\|").replace(/\n/g, " ");
  };

  const table =
    metadata.props.length > 0
      ? `## Props\n\n| Name | Type | Description |
  | --- | --- | --- |
  ${metadata.props
    .map(
      (prop) =>
        `| \`${prop.name}\` | \`${escaped(prop.type)}\` | ${escaped(
          prop.description
        )} |`
    )
    .join("\n")}\n`
      : "";

  const content = `\n${table}\n## Description\n\n${metadata.description}`;
  const source = await prepareMdx(content);

  return {
    props: {
      slug: params.slug,
      source,
      metadata,
      navigation: getNavigation(),
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
  const paths = componentsFilePaths
    .map((path) => toKebabCase(path.replace(/\.tsx?$/, "")))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
