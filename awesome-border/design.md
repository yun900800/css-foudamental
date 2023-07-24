# 设计知识

1. 使用背景函数background: repeating-conic-gradient加上动画旋转初始化的属性从而形成边框的旋转.  

2. 通过两层的旋转设计不同颜色,而表层用于覆盖中间的内容,其实这里也可以不用::after,因为::after的内容不容易显示
    实际上应该使用一个内层元素好一点.  

# 知识点

1. repeating-conic-gradient渐变的学习

2. 动画分层的设计原理

# 疑问

1. 这样的设计与box-shadow的设计它们之间的优缺点是什么?  

