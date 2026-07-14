# Front-end Style Guide

## Layout

The designs were created to the following widths:

- **Mobile:** 480px（全部一列）
- **Desktop:** 1440px（首行两列，第二行三列）
- **Container max-width:** 1200px

> 💡 These are just the design sizes. Ensure content is responsive and meets WCAG requirements by testing the full range of screen sizes from 320px to large screens.

## Layout System

本项目使用 **两种 CSS 布局方案** 实现相同的视觉效果，用于对比学习：

| 方案 | 核心技术 | 分配方式 |
|------|----------|----------|
| **Flexbox** | `flex-wrap` + `calc()` | 第一行 `calc((100% - 20px) / 2)` → 2 项 |
| | | 第二行 `calc((100% - 40px) / 3)` → 3 项 |
| **CSS Grid** | `repeat(6, 1fr)` + `grid-column: span N` | 6 列网格 → 第一行各占 3 格(2项) |
| | | 6 列网格 → 第二行各占 2 格(3项) |
| | 移动端 | `repeat(1, 1fr)` → 全部一列 |

## Colors

### Primary

- **Card background:** `#f5ece1`（暖米色）

### Neutral

- **White:** hsl(0, 0%, 100%)
- **Slate 300:** hsl(212, 45%, 89%)
- **Slate 500:** hsl(216, 15%, 48%)
- **Slate 900:** hsl(218, 44%, 22%)

## Typography

### Body Copy

- Font size (paragraph): **15px**
- Text alignment (cards): **center**

### Font

- Family: [Outfit](https://fonts.google.com/specimen/Outfit)
- Weights: 400, 700

## Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `gap` | 20px | 卡片之间的间距 |
| `padding-sm` | 20px | 容器内边距 |
| `padding-lg` | 30px | 卡片内边距 |

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius-md` | 8px | 卡片圆角 |

> 💎 This is a free+ challenge. So, if you want to see all the design details and practice working with professional tools like Figma, you can download the design file from where you downloaded the starter code.
