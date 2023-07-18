# 设置知识学习

1. 整个cup包含一个杯身和一个底座,cup包含top和handle,cup起到设置容器大小和定位的作用.同时cup还包含一个比较大的圆角:border-radius:45%;    

2. top包含最上边的椭圆,这里需要注意top的值和height之间的关系,同时这里background渐变色的技巧:一定是不同灰度的白色.  

3. top中的circle设计原理也类似,只不过这里背景颜色的渐变是反方向的,这样会形成反差.  

4. tea的设计也是同样的原理,除了渐变颜色有差异外,没有区别.  

5. handle的设计是用border和border-radius画出形状,然后旋转并定位到合适位置.  

6. plate的设计是主元素勾勒出轮廓,一个::before勾勒出内层,一个::after在plate中间发光.  

7. 茶的烟雾的设计采用小块的方块条(8px 120px),通过不同时间差的动画(transform: translateY(0) scaleX(1); opacity:0)
    并且配合filter: blur(8px)实现,最后一个属性至关重要.  

# 知识点

1. filter: blur(8px)属性的使用.  

2. 掌握烟雾设计的具体原理.  

3. 渐变的颜色的设计基本原理.  

# 疑问

1. 怎么样才能设计出一个好的渐变色?