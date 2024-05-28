# 设计知识学习

1. 掌握动画分别使用在不同元素上产生的联动效果,比如本例中的container > loader > ball;同时注意动画可以在主元素上,也可以在伪元素上;
    主元素上的动画对子元素以及伪元素有效果,而主元素伪元素动画对子元素及其伪元素无效果.  

2. 让元素居中的方法:left: 50%;transform: translateX(-50%);

# 知识点

1. 掌握居中的若干方法.  

## balance-ball 基本的结构

1. html基本结构

    ```html
    .container
        .loader
            .ball
    ```

    可以看出这个结构是一个三层机构,主结构在body居中

2. css基本原理
    - body居中相对定位
    - .container 相对定位，同时沿着y轴向上移动100px
    - .container::before 采用绝对定位,宽度和高度相等同时border-radius:50%构造出一个圆形, 同时将元素在15px的水平范围内移动.(注意这个值不能太大，都则会产生空中移动的错觉)

    ```css
    .container::before {
        position: absolute;
        content: '';
        width: 200px;
        height: 200px;
        top: 200px;
        background:#fff;
        border-radius: 50%;
        animation: animateCircle 4s ease-in-out infinite;
    }

    @keyframes animateCircle {
        0% {
            transform: translateX(15px);
        }
        50% {
            transform: translateX(-15px);;
        }
        100% {
            transform: translateX(15px);
        }
    }

    ```

    - .container::after 同理构造出一个大圆

    ```css
    .container::after {
        position: absolute;
        content: '';
        width: 800px;
        height: 800px;
        top: 400px;
        <!-- 因为宽高和父元素不一样,所以需要水平居中,下面两段代码为的就是居中 -->
        left: 50%;
        transform: translateX(-50%);
        background:#fe4e4e;
        border-radius: 50%;
    }

    ```

    - .container .loader 还是一个200,200的正方形,给它增加一个动画沿着圆心上下50deg循环旋转

    ```css
    .container .loader {
        position: relative;
        width: 200px;
        height: 200px;
        /* background: #f00; */
        animation: animate 4s ease-in-out infinite;
    }

    @keyframes animate {
        0% {
            transform: rotate(50deg);
        }
        50% {
            transform: rotate(-50deg);;
        }
        100% {
            transform: rotate(50deg);
        }
    }
    ```

    因为这里是半圆的效果,单独一个估计比较难设计,因此使用伪元素来构建半圆

    ```css
    .container .loader::before {
        <!-- 通过一个200*100的矩形,外加bottom-left和bottom-right来构建半圆形 -->
        content: '';
        position: absolute;
        bottom: 0;
        width: 200px;
        height: 100px;
        background: #06c8f0;
        border-bottom-left-radius: 100px;
        border-bottom-right-radius: 100px;
    }
    ```

    - 为了让小球.ball移动到半圆的线上来,这里的设计思路是

    ```css
    .container .loader .ball {
        position: absolute;
        width: 40px;
        height: 40px;
        background: #fff;
        border-radius: 50%;
        left: -15px;
        top: 50%;
        transform: translateY(-100%);
        animation: animateBall 4s ease-in-out infinite;
    }
    ```

    前5行代码构造出小球,整个小球向上移动整个小球的距离
    transform: translateY(-100%);然后整个小球向下移动父元素的一半top: 50%;最后稍微左移一点就可以啦.

    最后一步的动画是沿着半圆的轴线左右移动就好,配合上父元素的旋转,就产生了上下的效果.

## 总结

1. 父元素动画和子元素动画的联动

2. 主元素上的动画对子元素以及伪元素有效果,而主元素伪元素动画对子元素及其伪元素无效果.  

3. 水平居中,垂直居中以及怎么样将小圆设计到半圆的线上的一些技巧