import fs from "fs";
import path from "path";
import prettier from "prettier";

const toKebabCase = (string) =>
  string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

const getPath = (filePath) => new URL(filePath, import.meta.url).pathname;

console.log("Generating sitemap.xml.");

const docsPath = getPath("../../docs");
const sourcesPath = getPath("../../../tonfisk/src/components");

const getDocFilesForDirectory = (directory) => {
  const paths = [];
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

const getDocFiles = () => {
  return getDocFilesForDirectory(docsPath).map((doc) =>
    doc.replace(docsPath, "").replace("/", "")
  );
};

const docsFilePaths = getDocFiles();

const componentsFilePaths = fs
  .readdirSync(sourcesPath)
  .filter((path) => /^[A-Z][a-zA-Z]+\.tsx/.test(path))
  .map((file) => file.split(".")[0]);

const pages = [
  "",
  ...docsFilePaths.map((path) => `docs/${path}`),
  ...componentsFilePaths.map((path) => `docs/components/${path}`),
].filter(
  (page) =>
    !page.match(/404/) && !page.match("index.tsx") && !page.startsWith("_")
);

async function generate() {
  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages
      .map((page) => {
        const path = toKebabCase(page.replace(".tsx", "").replace(".mdx", ""));

        return `<url>
              <loc>${`https://tonfisk.fish/${path}`}</loc>
          </url>
`;
      })
      .join("")}
    </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    parser: "html",
  });

  fs.writeFileSync(getPath("../../public/sitemap.xml"), formatted);
}

generate();
