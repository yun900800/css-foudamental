# 设计知识学习
1. 让一个元素居中并且宽度扩展出去的方式用一下代码,left左移的距离刚好是增加的宽度的一半
```
    width: calc(100% + 100px);
    left: -50px;
```

2. ribbon设计的基本原理:
    - 2.1 设计一个大小为0,，包含四个border的元素
    ```
    width: 0;
    height: 0;
    border-style: solid;
    border-color: #009625 #009625 transparent transparent;
    border-color: red green blue yellow;
    border-width: 15px;
    ```
    - 2.2 通过绝对定位到指定位置
    ```
    content: '';
    position: absolute;

    left:0px;
    bottom:-30px;
    ```
    - 2.3 将不需要的三角形部分的颜色设置为 transparent,留下需要的三角形,配置相应的颜色
    ```
    border-color: #009625 #009625 transparent transparent;
    ```
3. 在上面的设计1中，注意宽度一半是父元素的content-box的宽度哈,而不是实际父元素设置的宽度，因为父元素还包含padding

# 知识点
1. ribbon的设计原理以及如何灵活运用  
2. 百分比宽度计算时候的细节  

# 疑问
1. 为什么css的宽度计算是这样的原理呢？