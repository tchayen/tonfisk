import { execSync } from "child_process";
import fs from "fs";

const getPath = (filePath) => new URL(filePath, import.meta.url).pathname;

// Swap package.json files.
fs.renameSync(getPath("../package.json"), getPath("../package.local.json"));
fs.renameSync(getPath("../package.dist.json"), getPath("../package.json"));

execSync("yarn run prepack");

// // Clean up.

// fs.renameSync("../package.json", "../package.dist.json");
// fs.renameSync("../package.local.json", "../package.json");

// fs.rmdirSync("../dist", { recursive: true });
