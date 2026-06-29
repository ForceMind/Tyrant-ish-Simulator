import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { ZipArchive } = require("archiver");

const ROOT = path.resolve(".");
const DIST = path.join(ROOT, "dist");
const RELEASE = path.join(ROOT, "release");
const ZIP = path.join(RELEASE, "shit-emperor-cloudflare-pages.zip");

if (!fs.existsSync(path.join(DIST, "index.html"))) {
  throw new Error("dist/index.html 不存在，请先运行 npm run build");
}

fs.mkdirSync(RELEASE, { recursive: true });
fs.rmSync(ZIP, { force: true });

await new Promise((resolve, reject) => {
  const output = fs.createWriteStream(ZIP);
  const archive = new ZipArchive({ zlib: { level: 9 } });
  output.on("close", resolve);
  archive.on("error", reject);
  archive.pipe(output);
  archive.directory(DIST, false);
  archive.finalize();
});

console.log(JSON.stringify({
  zip: path.relative(ROOT, ZIP),
  bytes: fs.statSync(ZIP).size
}, null, 2));
