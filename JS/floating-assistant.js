/**
 * 星语助手悬浮按钮交互模块
 * Floating Assistant Module
 */

(function() {
  'use strict';

  // 状态管理
  let isMenuOpen = false;
  let menuCloseTimer = null;

  // DOM 元素
  let starBtn = null;
  let starMenuItems = null;
  let starAssistantFloat = null;

  /**
   * 初始化模块
   */
  function init() {
    // 等待 DOM 加载完成
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupElements);
    } else {
      setupElements();
    }
  }

  /**
   * 设置 DOM 元素引用
   */
  function setupElements() {
    starBtn = document.getElementById('starBtn');
    starMenuItems = document.getElementById('starMenuItems');
    starAssistantFloat = document.getElementById('starAssistantFloat');

    if (!starBtn || !starAssistantFloat) {
      console.warn('星语助手悬浮按钮元素未找到');
      return;
    }

    window.__floatingAssistantInitialized = true;
    bindEvents();
    initIframeHandler();
  }

  /**
   * 绑定事件
   */
  function bindEvents() {
    // 主按钮点击事件
    starBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      if (!starMenuItems) {
        handleAssistantClick('qa');
        return;
      }
      toggleMenu();
    });

    // 菜单项点击事件
    if (starMenuItems) {
      const menuItems = starMenuItems.querySelectorAll('.star-menu-item');
      menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
          e.stopPropagation();
          const dataType = this.getAttribute('data-assistant-type');
          const onclick = this.getAttribute('onclick') || '';
          const inlineMatch = onclick.match(/handleAssistantClick\('([^']+)'\)/);
          const type = dataType || (inlineMatch ? inlineMatch[1] : 'qa');
          handleAssistantClick(type);
        });
      });
    }

    // 点击外部关闭菜单
    document.addEventListener('click', function(e) {
      if (isMenuOpen && !starAssistantFloat.contains(e.target)) {
        closeMenu();
      }
    });

    // 键盘 ESC 关闭菜单
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    });

    // 滚动监听 - 改变按钮样式
    let scrollTimeout;
    window.addEventListener('scroll', function() {
      if (starAssistantFloat) {
        starAssistantFloat.classList.add('scrolled');
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          starAssistantFloat.classList.remove('scrolled');
        }, 150);
      }
    }, { passive: true });
  }

  /**
   * 切换菜单展开/收起
   */
  function toggleMenu() {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  /**
   * 展开菜单
   */
  function openMenu() {
    if (!starMenuItems) {
      return;
    }
    
    isMenuOpen = true;
    starMenuItems.classList.add('active');
    
    // 添加动画效果
    if (starBtn) {
      starBtn.style.transform = 'scale(1.1)';
      setTimeout(() => {
        starBtn.style.transform = '';
      }, 200);
    }

    // 自动关闭定时器（5秒后）
    clearTimeout(menuCloseTimer);
    menuCloseTimer = setTimeout(() => {
      if (isMenuOpen) {
        closeMenu();
      }
    }, 5000);
  }

  /**
   * 收起菜单
   */
  function closeMenu() {
    if (!starMenuItems) {
      return;
    }
    
    isMenuOpen = false;
    starMenuItems.classList.remove('active');
    clearTimeout(menuCloseTimer);
  }

  /**
   * 处理助手点击事件
   * @param {string} type - 点击类型
   */
  function handleAssistantClick(type) {
    // 关闭菜单
    closeMenu();

    if (type === 'full') {
      if (window.useRouteStore && window.useRouteStore.getState) {
        window.useRouteStore.getState().setRoute('assistant');
      } else {
        const assistantSection = document.getElementById('assistant');
        if (assistantSection) {
          assistantSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      return;
    }

    if (typeof window.updateChatPopupAnchor === 'function') {
      window.updateChatPopupAnchor();
    }

    // 打开聊天弹窗
    if (typeof toggleChatPopup === 'function') {
      toggleChatPopup(true);
      return;
    }

    // 跳转到星语助手页面
    const assistantSection = document.getElementById('assistant');
    if (assistantSection) {
      assistantSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });

      // 高亮显示
      setTimeout(() => {
        assistantSection.style.animation = 'highlightSection 1s ease';
        setTimeout(() => {
          assistantSection.style.animation = '';
        }, 1000);
      }, 500);
    }

    // 根据类型执行不同操作
    switch (type) {
      case 'qa':
        console.log('打开智能问答');
        break;
      case 'consult':
        console.log('打开快捷咨询');
        break;
      default:
        console.log('打开星语助手:', type);
    }

    // 触发自定义事件
    window.dispatchEvent(new CustomEvent('assistantOpened', { 
      detail: { type: type } 
    }));
  }

  /**
   * 初始化 iframe 加载处理
   */
  function initIframeHandler() {
    const iframe = document.getElementById('uifyChatbot');
    const loadingEl = document.getElementById('iframeLoading');
    const errorEl = document.getElementById('iframeError');

    if (!iframe) return;

    // 设置加载超时
    let loadTimeout = setTimeout(() => {
      if (loadingEl) {
        loadingEl.style.display = 'none';
      }
      if (errorEl) {
        errorEl.style.display = 'flex';
      }
    }, 10000); // 10秒超时

    // iframe 加载成功
    iframe.addEventListener('load', function() {
      clearTimeout(loadTimeout);
      if (loadingEl) {
        loadingEl.style.display = 'none';
      }
      if (errorEl) {
        errorEl.style.display = 'none';
      }
    });

    // iframe 加载错误
    iframe.addEventListener('error', function() {
      clearTimeout(loadTimeout);
      if (loadingEl) {
        loadingEl.style.display = 'none';
      }
      if (errorEl) {
        errorEl.style.display = 'flex';
      }
    });
  }

  /**
   * 重新加载助手
   */
  function reloadAssistant() {
    const iframe = document.getElementById('uifyChatbot');
    const loadingEl = document.getElementById('iframeLoading');
    const errorEl = document.getElementById('iframeError');

    if (!iframe) return;

    // 显示加载状态
    if (loadingEl) {
      loadingEl.style.display = 'flex';
    }
    if (errorEl) {
      errorEl.style.display = 'none';
    }

    // 重新加载 iframe
    const src = iframe.src;
    iframe.src = '';
    setTimeout(() => {
      iframe.src = src;
    }, 100);
  }

  /**
   * 显示/隐藏悬浮按钮
   * @param {boolean} show - 是否显示
   */
  function toggleFloatButton(show) {
    if (starAssistantFloat) {
      if (show) {
        starAssistantFloat.classList.remove('hidden');
      } else {
        starAssistantFloat.classList.add('hidden');
        closeMenu();
      }
    }
  }

  // 添加高亮动画样式
  const style = document.createElement('style');
  style.textContent = `
    @keyframes highlightSection {
      0%, 100% { 
        box-shadow: 0 0 0 0 rgba(107, 159, 213, 0); 
      }
      50% { 
        box-shadow: 0 0 30px 10px rgba(107, 159, 213, 0.3); 
      }
    }
  `;
  document.head.appendChild(style);

  // 暴露全局函数
  window.toggleMenu = toggleMenu;
  window.handleAssistantClick = handleAssistantClick;
  window.reloadAssistant = reloadAssistant;
  window.toggleFloatButton = toggleFloatButton;

  // 初始化
  init();

  // 监听页面可见性变化
  document.addEventListener('visibilitychange', function() {
    if (document.hidden && isMenuOpen) {
      closeMenu();
    }
  });

})();
