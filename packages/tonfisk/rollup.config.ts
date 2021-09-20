import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

import pkg from "./package.json";
const input = ["index.ts"];

export default [
  // UMD.
  {
    input,
    plugins: [
      commonjs({}),
      nodeResolve(),
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
    plugins: [commonjs({}), nodeResolve(), typescript()],
    output: [
      {
        dir: "dist/esm",
        format: "esm",
        exports: "named",
        sourcemap: true,
      },
      {
        dir: "dist/cjs",
        format: "cjs",
        exports: "named",
        sourcemap: true,
      },
    ],
  },
];
