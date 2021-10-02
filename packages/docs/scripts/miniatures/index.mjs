// This script will visit predefined list of paths and generate screenshots.
// Each file will be replaced only if its content is less than 90% compatible.
import crypto from "crypto";
import fs from "fs";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import puppeteer from "puppeteer";
import sharp from "sharp";

const width = 256;
const height = 144;

const dimensions = {
  width: width * 5,
  height: height * 5,
};

const getPath = (filePath) => new URL(filePath, import.meta.url).pathname;

const resultDirectory = getPath("../../public/miniatures");

const paths = [
  ...new Set(
    [
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
      "http://localhost:3000/docs/motivation#standing-on-the-shoulders-of-giants",
      "http://localhost:3000/docs/components/button",
      "https://github.com/tchayen/tonfisk/blob/main/examples/webpack/webpack.config.js",
      "https://github.com/tchayen/tonfisk/blob/main/examples/next/next.config.js",
      "https://vanilla-extract.style/documentation/setup/",
      "http://localhost:3000/docs/components/pagination",
      "http://localhost:3000/docs/guides/formik",
    ].map((path) => path.split("#")[0])
  ),
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
    await page.goto(path.split("#")[0]);

    const getImageForColorMode = async (colorMode) => {
      const hash = crypto
        .createHash("md5")
        .update(`${colorMode}-${path}`)
        .digest("hex")
        .substring(0, 12);
      const fileName = `${resultDirectory}/${hash}.png`;

      const logName = `${path} (${colorMode} mode) ${hash}`;

      await page.emulateMediaFeatures([
        { name: "prefers-color-scheme", value: colorMode },
      ]);

      const screenshot = await page.screenshot(options);
      await sharp(screenshot)
        .resize(width, height)
        .toFile(`${resultDirectory}/tmp.png`);

      try {
        const oldImage = PNG.sync.read(fs.readFileSync(fileName));
        const newImage = PNG.sync.read(
          fs.readFileSync(`${resultDirectory}/tmp.png`)
        );

        const differentPixels = pixelmatch(
          oldImage.data,
          newImage.data,
          null,
          width,
          height
        );

        const compatibility = 100 - (differentPixels * 100) / (width * height);
        const percentage = compatibility.toFixed(2);
        if (compatibility < 90) {
          console.log(
            `${logName} is ${percentage}% compatible. Saving new version.`
          );
          fs.renameSync(`${resultDirectory}/tmp.png`, fileName);
        } else {
          console.log(`${logName} is ${percentage}% compatible. Skipping.`);
        }
      } catch (error) {
        console.log(`Comparison failed: ${error}. Saving anyway.`);
        fs.renameSync(`${resultDirectory}/tmp.png`, fileName);
      }
    };

    await getImageForColorMode("light");
    await getImageForColorMode("dark");
  }

  await browser.close();

  try {
    fs.rmSync(`${resultDirectory}/tmp.png`);
  } catch {}
}

generate();
