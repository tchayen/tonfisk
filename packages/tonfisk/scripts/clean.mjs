// This script does clean up and reverts directory so local development can be
// resumed.
import fs from "fs";

const getPath = (filePath) => new URL(filePath, import.meta.url).pathname;

fs.renameSync(getPath("../package.json"), getPath("../package.dist.json"));
fs.renameSync(getPath("../package.local.json"), getPath("../package.json"));

fs.rmSync(getPath("../README.md"));

fs.rmSync(getPath("../dist"), { recursive: true });
