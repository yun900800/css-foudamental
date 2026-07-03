# B、C、D、E 四页布局差异分析——Fluid vs Responsive

## 背景

B、C、D、E 四个页面的 HTML 结构**完全一致**（20 个 `<li>`，都挂 `block-sizes` 类，引用同一份 CSS 文件），**区别 100% 在 CSS 上**——每个页面通过 `<body class="B/C/D/E">` 切换不同的 Grid 布局策略。

---

## B 页面 — "Fluid Mondrian"（流式）

```css
.B {
  margin: -8px -8px -8px -10px;
  overflow: hidden;
}
.B ul {
  display: grid;
  grid-template-columns: repeat(5, 1fr) 1.2fr 1.2fr 0.5fr;  /* ← 固定 8 列 */
  grid-template-rows: 11vw repeat(5, 13vw) 11vw 6.5vw 6.5vw; /* ← vw 单位行高 */
}
```

### 关键特征

| 属性 | 值 | 含义 |
|:----|:---|:-----|
| `grid-template-columns` | `repeat(5, 1fr) 1.2fr 1.2fr 0.5fr` | **固定 8 列**，列宽比例固定 |
| `grid-template-rows` | `11vw repeat(5, 13vw) 11vw 6.5vw 6.5vw` | 行高用 **`vw` 单位**，随视口等比缩放 |
| `@media` 断点 | ❌ 无 | 没有任何断点 |

### 效果

- **列数永远 8 列**，不会随视口变化
- 行高用 `vw` 单位，视口越大行越高，视口越小行越矮
- 整个 grid 像一张**弹性画布**，等比放大缩小，结构不变

```
视口 1000px → 行高约 110~130px
视口 600px  → 行高约 66~78px
视口 400px  → 行高约 44~52px（但可能过小，内容不可读）
```

### 小结

> **Fluid（流式）= 网格结构不动，整体等比缩放**

---

## C 页面 — "Responsive Mondrian"（响应式）

```css
.C {
  margin: 0 100px;
}
.C main {
  margin: 4vw auto;
  max-width: 940px;
}
.C ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));  /* ← 列数自动变化 */
  grid-auto-rows: 80px;                                          /* ← 固定行高 */
  grid-auto-flow: dense;                                         /* ← 紧密填充 */
}
```

### 关键特征

| 属性 | 值 | 含义 |
|:----|:---|:-----|
| `grid-template-columns` | `repeat(auto-fit, minmax(80px, 1fr))` | 列数**自动适应**视口宽度 |
| `grid-auto-rows` | `80px` | 行高**固定 80px**，不随视口变化 |
| `grid-auto-flow` | `dense` | 紧密填充，自动填补空白 |
| `block-sizes` span | ✅ 生效 | item 跨多行多列 |

### `auto-fit` + `minmax(80px, 1fr)` 如何工作

```
算法：
  1. 容器宽度内能塞几列（每列最少 80px）
  2. 创建这么多列，每列宽度 = 剩余空间 ÷ 列数
  3. 视口变宽 → 列数增多，每列略宽
  4. 视口变窄 → 列数减少

视口 400px (容器约 200px):  minmax(80px, 1fr) → **2 列**
视口 800px (容器约 600px):  minmax(80px, 1fr) → **6~7 列**
视口 1200px (容器约 1000px): minmax(80px, 1fr) → **11~12 列**
```

### `dense` 的作用

```css
grid-auto-flow: dense;
```

没有 `dense` 时，Grid 按顺序从左到右、从上到下排列 item，可能留下空洞。`dense` 让浏览器自动回填空白，类似俄罗斯方块的"紧实"效果。

```
无 dense:      有 dense:
┌──┬──┬──┐    ┌──┬──┬──┐
│01│02│03│    │01│02│03│
├──┼──┼──┤    ├──┼──┼──┤
│04│  │05│ ← 空 │04│06│05│ ← 06 回填
├──┼──┼──┤    ├──┼──┼──┤
│06│07│08│    │07│08│09│
└──┴──┴──┘    └──┴──┴──┘
```

### 小结

> **Responsive（无断点自动响应）= `auto-fit` / `auto-fill` 自动计算列数，`dense` 自动填充空隙**

---

## D 页面 — "Responsive Mondrian, keeping aspect ratio"

```css
.D main {
  width: 80%;
  margin: 4vw auto;
}

.D ul {
  display: grid;
  grid-auto-flow: dense;
  grid-template-columns: repeat(1, calc(80vw/1));   /* 起步 1 列 */
  grid-template-rows:    repeat(1, calc(80vw/1));
  max-width: 880px;
  margin: 0 auto;
}

@media (min-width: 300px) { .D ul { grid-template-columns: repeat(2, calc(80vw/2)); ... } }
@media (min-width: 400px) { .D ul { grid-template-columns: repeat(3, calc(80vw/3)); ... } }
@media (min-width: 500px) { .D ul { grid-template-columns: repeat(4, calc(80vw/4)); ... } }
@media (min-width: 600px) { .D ul { grid-template-columns: repeat(5, calc(80vw/5)); ... } }
@media (min-width: 700px) { .D ul { grid-template-columns: repeat(6, calc(80vw/6)); ... } }
@media (min-width: 800px) { .D ul { grid-template-columns: repeat(7, calc(80vw/7)); ... } }
@media (min-width: 900px) { .D ul { grid-template-columns: repeat(8, calc(80vw/8)); ... } }
@media (min-width: 1000px) { .D ul { grid-template-columns: repeat(9, calc(80vw/9)); ... } }
@media (min-width: 1100px) { .D ul { grid-template-columns: repeat(9, calc(880px/9)); ... } }
```

### 关键特征

| 属性 | 值 | 含义 |
|:----|:---|:-----|
| 列数控制 | **`@media` 断点硬编码** | 每个宽度阈值切换一次列数 |
| 列宽公式 | `calc(80vw/N)` | 总宽恒等于 80vw，每个 cell 正方形 |
| 行高公式 | 同列宽 `calc(80vw/N)` | 行列同公式 → cell 保持正方形 |
| `max-width: 880px` | 上限约束 | 超过后不再变宽 |
| `grid-auto-flow: dense` | ✅ | 同 C，紧密填充 |

### 列数变化阶梯

| 视口宽度 | 列数 | 每列宽度 | 每列高度 |
|:--------:|:----:|:--------:|:--------:|
| < 300px | 1 | `calc(80vw/1)` = 80vw | 同左（正方形） |
| ≥ 300px | 2 | `calc(80vw/2)` = 40vw | 同左 |
| ≥ 400px | 3 | `calc(80vw/3)` ≈ 26.7vw | 同左 |
| ≥ 500px | 4 | `calc(80vw/4)` = 20vw | 同左 |
| ≥ 600px | 5 | `calc(80vw/5)` = 16vw | 同左 |
| ≥ 700px | 6 | `calc(80vw/6)` ≈ 13.3vw | 同左 |
| ≥ 800px | 7 | `calc(80vw/7)` ≈ 11.4vw | 同左 |
| ≥ 900px | 8 | `calc(80vw/8)` = 10vw | 同左 |
| ≥ 1000px | 9 | `calc(80vw/9)` ≈ 8.9vw | 同左 |
| ≥ 1100px | 9 | `calc(880px/9)` ≈ 97.8px | 同左（固定了） |

### 小结

> **Responsive（断点跳跃响应）= 用 `@media` 在特定宽度硬切换列数，cell 保持正方形**

---

## E 页面 — "Diamond Mondrian"（菱形）

```css
.E {
  display: flex;
  align-items: center;
  height: 100vh;
}

.E main {
  width: calc(90vw - 12px);
  margin: 10px auto;
  clip-path: polygon(50% 2%, 98% 50%, 50% 98%, 2% 50%);  /* ← 菱形裁剪 */
}

.E ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-auto-rows: 80px;
  grid-auto-flow: dense;
  height: calc(90vw + 12px);
  width: calc(90vw + 12px);
  margin: -6px 0 0 -6px;
}

@media (min-width: 880px) {
  .E main, .E ul {
    width: 800px;
    height: 800px;
  }
}
```

### 关键特征

| 属性 | 值 | 含义 |
|:----|:---|:-----|
| `body` | `display: flex; align-items: center; height: 100vh` | 全屏垂直水平居中 |
| `main` | `clip-path: polygon(50% 2%, 98% 50%, 50% 98%, 2% 50%)` | 裁剪为**菱形** |
| 列数控制 | `repeat(auto-fit, minmax(100px, 1fr))` | **同 C**，列数自适应 |
| 行高 | `grid-auto-rows: 80px` | 固定 80px |
| `dense` | ✅ | 同 C |
| ul 宽高 | `calc(90vw + 12px)` | **宽高相等**，保持正方形 |
| 最大尺寸 | `@media (min-width: 880px)` → 800px | 到上限后不再缩放 |

### clip-path 菱形详解

```css
clip-path: polygon(50% 2%, 98% 50%, 50% 98%, 2% 50%);
```

```
           (50%, 2%)     ← 上顶点
              ▲
              │
   (2%, 50%) ◄─┼─► (98%, 50%)  ← 左右顶点
              │
              ▼
           (50%, 98%)    ← 下顶点
```

### 与 C 的区别

| 对比项 | C | E |
|:------|:--|:--|
| 列数策略 | 同 `auto-fit` | 同 `auto-fit` |
| 最小列宽 | **80px** | **100px**（更大） |
| 容器形状 | 矩形 | **菱形（clip-path）** |
| 对齐方式 | 默认左对齐 | **flex 全屏居中** |
| 尺寸上限 | `max-width: 940px` | `width: 800px; height: 800px` |

### 小结

> **菱形响应式 = C 的响应策略 + 菱形裁剪 + flex 全屏居中 + 最大尺寸硬限制**

---

## 四页对比总表

| 页面 | 标签 | 列数策略 | 行高策略 | 关键属性 | 容器形状 |
|:----:|:----:|:--------:|:--------:|:---------|:--------:|
| **B** | **Fluid** | **固定 8 列** | `vw` 等比缩放 | `repeat(5,1fr) 1.2fr 1.2fr 0.5fr`<br>`grid-template-rows: 11vw...` | 矩形 |
| **C** | **Responsive** | **`auto-fit` 自动** | **固定 80px** | `repeat(auto-fit, minmax(80px, 1fr))`<br>`grid-auto-rows: 80px`<br>`grid-auto-flow: dense` | 矩形 |
| **D** | **Responsive** | **`@media` 断点硬切** | `calc(80vw/N)` 等比 | 9 个 `@media` 断点<br>`max-width: 880px` | 矩形 |
| **E** | **Responsive** | **`auto-fit` 自动** | **固定 80px** | 同 C + `clip-path` 菱形<br>最大 800px | **菱形** |

---

## 核心区分：Fluid vs Responsive

### Fluid（流式）—— B

```
视口缩小 → 整体缩小，列数不变，结构不变

大屏:  ████████████████  (8列, 行高 130px)
中屏:  ████████████████  (8列, 行高 78px)
小屏:  ████████████████  (8列, 行高 52px)
```

就像一张图片放大缩小，所有内容等比例缩放。

### Responsive（响应式）—— C、D、E

```
视口缩小 → 列数减少，布局重排

大屏:  ████████████████  (12列, 行高 80px)
中屏:  ██████████        (8列,  行高 80px)
小屏:  ████              (4列,  行高 80px)
```

就像积木重新组合，列数变化，行高不变（C、E）或等比缩放（D）。

---

## 实现 Fluid vs Responsive 的三条关键代码

| 效果 | 控制列数的写法 | 控制行高的写法 | 示例 |
|:----|:-------------|:-------------|:----:|
| **Fluid** | `repeat(N, ...)` 固定列数 | `vw` / `vh` 单位 | **B** |
| **无断点 Responsive** | `repeat(auto-fit/auto-fill, minmax(X, 1fr))` | 固定值或 `auto` | **C、E** |
| **断点 Responsive** | `@media` + `repeat(N, ...)` 硬切换 | 跟随列宽公式 | **D** |

### 一句话总结

> **Fluid = 结构不变，等比缩放（像弹性图片）**  
> **Responsive = 结构变化，布局重排（像积木重组）**  
> **`auto-fit`/`auto-fill` = 无断点自动响应**  
> **`@media` = 有断点跳跃响应**
