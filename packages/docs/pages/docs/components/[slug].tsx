import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { Themed } from "theme-ui";

import { components } from "../../../components/components";
import { Layout } from "../../../components/Layout";
import {
  componentsFilePaths,
  getNavigation,
  getSourceMetadata,
} from "../../../utils/mdx";
import { toKebabCase } from "../../../utils/string";

export default function Doc({ navigation, source, metadata }: any) {
  return (
    <Layout navigation={navigation}>
      <Themed.h1>{metadata.displayName}</Themed.h1>
      <MDXRemote {...source} components={components} />
    </Layout>
  );
}

export const getStaticProps = async ({ params }: any) => {
  const metadata = getSourceMetadata(params.slug);

  const content = `${metadata.description}\n${metadata.props
    .map(
      (prop) =>
        `### ${prop.name}\n\`${prop.tsType.name}\`\n\n${prop.description}`
    )
    .join("\n")}`;

  const source = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
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
