import { GAME_CONFIG } from "../../core/config.js";
import { button } from "../html.js";

export function renderWebsite() {
  return `
    <main class="screen website-screen">
      <nav class="site-nav">
        <b>Shit皇帝</b>
        <span>My Bad, Your Empire</span>
      </nav>
      <section class="site-hero">
        <div class="site-copy">
          <p class="seal">单机 H5 休闲策略 Roguelike</p>
          <h1>当皇帝不难，难的是别把锅留到下个月。</h1>
          <p class="subtitle">从年号开始作死，用选择制造历史。完整模式慢慢亡国，快速版几分钟看完一段荒唐王朝小传。</p>
          <div class="site-actions">
            ${button("go", "进入游戏大厅", "title", "primary")}
            ${button("go", "快速体验", "quickSetup")}
            ${button("go", "史官档案", "archives", "ghost")}
          </div>
        </div>
        <div class="site-visual" aria-label="王朝荒唐速写">
          <div class="palace-roof"></div>
          <div class="throne-card">
            <span>奏折 +80</span>
            <span>快乐 -12</span>
            <span>民怨 暗流涌动</span>
          </div>
          <div class="mini-edict">朕错了<br>但不改</div>
        </div>
      </section>
      <section class="site-feature-grid">
        <article>
          <b>完整模式</b>
          <span>年号、志向、诏令、月度事件、隐藏爆雷，慢慢把小错误养成新朝代。</span>
        </article>
        <article>
          <b>快速版</b>
          <span>像人生模拟器一样先选底色和麻烦，再用 5 到 10 个关键选择速通一段帝王履历。</span>
        </article>
        <article>
          <b>黑色幽默</b>
          <span>每个选项都不是“确认”，而是一次能让史官停笔三秒的荒唐决定。</span>
        </article>
      </section>
      <section class="site-strip">
        <span>${GAME_CONFIG.title}</span>
        <span>无后端</span>
        <span>localStorage 存档</span>
        <span>手机竖屏优先</span>
      </section>
    </main>
  `;
}

