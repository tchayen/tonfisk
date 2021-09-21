import { Buffer } from "buffer";
import fs from "fs";
import puppeteer from "puppeteer";

const templateFile = "./template.svg";
const resultFile = "./result.png";
const dimensions = { width: 1200, height: 675 };

const templateString = fs.readFileSync(templateFile, "utf8");
const fileString = templateString
  .replace("__PATH__", "/docs/components/")
  .replace("__FILE_NAME__", "TextInput");
const fileAsBase64 = Buffer.from(fileString).toString("base64");
const svgUrl = `data:image/svg+xml;base64,${fileAsBase64}`;

const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport(Object.assign({ deviceScaleFactor: 1 }, dimensions));

await page.goto(svgUrl);

const options = {
  encoding: "binary",
  type: "png",
  path: resultFile,
};
await page.screenshot(options);

await browser.close();
