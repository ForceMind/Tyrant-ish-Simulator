import fs from "node:fs";
import http from "node:http";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";

const ROOT = path.resolve(process.env.AUDIT_ROOT || ".");
const OUT_DIR = path.join(ROOT, "artifacts", "browser-audit");
const MOJIBAKE_PATTERN = new RegExp("[\\u951b\\u9359\\u93c3\\u7ad4]");
const CHROME_PATHS = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function findChrome() {
  const found = CHROME_PATHS.find((candidate) => fs.existsSync(candidate));
  assert(found, "没有找到 Chrome 或 Edge，无法执行浏览器验收");
  return found;
}

function contentType(filePath) {
  if (filePath.endsWith(".html")) return "text/html; charset=utf-8";
  if (filePath.endsWith(".js") || filePath.endsWith(".mjs")) return "text/javascript; charset=utf-8";
  if (filePath.endsWith(".css")) return "text/css; charset=utf-8";
  if (filePath.endsWith(".json")) return "application/json; charset=utf-8";
  if (filePath.endsWith(".png")) return "image/png";
  return "text/plain; charset=utf-8";
}

function startServer() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, "http://127.0.0.1");
    const decoded = decodeURIComponent(url.pathname);
    const safePath = decoded === "/" ? "index.html" : decoded.replace(/^\/+/, "");
    const filePath = path.resolve(ROOT, safePath);
    if (!filePath.startsWith(ROOT)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }
    fs.readFile(filePath, (error, data) => {
      if (error) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }
      res.writeHead(200, { "Content-Type": contentType(filePath) });
      res.end(data);
    });
  });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve({ server, port: server.address().port }));
  });
}

async function waitForPort(port, timeoutMs = 5000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await canConnect(port)) return;
    await wait(100);
  }
  throw new Error(`Chrome DevTools 端口未启动：${port}`);
}

function canConnect(port) {
  return new Promise((resolve) => {
    const socket = net.connect(port, "127.0.0.1");
    socket.once("connect", () => {
      socket.destroy();
      resolve(true);
    });
    socket.once("error", () => resolve(false));
    socket.setTimeout(500, () => {
      socket.destroy();
      resolve(false);
    });
  });
}

function requestJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(error);
        }
      });
    }).on("error", reject);
  });
}

function connectWebSocket(url) {
  return new Promise((resolve, reject) => {
    const wsUrl = new URL(url);
    const key = Buffer.from(`${Date.now()}-${Math.random()}`).toString("base64");
    const socket = net.connect(Number(wsUrl.port), wsUrl.hostname);
    let buffer = Buffer.alloc(0);

    socket.on("connect", () => {
      socket.write([
        `GET ${wsUrl.pathname}${wsUrl.search} HTTP/1.1`,
        `Host: ${wsUrl.host}`,
        "Upgrade: websocket",
        "Connection: Upgrade",
        `Sec-WebSocket-Key: ${key}`,
        "Sec-WebSocket-Version: 13",
        "",
        ""
      ].join("\r\n"));
    });

    const onData = (chunk) => {
      buffer = Buffer.concat([buffer, chunk]);
      const headerEnd = buffer.indexOf("\r\n\r\n");
      if (headerEnd === -1) return;
      const header = buffer.slice(0, headerEnd).toString("utf8");
      if (!header.startsWith("HTTP/1.1 101")) {
        reject(new Error(`WebSocket 握手失败：${header}`));
        socket.destroy();
        return;
      }
      socket.off("data", onData);
      const rest = buffer.slice(headerEnd + 4);
      const client = new CdpClient(socket);
      if (rest.length) client.receive(rest);
      resolve(client);
    };

    socket.on("data", onData);

    socket.on("error", reject);
  });
}

class CdpClient {
  constructor(socket) {
    this.socket = socket;
    this.nextId = 1;
    this.pending = new Map();
    this.buffer = Buffer.alloc(0);
    socket.on("data", (chunk) => this.receive(chunk));
  }

  receive(chunk) {
    this.buffer = Buffer.concat([this.buffer, chunk]);
    while (this.buffer.length >= 2) {
      const second = this.buffer[1];
      let offset = 2;
      let length = second & 0x7f;
      if (length === 126) {
        if (this.buffer.length < 4) return;
        length = this.buffer.readUInt16BE(2);
        offset = 4;
      } else if (length === 127) {
        if (this.buffer.length < 10) return;
        length = Number(this.buffer.readBigUInt64BE(2));
        offset = 10;
      }
      const masked = Boolean(second & 0x80);
      const maskOffset = offset;
      if (masked) offset += 4;
      if (this.buffer.length < offset + length) return;
      let payload = this.buffer.slice(offset, offset + length);
      if (masked) {
        const mask = this.buffer.slice(maskOffset, maskOffset + 4);
        payload = payload.map((byte, index) => byte ^ mask[index % 4]);
      }
      const opcode = this.buffer[0] & 0x0f;
      this.buffer = this.buffer.slice(offset + length);
      if (opcode === 8) continue;
      this.handleMessage(payload.toString("utf8"));
    }
  }

  handleMessage(text) {
    if (!text) return;
    const message = JSON.parse(text);
    if (message.id && this.pending.has(message.id)) {
      const { resolve, reject } = this.pending.get(message.id);
      this.pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result);
    }
  }

  send(method, params = {}) {
    const id = this.nextId++;
    const payload = JSON.stringify({ id, method, params });
    this.socket.write(encodeFrame(Buffer.from(payload)));
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
    });
  }

  close() {
    this.socket.destroy();
  }
}

function encodeFrame(payload) {
  const length = payload.length;
  let header;
  if (length < 126) {
    header = Buffer.alloc(6);
    header[0] = 0x81;
    header[1] = 0x80 | length;
    cryptoMask(header, 2);
    return maskPayload(header, payload, 2);
  }
  header = Buffer.alloc(8);
  header[0] = 0x81;
  header[1] = 0x80 | 126;
  header.writeUInt16BE(length, 2);
  cryptoMask(header, 4);
  return maskPayload(header, payload, 4);
}

function cryptoMask(header, offset) {
  const mask = Buffer.from([13, 71, 103, 211]);
  mask.copy(header, offset);
}

function maskPayload(header, payload, maskOffset) {
  const mask = header.slice(maskOffset, maskOffset + 4);
  const masked = Buffer.alloc(payload.length);
  for (let i = 0; i < payload.length; i += 1) masked[i] = payload[i] ^ mask[i % 4];
  return Buffer.concat([header, masked]);
}

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function evaluate(cdp, expression) {
  const result = await cdp.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true
  });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text || "页面脚本执行失败");
  return result.result.value;
}

async function click(cdp, selector) {
  const result = await evaluate(cdp, `(() => {
    const el = document.querySelector(${JSON.stringify(selector)});
    if (!el) return false;
    el.click();
    return true;
  })()`);
  assert(result, `找不到可点击元素：${selector}`);
  await wait(80);
}

async function clickFirst(cdp, selector) {
  await click(cdp, selector);
}

async function capture(cdp, name) {
  const shot = await cdp.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true });
  fs.writeFileSync(path.join(OUT_DIR, `${name}.png`), Buffer.from(shot.data, "base64"));
}

async function auditViewport(cdp, baseUrl, viewport, name) {
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: viewport.scale,
    mobile: viewport.mobile
  });
  await cdp.send("Page.navigate", { url: `${baseUrl}?audit=reset-${encodeURIComponent(name)}-${Date.now()}` });
  await wait(250);
  await evaluate(cdp, `localStorage.clear(); true`);
  await cdp.send("Page.navigate", { url: `${baseUrl}?audit=${encodeURIComponent(name)}-${Date.now()}` });
  await wait(600);

  await checkPage(cdp, "website");
  await capture(cdp, `${name}-website`);
  await click(cdp, '[data-action="go"][data-value="archives"]');
  await checkPage(cdp, "website-archives");
  await click(cdp, '[data-action="backFromArchives"]');
  await checkPage(cdp, "website-return");
  await auditQuickMode(cdp, `${name}-quick`);
  await click(cdp, '[data-action="go"][data-value="title"]');
  await checkPage(cdp, "title");
  await capture(cdp, `${name}-title`);
  await click(cdp, '[data-action="newGame"]');
  await checkPage(cdp, "era");
  await clickFirst(cdp, '[data-action="selectEra"]');
  await checkPage(cdp, "accession");
  await click(cdp, '[data-action="beginReign"]');
  await checkPage(cdp, "ambition");
  await clickFirst(cdp, '[data-action="selectAmbition"]');
  await checkPage(cdp, "main");
  await cdp.send("Page.navigate", { url: `${baseUrl}?audit=${encodeURIComponent(name)}-saved-${Date.now()}` });
  await wait(600);
  await checkPage(cdp, "main-after-refresh");
  await capture(cdp, `${name}-main`);
  await clickFirst(cdp, '[data-action="chooseOption"]');
  await checkPage(cdp, "response");
  await capture(cdp, `${name}-response`);
  await click(cdp, '[data-action="nextMonth"]');
  await checkPage(cdp, "next-main");
  await click(cdp, '[data-action="go"][data-value="archives"]');
  await checkPage(cdp, "archives");
  await capture(cdp, `${name}-archives`);

  return evaluate(cdp, `(() => ({
    viewport: { width: innerWidth, height: innerHeight },
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    bodyText: document.body.innerText.slice(0, 300),
    buttons: document.querySelectorAll('button').length
  }))()`);
}

async function longPlayAudit(cdp, baseUrl) {
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await cdp.send("Page.navigate", { url: `${baseUrl}?audit=long-reset-${Date.now()}` });
  await wait(250);
  await evaluate(cdp, `localStorage.clear(); true`);
  await cdp.send("Page.navigate", { url: `${baseUrl}?audit=long-${Date.now()}` });
  await wait(600);
  await click(cdp, '[data-action="go"][data-value="title"]');
  await click(cdp, '[data-action="newGame"]');
  await click(cdp, '[data-action="selectEra"][data-value="baofu"]');
  await click(cdp, '[data-action="beginReign"]');
  await click(cdp, '[data-action="selectAmbition"][data-value="golden_vault"]');

  const seenScreens = new Set();
  let choices = 0;
  let decreePicks = 0;
  let responsePicks = 0;

  for (let step = 0; step < 260 && choices < 84; step += 1) {
    const screen = await getScreenName(cdp);
    seenScreens.add(screen);
    if (screen === "ending") break;
    if (screen === "decree") {
      await clickFirst(cdp, '[data-action="chooseDecree"]');
      decreePicks += 1;
      continue;
    }
    if (screen === "decreeResult") {
      await click(cdp, '[data-action="beginReign"]');
      continue;
    }
    if (screen === "response") {
      await click(cdp, '[data-action="nextMonth"]');
      responsePicks += 1;
      continue;
    }
    if (screen === "main") {
      await clickBestOption(cdp);
      choices += 1;
      if (choices % 12 === 0) await checkPage(cdp, `long-main-${choices}`);
      continue;
    }
    throw new Error(`Long play stopped on unexpected screen: ${screen}`);
  }

  const saveBeforeEnding = await readSaveSummary(cdp);
  assert(choices >= 72, `Long play choices too low: ${choices}`);
  assert(decreePicks >= 3, `Long play decree picks too low: ${decreePicks}`);
  assert(saveBeforeEnding.year >= 7, `Long play did not reach late years: ${saveBeforeEnding.year}`);
  assert(saveBeforeEnding.chronicle >= 40, `Chronicle did not accumulate enough entries: ${saveBeforeEnding.chronicle}`);
  assert(saveBeforeEnding.maxActiveDecrees >= 2 || saveBeforeEnding.activeDecrees >= 2, "Long play did not keep layered decrees");

  await forceLoadedSaveEnding(cdp, baseUrl);
  await checkPage(cdp, "forced-ending");
  await capture(cdp, "long-ending");
  await click(cdp, '[data-action="go"][data-value="archives"]');
  await checkPage(cdp, "long-archives");
  await capture(cdp, "long-archives");

  const codex = await evaluate(cdp, `(() => {
    const raw = localStorage.getItem('shitEmperor.codex.v1');
    const codex = raw ? JSON.parse(raw) : null;
    return codex && {
      totalRuns: codex.totalRuns,
      endings: Object.keys(codex.endings || {}).length,
      eras: Object.keys(codex.eras || {}).length,
      ambitions: Object.keys(codex.ambitions || {}).length,
      bestReignYears: codex.bestReignYears
    };
  })()`);
  assert(codex && codex.totalRuns >= 1, "Codex was not written after browser ending");
  assert(codex.endings >= 1, "Codex ending collection was not written");
  assert(codex.eras >= 1, "Codex era mastery was not written");

  return {
    choices,
    decreePicks,
    responsePicks,
    seenScreens: [...seenScreens],
    saveBeforeEnding,
    codex
  };
}

async function auditQuickMode(cdp, name) {
  await click(cdp, '[data-action="go"][data-value="quickSetup"]');
  await checkPage(cdp, "quick-setup");
  await capture(cdp, `${name}-setup`);
  await click(cdp, '[data-action="quickParam"][data-value="temper:rich"]');
  await click(cdp, '[data-action="quickSetupPage"][data-value="1"]');
  await click(cdp, '[data-action="quickParam"][data-value="policy:pleasure"]');
  await click(cdp, '[data-action="quickSetupPage"][data-value="2"]');
  await click(cdp, '[data-action="quickParam"][data-value="opening:border"]');
  await click(cdp, '[data-action="quickSetupPage"][data-value="3"]');
  await click(cdp, '[data-action="quickParam"][data-value="tempo:short"]');
  await click(cdp, '[data-action="startQuick"]');
  await checkPage(cdp, "quick-play");
  await capture(cdp, `${name}-play`);
  await clickFirst(cdp, '[data-action="chooseQuickOption"]');
  await checkPage(cdp, "quick-play-after-choice");
  await capture(cdp, `${name}-play-after-choice`);
  for (let i = 1; i < 8; i += 1) {
    const screen = await getScreenName(cdp);
    if (screen === "quickEnding") break;
    assert(screen === "quickPlay", `Quick mode stopped on unexpected screen: ${screen}`);
    await clickFirst(cdp, '[data-action="chooseQuickOption"]');
  }
  await checkPage(cdp, "quick-ending");
  await capture(cdp, `${name}-ending`);
  await click(cdp, '[data-action="go"][data-value="website"]');
  await checkPage(cdp, "website-after-quick");
}

async function getScreenName(cdp) {
  return evaluate(cdp, `(() => {
    const main = document.querySelector('main');
    if (!main) return 'missing';
    const classes = [...main.classList];
    if (classes.includes('website-screen')) return 'website';
    if (classes.includes('title-screen')) return 'title';
    if (classes.includes('quick-screen')) return 'quickSetup';
    if (classes.includes('quick-play-screen')) return 'quickPlay';
    if (classes.includes('quick-ending-screen')) return 'quickEnding';
    if (classes.includes('era-screen')) return 'era';
    if (classes.includes('ambition-screen')) return 'ambition';
    if (classes.includes('game-screen')) return 'main';
    if (classes.includes('response-screen')) return 'response';
    if (classes.includes('decree-screen')) return 'decree';
    if (classes.includes('ending-screen')) return 'ending';
    if (classes.includes('archive-screen')) return 'archives';
    if (classes.includes('centered-screen') && document.querySelector('[data-action="beginReign"]')) return 'decreeResult';
    return classes.join(' ') || 'unknown';
  })()`);
}

async function clickBestOption(cdp) {
  const result = await evaluate(cdp, `(() => {
    const buttons = [...document.querySelectorAll('[data-action="chooseOption"]')];
    if (!buttons.length) return false;
    buttons.sort((a, b) => Number(b.dataset.survivalScore || 0) - Number(a.dataset.survivalScore || 0));
    buttons[0].click();
    return true;
  })()`);
  assert(result, "No option button found for survival choice");
  await wait(80);
}

async function readSaveSummary(cdp) {
  return evaluate(cdp, `(() => {
    const save = JSON.parse(localStorage.getItem('shitEmperor.save.v1') || '{}');
    const decreeHistory = save.chronicle || [];
    const maxActiveDecrees = Math.max(save.activeDecrees?.length || 0, ...decreeHistory.map(() => save.activeDecrees?.length || 0));
    return {
      screen: save.screen,
      year: save.year,
      monthIndex: save.monthIndex,
      choices: save.counters?.totalChoices || 0,
      activeDecrees: save.activeDecrees?.length || 0,
      maxActiveDecrees,
      chronicle: save.chronicle?.length || 0,
      seenEvents: save.seenEventIds?.length || 0
    };
  })()`);
}

async function forceLoadedSaveEnding(cdp, baseUrl) {
  await evaluate(cdp, `(() => {
    const key = 'shitEmperor.save.v1';
    const save = JSON.parse(localStorage.getItem(key));
    save.screen = 'main';
    save.hidden.eunuch = 110;
    save.stats.court = 5;
    save.currentEvent = save.currentEvent || {
      id: 'audit_force_event',
      category: 'court',
      title: '验收急奏',
      speaker: '史官',
      text: '史官说验收也要讲流程，不能直接把皇帝抬进档案。',
      tags: ['朝堂'],
      weight: 1,
      conditions: {},
      options: [
        { text: '朕知道了，按流程来', response: '流程走完，历史落章。', effects: { court: -1 } },
        { text: '朕假装没看见', response: '史官把假装也写进去了。', effects: { happiness: 1 } },
        { text: '让太监替朕验收', response: '太监总管笑得像最终签字人。', effects: { eunuch: 5 } }
      ]
    };
    localStorage.setItem(key, JSON.stringify(save));
    return true;
  })()`);
  await cdp.send("Page.navigate", { url: baseUrl });
  await wait(250);
  await checkPage(cdp, "loaded-for-ending");
  await clickFirst(cdp, '[data-action="chooseOption"]');
  await wait(120);
}

async function checkPage(cdp, label) {
  const metrics = await evaluate(cdp, `(() => {
    const doc = document.documentElement;
    const buttons = [...document.querySelectorAll('button')];
    const visibleButtons = buttons.filter((button) => {
      const style = getComputedStyle(button);
      const r = button.getBoundingClientRect();
      return style.display !== 'none' && style.visibility !== 'hidden' && r.width > 0 && r.height > 0;
    });
    const rects = visibleButtons.map((button) => {
      const r = button.getBoundingClientRect();
      return { text: button.innerText, width: r.width, height: r.height, left: r.left, right: r.right };
    });
    return {
      label: ${JSON.stringify(label)},
      text: document.body.innerText,
      mainCount: document.querySelectorAll('main').length,
      buttonCount: visibleButtons.length,
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      emptyButtons: rects.filter((r) => !r.text.trim()).length,
      tinyButtons: rects.filter((r) => r.width < 32 || r.height < 32).length,
      offscreenButtons: rects.filter((r) => r.left < -1 || r.right > doc.clientWidth + 1).length
    };
  })()`);
  assert(metrics.mainCount === 1, `${label}: main 数量异常`);
  assert(metrics.buttonCount > 0, `${label}: 没有按钮`);
  assert(metrics.scrollWidth <= metrics.clientWidth + 2, `${label}: 横向溢出 ${metrics.scrollWidth}/${metrics.clientWidth}`);
  assert(metrics.emptyButtons === 0, `${label}: 存在空按钮`);
  assert(metrics.tinyButtons === 0, `${label}: 存在过小按钮`);
  assert(metrics.offscreenButtons === 0, `${label}: 存在屏外按钮`);
  assert(!MOJIBAKE_PATTERN.test(metrics.text), `${label}: 页面疑似显示乱码`);
  return metrics;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const { server, port: appPort } = await startServer();
  const debugPort = 9223 + Math.floor(Math.random() * 200);
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "shit-emperor-chrome-"));
  const chrome = spawn(findChrome(), [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    `--user-data-dir=${userDataDir}`,
    `--remote-debugging-port=${debugPort}`,
    "about:blank"
  ], { stdio: "ignore" });

  try {
    await waitForPort(debugPort);
    const targets = await requestJson(`http://127.0.0.1:${debugPort}/json`);
    const pageTarget = targets.find((target) => target.type === "page" && target.webSocketDebuggerUrl);
    assert(pageTarget, "没有找到 Chrome page target");
    const cdp = await connectWebSocket(pageTarget.webSocketDebuggerUrl);
    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");
    const baseUrl = `http://127.0.0.1:${appPort}/`;
    const results = [];
    results.push(await auditViewport(cdp, baseUrl, { width: 390, height: 844, scale: 2, mobile: true }, "mobile"));
    results.push(await auditViewport(cdp, baseUrl, { width: 1366, height: 768, scale: 1, mobile: false }, "desktop"));
    const longPlay = await longPlayAudit(cdp, baseUrl);
    cdp.close();
    console.log(JSON.stringify({ ok: true, screenshots: OUT_DIR, results, longPlay }, null, 2));
  } finally {
    chrome.kill();
    server.close();
    await wait(300);
    try {
      fs.rmSync(userDataDir, { recursive: true, force: true });
    } catch {
      // Chrome can hold profile files briefly after exit on Windows; the OS temp cleaner can handle it.
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
