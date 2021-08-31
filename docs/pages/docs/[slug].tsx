import path from "path";
import fs from "fs";
import { docsFilePaths, DOCS_PATH, SOURCE_PATH } from "../../utils/mdx";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { parse } from "react-docgen";
import Link from "next/link";
import { Button } from "ds";

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const toPascalCase = (s: string) => s.split("-").map(capitalize).join("");

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  a: Link,
};

export default function Doc({ source, metadata }: any) {
  return (
    <div>
      <Link href="/">Back</Link>
      <h1>{metadata.displayName}</h1>
      <p>{metadata.description}</p>
      <ul>
        {metadata.props.map((prop: any) => (
          <li key={prop.name}>
            <code>{prop.name}</code>
            <p>{prop.description}</p>
          </li>
        ))}
      </ul>
      <MDXRemote {...source} components={components} />
    </div>
  );
}

export const getStaticProps = async ({ params }: any) => {
  const postPath = path.join(DOCS_PATH, `${params.slug}.mdx`);
  const docFile = fs.readFileSync(postPath);

  const sourcePath = path.join(SOURCE_PATH, `${toPascalCase(params.slug)}.tsx`);
  const sourceFile = fs.readFileSync(sourcePath);

  const { description, displayName, props } = parse(sourceFile, null, null, {
    filename: sourcePath,
  });

  const metadata = {
    description,
    displayName,
    props: Object.keys(props).map((key) => ({
      name: key,
      tsType: props[key].tsType,
      description: props[key].description,
    })),
  };

  console.log({ metadata });

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
      metadata,
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
