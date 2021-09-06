import rehypePrism from "@mapbox/rehype-prism";
import { atoms } from "ds/src/theme.css";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import React, { Fragment, ReactElement } from "react";

import { components } from "../../../components/components";
import { Layout } from "../../../components/Layout";
import {
  componentsFilePaths,
  getNavigation,
  getSourceMetadata,
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
  source: MDXRemoteSerializeResult;
  metadata: Metadata;
};

export default function Doc({
  navigation,
  source,
  metadata,
}: Props): ReactElement {
  return (
    <Layout navigation={navigation}>
      <h1>{metadata.displayName}</h1>
      {metadata.props.length > 0 && (
        <Fragment>
          <h2>Props</h2>
          <div>
            {metadata.props.map((prop) => (
              <div
                key={prop.name}
                className={atoms({
                  display: "flex",
                  marginBottom: "m",
                })}
              >
                <div
                  className={atoms({
                    display: "flex",
                    flexDirection: "column",
                    padding: "m",
                    borderRadius: "8px",
                    background: "gray-100",
                  })}
                >
                  <code
                    className={atoms({
                      color: "black",
                      marginBottom: "s",
                      padding: "none",
                    })}
                  >
                    {prop.name}: {prop.type}
                  </code>
                  <span className={atoms({ fontSize: "14px" })}>
                    {prop.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Fragment>
      )}
      <MDXRemote {...source} components={components} />
    </Layout>
  );
}

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string };
}): Promise<{ props: Props }> => {
  const metadata = getSourceMetadata(params.slug);

  const content = `\n${metadata.description}`;

  const source = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [rehypePrism],
    },
  });

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
