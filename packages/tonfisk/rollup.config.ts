import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

import pkg from "./package.json";
const input = ["index.ts"];

function manualChunks(id) {
  console.log({ id });
  if (id.match(/css.ts$/)) {
    return id.split("/").slice(-1);
  }
}

export default [
  // UMD.
  {
    input,
    plugins: [
      nodeResolve(),
      commonjs({}),
      typescript(),
      babel({
        babelHelpers: "bundled",
      }),
      terser(),
    ],
    output: {
      file: `dist/${pkg.name}.min.js`,
      format: "umd",
      name: "tonfisk",
      esModule: false,
      exports: "named",
      sourcemap: true,
    },
  },
  // ESM and CJS.
  {
    input,
    plugins: [nodeResolve(), commonjs({}), typescript()],
    output: [
      {
        manualChunks,
        dir: "dist/esm",
        format: "esm",
        exports: "named",
        sourcemap: true,
      },
      {
        manualChunks,
        dir: "dist/cjs",
        format: "cjs",
        exports: "named",
        sourcemap: true,
      },
    ],
  },
];
