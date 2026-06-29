import { button } from "../html.js";

export function renderWebsite() {
  return `
    <main class="screen website-screen">
      <nav class="site-nav">
        <div class="site-brand">
          <b>Shit皇帝</b>
          <span>My Bad, Your Empire</span>
        </div>
        <div class="site-nav-links">
          <span class="active">首页</span>
          <span>游戏特色</span>
          <span>玩法介绍</span>
          <button type="button" data-action="go" data-value="archives">史官档案</button>
        </div>
        ${button("go", "进入游戏大厅", "title", "primary site-nav-cta")}
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
          <div class="preview-ribbon">快速版实录</div>
          <div class="palace-roof" aria-hidden="true"></div>
          <div class="court-stage" aria-hidden="true">
            <span class="official official-left"></span>
            <span class="emperor-avatar">乐</span>
            <span class="official official-right"></span>
          </div>
          <div class="preview-caption">
            <b>国库很满，街上很空</b>
            <span>户部很幸福，百姓很抽象，国家很像一只上锁的钱箱。</span>
          </div>
          <div class="throne-card">
            <span><b>国库</b>82</span>
            <span><b>民心</b>24</span>
            <span><b>军队</b>38</span>
            <span><b>朝廷</b>50</span>
            <span><b>快乐</b>70</span>
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
        <span>多结局实录</span>
        <span>关键抉择速通</span>
        <span>月月都有荒唐事</span>
        <span>史官负责补刀</span>
      </section>
    </main>
  `;
}
