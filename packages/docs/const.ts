/* eslint-disable @typescript-eslint/ban-ts-comment */
import packageJson from "../tonfisk/package.json";

export const title = "Tonfisk";
export const author = "@tchayen";
// @ts-ignore
export const description = packageJson.description;

export const url = "https://tonfisk.fish";
export const getSocialImageUrl = (slug: string): string =>
  `${url}/social/${slug}.png?v=${process.env.CONFIG_BUILD_ID}`;
