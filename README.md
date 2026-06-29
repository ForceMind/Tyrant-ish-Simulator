# 《Shit皇帝》 / My Bad, Your Empire

中文单机 H5 休闲策略 Roguelike。玩家从选择年号开始登基，通过月度事件、阶段诏令、隐藏爆雷、结局图鉴和史官档案形成多局循环。

## 重要：为什么直接打开是黄色页面

源码版 `index.html` 使用 ES Modules。浏览器直接双击打开会走 `file://`，很多浏览器会拦截模块导入，结果只看到背景或加载提示。

本地试玩请用 HTTP 服务：

```bash
npm install
npm run dev
```

然后打开：

```text
http://127.0.0.1:5174/
```

如果只想直接打开文件，请打开构建后的 `dist/index.html`，它是已打包版本。

## Cloudflare Pages 部署

详见 [docs/CLOUDFLARE_PAGES.md](docs/CLOUDFLARE_PAGES.md)。

最简单的 Direct Upload：

```bash
npm install
npm run package:cf
```

生成：

```text
release/shit-emperor-cloudflare-pages.zip
```

在 Cloudflare Pages 里选择 Direct Upload，上传这个 zip 即可。

如果使用 Git 连接 Cloudflare Pages：

```text
Build command: npm run build
Build output directory: dist
```

## 构建与混淆

```bash
npm run build
```

构建输出在 `dist/`：

- `dist/index.html`
- `dist/assets/app.[hash].js`：esbuild bundle + minify + javascript-obfuscator 混淆
- `dist/assets/styles.[hash].css`
- `dist/_headers`
- `dist/version.json`

## 验证

基础成熟度检查：

```bash
npm run smoke
```

浏览器级 UI + 长局验收：

```bash
npm run audit:browser
```

数值与结局全真模拟：

```bash
npm run sim:audit
```

完整验证：

```bash
npm run verify
```

验证覆盖：

- 368 个普通事件、20 个爆雷事件的数据完整性。
- 8 个年号各模拟 120 个月长局。
- 阶段诏令并行、编年史、结局图鉴写入。
- 手机和桌面视口无横向溢出、空白页、过小按钮、屏外按钮或乱码。
- 浏览器真实页面自动推进 84 次选择并触发结局归档。
- `sim:audit` 使用真实引擎跑 9 条行为路线、45 局模拟，检查普通事件不重复、数值轨迹和自然结局覆盖。

浏览器验收截图输出到 `artifacts/browser-audit/`，该目录不会提交。

## 项目结构

- `index.html`：源码开发入口。
- `src/core/`：配置、状态、引擎、localStorage。
- `src/data/`：年号、事件、结局、成就、志向、诏令、史官记录。
- `src/ui/`：页面和组件渲染。
- `src/styles/`：基础、主题、响应式样式。
- `scripts/build.mjs`：构建并混淆 Cloudflare Pages 包。
- `scripts/package-cf.mjs`：打 zip 包。
- `scripts/smoke-test.mjs`：数据与长局模拟自检。
- `scripts/simulation-audit.mjs`：数值、事件去重和多结局全真模拟。
- `scripts/browser-audit.mjs`：headless Chrome UI 与长局验收。

更多架构说明见 [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)。
事件时间线、数值导向和后续补内容清单见 [docs/SIMULATION_AND_CONTENT_PLAN.md](docs/SIMULATION_AND_CONTENT_PLAN.md)。
