// 星星加载动画
document.addEventListener("DOMContentLoaded", () => {
  // 创建星星元素
  const starsLoader = document.getElementById("starsLoader");
  const starCount = 38;
  const stars = [];
  // 在DOMContentLoaded事件中添加
  window.addEventListener("load", function () {
    const loadingOverlay = document.getElementById("loadingOverlay");
    if (loadingOverlay) {
      loadingOverlay.style.display = "none";
    }
  });
  // 创建星星
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.className = "star";
    starsLoader.appendChild(star);
    stars.push(star);

    // 设置星星的初始位置（爱心形状排列）
    // 使用心形曲线参数方程
    const t = (i / starCount) * Math.PI * 2;
    const scale = 35; // 调整爱心大小

    // 心形曲线方程
    const x = scale * 16 * Math.pow(Math.sin(t), 3);
    const y =
      -scale *
      (13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t));

    gsap.set(star, {
      x: x,
      y: y,
      rotation: Math.random() * 360,
    });
  }

  // 创建星星闪烁动画
  function createStarAnimation() {
    stars.forEach((star, index) => {
      // 随机延迟开始动画
      const delay = Math.random() * 2;

      gsap.to(star, {
        duration: 0.5,
        opacity: 1,
        scale: 1.2,
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.5,
        delay: delay,
        ease: "power1.inOut",
      });

      // 添加旋转动画
      gsap.to(star, {
        duration: 3,
        rotation: "+=360",
        repeat: -1,
        ease: "none",
      });
    });
  }

  // 启动动画
  createStarAnimation();

  // 模拟页面加载完成后隐藏加载动画（实际项目中应根据实际加载情况调整）
  setTimeout(() => {
    gsap.to("#loadingOverlay", {
      duration: 0.8,
      opacity: 0,
      onComplete: function () {
        document.getElementById("loadingOverlay").style.display = "none";
      },
    });
  }, 3000);
});
