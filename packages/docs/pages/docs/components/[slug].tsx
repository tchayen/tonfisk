/** @jsxRuntime classic */
/** @jsx jsx */
import rehypePrism from "@mapbox/rehype-prism";
import { jsx, Switch } from "ds";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { ReactElement } from "react";
import { Box, get } from "theme-ui";
import { Themed } from "theme-ui";

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
  return (
    <Layout navigation={navigation}>
      <Themed.h1>{metadata.displayName}</Themed.h1>
      <Themed.h2>Props</Themed.h2>
      <Box>
        {metadata.props.map((prop) => (
          <Box key={prop.name} sx={{ display: "flex" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mb: 2,
                p: 2,
                borderRadius: 3,
                bg: "border",
              }}
            >
              <code sx={{ color: "primaryText", mb: 1 }}>
                {prop.name}: {prop.type}
              </code>
              <span sx={{ fontSize: 1 }}>{prop.description}</span>
            </Box>
          </Box>
        ))}
      </Box>
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
