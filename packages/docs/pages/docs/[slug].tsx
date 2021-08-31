import path from "path";
import fs from "fs";
import { docsFilePaths, DOCS_PATH } from "../../utils/mdx";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

import Link from "next/link";
import { Provider } from "ds";

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  a: Link,
};

export default function Doc({ source, frontMatter }: any) {
  return (
    <Provider>
      <div>
        <Link href="/">Back</Link>
        <h1>{frontMatter.title}</h1>
        <p>{frontMatter.description}</p>
        <MDXRemote {...source} components={components} />
      </div>
    </Provider>
  );
}

export const getStaticProps = async ({ params }: any) => {
  const postPath = path.join(DOCS_PATH, `${params.slug}.mdx`);
  const docFile = fs.readFileSync(postPath, "utf-8");

  const { content, data } = matter(docFile);
  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = docsFilePaths
    .map((path) => path.replace(/\.mdx?$/, ""))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
