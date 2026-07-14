# CSS Grid & display:contents 知识总结

## 一、grid-template-columns: max-content 的含义

### 问题

```css
main {
  display: grid;
  grid-template-columns: minmax(10vw, 40vw) max-content min-content;
  grid-template-rows: 3vh auto 1fr min-content auto 0.5vh;
  height: 97vh;
}
```

第二列设置了 `max-content`，它的宽度由谁决定？

### 答案

**`max-content` 不是由某一行单独决定的，而是由该列中所有行里最宽的内容决定的。**

`max-content` 的语义是：取该列中所有单元格内容的最大固有宽度（max intrinsic width），不考虑换行，按内容不换行时的最宽情况来定列宽。

在这个项目中，第二列的宽度 = 以下内容中 intrinsic width 最大的那个：

| 行 | 内容 |
|---|---|
| 行2 | h2："Kunstegewerbemuseum Zürich Ausstellung" |
| 行4 | span "der" 的尾部 + span "Film" 的头部 |
| 行5 | .datesandhours：日期和开放时间 |

> **简单记忆**：`max-content` = 这一列里"最胖"的那个单元格说了算，不是某一行说了算。

---

## 二、display:contents 让父元素"消失"

### 问题

span 是 h1 的子元素，为什么它能像直接子元素一样参与 main 的 grid 布局，还能跨行跨列？

### 答案

`h1` 设置了 `display: contents`，这个属性的效果是：**元素本身不生成任何盒子（box），但它的子元素被视为父元素的直接子元素。**

#### 正常情况下

```
main (grid容器)
  └── h1 (grid子项)
        ├── span "der"
        └── span "Film"
```

#### 设置 display:contents 后

```
main (grid容器)
  ├── span "der"      ← 直接成为 grid 子项
  └── span "Film"     ← 直接成为 grid 子项
```

#### 在本项目中的应用

设计师需要 h1 的两个单词分别占据不同的网格位置：

```css
h1 span:nth-of-type(1) {   /* "der" */
  grid-row: 4;
  grid-column: 1 / 3;      /* 跨第1-2列 */
}

h1 span:nth-of-type(2) {   /* "Film" */
  grid-row: 4;
  grid-column: 2 / 4;      /* 跨第2-3列 */
}
```

如果不用 `display: contents`，`h1` 作为一个整体只能占据一个网格单元格，两个 `span` 就无法分别跨列。

> **一句话总结**：`display: contents` = 父元素"隐身"，子元素直接暴露给父级的 grid 布局，从而可以被独立定位。

---

## 三、display 属性的全部值

### 1. 外部显示类型（outer display type）

决定元素如何参与外部布局（与兄弟元素的关系）：

| 值 | 效果 |
|---|---|
| `block` | 块级元素，独占一行 |
| `inline` | 行内元素，不换行 |
| `inline-block` | 行内块，不换行但可设宽高 |

### 2. 内部显示类型（inner display type）

决定元素内部子元素如何排列：

| 值 | 效果 |
|---|---|
| `flex` | 子元素弹性布局 |
| `grid` | 子元素网格布局 |
| `flow-root` | 创建新的 BFC（块格式化上下文） |

### 3. 特殊值

| 值 | 效果 |
|---|---|
| `contents` | 元素本身消失，子元素直接暴露给父级布局 |
| `none` | 完全消失，不占据空间，不渲染 |
| `list-item` | 作为列表项显示（自带 `::marker`） |

### 4. 组合写法（简写）

`display` 是一个简写属性，可以同时设置外部和内部类型：

```css
display: block flow;          /* 等同于 block */
display: inline flow;         /* 等同于 inline */
display: block flow-root;     /* 等同于 flow-root */
display: block flex;          /* 等同于 flex（块级弹性） */
display: inline flex;         /* 等同于 inline-flex */
display: block grid;          /* 等同于 grid（块级网格） */
display: inline grid;         /* 等同于 inline-grid */
display: contents;            /* 没有盒子，子元素直接参与父级布局 */
display: none;                /* 完全移除 */
```

### 5. 表格相关值

| 值 | 效果 |
|---|---|
| `table` | 像 `<table>` |
| `table-row` | 像 `<tr>` |
| `table-cell` | 像 `<td>` |
| `table-column` | 像 `<col>` |
| `table-header-group` | 像 `<thead>` |
| `table-footer-group` | 像 `<tfoot>` |

> **独特之处**：`display: contents` 是唯一一个让元素自身"不存在"的值。
