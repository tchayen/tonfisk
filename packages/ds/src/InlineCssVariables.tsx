/*
This code comes from https://joshwcomeau.com/gatsby/dark-mode/
It uses the users' prefers-color-scheme media query to inline
CSS variables into the :root of the page before any content is
rendered.
*/

import React, { ReactElement } from "react";

import theme from "./theme";

export function setColorsByTheme(): void {
  const colors: any = "🌈";

  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  const prefersDarkFromMQ = mql.matches;
  const colorMode = prefersDarkFromMQ ? "dark" : "light";

  const root = document.documentElement;

  const toKebabCase = (s: string): string =>
    s.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

  Object.entries(colors[colorMode]).forEach(([key, value]) => {
    root.style.setProperty(`--${toKebabCase(key)}`, value as string);
  });
}

export function MagicScriptTag(): ReactElement {
  const boundFn = String(setColorsByTheme).replace(
    '"🌈"',
    JSON.stringify(theme.colors.modes)
  );

  const calledFunction = `(${boundFn})()`;

  return <script dangerouslySetInnerHTML={{ __html: calledFunction }} />;
}
