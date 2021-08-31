import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Head from "next/head";
import { docsFilePaths, DOCS_PATH } from "../utils/mdx";

export default function Home({
  docs,
}: {
  docs: {
    filePath: string;
    data: {
      title: string;
    };
  }[];
}) {
  return (
    <div>
      <ul>
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
    </div>
  );
}

export function getStaticProps() {
  const docs = docsFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(DOCS_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
    };
  });

  return { props: { docs } };
}
