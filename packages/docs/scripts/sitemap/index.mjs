import fs from "fs";
import { globby } from "globby";
import prettier from "prettier";

const toKebabCase = (string) =>
  string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

async function generate() {
  const pages = await globby([
    "pages/*.tsx",
    "docs/**/*.mdx",
    "../tonfisk/src/components/*.tsx",
    "!pages/_*.tsx",
    "!pages/index.tsx",
    "!pages/404.tsx",
  ]);

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://tonfisk.fish</loc>
    </url>
    ${pages
      .map((page) => {
        const path = toKebabCase(
          page
            .replace(".tsx", "")
            .replace(".mdx", "")
            .replace("../tonfisk/src", "docs")
        );

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

  fs.writeFileSync("public/sitemap.xml", formatted);
}

generate();
