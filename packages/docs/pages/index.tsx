import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Head from "next/head";
import {
  componentsFilePaths,
  SOURCE_PATH,
  docsFilePaths,
  DOCS_PATH,
  getSourceMetadata,
} from "../utils/mdx";
import { toKebabCase } from "../utils/string";

export default function Home({
  docs,
  components,
}: {
  docs: {
    filePath: string;
    data: {
      title: string;
    };
  }[];
  components: {
    filePath: string;
    metadata: {
      displayName: string;
    };
  }[];
}) {
  return (
    <div>
      hello
      <ul>
        <li>
          <Link as="/example" href="/example">
            <a>Example</a>
          </Link>
        </li>
        {docs.map((doc) => (
          <li key={doc.filePath}>
            <Link
              as={`/docs/${doc.filePath.replace(/\.mdx?$/, "")}`}
              href={`/docs/[slug]`}
            >
              <a>{doc.data.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      Components
      <ul>
        {components.map((doc) => (
          <li key={doc.filePath}>
            <Link
              as={`/docs/components/${toKebabCase(
                doc.filePath.replace(/\.tsx?$/, "")
              )}`}
              href={`/docs/components/[slug]`}
            >
              <a>{doc.metadata.displayName}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function getStaticProps() {
  const docs = docsFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(DOCS_PATH, filePath), "utf-8");

    const { data } = matter(source);

    return {
      data,
      filePath,
    };
  });

  const components = componentsFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(SOURCE_PATH, filePath), "utf-8");

    const metadata = getSourceMetadata(filePath.split(".")[0]);

    return { metadata, filePath };
  });

  return { props: { docs, components } };
}
