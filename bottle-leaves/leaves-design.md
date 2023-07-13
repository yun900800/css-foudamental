# 设计知识学习

1. 首先需要一个leaves的主容器,设定一定的大小(34px 34px)和背景透明.  
2. leave有两部分组成,一个元素通过borde-radius来构建初步的样式:
```
    width: 10px;
    height: 16px;
    background: #0f0;
    border-radius: 5px 5px 0px 3px;
```
  - 2.1 因为这个元素会旋转来构成三叶或者四叶，因此transform-origin: -2% 102%;旋转的点比元素多一点点，且居中(所以都多了2%).  
  - 2.2 leave::before 这个的样式和主元素一致,如果是三叶的话，旋转120deg,四叶的话旋转90deg.  
  - 2.3 这里通过transform-origin和translate调整完成一瓣叶子的设计(这里技巧比较多)

3. 有了基本叶子后,三叶每次旋转120deg,而四叶每次旋转90deg.  

4. 最后通过绝对定位的属性,将叶子调整到容器的中心.  

5. branch的设计主要通过设计一个两个像素的border和配合border-radius的四个不同的值改变，形成一个弧线的边框,
    最后通过绝对定位将这个branch配置到合适的位置

# 知识点
1. 弧线边框模拟branch的设计步骤.  
2. transform-origin属性的使用.  
3. 元素的transform-origin属性的使用以后,它再次用tansform变化后，不再是原来的x轴,y轴,而是变换后的坐标. 比如四叶的代码:
```
    transform-origin: 50% 100%;
    transform: rotate(90deg) translate(-5px, 5px);
```

