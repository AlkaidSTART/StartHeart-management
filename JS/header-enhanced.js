// 头部UI增强版本 - 包含前端搜索功能
document.addEventListener('DOMContentLoaded', function() {
    initializeEnhancedHeader();
});

function initializeEnhancedHeader() {
    const header = document.querySelector('.modern-header');
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const searchSuggestions = document.getElementById('searchSuggestions');
    
    if (!header || !searchInput) return;

    // 搜索数据
    const searchData = [
        // 数据总览相关
        { text: '数据总览', category: '数据分析', icon: '📊', target: '#overview' },
        { text: '月度趋势', category: '数据分析', icon: '📈', target: '#overview' },
        { text: '干预统计', category: '数据分析', icon: '📉', target: '#overview' },
        { text: '服务记录', category: '数据分析', icon: '📋', target: '#overview' },
        
        // 星光洞察相关
        { text: '星光洞察', category: '智能分析', icon: '⭐', target: '#insights' },
        { text: '行为分析', category: '智能分析', icon: '🧠', target: '#insights' },
        { text: '进展预测', category: '智能分析', icon: '🔮', target: '#insights' },
        { text: '个性化建议', category: '智能分析', icon: '💡', target: '#insights' },
        
        // 星光知识库相关
        { text: '星光知识库', category: '知识中心', icon: '📚', target: '#knowledge' },
        { text: '基础知识', category: '知识中心', icon: '🧠', target: '#knowledge' },
        { text: '干预方法', category: '知识中心', icon: '🎯', target: '#knowledge' },
        { text: '评估工具', category: '知识中心', icon: '📋', target: '#knowledge' },
        { text: '实用资源', category: '知识中心', icon: '🛠️', target: '#knowledge' },
        { text: '最新研究', category: '知识中心', icon: '🔬', target: '#knowledge' },
        
        // 星光引路相关
        { text: '星光引路', category: '干预指导', icon: '🛤️', target: '#intervention' },
        { text: 'ABA训练', category: '干预指导', icon: '🎯', target: '#intervention' },
        { text: '语言治疗', category: '干预指导', icon: '💬', target: '#intervention' },
        { text: '社交技能', category: '干预指导', icon: '🤝', target: '#intervention' },
        { text: '感统训练', category: '干预指导', icon: '🧘', target: '#intervention' },
        { text: '成功案例', category: '干预指导', icon: '🌟', target: '#intervention' },
        
        // 星语助手相关
        { text: '星语助手', category: 'AI助手', icon: '🤖', target: '#assistant' },
        { text: '智能问答', category: 'AI助手', icon: '💭', target: '#assistant' },
        { text: '快速功能', category: 'AI助手', icon: '⚡', target: '#assistant' },
        { text: '评估指导', category: 'AI助手', icon: '📊', target: '#assistant' },
        { text: '干预建议', category: 'AI助手', icon: '💡', target: '#assistant' },
        
        // 预约服务相关
        { text: '星光有约', category: '预约服务', icon: '📅', target: '#appointment' },
        { text: '在线预约', category: '预约服务', icon: '📋', target: '#appointment' },
        { text: '服务类型', category: '预约服务', icon: '🛠️', target: '#appointment' },
        { text: '预约须知', category: '预约服务', icon: 'ℹ️', target: '#appointment' },
        
        // 守护团队相关
        { text: '守护团队', category: '团队介绍', icon: '👥', target: '#team' },
        { text: '专业医生', category: '团队介绍', icon: '👨‍⚕️', target: '#team' },
        { text: '康复师', category: '团队介绍', icon: '👩‍⚕️', target: '#team' },
        { text: '心理咨询师', category: '团队介绍', icon: '🧠', target: '#team' },
        
        // 通用搜索词
        { text: '自闭症', category: '基础知识', icon: '🧩', target: '#knowledge' },
        { text: 'ASD', category: '基础知识', icon: '🧩', target: '#knowledge' },
        { text: '早期干预', category: '干预方法', icon: '⏰', target: '#intervention' },
        { text: '家庭训练', category: '干预方法', icon: '🏠', target: '#intervention' },
        { text: '行为分析', category: '干预方法', icon: '📈', target: '#intervention' },
        { text: '社交沟通', category: '技能训练', icon: '💬', target: '#intervention' },
        { text: '感觉统合', category: '技能训练', icon: '🧘', target: '#intervention' },
        { text: '语言发育', category: '技能训练', icon: '🗣️', target: '#intervention' }
    ];

    let currentSuggestionIndex = -1;
    let filteredSuggestions = [];

    // 搜索输入事件
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        
        if (query.length > 0) {
            performSearch(query);
        } else {
            hideSuggestions();
        }
    });

    // 搜索按钮点击
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                executeSearch(query);
            }
        });
    }

    // 键盘导航
    searchInput.addEventListener('keydown', function(e) {
        if (searchSuggestions.classList.contains('active')) {
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    navigateSuggestions(1);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    navigateSuggestions(-1);
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (currentSuggestionIndex >= 0) {
                        selectSuggestion(filteredSuggestions[currentSuggestionIndex]);
                    } else {
                        executeSearch(this.value.trim());
                    }
                    break;
                case 'Escape':
                    hideSuggestions();
                    break;
            }
        }
    });

    // 点击外部关闭建议
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-container')) {
            hideSuggestions();
        }
    });

    // 搜索功能
    function performSearch(query) {
        filteredSuggestions = searchData.filter(item => 
            item.text.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 8); // 最多显示8个建议

        displaySuggestions(filteredSuggestions);
        currentSuggestionIndex = -1;
    }

    function displaySuggestions(suggestions) {
        if (suggestions.length === 0) {
            hideSuggestions();
            return;
        }

        searchSuggestions.innerHTML = suggestions.map((item, index) => `
            <div class="search-suggestion-item" data-index="${index}" data-target="${item.target}">
                <span class="suggestion-icon">${item.icon}</span>
                <span class="suggestion-text">${highlightMatch(item.text, searchInput.value)}</span>
                <span class="suggestion-category">${item.category}</span>
            </div>
        `).join('');

        searchSuggestions.classList.add('active');

        // 绑定点击事件
        searchSuggestions.querySelectorAll('.search-suggestion-item').forEach(item => {
            item.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                selectSuggestion(suggestions[index]);
            });
        });
    }

    function highlightMatch(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark style="background: rgba(74, 144, 226, 0.2); color: #4A90E2; font-weight: 600; padding: 0 2px; border-radius: 2px;">$1</mark>');
    }

    function navigateSuggestions(direction) {
        const items = searchSuggestions.querySelectorAll('.search-suggestion-item');
        if (items.length === 0) return;

        // 移除之前的活跃状态
        if (currentSuggestionIndex >= 0) {
            items[currentSuggestionIndex].classList.remove('active');
        }

        // 更新索引
        currentSuggestionIndex += direction;
        if (currentSuggestionIndex < 0) currentSuggestionIndex = items.length - 1;
        if (currentSuggestionIndex >= items.length) currentSuggestionIndex = 0;

        // 添加新的活跃状态
        items[currentSuggestionIndex].classList.add('active');
        
        // 滚动到可见区域
        items[currentSuggestionIndex].scrollIntoView({
            block: 'nearest',
            behavior: 'smooth'
        });
    }

    function selectSuggestion(suggestion) {
        searchInput.value = suggestion.text;
        hideSuggestions();
        
        // 导航到目标区域
        if (suggestion.target) {
            navigateToSection(suggestion.target);
        }
        
        // 高亮显示相关内容
        highlightSearchResults(suggestion.text);
    }

    function executeSearch(query) {
        hideSuggestions();
        
        // 执行搜索
        console.log('执行搜索:', query);
        
        // 高亮显示结果
        highlightSearchResults(query);
        
        // 显示搜索结果统计
        showSearchResults(query);
    }

    function navigateToSection(targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // 添加高亮效果
            targetElement.style.animation = 'highlightSection 2s ease';
            setTimeout(() => {
                targetElement.style.animation = '';
            }, 2000);
        }
    }

    function highlightSearchResults(query) {
        // 清除之前的高亮
        document.querySelectorAll('.search-highlight').forEach(el => {
            el.outerHTML = el.innerHTML;
        });

        // 高亮文本内容
        const textNodes = getTextNodes(document.body);
        const regex = new RegExp(`(${query})`, 'gi');
        
        textNodes.forEach(node => {
            if (node.nodeValue && regex.test(node.nodeValue)) {
                const span = document.createElement('span');
                span.className = 'search-highlight';
                span.style.cssText = 'background: rgba(255, 235, 59, 0.3); color: inherit; padding: 0 2px; border-radius: 2px; font-weight: 600;';
                span.innerHTML = node.nodeValue.replace(regex, '<span style="background: #FFEB3B; color: #333; padding: 0 2px; border-radius: 2px;">$1</span>');
                node.parentNode.replaceChild(span, node);
            }
        });

        // 3秒后移除高亮
        setTimeout(() => {
            document.querySelectorAll('.search-highlight').forEach(el => {
                el.outerHTML = el.innerHTML;
            });
        }, 3000);
    }

    function getTextNodes(element) {
        const textNodes = [];
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    // 排除脚本、样式和搜索建议
                    if (node.parentElement.closest('.search-suggestions, script, style')) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );
        
        let node;
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }
        
        return textNodes;
    }

    function showSearchResults(query) {
        // 显示搜索结果提示
        const results = searchData.filter(item => 
            item.text.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
        );

        if (results.length > 0) {
            // 创建临时提示
            const toast = document.createElement('div');
            toast.className = 'search-toast';
            toast.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
                color: white;
                padding: 12px 16px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 10000;
                font-size: 0.9rem;
                font-weight: 500;
                animation: slideInRight 0.3s ease;
            `;
            toast.innerHTML = `找到 ${results.length} 个相关结果`;
            document.body.appendChild(toast);

            setTimeout(() => {
                toast.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => toast.remove(), 300);
            }, 2000);
        }
    }

    function hideSuggestions() {
        searchSuggestions.classList.remove('active');
        currentSuggestionIndex = -1;
    }

    // 滚动效果
    let lastScrollTop = 0;
    window.addEventListener('scroll', debounce(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 50) {
            // 向下滚动
            header.style.transform = 'translateY(-2px)';
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        } else {
            // 向上滚动
            header.style.transform = 'translateY(0)';
            header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
        }
        
        // 添加滚动状态
        if (scrollTop > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    }, 10));

    // 导航链接优化
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                navigateToSection(href);
                
                // 移除其他活跃状态
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // 添加CSS动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
        
        @keyframes highlightSection {
            0%, 100% {
                box-shadow: none;
            }
            50% {
                box-shadow: 0 0 20px rgba(74, 144, 226, 0.3);
            }
        }
    `;
    document.head.appendChild(style);

    console.log('头部UI增强功能初始化完成');
}

// 防抖函数
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

// 导出函数
window.EnhancedHeader = {
    initializeEnhancedHeader,
    debounce
};