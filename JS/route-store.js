// 独立的原生 JS 状态管理实现（替代出错的 CDN 版 Zustand）
const createStore = (createState) => {
  let state;
  const listeners = new Set();
  const setState = (partial) => {
    const nextState = typeof partial === 'function' ? partial(state) : partial;
    if (nextState !== state) {
      state = { ...state, ...nextState };
      listeners.forEach((listener) => listener(state));
    }
  };
  const getState = () => state;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const api = { setState, getState, subscribe };
  state = createState(setState, getState, api);
  return api;
};

// 创建路由状态 store，挂载到 window 方便全局访问
window.useRouteStore = createStore((set) => ({
  currentRoute: 'starlight-overview', // 默认展示星光总览模块
  setRoute: (route) => set({ currentRoute: route })
}));

// 定义全局 setActive 函数供 index.html 中 onclick 调用
window.setActive = function(element) {
  const href = element.getAttribute("href");
  if (href && href.startsWith("#")) {
    const route = href.substring(1);
    window.useRouteStore.getState().setRoute(route);
  }
};

// 导航菜单切换功能
document.addEventListener("DOMContentLoaded", function () {
  // 获取所有侧边栏导航链接
  const navLinks = document.querySelectorAll(".sidebar-menu a[href^='#']");
  // 获取所有内容模块
  const allModules = document.querySelectorAll("main > section.content-section");

  // 状态变更时显示对应模块
  function showModule(moduleId) {
    let found = false;
    allModules.forEach((module) => {
      if (module.id === moduleId) {
        module.style.display = "block";
        module.classList.add("active");
        module.classList.remove("inactive");
        found = true;
      } else {
        module.style.display = "none";
        module.classList.remove("active");
        module.classList.add("inactive");
      }
    });

    // 如果未找到对应模块（兜底），默认显示第一个
    if (!found && allModules.length > 0) {
      allModules[0].style.display = "block";
      allModules[0].classList.add("active");
      allModules[0].classList.remove("inactive");
    }

    // 切换后回到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const activeModule = document.querySelector("main > section.content-section.active");
    if(activeModule) {
      activeModule.scrollTop = 0;
    }
  }

  // 订阅路由状态变化
  window.useRouteStore.subscribe((state) => {
    showModule(state.currentRoute);
    
    // 更新导航 active 状态
    navLinks.forEach((l) => {
      const href = l.getAttribute("href");
      if (href && href.substring(1) === state.currentRoute) {
        l.classList.add("active");
        // 自动展开所在的父级子菜单
        const submenu = l.closest('.submenu');
        if (submenu) {
          const parentItem = submenu.closest('.menu-item');
          if (parentItem && !parentItem.classList.contains('open')) {
            parentItem.classList.add('open');
            submenu.style.height = "auto";
          }
        }
      } else {
        l.classList.remove("active");
      }
    });
  });

  // 如果页面加载时有 hash 参数，则使用 hash 作为初始路由
  const hash = window.location.hash;
  if(hash && hash.length > 1) {
    window.useRouteStore.getState().setRoute(hash.substring(1));
  } else {
    // 否则初始化显示默认模块
    showModule(window.useRouteStore.getState().currentRoute);
  }

  // 为侧边栏菜单添加额外的事件监听保护
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const moduleId = href.substring(1);
        window.useRouteStore.getState().setRoute(moduleId);
        
        // 在移动端点击后自动收起侧边栏
        if (window.innerWidth <= 768 && typeof window.toggleSidebar === 'function') {
          const sidebar = document.getElementById('sidebar');
          if (sidebar && sidebar.classList.contains('active')) {
            window.toggleSidebar();
          }
        }
      }
    });
  });
});
