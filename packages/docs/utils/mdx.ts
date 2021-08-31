import fs from "fs";
import path from "path";
import { parse } from "react-docgen";
import { toPascalCase } from "./string";

export const DOCS_PATH = path.join(process.cwd(), "docs");
export const SOURCE_PATH = path.join(process.cwd(), "../ds/src/components");

export const docsFilePaths = fs
  .readdirSync(DOCS_PATH)
  .filter((path) => /\.mdx?$/.test(path));

export const componentsFilePaths = fs
  .readdirSync(SOURCE_PATH)
  .filter((path) => /^[A-Z]/.test(path));

export const getSourceMetadata = (slug: string) => {
  const sourcePath = path.join(SOURCE_PATH, `${toPascalCase(slug)}.tsx`);
  const sourceFile = fs.readFileSync(sourcePath, "utf-8");

  const { description, displayName, props } = parse(sourceFile, null, null, {
    filename: sourcePath,
  });

  return {
    description,
    displayName,
    props: Object.keys(props || {}).map((key) => ({
      name: key,
      tsType: props[key].tsType,
      description: props[key].description,
    })),
  };
};
