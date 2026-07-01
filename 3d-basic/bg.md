概念,涉及 CSS 属性,作用描述
3D 空间创建,"perspective, transform-style: preserve-3d",开启 3D 渲染环境，perspective 决定景深（摄像机距离）。
元素定位,"position: fixed, height: 100vh, overflow: hidden",确保背景容器 (section) 固定全屏，并裁剪超出的内容。
动画基础,"@keyframes, animation: ... infinite",定义关键帧，并设置动画无限循环。
背景平铺,"background-size, background-position",控制平铺图案的尺寸，并用于背景滚动动画。
渐变方向,"linear-gradient(0deg, ...)",0deg 是垂直向上（像烟囱），180deg 是垂直向下。


技巧,涉及代码,目的/优势
1. 解决旋转空隙,transform: scale(1.6) ...,通过放大元素（scale）并结合 overflow: hidden;，确保 3D 旋转时不会露出背景空隙。
2. 动画分层,动画分配给 .pattern 和 .face,父元素 (.pattern) 负责宏观、慢速的 3D 摇摆；子元素 (.face) 负责微观、快速的 2D 纹理流动，增强视觉层次。
3. 3D 场景构建,.face2 { transform: rotateX(70deg); },利用 rotateX 将子元素旋转，使其看起来像一个倾斜的地面或反射面，创建 3D 几何体感。
4. 渐变叠加,::before 伪元素 + linear-gradient,在 3D 表面上叠加柔和的半透明渐变，使背景纹理柔化，突出前景内容。
5. 无缝滚动,background-position: 0 → 100px,移动距离（100px）等于图案尺寸，保证背景图案能无限、无缝地循环滚动。

方面,描述
优势 (Benefits),沉浸式体验： 极强的动态感和深度感。 性能较好： 基于 transform 等属性，支持硬件加速。 纯 CSS 实现： 无需 JavaScript 参与复杂渲染。
劣势 (Drawbacks),性能开销： 全屏、无限 3D 动画会持续消耗资源，影响低端设备。 可访问性： 快速运动可能导致部分用户（如前庭系统敏感者）感到不适。