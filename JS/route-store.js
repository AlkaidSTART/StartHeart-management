// zustand 状态管理 store
// 需要先引入 zustand 库（需通过 CDN 或 npm 安装）
// 这里假设通过 CDN 方式引入

// 创建路由状态 store
const useRouteStore = window.createStore((set) => ({
  currentRoute: 'home',
  setRoute: (route) => set({ currentRoute: route })
}));

// 导航菜单切换功能（集成zustand）
document.addEventListener("DOMContentLoaded", function () {
  // 获取所有导航链接
  const navLinks = document.querySelectorAll("nav a");
  // 获取所有内容模块
  const allModules = document.querySelectorAll("main > section");

  // 状态变更时显示对应模块
  function showModule(moduleId) {
    allModules.forEach((module) => {
      module.style.display = "none";
    });
    const selectedModule = document.getElementById(moduleId);
    if (selectedModule) {
      selectedModule.style.display = "block";
    } else if (moduleId === "home") {
      if (allModules.length > 0) {
        allModules[0].style.display = "block";
      }
    }
  }

  // 订阅路由状态变化
  useRouteStore.subscribe((state) => {
    showModule(state.currentRoute);
    // 更新导航active状态
    navLinks.forEach((l) => {
      const href = l.getAttribute("href");
      if (href && href.substring(1) === state.currentRoute) {
        l.classList.add("active");
      } else {
        l.classList.remove("active");
      }
    });
  });

  // 初始化显示
  showModule(useRouteStore.getState().currentRoute);

  // 导航点击事件：通过zustand切换路由
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const moduleId = this.getAttribute("href").substring(1);
      useRouteStore.getState().setRoute(moduleId);
    });
  });
});
