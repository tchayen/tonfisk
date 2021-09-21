import { Buffer } from "buffer";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import puppeteer from "puppeteer";

import packageJson from "../../../tonfisk/package.json";

const dimensions = {
  width: 1200,
  height: 630,
};

const templateFile = path.join(__dirname, "./template.svg");
const resultDirectory = path.join(__dirname, "../public/social");
const docsPath = path.join(__dirname, "../docs");
const sourcesPath = path.join(__dirname, "../../../tonfisk/src/components");

if (!fs.existsSync(resultDirectory)) {
  fs.mkdirSync(resultDirectory);
}

const toKebabCase = (string) =>
  string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

const h2 = (text) => `<h2 xmlns="http://www.w3.org/1999/xhtml">${text}</h2>`;
const h3 = (text) => `<h3 xmlns="http://www.w3.org/1999/xhtml">${text}</h3>`;

const docsFilePaths = fs
  .readdirSync(docsPath)
  .filter((path) => /\.mdx?$/.test(path));

const componentsFilePaths = fs
  .readdirSync(sourcesPath)
  .filter((path) => /^[A-Z][a-zA-Z]+\.tsx/.test(path))
  .map((file) => file.split(".")[0]);

const files = [
  {
    name: "homepage",
    content: [h3(packageJson.description)],
  },
];

for (const doc of docsFilePaths) {
  const source = fs.readFileSync(path.join(docsPath, doc), "utf-8");
  const { data } = matter(source);
  files.push({
    name: toKebabCase(data.title.replace(/\s/g, "-")),
    content: [h2(data.title), h3(data.description)],
  });
}

for (const source of componentsFilePaths) {
  files.push({
    name: toKebabCase(source),
    content: [h3("/docs/components/"), h2(source)],
  });
}

const templateString = fs.readFileSync(templateFile, "utf8");

async function generate() {
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport(Object.assign({ deviceScaleFactor: 1 }, dimensions));

  for (const file of files) {
    console.log(`Creating ${file.name}.png.`);
    const fileString = templateString
      .replace(/__WIDTH__/g, dimensions.width)
      .replace(/__HEIGHT__/g, dimensions.height)
      .replace("__TEXT__", file.content.join("\n"));

    const fileAsBase64 = Buffer.from(fileString).toString("base64");
    const svgUrl = `data:image/svg+xml;base64,${fileAsBase64}`;

    await page.goto(svgUrl);

    const options = {
      encoding: "binary",
      type: "png",
      path: `${resultDirectory}/${file.name}.png`,
    };
    await page.screenshot(options);
  }

  await browser.close();
}

generate();
