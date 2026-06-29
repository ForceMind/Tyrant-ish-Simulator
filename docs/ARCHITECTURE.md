# 架构说明

## 目标

纯前端单机 H5 游戏，不依赖后端、数据库或运行时服务。所有长期数据保存在浏览器 `localStorage`。

## 核心流程

```text
标题页
  -> 选择年号
  -> 登基旁白
  -> 选择王朝志向
  -> 月度事件
  -> 选项回应
  -> 下月
  -> 阶段诏令 / 爆雷 / 结局
  -> 史官档案和王朝图鉴
```

## 主要模块

### `src/core/`

- `config.js`：全局配置、月份、数值标签、localStorage key。
- `state.js`：初始状态、年号效果、数值结算、月份推进。
- `engine.js`：事件抽取、选项结算、诏令、志向、爆雷、结局。
- `storage.js`：存档、成就、历史、王朝图鉴。

普通月度事件在同一局中严格去重。爆雷事件按隐藏变量阈值和冷却触发，允许同类危机反复发作。若长局把普通事件池耗尽，引擎会生成 `timeline_gap_*` 保护事件；这不是内容目标，而是模拟用来暴露缺口的信号。

### `src/data/`

- `eras.js`：8 个年号流派。
- `ambitions.js`：8 个王朝志向。
- `decrees.js`：12 个阶段诏令。
- `endings.js`：结局规则。
- `achievements.js`：成就规则。
- `historyTitles.js`：史官记录和谥号。
- `events/`：事件池。

事件池当前规模：

- 8 类基础事件：朝堂、国库、民生、军事、后宫、修仙、享乐、黑天鹅。
- 扩展事件：年号专属、后期长局、行为连锁、稀有事件。
- 爆雷事件：隐藏值阈值触发。

### `src/ui/`

- `render.js`：统一渲染入口。
- `screens/`：标题页、年号页、志向页、主游戏、回应、诏令、结局、档案、设置。
- `components/`：事件卡、选项按钮、数值条、成就列表。

### `src/styles/`

- `base.css`：基础布局。
- `theme.css`：视觉主题、卡片、按钮、档案图鉴。
- `responsive.css`：手机竖屏和桌面适配。

## 数据持久化

localStorage keys：

```text
shitEmperor.save.v1
shitEmperor.achievements.v1
shitEmperor.history.v1
shitEmperor.lastEnding.v1
shitEmperor.codex.v1
shitEmperor.settings.v1
```

## 构建产物

源码开发版保留模块化结构。部署版由 `scripts/build.mjs` 输出：

- 单个混淆 JS bundle。
- 合并 CSS。
- Cloudflare Pages `_headers`。
- `version.json`。

## 验证策略

### `npm run smoke`

验证数据规模、事件完整性、8 个年号 120 个月长局模拟、三诏令并行、图鉴写入和关键页面渲染。

### `npm run sim:audit`

使用真实状态机和事件引擎跑多种皇帝行为路线，检查普通事件不重复、数值轨迹、自然结局覆盖和 `timeline_gap` 次数。事件时间线、数值规划和补内容清单见 [SIMULATION_AND_CONTENT_PLAN.md](SIMULATION_AND_CONTENT_PLAN.md)。

### `npm run audit:browser`

启动 headless Chrome，验证手机/桌面 UI、真实点击流程、长局浏览器自动游玩、结局写入和图鉴沉淀。
