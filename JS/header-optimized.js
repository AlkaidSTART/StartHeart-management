// 优化头部导航 - PC端专用版本
document.addEventListener('DOMContentLoaded', function() {
    initializeOptimizedHeader();
});

function initializeOptimizedHeader() {
    const header = document.querySelector('.modern-header');
    const headerContainer = document.querySelector('.header-container');
    
    if (!header || !headerContainer) return;

    // 滚动效果优化
    let lastScrollTop = 0;
    let scrollTimeout;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 防抖处理
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (scrollTop > lastScrollTop && scrollTop > 50) {
                // 向下滚动 - 轻微透明
                header.style.opacity = '0.95';
                header.style.transform = 'translateY(-2px)';
            } else {
                // 向上滚动 - 完全显示
                header.style.opacity = '1';
                header.style.transform = 'translateY(0)';
            }
            
            // 添加滚动状态类
            if (scrollTop > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScrollTop = scrollTop;
        }, 10);
    });

    // 导航链接交互优化
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        // 添加平滑过渡效果
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        // 点击效果
        link.addEventListener('click', function(e) {
            // 移除其他活跃状态
            navLinks.forEach(l => l.classList.remove('active'));
            // 添加当前活跃状态
            this.classList.add('active');
            
            // 平滑滚动到对应部分
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // 搜索功能优化
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput) {
        // 输入框焦点效果
        searchInput.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.zIndex = '1002';
        });
        
        searchInput.addEventListener('blur', function() {
            this.parentElement.style.transform = '';
            this.parentElement.style.zIndex = '';
        });
        
        // 搜索功能
        const performSearch = function() {
            const query = searchInput.value.trim();
            if (query) {
                console.log('搜索:', query);
                // 这里可以添加实际的搜索逻辑
                // 例如：高亮显示相关内容、过滤模块等
                
                // 临时反馈效果
                searchInput.style.background = 'rgba(255, 255, 255, 0.3)';
                setTimeout(() => {
                    searchInput.style.background = '';
                }, 300);
            }
        };
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        if (searchBtn) {
            searchBtn.addEventListener('click', performSearch);
        }
    }

    // 通知功能优化
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            // 添加点击动画
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // 这里可以添加通知面板显示逻辑
            console.log('显示通知面板');
        });
    }

    // 用户菜单优化
    const userMenu = document.querySelector('.user-menu');
    if (userMenu) {
        const userDropdown = userMenu.querySelector('.user-dropdown');
        let menuTimeout;
        
        userMenu.addEventListener('mouseenter', function() {
            clearTimeout(menuTimeout);
            if (userDropdown) {
                userDropdown.style.opacity = '1';
                userDropdown.style.visibility = 'visible';
                userDropdown.style.transform = 'translateY(0)';
            }
        });
        
        userMenu.addEventListener('mouseleave', function() {
            menuTimeout = setTimeout(() => {
                if (userDropdown) {
                    userDropdown.style.opacity = '0';
                    userDropdown.style.visibility = 'hidden';
                    userDropdown.style.transform = 'translateY(-8px)';
                }
            }, 150);
        });
    }

    // 窗口大小变化处理
    window.addEventListener('resize', function() {
        // 重置任何可能的样式变化
        if (header) {
            header.style.opacity = '';
            header.style.transform = '';
        }
        
        // 清除活跃状态（如果需要）
        // 这里可以根据窗口大小调整导航行为
    });

    // 键盘导航支持
    document.addEventListener('keydown', function(e) {
        // Tab键导航优化
        if (e.key === 'Tab') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('nav-link')) {
                focusedElement.style.outline = '2px solid rgba(255, 255, 255, 0.5)';
                focusedElement.style.outlineOffset = '2px';
            }
        }
        
        // Escape键关闭任何打开的面板
        if (e.key === 'Escape') {
            // 关闭用户菜单
            const userDropdown = document.querySelector('.user-dropdown');
            if (userDropdown && userDropdown.style.visibility === 'visible') {
                userDropdown.style.opacity = '0';
                userDropdown.style.visibility = 'hidden';
                userDropdown.style.transform = 'translateY(-8px)';
            }
            
            // 清除搜索框焦点
            if (searchInput && document.activeElement === searchInput) {
                searchInput.blur();
            }
        }
    });

    // 移除移动端菜单相关元素（如果存在）
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.style.display = 'none';
    }
    
    if (mobileNav) {
        mobileNav.remove();
    }

    console.log('头部导航优化完成 - PC端专用版本');
}

// 辅助函数：防抖处理
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 导出函数供外部使用
window.OptimizedHeader = {
    initializeOptimizedHeader,
    debounce
};