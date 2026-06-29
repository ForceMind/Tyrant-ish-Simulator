import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import * as esbuild from "esbuild";
import JavaScriptObfuscator from "javascript-obfuscator";

const ROOT = path.resolve(".");
const DIST = path.join(ROOT, "dist");
const ASSETS = path.join(DIST, "assets");

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(ASSETS, { recursive: true });

const bundle = await esbuild.build({
  entryPoints: [path.join(ROOT, "src", "main.js")],
  bundle: true,
  minify: true,
  treeShaking: true,
  legalComments: "none",
  format: "iife",
  target: ["es2020"],
  platform: "browser",
  write: false,
  charset: "utf8"
});

const bundledJs = bundle.outputFiles[0].text;
const obfuscated = JavaScriptObfuscator.obfuscate(bundledJs, {
  compact: true,
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 0.45,
  deadCodeInjection: true,
  deadCodeInjectionThreshold: 0.18,
  identifierNamesGenerator: "hexadecimal",
  renameGlobals: false,
  rotateStringArray: true,
  selfDefending: false,
  simplify: true,
  splitStrings: true,
  splitStringsChunkLength: 8,
  stringArray: true,
  stringArrayCallsTransform: true,
  stringArrayCallsTransformThreshold: 0.45,
  stringArrayEncoding: ["base64"],
  stringArrayThreshold: 0.8,
  unicodeEscapeSequence: false
}).getObfuscatedCode();

const css = [
  "src/styles/base.css",
  "src/styles/theme.css",
  "src/styles/responsive.css"
].map((file) => fs.readFileSync(path.join(ROOT, file), "utf8")).join("\n");

const jsName = `app.${hash(obfuscated)}.js`;
const cssName = `styles.${hash(css)}.css`;

fs.writeFileSync(path.join(ASSETS, jsName), obfuscated);
fs.writeFileSync(path.join(ASSETS, cssName), css);
fs.writeFileSync(path.join(DIST, "index.html"), renderHtml(cssName, jsName));
fs.writeFileSync(path.join(DIST, "_headers"), [
  "/*",
  "  X-Content-Type-Options: nosniff",
  "  Referrer-Policy: no-referrer",
  "  Permissions-Policy: camera=(), microphone=(), geolocation=()",
  ""
].join("\n"));
fs.writeFileSync(path.join(DIST, "version.json"), JSON.stringify({
  name: "Shit皇帝",
  englishName: "My Bad, Your Empire",
  builtAt: new Date().toISOString(),
  obfuscated: true,
  entry: `assets/${jsName}`,
  styles: `assets/${cssName}`
}, null, 2));

console.log(JSON.stringify({
  dist: path.relative(ROOT, DIST),
  js: `assets/${jsName}`,
  css: `assets/${cssName}`,
  jsBytes: Buffer.byteLength(obfuscated),
  cssBytes: Buffer.byteLength(css)
}, null, 2));

function hash(value) {
  return crypto.createHash("sha256").update(value).digest("hex").slice(0, 10);
}

function renderHtml(cssName, jsName) {
  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#8f1d1d">
    <meta name="description" content="《Shit皇帝》是一款中文单机 H5 休闲策略 Roguelike 游戏。">
    <title>Shit皇帝 | My Bad, Your Empire</title>
    <link rel="stylesheet" href="./assets/${cssName}">
  </head>
  <body>
    <div id="app" class="app-root" aria-live="polite">
      <main class="screen title-screen">
        <section class="hero-panel">
          <p class="seal">加载中</p>
          <h1>Shit皇帝</h1>
          <p class="subtitle">游戏正在启动。若长时间停留，请刷新页面或确认浏览器允许 JavaScript。</p>
        </section>
      </main>
    </div>
    <script src="./assets/${jsName}" defer></script>
  </body>
</html>
`;
}
