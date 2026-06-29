# Cloudflare Pages 部署说明

## 方案 A：Direct Upload

适合手动上传一个已经打包好的版本。

1. 安装依赖：

```bash
npm install
```

2. 构建并打包：

```bash
npm run package:cf
```

3. 上传：

```text
release/shit-emperor-cloudflare-pages.zip
```

Cloudflare Pages 控制台中选择 Direct Upload，把这个 zip 上传即可。

## 方案 B：Git 连接部署

Cloudflare Pages 项目设置：

```text
Framework preset: None
Build command: npm run build
Build output directory: dist
Root directory: /
Node.js version: 20 或更高
```

## 部署包内容

`dist/` 中只有静态文件：

```text
index.html
assets/app.[hash].js
assets/styles.[hash].css
_headers
version.json
```

JS 已经过：

- esbuild bundle
- minify
- javascript-obfuscator 混淆

## 本地验证部署包

```bash
npm run build
set AUDIT_ROOT=dist
node scripts/browser-audit.mjs
```

PowerShell 单行：

```powershell
$env:AUDIT_ROOT='dist'; node scripts/browser-audit.mjs; Remove-Item Env:AUDIT_ROOT
```

如果验收通过，`dist/` 可以部署。

## 常见问题

### 直接双击源码 index.html 只有黄色页面

源码版使用 ES Modules，`file://` 打开时模块导入可能被浏览器拦截。请用：

```bash
npm run dev
```

然后访问：

```text
http://127.0.0.1:5174/
```

或者打开构建后的 `dist/index.html`。

### Cloudflare Pages 上传后空白

确认上传的是 zip 里的内容根目录，而不是把整个项目源码 zip 上传。Direct Upload 应上传：

```text
release/shit-emperor-cloudflare-pages.zip
```

Git 部署则使用：

```text
Build command: npm run build
Output directory: dist
```
