// 导航菜单切换功能
document.addEventListener("DOMContentLoaded", function () {
  // 获取所有导航链接
  const navLinks = document.querySelectorAll("nav a");

  // 获取所有内容模块
  const allModules = document.querySelectorAll("main > section");

  // 默认显示首页内容
  showModule("home");

  // 为每个导航链接添加点击事件
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // 移除所有导航链接的active类
      navLinks.forEach((l) => l.classList.remove("active"));

      // 给当前点击的链接添加active类
      this.classList.add("active");

      // 提取要显示的模块ID
      const moduleId = this.getAttribute("href").substring(1);

      // 显示相应模块
      showModule(moduleId);
    });
  });

  // 显示特定模块的函数
  function showModule(moduleId) {
    // 隐藏所有模块
    allModules.forEach((module) => {
      module.style.display = "none";
    });

    // 显示选中的模块
    const selectedModule = document.getElementById(moduleId);
    if (selectedModule) {
      selectedModule.style.display = "block";
    } else if (moduleId === "home") {
      // 如果是首页但没有首页模块，显示第一个模块
      if (allModules.length > 0) {
        allModules[0].style.display = "block";
      }
    }
  }
});
