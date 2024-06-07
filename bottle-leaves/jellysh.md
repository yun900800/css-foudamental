# jellyfish 水母设计的基本原理

1. html 基本结构

    ```html
    .box
        .jellyfish
            .jellyfish_head
            .jellyfish_tail
                .jellyfish_tail_in
        .jellyfish
            .jellyfish_head
            .jellyfish_tail
                .jellyfish_tail_in
    ```

    可以看出水母最外层有一个容器,然后是一个水母身体元素,身体里面有head和tail, tail里面还有一个tail_in

2. css 基本原理
    - .box 基本容器就是一个固定宽高的元素,并且使用了居中的技巧(绝对定位外加transform)

    ```css
    .box {
        position: absolute;
        <!-- 这里的百分比是相对于父元素,这里父元素是整个视口,因此这里的值就是半个视口 -->
        top:50%;
        left: 50%;
        <!-- 这里的百分比是相对于元素自身 也就是100px -->
        transform: translate(-50%,-50%);
        width: 200px;
        height: 200px;
        background: #fdfcfc;
    }
    ```

    - .jellyfish 下面是水母的身体元素,注意还是采用绝对定位;这里的身体没有设置宽高,其实就是0*0;水母身体的作用就是为子元素定位;水母动画就是translate左右一定的距离，rotate一定的小角度，scale缩小然后恢复

    ```css
    @keyframes jellyfishSwimming {
        0% {
            transform: translate(0px, 0px) rotate(-4deg) scale(0.8);
        }
        20% {
            transform: translate(-1px, -3px) rotate(-6deg) scale(0.8);
        }
        50% {
            transform: translate(-2px, -1px) rotate(-3deg) scale(1);
        }
        70% {
            transform: translate(-1px, -3px) rotate(-6deg) scale(0.8);
        }
        100% {
            transform: translate(0px, 0px) rotate(-4deg) scale(0.8);
        }
    }
    ```

    - .jellyfish_head 采用相对于父元素.jellyfish绝对定位,固定宽高,通过border增加一层类似细胞壁的东西, border-radius将整个元素设计成有一定弧线的多边形，box-shadow是为了增加层次感;同时再添加动画;
    同理为了增加head和tail的层次感;可以用::after添加一层来让画面更有质感

    - .jellyfish_tail的原理类似,只不过位置不同,并且要同head很好的衔接.

    - 注意,这里为了设计出带弧形的多边形，可以参考border-radius的这个项目:
    [fancy-border-radius](https://9elements.github.io/fancy-border-radius/);这里有很多设计技巧,比如参数值是像素会怎样，参数值是百分比又是怎么样?具体的设计多练习就好啦。

    - 另一个需要注意的就是 box-shadow这个阴影的设计,这个属性利用得好，会让设计更出彩[designing-shadows](https://www.joshwcomeau.com/css/designing-shadows/);这里简单说下: 阴影包括5个元素,[水平偏移,垂直偏移,模糊度,扩展半径,颜色];同时，阴影还能有多层;有了这些基础知识,然后再去看上面的文章理解会更深入.

    ```css
        box-shadow: 0px 0px 4px rgba(255, 255, 255, 0.5) inset, 
        1px 1px 2px rgba(255, 255, 255, 0.2) inset, 
        3px 3px 1px rgba(255, 255, 255, 0.2) inset, 
        -1px -1px 1px rgba(255, 255, 255, 0.1) inset;
    ```

    大家看上面的阴影,实际上就是四层;第一层是一个透明度为0.5的白色,模糊度为4px的层;第二层是向右向下偏移1px,透明度为0.2的白色,模糊度为2px的层;同理大家可以分析剩下的阴影层;这里需要注意的是透明度的值越接近0，越不容易看清;却接近1越容易看清;
    如果不好理解，可以类比这个属性 opacity的值为0和为1的时候的区别；最后这个属性inset表明阴影是向内部扩散;