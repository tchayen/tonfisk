import path from "path";
import fs from "fs";
import {
  componentsFilePaths,
  SOURCE_PATH,
  getSourceMetadata,
} from "../../../utils/mdx";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

import Link from "next/link";
import { Button, Provider } from "ds";
import { toKebabCase } from "../../../utils/string";

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  a: Link,
};

export default function Doc({ source, metadata }: any) {
  return (
    <Provider>
      <div>
        <Link href="/">Back</Link>
        <h1>{metadata.displayName}</h1>
        {/* <p>{metadata.description}</p>
        <ul>
          {metadata.props.map((prop: any) => (
            <li key={prop.name}>
              <code>{prop.name}</code>
              <p>{prop.description}</p>
            </li>
          ))}
        </ul> */}
        <MDXRemote {...source} components={components} />
      </div>
    </Provider>
  );
}

export const getStaticProps = async ({ params }: any) => {
  const metadata = getSourceMetadata(params.slug);

  console.log(metadata.props.map((p) => p.tsType));

  const content = `${metadata.description}\n${metadata.props
    .map(
      (prop) =>
        `### ${prop.name}\n\`${prop.tsType.name}\`\n\n${prop.description}`
    )
    .join("\n")}`;

  console.log(content);

  const source = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
  });

  return {
    props: { source, metadata },
  };
};

export const getStaticPaths = async () => {
  const paths = componentsFilePaths
    .map((path) => toKebabCase(path.replace(/\.tsx?$/, "")))
    .map((slug) => ({ params: { slug } }));

  console.log(paths);
  return {
    paths,
    fallback: false,
  };
};
