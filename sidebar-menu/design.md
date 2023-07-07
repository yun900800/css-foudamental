# 设计知识学习
1. 理解曲线边框的设计，通过border-radius和box-shadow它们之间的相互覆盖来设计曲线边框.  
    - 1.1 主元素(基础元素或者伪元素都可以)设置border-bottom-right-radius属性,然后设置主元素的box-shadow,通过
           扩展和移动形成曲线边框；(本例中的.sidebar ul li.active::before)使用的就是这个原理。 
2. 通过给定的dom添加一个active元素,css配合这个active元素产生不同的点击效果.  
    - 2.1 在sidebar .icon .text .icon::before这些元素上有动画,主要用于配合active类,或者:hover，
          一般说来，通过js点击的用active,而mouseover的用hover
3. 使用一个元素设计面包屑, 伪元素配合box-shadow外加动画来产生打开和关闭的效果. 
    - 3.1 主元素作为容器，::before 居中设计初始化的一条线段,然后上移一定的举例，box-shadow下移同样的举例。::after 下移动同样的举例
          使用动画让::before 回到初始位置,并旋转45deg, box-shadow 全部值归零; ::after回到初始位置,并旋转315deg;
4. 图片自适应的技巧.  

# 知识点
1. 理解js添加active和 :hover之间如何配合使用.    
2. 掌握border-radius配置box-shadow制作曲线.  

# 疑问
1. 为什么很多操作都放置在li元素上面而不是a元素上面?  