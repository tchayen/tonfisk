import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { parse } from "react-docgen";

import { toKebabCase, toPascalCase } from "./string";

export const DOCS_PATH = path.join(process.cwd(), "docs");
export const SOURCE_PATH = path.join(process.cwd(), "../ds/src/components");

export const docsFilePaths = fs
  .readdirSync(DOCS_PATH)
  .filter((path) => /\.mdx?$/.test(path));

export const componentsFilePaths = fs
  .readdirSync(SOURCE_PATH)
  .filter((path) => /^[A-Z]/.test(path));

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
    const { description, displayName, props } = parse(sourceFile, null, null, {
      filename: sourcePath,
    });

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
  } catch {
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
      filePath: filePath.replace(/\.mdx?$/, ""),
    };
  });

  const components = componentsFilePaths.map((filePath) => {
    const { displayName: title } = getSourceMetadata(filePath.split(".")[0]);

    return {
      title,
      filePath: `components/${toKebabCase(filePath.replace(/\.tsx?$/, ""))}`,
    };
  });

  return {
    name: "",
    files: [
      {
        name: "Overview",
        files: [{ title: "Example", filePath: "../example" }, ...docs],
      },
      {
        name: "Components",
        files: components,
      },
    ],
  };
};
