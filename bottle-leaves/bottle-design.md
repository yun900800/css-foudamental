# 设计知识学习

1. bottle主要包括三部分,bottle_top,bottle_neck,bottle_main;

2. bottle部分主要采用主元素的bottle::before和bottle::after设置不同的阴影，然后将它们定位为相同的位置产生效果
   至于为什么采用重复阴影,这是一个暂时还不理解的问题?一般来说,阴影移动的的位置和对应元素的高度一般来说有取值一半的关系
   比如高度为14px,移动的高度一般是7px.  border-radius的值一般来说接近元素宽高的一半;比如100/14 对应 46/10.  

3. bottle_top采用同bottle一样的原理,只不过这里高度还加上border的高度;bottle_top采用上下border为0,left,right存在,且透明度0.5的白色构成整个top的基本框架上下分别配置一个椭圆,在构建椭圆的过程中,原理和bottle中类似,只不过border-top薄一点,border-bottom厚一点，且透明度不一致,形成差异效果,
这里实际上就是构建弧形边框,通过border-radius和border配合完成，和上一节的branch类似;总结一下就是弧形不同透明度的边框配合定位和阴影，构建bottle_top;

4. bottle_mouth的原理和bottle_top类似,bottle_neck的原理类似,需要注意的是有一个椭圆没有border-top;bottle_main也是类似道理

5. bottle_inner采用了黑色的border外加border-top白色隐藏的效果:
```
    border: 1px solid rgba(0, 0, 0, 0.01);
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    border-bottom-width: 0.5px;
```
    同时理解border-radius: 10px 10px 20px 20px/10px;让bottle_inner形成下面平缓,上面陡峭的原理;理解border-radius八个值的原理。
6. 