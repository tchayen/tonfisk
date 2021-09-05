/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import rehypePrism from "@mapbox/rehype-prism";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { Fragment, ReactElement } from "react";

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
  const theme = useTheme();
  const { space, fontSizes, radii } = theme;
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
                css={{
                  display: "flex",
                  marginBottom: space[2],
                  "&:last-child": {
                    marginBottom: 0,
                  },
                }}
              >
                <div
                  css={{
                    display: "flex",
                    flexDirection: "column",
                    padding: space[2],
                    borderRadius: radii[3],
                    background: "var(--border)",
                  }}
                >
                  <code
                    css={{
                      color: "var(--primary-text)",
                      marginBottom: space[1],
                      padding: 0,
                    }}
                  >
                    {prop.name}: {prop.type}
                  </code>
                  <span css={{ fontSize: fontSizes[1] }}>
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
