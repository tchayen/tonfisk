// This script prepares files for publishing to NPM.
import { spawn } from "child_process";
import fs from "fs";

const getPath = (filePath) => new URL(filePath, import.meta.url).pathname;

// Swap package.json files.
fs.renameSync(getPath("../package.json"), getPath("../package.local.json"));
fs.renameSync(getPath("../package.dist.json"), getPath("../package.json"));

fs.copyFileSync(getPath("../../../README.md"), getPath("../README.md"));

const command = spawn("yarn", ["run", "prepack"]);

command.stdout.on("data", function (data) {
  console.log("stdout: " + data.toString());
});

command.stderr.on("data", function (data) {
  console.log("stderr: " + data.toString());
});

command.on("exit", function (code) {
  console.log("child process exited with code " + code.toString());
});
