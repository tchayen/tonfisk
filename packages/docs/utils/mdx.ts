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

export const getDocFilesForDirectory = (directory: string): Array<string> => {
  const paths: Array<string> = [];
  fs.readdirSync(directory).forEach((file) => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      const subpaths = getDocFilesForDirectory(filePath);
      for (const subpath of subpaths) {
        paths.push(subpath);
      }
    } else if (stat.isFile()) {
      paths.push(filePath);
    }
  });
  return paths;
};

export const getDocFiles = (): Array<string> => {
  return getDocFilesForDirectory(DOCS_PATH).map((doc) =>
    doc.replace(process.cwd(), "").replace("/", "").replace(".mdx", "")
  );
};

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

// TODO: probably doesn't need to be a function.
export const getNavigation = (): Directory => {
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
      { title: "Homepage", filePath: "/" },
      {
        title: "Getting started",
        filePath: "/docs/getting-started",
      },
      { title: "Example", filePath: "/docs/example" },
      { title: "Motivation", filePath: "/docs/motivation" },
      { title: "Roadmap", filePath: "/docs/roadmap" },
      {
        name: "Links",
        files: [
          { title: "GitHub ↗", filePath: "https://github.com/tchayen/tonfisk" },
          {
            title: "Figma ↗",
            filePath:
              "https://www.figma.com/community/file/1022531774593389664/tonfisk",
          },
        ],
      },
      {
        name: "Guides",
        files: [{ title: "Formik", filePath: "/docs/guides/formik" }],
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
