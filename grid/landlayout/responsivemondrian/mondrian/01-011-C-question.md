# D 页面 `calc(80vw/N)` 公式的作用解析

## 问题

在 D 页面（01-011D.html）中，列宽公式为：

```css
/* 1列时 */ grid-template-columns: repeat(1, calc(80vw/1));
/* 2列时 */ grid-template-columns: repeat(2, calc(80vw/2));
/* 3列时 */ grid-template-columns: repeat(3, calc(80vw/3));
/* ... 以此类推到 9列 */
```

为什么每列的宽度公式分母要跟着列数变化？一个统一的值不行吗？

---

## 1. 公式的数学验证

先算一下每种情况下网格的**总宽度**：

```css
.D main { width: 80%; }     /* 容器宽度 = 80vw */
```

| 列数 | 每列宽度 | 总宽 |
|:----:|:--------|:----|
| 1 | `1 × calc(80vw/1)` = 80vw | ✅ 80vw |
| 2 | `2 × calc(80vw/2)` = 80vw | ✅ 80vw |
| 3 | `3 × calc(80vw/3)` = 80vw | ✅ 80vw |
| 4 | `4 × calc(80vw/4)` = 80vw | ✅ 80vw |
| 5 | `5 × calc(80vw/5)` = 80vw | ✅ 80vw |
| 9 | `9 × calc(80vw/9)` = 80vw | ✅ 80vw |

> **无论几列，总宽恒等于 80vw**，正好撑满容器。

---

## 2. 不这样写会怎样？

### 错误写法一：每列都用 `80vw`

```css
@media (min-width: 500px) {
  .D ul {
    grid-template-columns: repeat(4, 80vw);
    /* 总宽 = 4 × 80vw = 320vw !!! */
  }
}
```

```
┌──────┬──────┬──────┬──────┐
│ 80vw │ 80vw │ 80vw │ 80vw │  ← 每个 cell 就占了整个视口宽
└──────┴──────┴──────┴──────┘
←────── 320vw ──────→ 严重溢出，超出屏幕 3 倍多
```

### 错误写法二：统一用 `calc(80vw/4)`

```css
@media (min-width: 300px) {
  .D ul {
    grid-template-columns: repeat(2, calc(80vw/4));  /* 每列 20vw */
    /* 总宽 = 2 × 20vw = 40vw */
  }
}
@media (min-width: 500px) {
  .D ul {
    grid-template-columns: repeat(4, calc(80vw/4));  /* 每列 20vw */
    /* 总宽 = 4 × 20vw = 80vw ✅ 凑巧刚好 */
  }
}
@media (min-width: 800px) {
  .D ul {
    grid-template-columns: repeat(7, calc(80vw/4));  /* 每列 20vw */
    /* 总宽 = 7 × 20vw = 140vw ❌ 又溢出了 */
  }
}
```

| 写法 | 1列时 | 4列时 | 7列时 |
|:----|:-----|:-----|:-----|
| `repeat(N, 80vw)` | 80vw ✅ | 320vw ❌ | 560vw ❌ |
| `repeat(N, calc(80vw/4))` | 20vw ❌ 空缺 | 80vw ✅ 凑巧 | 140vw ❌ 溢出 |
| **`repeat(N, calc(80vw/N))`** | **80vw ✅** | **80vw ✅** | **80vw ✅** |

> **只有在分母写 N 时，才能保证任何列数下总宽都是 80vw，既不溢出也不空缺。**

---

## 3. 第二个设计目标：保持正方形 cell

```css
grid-template-columns: repeat(3, calc(80vw/3));
grid-template-rows:    repeat(3, calc(80vw/3));   /* ← 行列用同一个公式 */
```

行列用同一公式 → 每个 grid cell **宽 = 高** → 正方形。

```
┌──────┬──────┬──────┐
│ ■    │ ■    │ ■    │  宽 = calc(80vw/3)
│      │      │      │  高 = calc(80vw/3)
├──────┼──────┼──────┤  → 正方形 ✓
│ ■    │ ■    │ ■    │
│      │      │      │
├──────┼──────┼──────┤
│ ■    │ ■    │ ■    │
│      │      │      │
└──────┴──────┴──────┘
```

配合 `block-sizes` 的 `grid-column: span N` / `grid-row: span N`，跨格的 item 也是正方形的倍数：

```
┌──────────┬──────┐
│          │ ■    │
│  span 2  │      │  ← 2 × 2 正方块
│          ├──────┤
│          │ ■    │
└──────────┴──────┘
```

---

## 4. 设计意图总结

```
calc(80vw/N)
   │
   ├── N 跟着列数变化 → 保证总宽恒 = 80vw（不溢出不空缺）
   │
   ├── 行列用同一公式 → 保证每个 cell 是正方形
   │
   └── 配合 block-sizes span → 保持蒙德里安风格的正方块比例
```

### D 的完整设计逻辑链

```
① main { width: 80% }       容器宽度设为基础
       ↓
② calc(80vw/N)              每列宽 = 容器宽 ÷ 列数
       ↓
③ repeat(N, calc(80vw/N))   N 列 → 总宽回到 80vw
       ↓
④ 行列用同一公式             cell 保持正方形
       ↓
⑤ @media 断点切换 N          不同视口宽度下切换列数
       ↓
⑥ block-sizes span           跨格拼出蒙德里安图案
       ↓
⑦ max-width: 880px           ≥1100px 后固定尺寸不再缩放
```

---

## 5. 与 C 的对比

| 对比项 | C（auto-fit） | D（@media + calc） |
|:------|:-------------|:------------------|
| 列宽控制 | 浏览器自动算 | 开发者硬编码每个断点 |
| 列宽值 | `minmax(80px, 1fr)` | `calc(80vw/N)` |
| 是否精确等于容器宽 | 近似 | **精确 80vw** |
| Cell 形状 | 矩形（宽不同，高固定 80px） | **正方形** |
| 是否响应式 | ✅ 是 | ✅ 是 |
| 有无断点 | ❌ 无（连续变化） | ✅ 有（9 个断点跳跃） |

### 一句话总结

> **`calc(80vw/N)` 的作用：让不同列数下的网格总宽恒等于容器宽度（80vw），同时让每个 cell 保持正方形，配合 span 拼出蒙德里安风格的正方块构图。**
