## 3d-card-design deep dive

### 3d-card基本的结构

1. html主要部分包括

    ```html
        .container
            .box
                h1
                a
                img
            .box
                h1
                a
                img
    ```

2. css部分的基本原理

    - body部分居中,最小高度占据整个视口
    - .container部分采用相对定位,居中,占据全部宽度,这里使用了一个关键属性

        ```css
            transform-style: preserve-3d;
        ```

        有了这个关键属性以后,container的子元素就会有3d效果啦

    - 同理.box也设置了一个类似的属性,相对定位，设置一个圆角border-radius

    - h1部分采用绝对定位,文字居中,宽度100%,使用了一个属性

        ```css
        .container .box .name {
            position: absolute;
            top: 0;
            left: 0;
            text-align: center;
            width: 100%;
            transform-style: preserve-3d;
            transform: translate3d(0,0,75px);
            color: #fff;
            opacity: 0;
            z-index: 10;
            transition: 0.5s;
        }
        ```

        这里的作用是将这个h1dom元素沿着z轴移动朝着我们人眼的方向(向外)移动75px, 同时增加了一个鼠标移动到.box后的动画

        ```css
        .container .box:hover .name{
            opacity: 1;
            top: 40px;
        }
        ```

    - 同理按钮链接a部分采用了绝对定位,水平居中

        ```css
        .container .box .buy {
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform-style: preserve-3d;
            color: #fff;
            background: rgba(255,255, 255, 0.1);
            backdrop-filter: blur(5px);
            padding: 20px 25px;
            border-radius: 30px;
            text-decoration: none;
            transition: 0.5s;
            transform: translate3D(-50%, 0 , 80px);
            width: 150px;
            font-weight: 600;
            text-align: center;
            z-index: 10;
        }
        ```

        这里的主要技巧包括绝对定位的left:50%(这里是相对于父容器),与translate3D(-50%, 0 , 80px);的x轴左移50%(这里是相对于元素本身)达到居中的目的;
        这里也沿着z轴向外移动80px
        采用了模糊backdrop-filter: blur(5px);
    - 最后一个就是图片的问题,这里为了让水平和垂直居中使用了于上面相同的技巧,只不过多了一个方向, 同时增加了一个鼠标移到box的时候,整个图片往外移动100px

3. js部分使用了一个晃动的框架VanillaTilt

    ```javascript
        VanillaTilt.init(document.querySelectorAll(".box"), {
            max: 25,
            speed: 400,
            glare: true,
            "max-glare": 0.5
        });
        // 最大晃动角度25度
        // Speed of the enter/exit transition 
        // 最后一个是最大透明度0.5,起到模糊的作用
        // 具体的链接请参考https://micku7zu.github.io/vanilla-tilt.js/
    ```

4. 存在的疑问
    - 是不是每个元素都要添加transform-style: preserve-3d; 这个属性?
    - .container .box .buy 这个元素似乎可以不使用transition属性?
    - 图片的最大宽度一定是父元素的宽度(是使用像素300px)吗?能不能使用 max-width:100%,似乎也是可以的，而且这样也统一.
    - z-index的效果似乎不能覆盖掉图片的z轴移动的效果,这个是什么原因?
