/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import rehypePrism from "@mapbox/rehype-prism";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { ReactElement } from "react";

import { components } from "../../../components/components";
import { Layout } from "../../../components/Layout";
import {
  componentsFilePaths,
  getNavigation,
  getSourceMetadata,
} from "../../../utils/mdx";
import { toKebabCase } from "../../../utils/string";

export default function Doc({
  navigation,
  source,
  metadata,
}: any): ReactElement {
  const theme = useTheme();
  const { space, fontSizes, radii, colors } = theme;
  return (
    <Layout navigation={navigation}>
      <h1>{metadata.displayName}</h1>
      <h2>Props</h2>
      <div>
        {metadata.props.map((prop) => (
          <div key={prop.name} css={{ display: "flex" }}>
            <div
              css={{
                display: "flex",
                flexDirection: "column",
                marginBottom: space[2],
                padding: space[2],
                borderRadius: radii[3],
                background: colors.border,
              }}
            >
              <code css={{ color: colors.primaryText, marginBottom: space[1] }}>
                {prop.name}: {prop.type}
              </code>
              <span css={{ fontSize: fontSizes[1] }}>{prop.description}</span>
            </div>
          </div>
        ))}
      </div>
      <MDXRemote {...source} components={components} />
    </Layout>
  );
}

export const getStaticProps = async ({ params }: any) => {
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

export const getStaticPaths = async () => {
  const paths = componentsFilePaths
    .map((path) => toKebabCase(path.replace(/\.tsx?$/, "")))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
