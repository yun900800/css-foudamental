# 3d stairs design step
1. 设计底座旋转的方法,父元素的x轴，y轴旋转一定的角度，然后沿着y轴旋转，同时子元素需要垂直与父元素的平面即可设计旋转的底座.  
2. 为了理解3d设计的效果,可以将stairs,base,step设计成不同的颜色，便于观看,同时记住一点，旋转的轴是stairs元素的y轴.  
3. 不同的元素经过旋转变化后，它们的z轴一定垂直于xy平面，比如在设计.stairs .step::before整个伪元素时需要使用这样的考虑.  
4. 因为有六级阶梯，因此采用6个step元素来设计. 
5. 阶梯的四个围绕面,包括两个梯面和两个保护面都是以step为参照主元素. 

# 知识点
1. 3d中底座方法的设计.  
2. 阶梯的两个梯面如何用伪元素设计.  
3. 阶梯的左右保护面如何设计.

# 疑问
1. 阶梯的最后一个背面是否还有其他设计方法?  