import React from "react";

import { Header1 } from "../../../components/Header";
import { Layout } from "../../../components/Layout";
import { Mdx } from "../../../components/Mdx";
import {
  componentsFilePaths,
  getNavigation,
  getSourceMetadata,
  prepareMdx,
} from "../../../utils/mdx";
import { toKebabCase } from "../../../utils/string";

type Metadata = {
  displayName: string;
  props: {
    name: string;
    type: string;
    description: string;
  }[];
};

type Props = {
  navigation: ReturnType<typeof getNavigation>;
  source: string;
  metadata: Metadata;
};

export default function Doc({
  navigation,
  source,
  metadata,
}: Props): JSX.Element {
  return (
    <Layout navigation={navigation}>
      <Header1>{metadata.displayName}</Header1>
      <Mdx source={source} />
    </Layout>
  );
}

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string };
}): Promise<{ props: Props }> => {
  const metadata = getSourceMetadata(params.slug);
  const escaped = (value: string) => value.replaceAll("|", "\\|");

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

  const content = `\n${table}\n${metadata.description}`;
  const source = await prepareMdx(content);

  return {
    props: {
      source,
      metadata,
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
  const paths = componentsFilePaths
    .map((path) => toKebabCase(path.replace(/\.tsx?$/, "")))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
