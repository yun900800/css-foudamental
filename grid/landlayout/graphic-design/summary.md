# CSS 嵌套 Grid 布局分析 — Jazz at Lincoln Center

## 项目结构概览

```
graphic-design/
├── index.html
├── css/03-008.css
├── media/03-008/
│   ├── Wynton-Marsalis.jpg
│   └── jazz-fest-logo.png
└── summary.md
```

---

## 一、核心问题：为什么 10 行却有 12 条网格线？

### 代码

```css
main {
  grid-template-rows: repeat(10, 14vw) 1fr;   /* 980px 大屏 */
}
```

### 数学关系

CSS Grid 中：**网格线数量 = 行数 + 1**

| 定义 | 实际行数 | 网格线数量 |
|------|---------|-----------|
| `repeat(10, 14vw) 1fr` | 10 + 1 = **11 行** | 11 + 1 = **12 条线** |

| 行号 | 高度 |
|------|------|
| 第 1~10 行 | 14vw（由 `repeat(10, ...)` 定义） |
| 第 11 行 | 1fr（由末尾的 `1fr` 定义） |

```
行线 1  ─── 第 1 行 ─── 行线 2  ─── 第 2 行 ─── ... ─── 行线 11  ─── 第 11 行 ─── 行线 12
```

**结论**：浏览器显示 12 条线完全正确。认为"只有10行"是因为忽略了末尾的 `1fr` 行。

### 额外 1fr 行被谁用了？

```css
.logo { grid-row: -1 / -2; }
```

- `-1` = 最后一条网格线（line 12）
- `-2` = 倒数第二条网格线（line 11）
- 实际占位：**第 11 行（1fr 行）**，让 logo 固定在底部，不干扰其他内容。

---

## 二、嵌套 Grid 的设计哲学

### 两套网格的分工

```
┌──────────────────────────────────────────────────────┐
│  main (父grid)   6列 × 11行                           │
│                                                       │
│  ┌────────┬──────────┬──────────┬────────┬────────┐  │
│  │        │          │  section (auto-place row 1)  │  │
│  │ row 1  │          │  ┌──┬──┬──┬──┐              │  │
│  ├────────┼──────────┤  │li│li│li│li│              │  │
│  │ header │          │  ├──┼──┼──┼──┤              │  │
│  │ row 2~ │  ul 占据 │  │li│li│li│li│   ← 子grid  │  │
│  │ 3      │  row 2~8 │  ├──┼──┼──┼──┤              │  │
│  ├────────┤          │  │li│li│li│li│              │  │
│  │  ...   │          │  └──┴──┴──┴──┘              │  │
│  ├────────┼──────────┼────────┼────────┼────────┤  │  │
│  │ticketinfo row 6~8 │        │        │        │  │  │
│  ├────────┴──────────┴────────┴────────┴────────┤  │  │
│  │          logo (row 11, grid-row: -1 / -2)     │  │  │
│  └───────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

### 父级 Grid（`main`）← 框架性 / 结构性元素

| 元素 | 定位方式 | 作用 |
|------|---------|------|
| `.logo` | `grid-row: -1 / -2` | 全局品牌，固定在底部边缘 |
| `header` | `grid-row: 2 / 3` | 全局标题，固定在顶部 |
| `<section>` | auto-placement（row 1） | 内容区域容器，只控制范围不控制内部 |
| `.ticketinfo` | `grid-row: 6 / 8` | 独立信息区块 |

**共同点**：这些元素之间有**交叉参照关系**（header 与 section 对齐、ticketinfo 与 schedule 水平对齐），必须放在同一个坐标系中才能精准定位。

### 子级 Grid（`ul`）← 内容列表元素

| 元素 | 作用 |
|------|------|
| 11 个 `<li>` | 同类重复内容，内部互相参照形成错位节奏 |

```css
/* 子grid只定义列，不定义行 */
ul {
  grid-template-columns: repeat(4, 14vw);  /* 列宽与父grid对齐 */
  /* 没有grid-template-rows — 高度完全自适应 */
}
li { min-height: 14vw; }
```

**核心判断标准**：

```
如果一组元素:
  └─ 彼此之间有位置关系 → 放在同一级 grid
  └─ 需要与"外部其他元素"产生交叉位置关系 → 放在父级 grid
  └─ 只与本组内的兄弟元素有位置关系 → 放在子级 grid
```

---

## 三、HTML 结构设计的关键决策

### 两个原则

#### 原则 1：`<section>` 在 DOM 中靠前放置

```html
<main>
  <img class="logo" src="...">
  <header>...</header>
  <section>           ← 第 3 个子元素，但排在其他 section 之前
    <ul>...</ul>
  </section>
  <section class="ticketinfo">...</section>
</main>
```

由于 `<section>`（含 ul）**没有显式的 `grid-row`/`grid-column`**，它依赖 auto-placement 自动落位。**HTML 源码顺序决定了哪个空位先被占领**：

| 放置顺序 | 元素 | 定位方式 | 占位 |
|---------|------|---------|------|
| 1 | `.logo` | 显式 → row 11 | 不干扰上方 |
| 2 | `header` | 显式 → row 2~3 | 留出 row 1 |
| 3 | **`<section>`(ul)** | **auto-placement → 自动填入 row 1** ✅ | |
| 4 | `.ticketinfo` | 显式 → row 6~8 | 不冲突 |

**如果顺序颠倒**：`.ticketinfo` 会被 auto-placement 塞进 row 1，布局立即崩溃。

#### 原则 2：不可见的 `<h1>`（无障碍设计）

```html
<section>
  <h1 class="element-invisible">Schedule of Events</h1>
  <ul>...</ul>
</section>
```

| 方面 | 有隐藏 h1 | 没有 h1 |
|------|----------|---------|
| 视觉 | 完全一样 | 完全一样 |
| 读屏导航 | ✅ 明确告知区域主题 | ❌ 直接读列表，没有上下文 |
| 无障碍合规 | ✅ 符合 WCAG 标准 | ❌ |

隐藏方式（visually-hidden / screen reader only）：

```css
.element-invisible {
  position: absolute !important;
  height: 1px; width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px);
}
```

> 与 `display: none` 不同——那会让屏幕阅读器也读不到。

---

## 四、决策：什么属于父 grid，什么属于子 grid

```
设计 HTML 结构时，问自己三个问题:
```

**① 哪些元素需要有"全局位置关系"？**
→ 放在父 grid 的直接子级

**② 哪些元素属于"一组同类重复内容"？**
→ 用容器包裹，在容器内开子 grid

**③ 子 grid 的容器在父 grid 中如何定位？**
→ auto-placement（靠前放）或显式 grid-row/column

### 各方案对比

| 方案 | 后果 |
|------|------|
| 所有 li 直接作为 main 子级（扁平化） | main 要管理 17 个 grid 子项，grid line 混乱 |
| 不给 section 包裹 | 无法做 ticketinfo 和 schedule 的对比排列 |
| section 放在 ticketinfo 后面 | auto-placement 把 ticketinfo 塞进 row 1，布局崩 |
| 删除隐藏 h1 | 失去无障碍语义，读屏用户无法理解内容主题 |

### 嵌套 Grid 的职责划分

| 层级 | 控制什么 | 不控制什么 |
|------|---------|-----------|
| 父 grid `main` | ✅ 整体 6 列骨架 | ❌ 内部细节排布 |
| 父 grid | ✅ header / logo / ticketinfo 的绝对位置 | ❌ 日程条目的排列 |
| 子 grid `ul` | ✅ li 之间的错位节奏（piano-key 效果） | ❌ 不能越出 section 范围 |
| 子 grid | ✅ 行高自适应（`min-height`） | ❌ 不与 header / logo 产生直接约束 |

---

## 五、总结

这个 Mondrian 风格布局的精髓在于**两层嵌套 Grid 各管各的、互不干扰**：

1. **父 grid** 负责整页骨架，6 列对齐、logo 压底、header 和 ticketinfo 精确定位。
2. **子 grid** 负责内部内容节奏，11 个 li 错落排列形成视觉韵律，行高自适应。
3. **DOM 顺序** 决定了 auto-placement 的落位，是布局正确的前提。
4. **无障碍隐藏 h1** 在视觉无损的前提下为读屏用户提供了必要语义。

> 理解这两层网格之间"相互映衬又保留留白"的关系，是掌握 CSS 嵌套 Grid 布局的关键。
