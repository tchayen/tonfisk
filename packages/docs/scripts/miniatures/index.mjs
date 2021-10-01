import crypto from "crypto";
import puppeteer from "puppeteer";
import sharp from "sharp";

const dimensions = {
  width: 1280,
  height: 720,
};

const getPath = (filePath) => new URL(filePath, import.meta.url).pathname;

const resultDirectory = getPath("../../public/miniatures");

const paths = [
  "https://vanilla-extract.style/documentation/setup/",
  "http://localhost:3000/docs/guides/bundling",
  "http://localhost:3000/noflash.js",
  "https://github.com/tchayen/tonfisk/tree/main/examples/webpack",
  "https://github.com/tchayen/tonfisk/blob/main/packages/tonfisk/src/theme.css.ts",
  "https://vanilla-extract.style/documentation",
  "http://localhost:3000/docs/guides/formik",
  "http://localhost:3000/docs/example",
  "https://github.com/tchayen/tonfisk/tree/main/examples",
  "https://codesandbox.io/s/tonfisk-webpack-pbehz",
  "https://www.figma.com/community/file/1022531774593389664/tonfisk",
  "https://uxdesign.cc/everything-you-need-to-know-about-design-systems-54b109851969",
  "http://localhost:3000/docs/motivation#what-is-a-design-system",
  "https://react-spectrum.adobe.com/react-aria",
  "https://reach.tech/",
  "https://vanilla-extract.style/",
  "http://localhost:3000/docs/standing-on-the-shoulders-of-giants",
  "http://localhost:3000/docs/components/button",
  "https://github.com/tchayen/tonfisk/blob/main/examples/webpack/webpack.config.js",
  "https://github.com/tchayen/tonfisk/blob/main/examples/next/next.config.js",
  "https://vanilla-extract.style/documentation/setup/",
  "http://localhost:3000/docs/components/pagination",
  "http://localhost:3000/docs/guides/formik",
];

async function generate() {
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport(Object.assign({ deviceScaleFactor: 1 }, dimensions));

  const options = {
    encoding: "binary",
    type: "png",
  };

  for (const path of paths) {
    const fileName = (colorMode) =>
      `${resultDirectory}/${crypto
        .createHash("md5")
        .update(`${colorMode}-${path}`)
        .digest("hex")}.png`;

    await page.emulateMediaFeatures([
      { name: "prefers-color-scheme", value: "light" },
    ]);

    console.log(`Creating ${fileName("light")} for ${path}.`);

    await page.goto(path);

    const lightBuffer = await page.screenshot(options);
    await sharp(lightBuffer).resize(256, 144).toFile(fileName("light"));

    await page.emulateMediaFeatures([
      { name: "prefers-color-scheme", value: "dark" },
    ]);

    console.log(`Creating ${fileName("dark")} for ${path}.`);

    const darkBuffer = await page.screenshot(options);
    await sharp(darkBuffer).resize(256, 144).toFile(fileName("dark"));
  }

  await browser.close();
}

generate();
