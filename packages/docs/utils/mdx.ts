import rehypePrism from "@mapbox/rehype-prism";
import fs from "fs";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import path from "path";
import * as reactDocgen from "react-docgen";
import remarkGfm from "remark-gfm";

import { toKebabCase, toPascalCase } from "./string";

export const DOCS_PATH = path.join(process.cwd(), "docs");
export const SOURCE_PATH = path.join(
  process.cwd(),
  "../tonfisk/src/components"
);

export const docsFilePaths = fs
  .readdirSync(DOCS_PATH)
  .filter((path) => /\.mdx?$/.test(path));

export const componentsFilePaths = fs
  .readdirSync(SOURCE_PATH)
  .filter((path) => /^[A-Z][a-zA-Z]+\.tsx/.test(path));

export type Metadata = {
  displayName: string;
  codeFileName: string;
  description: string;
  slug: string;
  props: Array<{
    name: string;
    description: string;
    type: string;
  }>;
};

export const getSourceMetadata = (slug: string): Metadata => {
  const sourcePath = path.join(SOURCE_PATH, `${toPascalCase(slug)}.tsx`);
  const sourceFile = fs.readFileSync(sourcePath, "utf-8");
  const codeFileName = sourcePath.split("/").pop() || "";

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
      codeFileName,
      slug,
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
      codeFileName,
      slug,
      description: "",
      displayName: "",
      props: [],
    };
  }
};

type Directory = {
  name: string;
  files: Array<File | Directory>;
};

type File = {
  title: string;
  filePath: string;
};

export const getNavigation = (): Directory => {
  const order = ["getting-started", "motivation", "formik-example", "roadmap"];

  const sortedPart = [];
  const rest = [];

  for (const file of order) {
    const doc = docsFilePaths.find((doc) => doc.includes(file));
    if (doc) {
      sortedPart.push(doc);
    }
  }

  for (const doc of sortedPart) {
    if (!docsFilePaths.includes(doc)) {
      rest.push(doc);
    }
  }

  const merged = [...sortedPart, ...rest];

  const docs = merged.map((filePath) => {
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

export const readMdxFile = async (
  fileName: string
): Promise<{
  source: string;
  frontMatter: { [key: string]: string };
  navigation: ReturnType<typeof getNavigation>;
}> => {
  const { content, data } = matter(fileName);
  const mdxSource = await prepareMdx(content);

  return {
    source: mdxSource,
    frontMatter: data,
    navigation: getNavigation(),
  };
};

export const prepareMdx = async (content: string): Promise<string> => {
  const { code } = await bundleMDX(content, {
    xdmOptions: (options) => {
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm];
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypePrism];
      return options;
    },
  });
  return code;
};
