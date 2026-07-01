document.addEventListener('DOMContentLoaded', () => {
  const pageFront = document.getElementById('pageFront');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let isFlipped = false;

  nextBtn.addEventListener('click', () => {
    if (!isFlipped) {
      pageFront.classList.add('is-flipping');
      isFlipped = true;
    } else {
        // 如果已经翻转，可以模拟翻转回来的效果 (或者加载下一页)
        // 例如：pageFront.classList.remove('is-flipping');
        // pageFront.classList.add('is-flipping-back'); // 如果有这个类
        console.log("已经翻转，请处理下一页逻辑");
    }
  });

  prevBtn.addEventListener('click', () => {
    if (isFlipped) {
      pageFront.classList.remove('is-flipping');
      isFlipped = false;
    } else {
        console.log("已经恢复，请处理上一页逻辑");
    }
  });

  // 监听动画结束事件，以便在动画完成后移除类或进行其他操作
  pageFront.addEventListener('transitionend', () => {
    // 动画结束后，如果你想保持 translateZ 的效果，可以不做处理
    // 如果你希望它在动画结束后回到原始Z轴位置，可以在这里移除 translateZ
    // 或者移除 is-flipping 类，让页面回到静止状态
    // if (isFlipped) {
    //     // 动画结束且处于翻转状态
    // } else {
    //     // 动画结束且处于未翻转状态
    // }
  });
});