# Pixel Layout — 实现对比与经验总结

## 项目文件一览

| 文件 | 作者 | 说明 |
|------|------|------|
| `index.html` | **Jen Simmons** | 原版实现，`clip-path` 斜向下，GIF 条纹，无响应式 |
| `index1.html` | **Gemini** | 根据设计稿图片生成，`skewX` 斜向上(方向错误)，纯 CSS 条纹，有响应式 |
| `index2.html` | 融合版 | 取两家之长，`clip-path` 斜向下 + CSS 条纹 + 响应式 + 悬停效果 |

---

## 一、核心差异对比

### 1.1 HTML 结构

| 维度 | Jen Simmons | Gemini |
|------|------------|--------|
| **语义化** | ✅ `<figure>` + `<header>` | ⚠️ `<section>` + `<div>` + `<footer>` |
| **DOM 层级** | 简洁，`<img>` 直接放 `<figure>` 下 | 每张图多一层 `div.gallery-item` 包装 |
| **文档顺序** | header 在前，figure 在后，CSS 交换视觉顺序 | 图片区在前，文本区在后，符合自然流 |
| **代码行数** | ~24 行 | ~169 行（含大量内联注释） |

### 1.2 CSS 核心差异

#### 猫咪斜切方向（最关键的区别）

| | Jen Simmons | Gemini |
|--|------------|--------|
| **技术** | `clip-path: polygon(0% 0%, 75% 0%, 100% 100%, 25% 100%)` | `transform: skewX(-11deg)` + 内层 `skewX(11deg) scale(1.3)` |
| **斜向** | ✅ **斜向下**（匹配设计稿） | ❌ **斜向上**（与设计稿相反） |
| **图片重叠** | ✅ 三图通过 `grid-column` 重叠拼接 | ❌ 三图独立三栏，不重叠 |
| **边缘处理** | 自然，clip-path 直接裁剪 | 需 `scale(1.3)` 放大掩盖白边 |
| **交互** | 无 | 悬停放大动画 |

#### 条纹装饰

| | Jen Simmons | Gemini |
|--|------------|--------|
| **实现** | `border-image: url("stripe.gif") 24 0 repeat` | `::before` + `repeating-linear-gradient(45deg, ...)` |
| **资源依赖** | ⚠️ 外部 GIF 图片，多一次网络请求 | ✅ 纯 CSS，零外部依赖 |
| **可维护性** | 需编辑 GIF 文件 | ✅ 数值随时调整 |

### 1.3 其他差异

| | Jen Simmons | Gemini |
|--|------------|--------|
| **图片源** | 本地 `media/01-003/` | 远程 Unsplash（依赖网络） |
| **响应式** | ❌ 无 | ✅ `@media (min-width: 768px)` |
| **焦点控制** | ❌ 无 | ✅ `object-position` 保护猫咪面部 |
| **CSS 位置** | 独立 `01-003.css` 文件 | 内联在 `<style>` 中 |

---

## 二、关键知识点

### 2.1 clip-path 实现斜向下分割的原理

```css
clip-path: polygon(0% 0%, 75% 0%, 100% 100%, 25% 100%);
```

这个多边形裁剪出一个平行四边形：

```
顶部: 从图片自身的 0%  → 75%
底部: 从图片自身的 25% → 100%
```

**图片之间的竖线分界线变成了斜向下的斜线**，三张图片像瓦片一样互相咬合，形成连续的视觉流。

### 2.2 gap 的作用

`gap: 1rem` 在重叠的 grid 列之间露出白色背景，形成**斜向分割线**——这是整个设计的点睛之笔。如果没有 gap，图片会紧挨在一起，失去那条干净的斜线。

### 2.3 grid-column 重叠技巧

```css
figure {
  grid-template-columns: repeat(10, 1fr);
}
img:nth-child(1) { grid-column: 1 / 5; }  /* 占列 1-4 */
img:nth-child(2) { grid-column: 4 / 8; }  /* 占列 4-7，与图1重叠列 4 */
img:nth-child(3) { grid-column: 7 / 11; } /* 占列 7-10，与图2重叠列 7 */
```

利用 grid 列重叠，让三张图既有重叠又有 clip-path 形成的独特接缝。

### 2.4 图片反向矫正（Gemini 方案）

```css
.gallery-item {
  transform: skewX(-11deg);   /* 容器斜切 */
}
.gallery-item img {
  transform: skewX(11deg) scale(1.3);  /* 图片反向矫正 + 放大覆盖白边 */
}
```

这是另一种实现斜切的方式，但方向与设计稿相反。需要用 `scale(1.3)` 掩盖白边，不够干净。

---

## 三、融合版 `index2.html` 说明

### 采用的设计决策

| 特性 | 来源 | 原因 |
|------|------|------|
| `clip-path` 平行四边形 | Jen Simmons | 方向正确（斜向下），匹配设计稿 |
| 三图重叠 grid-column | Jen Simmons | 形成连续视觉流，设计感强 |
| 纯 CSS `repeating-linear-gradient` 条纹 | Gemini | 零网络请求，灵活可调 |
| 响应式断点 | Gemini | 移动端友好 |
| `object-position` 焦点控制 | Gemini | 保护猫咪面部不被裁剪 |
| 悬停微交互 | Gemini | 提升用户体验 |
| 语义化 HTML（`<figure>` + `<header>`） | Jen Simmons | 简洁优雅 |
| 本地图片资源 | Jen Simmons | 不依赖网络 |

### 关键代码

**clip-path 斜切（匹配设计稿）：**
```css
clip-path: polygon(0% 0%, 75% 0%, 100% 100%, 25% 100%);
```

**纯 CSS 条纹：**
```css
header::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 24px;
  background: repeating-linear-gradient(
    45deg,
    #fff 0px, #fff 12px,
    #000 12px, #000 24px
  );
}
```

**悬停效果：**
```css
figure:hover img {
  filter: brightness(0.8);        /* 未悬停的图变暗 */
}
figure img:hover {
  transform: scale(1.06);         /* 悬停的图放大 */
  filter: brightness(1.1);
  z-index: 2;
}
```

---

## 四、开发过程中犯过的错误

### ❌ 错误：融合版中设置了 `gap: 0`

在最初写 `index2.html` 时，我把桌面端的 gap 设为了 `0`，并加了注释说"无 gap，靠 clip-path 形成视觉缝隙"。

**后果**：三张图片紧挨在一起，失去了那条标志性的白色斜向分割线。

**原因**：误解了 gap 的作用——以为 clip-path 本身的裁剪边缘就能形成视觉区分，但实际上，clip-path 只是裁剪图片自身，裁剪后的边缘是贴合的，需要 gap 在 grid 列之间露出白色背景来形成清晰的分割线。

**修正**：恢复 `gap: 1rem`，斜线分割线重新出现。

---

## 五、总结

1. **`clip-path` 更适合做图片的平行四边形裁剪**，方向精确可控，无需额外矫正
2. **`grid-column` 重叠 + `gap`** 是 Jen Simmons 设计的灵魂——用 gap 在重叠处露出背景色，形成斜线分割
3. **纯 CSS 渐变条纹**已完全能替代 GIF 图片，更轻量、更灵活
4. **响应式设计**是必要的补充，移动端无需斜切效果
5. 核心经验：**不要过度设计**——Jen Simmons 用不到 70 行 CSS 就完成了这个设计，每个属性都有明确的视觉目的
