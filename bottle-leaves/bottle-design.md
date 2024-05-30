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
    https://9elements.github.io/fancy-border-radius/
6. 动画属性汇总:https://projects.verou.me/animatable/ , 线性渐变:https://gradient.style/
    服务端渲染框架nextjs;动画库gsap,AOS;声音处理库https://howlerjs.com/;免费声音资源:https://freesound.org/;处理音频的软件
    https://www.audacityteam.org/

7. water的设计还是采用了一个主元素构建一个长方形,然后::before和::after用border-radius和border构成椭圆来平滑水的上下边,这里有一点需要注意的是
    上下边的宽度不一样,下面的宽度小一点,因为主元素不能构建最上方下端弧线,所以需要before和after;同时用box-shadow来设计水的内部阴影.水的主体使用了颜色的线性渐变.

8. 气泡,和水母的设计都可以作为一个单独的小组件,然后将此组件通过定位放置到合适位置

9. 叶子的构建前文说过,但是嵌入水中的叶子,这里使用了一个技巧,使用了两个层定位,然后使用index控制不同层并且配合两个不同高度的clover来显示,同时用overflow:hidden来控制leaves的部分,top和bottom合起来组成完整的leaves;同时动画也要配合默契.

## 这个瓶子的基本情况分析

1. html 结构分析

    ```html
    .main 
        .bottle
            .bottle_top
                .bottle_mouth
                .highlight
            .bottle_neck
                .highlight
            .bottle_main
                .bottle_inner
                    .water 
                        .cloverTop
                            .clover
                                .leaves
                                    .leave angleN
                                    .leave angleS
                                    .leave angleW
                                    .leave angleE
                                .branch
                        .cloverBottom
                            <!-- 与 cloverTop 类似-->
                        .jellyfish
                            .jellyfish_head
                            .jellyfish_tail
                                .jellyfish_tail_in
                        .bubble bubble1
                        .bubble bubble1
                        .bubble bubble1
                .highlight
    ```



### 原理讲解

1. [原理链接](https://blog.csdn.net/jiajieao/article/details/45332059)