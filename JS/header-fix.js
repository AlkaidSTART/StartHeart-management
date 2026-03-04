// 头部溢出修复和移动端菜单功能
document.addEventListener('DOMContentLoaded', function() {
    initializeHeaderFix();
});

function initializeHeaderFix() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const headerContainer = document.querySelector('.header-container');
    
    // 创建移动端导航菜单（如果不存在）
    if (!mobileNav) {
        createMobileNav();
    }

    // 移动端菜单切换
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            const nav = document.getElementById('mobileNav');
            if (nav) {
                nav.classList.toggle('active');
            }
            
            // 动画效果
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // 点击外部关闭移动端菜单
    document.addEventListener('click', function(e) {
        const mobileNav = document.getElementById('mobileNav');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        
        if (mobileNav && mobileNav.classList.contains('active')) {
            if (!mobileNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mobileNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                
                // 重置菜单按钮动画
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });

    // 窗口大小改变时重置菜单状态
    window.addEventListener('resize', function() {
        const mobileNav = document.getElementById('mobileNav');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        
        if (window.innerWidth > 768) {
            if (mobileNav && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
            }
            if (mobileMenuToggle && mobileMenuToggle.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                
                // 重置菜单按钮动画
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });

    // 导航链接点击事件（移动端）
    document.addEventListener('click', function(e) {
        if (e.target.closest('.mobile-nav-link')) {
            const mobileNav = document.getElementById('mobileNav');
            const mobileMenuToggle = document.getElementById('mobileMenuToggle');
            
            if (mobileNav && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                
                // 重置菜单按钮动画
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });

    // 滚动时优化头部显示
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const header = document.querySelector('.modern-header');
        
        if (header) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // 向下滚动，隐藏头部
                header.style.transform = 'translateY(-100%)';
                header.style.opacity = '0.9';
            } else {
                // 向上滚动，显示头部
                header.style.transform = 'translateY(0)';
                header.style.opacity = '1';
            }
        }
        
        lastScrollTop = scrollTop;
    });

    // 搜索框焦点管理
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            // 确保搜索框有足够的空间
            if (window.innerWidth <= 1200) {
                this.style.zIndex = '1002';
            }
        });
        
        searchInput.addEventListener('blur', function() {
            this.style.zIndex = '';
        });
    }

    // 用户菜单交互优化
    const userMenu = document.querySelector('.user-menu');
    if (userMenu) {
        const userDropdown = userMenu.querySelector('.user-dropdown');
        
        // 鼠标离开时延迟关闭菜单
        let closeTimeout;
        
        userMenu.addEventListener('mouseenter', function() {
            clearTimeout(closeTimeout);
            if (userDropdown) {
                userDropdown.style.opacity = '1';
                userDropdown.style.visibility = 'visible';
                userDropdown.style.transform = 'translateY(0)';
            }
        });
        
        userMenu.addEventListener('mouseleave', function() {
            closeTimeout = setTimeout(() => {
                if (userDropdown) {
                    userDropdown.style.opacity = '0';
                    userDropdown.style.visibility = 'hidden';
                    userDropdown.style.transform = 'translateY(-10px)';
                }
            }, 200);
        });
    }
}

// 创建移动端导航菜单
function createMobileNav() {
    const nav = document.createElement('nav');
    nav.className = 'mobile-nav';
    nav.id = 'mobileNav';
    
    const navList = document.createElement('ul');
    navList.className = 'mobile-nav-list';
    
    // 从桌面导航获取菜单项
    const desktopNav = document.querySelector('.main-nav .nav-list');
    if (desktopNav) {
        const navItems = desktopNav.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            if (link) {
                const href = link.getAttribute('href');
                const icon = link.querySelector('.nav-icon').textContent;
                const text = link.querySelector('.nav-text').textContent;
                
                const li = document.createElement('li');
                li.className = 'mobile-nav-item';
                
                const a = document.createElement('a');
                a.className = 'mobile-nav-link';
                a.href = href;
                
                a.innerHTML = `
                    <span class="mobile-nav-icon">${icon}</span>
                    <span class="mobile-nav-text">${text}</span>
                `;
                
                li.appendChild(a);
                navList.appendChild(li);
            }
        });
    }
    
    nav.appendChild(navList);
    document.body.appendChild(nav);
}

// 导出函数
window.HeaderFix = {
    initializeHeaderFix,
    createMobileNav
};