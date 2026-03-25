/**
 * 模块滚动隔离管理器
 * 实现功能：
 * 1. 每个大模块内部可以连续滚动
 * 2. 模块之间不能直接滚动跨越
 * 3. 通过导航切换模块
 */

class ModuleScrollManager {
  constructor() {
    // 模块分组定义
    this.moduleGroups = {
      'overview': ['starlight-overview', 'trend-insights'],
      'guidance': ['growth-guidance'],
      'training': ['daily-training'],
      'companion': ['behavior-companion'],
      'science': ['science-class'],
      'recovery': ['recovery-notes'],
      'parent': ['parent-station'],
      'resources': ['resources-download'],
      'service': ['appointment-companion', 'guardian-team'],
      'about': ['about-intro', 'about-values', 'about-contact', 'about-join'],
      'assistant': ['assistant']
    };
    
    // 当前激活的模块组
    this.currentGroup = null;
    this.currentModule = null;
    
    // 所有模块元素
    this.modules = new Map();
    
    // 初始化
    this.init();
  }
  
  init() {
    // 收集所有模块元素
    this.collectModules();
    
    // 设置初始状态
    this.setupInitialState();
    
    // 绑定事件
    this.bindEvents();
    
    // 监听导航点击
    this.bindNavigation();
    
    console.log('[ModuleScrollManager] 初始化完成');
  }
  
  /**
   * 收集所有模块元素
   */
  collectModules() {
    Object.values(this.moduleGroups).flat().forEach(moduleId => {
      const element = document.getElementById(moduleId);
      if (element) {
        this.modules.set(moduleId, {
          element: element,
          group: this.findGroupForModule(moduleId)
        });
      }
    });
  }
  
  /**
   * 查找模块所属组
   */
  findGroupForModule(moduleId) {
    for (const [groupName, modules] of Object.entries(this.moduleGroups)) {
      if (modules.includes(moduleId)) {
        return groupName;
      }
    }
    return null;
  }
  
  /**
   * 设置初始状态
   */
  setupInitialState() {
    // 默认显示第一个模块组
    const firstGroup = Object.keys(this.moduleGroups)[0];
    this.showGroup(firstGroup);
    
    // 添加body样式
    document.body.classList.add('module-isolation-mode');
  }
  
  /**
   * 显示指定模块组
   */
  showGroup(groupName) {
    if (!this.moduleGroups[groupName]) return;
    
    // 隐藏所有模块
    this.modules.forEach((data, id) => {
      data.element.classList.remove('active');
      data.element.classList.add('inactive');
    });
    
    // 显示当前组的模块
    const groupModules = this.moduleGroups[groupName];
    groupModules.forEach(moduleId => {
      const moduleData = this.modules.get(moduleId);
      if (moduleData) {
        moduleData.element.classList.remove('inactive');
        moduleData.element.classList.add('active');
      }
    });
    
    this.currentGroup = groupName;
    this.currentModule = groupModules[0];
    
    // 滚动到顶部
    const activeModule = document.getElementById(this.currentModule);
    if (activeModule) {
      activeModule.scrollTop = 0;
    }
    
    console.log(`[ModuleScrollManager] 切换到组: ${groupName}`);
  }
  
  /**
   * 直接显示指定模块
   */
  showModule(moduleId) {
    const moduleData = this.modules.get(moduleId);
    if (!moduleData) return;
    
    // 显示该模块所属的组
    const groupName = moduleData.group;
    this.showGroup(groupName);
    
    this.currentModule = moduleId;
    
    // 滚动到该模块位置
    const moduleElement = document.getElementById(moduleId);
    if (moduleElement) {
      moduleElement.scrollIntoView({ behavior: 'smooth' });
    }
    
    console.log(`[ModuleScrollManager] 直接切换到模块: ${moduleId}`);
  }
  
  /**
   * 绑定滚动事件
   */
  bindEvents() {
    // 监听每个模块的滚动事件
    this.modules.forEach((data, moduleId) => {
      const element = data.element;
      
      element.addEventListener('scroll', (e) => {
        this.handleModuleScroll(moduleId, e);
      }, { passive: true });
      
      // 监听鼠标滚轮事件，防止跨模块滚动
      element.addEventListener('wheel', (e) => {
        this.handleWheel(moduleId, e);
      }, { passive: false });
      
      // 监听触摸事件（移动端）
      element.addEventListener('touchmove', (e) => {
        this.handleTouchMove(moduleId, e);
      }, { passive: false });
    });
  }
  
  /**
   * 处理模块内部滚动
   */
  handleModuleScroll(moduleId, event) {
    const moduleData = this.modules.get(moduleId);
    if (!moduleData || moduleData.group !== this.currentGroup) return;
    
    const element = event.target;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const clientHeight = element.clientHeight;
    
    // 检查是否滚动到底部
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
    // 检查是否滚动到顶部
    const isAtTop = scrollTop <= 10;
    
    // 存储滚动状态
    moduleData.isAtBottom = isAtBottom;
    moduleData.isAtTop = isAtTop;
  }
  
  /**
   * 处理鼠标滚轮事件
   */
  handleWheel(moduleId, event) {
    const moduleData = this.modules.get(moduleId);
    if (!moduleData || moduleData.group !== this.currentGroup) {
      event.preventDefault();
      return;
    }
    
    const element = event.target.closest('.content-section');
    if (!element) return;
    
    const deltaY = event.deltaY;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const clientHeight = element.clientHeight;
    
    // 检查是否在边界
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;
    const isAtTop = scrollTop <= 5;
    
    // 如果在底部还向下滚动，阻止事件
    if (deltaY > 0 && isAtBottom) {
      event.preventDefault();
      return;
    }
    
    // 如果在顶部还向上滚动，阻止事件
    if (deltaY < 0 && isAtTop) {
      event.preventDefault();
      return;
    }
  }
  
  /**
   * 处理触摸移动事件
   */
  handleTouchMove(moduleId, event) {
    const moduleData = this.modules.get(moduleId);
    if (!moduleData || moduleData.group !== this.currentGroup) {
      event.preventDefault();
      return;
    }
  }
  
  /**
   * 绑定导航点击事件
   */
  bindNavigation() {
    // 监听所有导航链接
    document.querySelectorAll('nav a[href^="#"], .nav-link[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        
        const targetId = href.substring(1);
        const groupName = this.findGroupForModule(targetId);
        
        if (groupName) {
          e.preventDefault();
          this.showGroup(groupName);
          
          // 更新导航激活状态
          this.updateNavActiveState(link);
        }
      });
    });
    
    // 监听侧边栏菜单
    document.querySelectorAll('.menu-link').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        
        const targetId = href.substring(1);
        const groupName = this.findGroupForModule(targetId);
        
        if (groupName) {
          e.preventDefault();
          this.showGroup(groupName);
          this.updateNavActiveState(link);
        }
      });
    });
  }
  
  /**
   * 更新导航激活状态
   */
  updateNavActiveState(activeLink) {
    document.querySelectorAll('nav a, .nav-link, .menu-link').forEach(link => {
      link.classList.remove('active');
    });
    activeLink.classList.add('active');
  }
  
  /**
   * 切换到下一个模块组
   */
  nextGroup() {
    const groups = Object.keys(this.moduleGroups);
    const currentIndex = groups.indexOf(this.currentGroup);
    const nextIndex = (currentIndex + 1) % groups.length;
    this.showGroup(groups[nextIndex]);
  }
  
  /**
   * 切换到上一个模块组
   */
  prevGroup() {
    const groups = Object.keys(this.moduleGroups);
    const currentIndex = groups.indexOf(this.currentGroup);
    const prevIndex = (currentIndex - 1 + groups.length) % groups.length;
    this.showGroup(groups[prevIndex]);
  }
}

// 初始化 - 确保在其他脚本之后加载
window.addEventListener('load', () => {
  // 延迟初始化，确保其他脚本已经加载
  setTimeout(() => {
    window.moduleScrollManager = new ModuleScrollManager();
    console.log('[ModuleScrollManager] 窗口加载完成后初始化');
  }, 100);
});

// 如果DOM已经加载完成，立即初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.moduleScrollManager = new ModuleScrollManager();
    console.log('[ModuleScrollManager] DOM加载完成后初始化');
  });
} else {
  window.moduleScrollManager = new ModuleScrollManager();
  console.log('[ModuleScrollManager] 即时初始化');
}
