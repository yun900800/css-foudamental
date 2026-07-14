# Flexbox & Grid Layout Comparison

> A hands-on CSS layout exercise that implements the same responsive layout — **2 columns in the first row + 3 columns in the second row on desktop** — using both **Flexbox** and **CSS Grid**, comparing the core differences and use cases of these two mainstream layout methods.

## Table of Contents

- [Overview](#overview)
- [Layout Preview](#layout-preview)
- [Built With](#built-with)
- [Implementation Comparison](#implementation-comparison)
  - [Flexbox Approach](#flexbox-approach)
  - [CSS Grid Approach](#css-grid-approach)
  - [Mobile Adaptation](#mobile-adaptation)
- [Project Structure](#project-structure)
- [Key Takeaways](#key-takeaways)
- [AI Collaboration](#ai-collaboration)
- [Author](#author)

## Overview

This is a layout practice project for CSS beginners. The same layout goal — **2 items in the first row, 3 items in the second row on desktop, all stacked in a single column on mobile** — is implemented separately with Flexbox and CSS Grid, making it easy to compare the two layout mindsets.

| File | Layout Method | How to Open |
|------|---------------|-------------|
| `index-flexbox.html` | Flexbox | Open directly in browser |
| `index-grid.html` | CSS Grid + Flexbox comparison | Open directly in browser |

## Layout Preview

```
Desktop (>480px)
┌──────────────┐ ┌──────────────┐
│      1       │ │      2       │
└──────────────┘ └──────────────┘
┌─────────┐ ┌─────────┐ ┌─────────┐
│    3    │ │    4    │ │    5    │
└─────────┘ └─────────┘ └─────────┘

Mobile (≤480px)
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

## Built With

- **HTML5** — Semantic structure
- **CSS Flexbox** — `flex-wrap` + `calc()` dynamic distribution
- **CSS Grid** — `repeat()` + `grid-column: span`
- **CSS Custom Properties** — Centralized Design Token management
- **Responsive Design** — Desktop / Mobile dual layout

## Implementation Comparison

### Flexbox Approach

Core idea: Use `flex-wrap: wrap` to allow line breaks, then use the `flex` shorthand combined with `calc()` to precisely distribute each item's width.

```css
.flex-version {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

/* First row — 2 items: half each, minus one gap */
.flex-version .item:nth-child(-n+2) {
  flex: 1 1 calc((100% - 20px) / 2);
}

/* Second row — 3 items: one third each, minus two gaps */
.flex-version .item:nth-child(n+3) {
  flex: 1 1 calc((100% - 40px) / 3);
}
```

**Key challenge:** The gap deduction logic in `calc()` — N items per row means subtracting (N-1) gaps.

### CSS Grid Approach

Core idea: Declare a 6-column equal-width grid, then use `grid-column: span` to control how many columns each item occupies.

```css
.grid-version {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
}

/* First row — 2 items: each spans 3 columns (6 ÷ 2 = 3) */
.grid-version .item:nth-child(-n+2) {
  grid-column: span 3;
}

/* Second row — 3 items: each spans 2 columns (6 ÷ 3 = 2) */
.grid-version .item:nth-child(n+3) {
  grid-column: span 2;
}
```

**Clever trick:** 6 columns is the least common multiple of 2 and 3, allowing both to divide evenly without `calc()`.

### Mobile Adaptation

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

## Project Structure

```
my-idea-flex-grid/
├── index-flexbox.html      # Flexbox demo page
├── index-grid.html         # Grid + Flexbox dual demo page
├── style-guide.md          # Design specifications (layout/colors/typography/spacing)
├── AGENTS.md               # AI assistant instructions (mentor role definition)
├── README.md               # This file (Chinese version)
├── README.en.md            # English version of README
└── css/
    ├── variables.css        # Shared Design Tokens (CSS custom properties)
    ├── index-flexbox.css    # Flexbox styles
    └── index-grid.css       # Grid + Flexbox styles (with responsive rules)
```

This project follows the **Design Tokens** pattern: `style-guide.md` defines the spec → `variables.css` extracts them as CSS variables → each CSS file imports and uses them via `@import`. Changing a design value requires updating only one place.

## Key Takeaways

1. **Calc() gap deduction** — `calc((100% - (N-1) * gap) / N)` is the essential formula for equal distribution in Flexbox
2. **Least common multiple grid** — A 6-column grid lets both 2 and 3 divide evenly, avoiding complex calculations
3. **CSS variable extraction** — Centralizing design tokens (colors, spacing, border-radius) improves maintainability
4. **Two mindsets** — Flexbox is "content determines space", Grid is "space determines content"

## AI Collaboration

- **Tool:** Claude (OpenCode AI Assistant)
- **Workflow:**
  - Used AI to supplement CSS variable extraction best practices
  - Leveraged AI to improve the `style-guide.md` with Spacing / Border Radius sections
  - AI-assisted code review identified inconsistencies like missing `box-sizing`
- **Takeaway:** AI excels at formatting design specs, code reviews, and repetitive refactoring — but the core layout logic still needs to be understood by the developer

## Author

- GitHub — [@yun900800](https://github.com/yun900800)
- Frontend Mentor — [@yun900800](https://www.frontendmentor.io/profile/yun900800)
