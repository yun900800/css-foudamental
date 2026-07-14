# Flexbox & Grid 布局对比练习

> 使用 **Flexbox** 和 **CSS Grid** 两种方案实现相同的"首行 2 列 + 第二行 3 列"响应式布局，对比两种主流 CSS 布局方式的核心差异与适用场景。

## 目录

- [项目概述](#项目概述)
- [布局效果](#布局效果)
- [技术栈](#技术栈)
- [实现对比](#实现对比)
  - [Flexbox 方案](#flexbox-方案)
  - [CSS Grid 方案](#css-grid-方案)
  - [移动端适配](#移动端适配)
- [项目结构](#项目结构)
- [关键收获](#关键收获)
- [AI 协作](#ai-协作)
- [作者](#作者)

## 项目概述

这是一个面向 CSS 初学者的布局练习项目。同一个布局目标——**桌面端首行 2 项、第二行 3 项，移动端全部 1 列**——分别用 Flexbox 和 CSS Grid 实现，方便对比学习两种布局思维。

| 文件 | 布局方案 | 打开方式 |
|------|---------|---------|
| `index-flexbox.html` | Flexbox | 直接在浏览器打开 |
| `index-grid.html` | CSS Grid + Flexbox 对照 | 直接在浏览器打开 |

## 布局效果

```
桌面端（>480px）
┌──────────────┐ ┌──────────────┐
│      1       │ │      2       │
└──────────────┘ └──────────────┘
┌─────────┐ ┌─────────┐ ┌─────────┐
│    3    │ │    4    │ │    5    │
└─────────┘ └─────────┘ └─────────┘

移动端（≤480px）
┌───────────┐
│     1     │
├───────────┤
│     2     │
├───────────┤
│     3     │
├───────────┤
│     4     │
├───────────┤
│     5     │
└───────────┘
```

## 技术栈

- **HTML5** — 语义化结构
- **CSS Flexbox** — `flex-wrap` + `calc()` 动态分配
- **CSS Grid** — `repeat()` + `grid-column: span`
- **CSS 自定义属性** — Design Tokens 统一管理
- **响应式设计** — 桌面端 / 移动端双布局

## 实现对比

### Flexbox 方案

核心思路：利用 `flex-wrap: wrap` 允许换行，再用 `flex` 简写属性结合 `calc()` 精确分配每一项的宽度。

```css
.flex-version {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

/* 第一行 2 项：各占一半，减去一个 gap */
.flex-version .item:nth-child(-n+2) {
  flex: 1 1 calc((100% - 20px) / 2);
}

/* 第二行 3 项：各占三分之一，减去两个 gap */
.flex-version .item:nth-child(n+3) {
  flex: 1 1 calc((100% - 40px) / 3);
}
```

**难点：** `calc()` 中的 gap 扣除逻辑——N 项一行要减去 (N-1) 个 gap 宽度。

### CSS Grid 方案

核心思路：声明一个 6 列等宽网格，然后用 `grid-column: span` 控制每项占多少列。

```css
.grid-version {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
}

/* 第一行 2 项：各占 3 格（6 ÷ 2 = 3） */
.grid-version .item:nth-child(-n+2) {
  grid-column: span 3;
}

/* 第二行 3 项：各占 2 格（6 ÷ 3 = 2） */
.grid-version .item:nth-child(n+3) {
  grid-column: span 2;
}
```

**巧妙之处：** 用 6 列做最小公倍数，2 和 3 都能整除，无需 calc()。

### 移动端适配

```css
@media (max-width: 480px) {
  .grid-version {
    grid-template-columns: repeat(1, 1fr);
  }
  .grid-version .item {
    grid-column: span 1;
  }
  .flex-version .item {
    flex: 1 1 100%;
  }
}
```

## 项目结构

```
my-idea-flex-grid/
├── index-flexbox.html      # Flexbox 方案演示页
├── index-grid.html         # Grid + Flexbox 双方案演示页
├── style-guide.md          # 设计规范（布局/颜色/字体/间距）
├── AGENTS.md               # AI 助手指令（教学角色定义）
├── README.md               # 本文件
└── css/
    ├── variables.css        # 共享 Design Tokens（CSS 变量）
    ├── index-flexbox.css    # Flexbox 样式
    └── index-grid.css       # Grid + Flexbox 样式（含响应式）
```

项目采用了 **Design Tokens** 模式：`style-guide.md` 定义规范 → `variables.css` 抽取为 CSS 变量 → 各 CSS 文件通过 `@import` 引用使用。修改设计值只需改一处。

## 关键收获

1. **Calc() 的 gap 扣除** — `calc((100% - (N-1) * gap) / N)` 是 Flexbox 等分的重要公式
2. **最小公倍数网格** — 6 列网格让 2 和 3 都能均分，无需复杂计算
3. **CSS 变量提取** — 颜色、间距、圆角等设计 token 统一管理，提高可维护性
4. **两种思维对比** — Flexbox 是"内容决定空间"，Grid 是"空间决定内容"

## AI 协作

- **工具：** Claude（OpenCode 智能助手）
- **工作流：**
  - 通过 AI 补充了 CSS 变量抽取的最佳实践
  - 借助 AI 完善了 `style-guide.md` 的 Spacing / Border Radius 等设计规范章节
  - AI 辅助代码审查，发现了 `box-sizing` 不一致等问题
- **收获：** AI 适合做设计规范的格式化、代码审查、以及重复性重构工作，核心布局逻辑仍需要开发者自己理解

## 作者

- GitHub — [@yun900800](https://github.com/yun900800)
- Frontend Mentor — [@yun900800](https://www.frontendmentor.io/profile/yun900800)
