import rehypePrism from "@mapbox/rehype-prism";
import fs from "fs";
import matter from "gray-matter";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import * as reactDocgen from "react-docgen";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

import { toKebabCase, toPascalCase } from "./string";

export const DOCS_PATH = path.join(process.cwd(), "docs");
export const SOURCE_PATH = path.join(process.cwd(), "../ds/src/components");

export const docsFilePaths = fs
  .readdirSync(DOCS_PATH)
  .filter((path) => /\.mdx?$/.test(path));

export const componentsFilePaths = fs
  .readdirSync(SOURCE_PATH)
  .filter((path) => /^[A-Z][a-zA-Z]+\.tsx/.test(path));

export const getSourceMetadata = (
  slug: string
): {
  displayName: string;
  description: string;
  props: {
    name: string;
    description: string;
    type: string;
  }[];
} => {
  const sourcePath = path.join(SOURCE_PATH, `${toPascalCase(slug)}.tsx`);
  const sourceFile = fs.readFileSync(sourcePath, "utf-8");

  try {
    const components = reactDocgen.parse(
      sourceFile,
      reactDocgen.resolver.findAllComponentDefinitions,
      null,
      {
        filename: sourcePath,
      }
    );

    const { description, displayName, props } =
      components[components.length - 1];

    return {
      description,
      displayName,
      props: Object.keys(props || {}).map((key) => {
        return {
          name: `${key}${props[key].required ? "" : "?"}`,
          type: props[key].tsType.raw || props[key].tsType.name,
          description: props[key].description,
        };
      }),
    };
  } catch (error) {
    console.error(error);

    return {
      description: "",
      displayName: "",
      props: [],
    };
  }
};

type Directory = {
  name: string;
  files: (File | Directory)[];
};
type File = {
  title: string;
  filePath: string;
};

export const getNavigation = (): Directory => {
  const docs = docsFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(DOCS_PATH, filePath), "utf-8");

    const { data } = matter(source);

    return {
      title: data.title,
      filePath: `/docs/${filePath.replace(/\.mdx?$/, "")}`,
    };
  });

  const components = componentsFilePaths.map((filePath) => {
    const { displayName: title } = getSourceMetadata(filePath.split(".")[0]);

    return {
      title,
      filePath: `/docs/components/${toKebabCase(
        filePath.replace(/\.tsx?$/, "")
      )}`,
    };
  });

  return {
    name: "",
    files: [
      {
        name: "Overview",
        files: [
          { title: "Homepage", filePath: "/" },
          { title: "Example", filePath: "/example" },
        ],
      },
      {
        name: "Guides",
        files: docs,
      },
      {
        name: "Components",
        files: components,
      },
    ],
  };
};

export const serializeMdx = async (
  content: string,
  scope?: { [key: string]: any }
): Promise<MDXRemoteSerializeResult> => {
  return serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [rehypePrism, rehypeSlug, rehypeAutolinkHeadings],
    },
    scope,
  });
};

export const readMdxFile = async (
  fileName: string
): Promise<{
  source: MDXRemoteSerializeResult;
  frontMatter: { [key: string]: any };
  navigation: ReturnType<typeof getNavigation>;
}> => {
  const { content, data } = matter(fileName);
  const mdxSource = await serializeMdx(content, data);

  return {
    source: mdxSource,
    frontMatter: data,
    navigation: getNavigation(),
  };
};
