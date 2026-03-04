// 头部导航优化 - 增强搜索功能和直接跳转
document.addEventListener('DOMContentLoaded', function() {
    initializeOptimizedHeader();
});

function initializeOptimizedHeader() {
    const header = document.querySelector('.modern-header');
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const searchSuggestions = document.getElementById('searchSuggestions');
    const userMenuBtn = document.querySelector('.user-menu-btn');
    const userDropdown = document.querySelector('.user-dropdown');
    
    if (!header || !searchInput) return;

    // 滚动效果
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 用户菜单切换
    if (userMenuBtn && userDropdown) {
        userMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.classList.toggle('active');
        });

        document.addEventListener('click', function() {
            userDropdown.classList.remove('active');
        });

        userDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // 增强的搜索数据 - 包含直接跳转功能
    const searchData = [
        // 主要功能模块
        { text: '数据总览', category: '数据分析', icon: '📊', target: '#base', type: 'section' },
        { text: '月度趋势', category: '数据分析', icon: '📈', target: '#base', type: 'section' },
        { text: '干预统计', category: '数据分析', icon: '📉', target: '#base', type: 'section' },
        { text: '星光洞察', category: '智能分析', icon: '⭐', target: '#assessment', type: 'section' },
        { text: '行为分析', category: '智能分析', icon: '🎯', target: '#assessment', type: 'section' },
        { text: '效果评估', category: '智能分析', icon: '📈', target: '#assessment', type: 'section' },
        { text: '趋势预测', category: '智能分析', icon: '🔮', target: '#assessment', type: 'section' },
        { text: '星语助手', category: 'AI助手', icon: '🤖', target: '#ai-assistant', type: 'section' },
        { text: 'AI助手', category: 'AI助手', icon: '💬', target: '#ai-assistant', type: 'section' },
        { text: '智能问答', category: 'AI助手', icon: '❓', target: '#ai-assistant', type: 'section' },
        { text: '星光知识库', category: '知识库', icon: '📚', target: '#knowledge', type: 'section' },
        { text: '知识库', category: '知识库', icon: '📖', target: '#knowledge', type: 'section' },
        { text: '基础知识', category: '知识库', icon: '🧠', target: '#knowledge', type: 'section' },
        { text: '干预方法', category: '知识库', icon: '🛠️', target: '#knowledge', type: 'section' },
        { text: '星光引路', category: '干预指导', icon: '🛤️', target: '#intervention', type: 'section' },
        { text: '干预指导', category: '干预指导', icon: '🎯', target: '#intervention', type: 'section' },
        { text: '成功案例', category: '干预指导', icon: '🏆', target: '#intervention', type: 'section' },
        { text: '在线预约', category: '预约服务', icon: '📅', target: '#appointment', type: 'section' },
        { text: '预约服务', category: '预约服务', icon: '📋', target: '#appointment', type: 'section' },
        { text: '星光守护团', category: '团队介绍', icon: '👥', target: '#team', type: 'section' },
        { text: '守护团队', category: '团队介绍', icon: '⭐', target: '#team', type: 'section' },
        { text: '专家团队', category: '团队介绍', icon: '👨‍⚕️', target: '#team', type: 'section' },
        
        // 具体功能
        { text: 'ABA应用行为分析', category: '干预方法', icon: '🎯', target: '#knowledge', type: 'content' },
        { text: '语言治疗', category: '干预方法', icon: '💬', target: '#knowledge', type: 'content' },
        { text: '社交技能训练', category: '干预方法', icon: '🤝', target: '#knowledge', type: 'content' },
        { text: '感觉统合训练', category: '干预方法', icon: '🧘', target: '#knowledge', type: 'content' },
        { text: '认知行为治疗', category: '干预方法', icon: '🧠', target: '#knowledge', type: 'content' },
        { text: 'VB-MAPP评估', category: '评估工具', icon: '📊', target: '#assessment', type: 'content' },
        { text: 'ABC量表', category: '评估工具', icon: '📋', target: '#assessment', type: 'content' },
        { text: 'SPM感觉处理', category: '评估工具', icon: '🧠', target: '#sensory-assessment', type: 'content' },
        { text: 'IEP个别化教育', category: '教育计划', icon: '📄', target: '#iep-generator', type: 'content' },
        
        // 系统功能
        { text: '个人设置', category: '系统设置', icon: '⚙️', target: '#settings', type: 'function' },
        { text: '使用记录', category: '系统功能', icon: '📋', target: '#history', type: 'function' },
        { text: '帮助中心', category: '系统功能', icon: '❓', target: '#help', type: 'function' },
        { text: '退出登录', category: '系统功能', icon: '🚪', target: '#logout', type: 'function' },
        
        // 新增预约相关
        { text: '预约评估', category: '预约服务', icon: '📅', target: '#appointment', type: 'function' },
        { text: '预约咨询', category: '预约服务', icon: '💬', target: '#appointment', type: 'function' },
        { text: '预约治疗', category: '预约服务', icon: '🏥', target: '#appointment', type: 'function' },
        
        // 新增知识搜索
        { text: '自闭症概述', category: '基础知识', icon: '🧠', target: '#knowledge', type: 'content' },
        { text: '早期识别', category: '基础知识', icon: '🔍', target: '#knowledge', type: 'content' },
        { text: '病因机制', category: '基础知识', icon: '🧬', target: '#knowledge', type: 'content' },
        { text: '共患病', category: '基础知识', icon: '📊', target: '#knowledge', type: 'content' },
        
        // 新增团队搜索
        { text: '王医生', category: '专家团队', icon: '👨‍⚕️', target: '#team', type: 'content' },
        { text: '张治疗师', category: '专家团队', icon: '👩‍⚕️', target: '#team', type: 'content' },
        { text: '李老师', category: '专家团队', icon: '👨‍🏫', target: '#team', type: 'content' },
        { text: '赵老师', category: '专家团队', icon: '👩‍🏫', target: '#team', type: 'content' },
        { text: '陈心理师', category: '专家团队', icon: '🧠', target: '#team', type: 'content' },
        { text: '杨老师', category: '专家团队', icon: '👨‍🎓', target: '#team', type: 'content' }
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

    // 搜索按钮点击事件
    searchBtn.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query.length > 0) {
            performGlobalSearch(query);
        }
    });

    // 回车键搜索
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query.length > 0) {
                performGlobalSearch(query);
            }
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            navigateSuggestions(e.key === 'ArrowDown' ? 1 : -1);
        }
    });

    // 全局搜索功能
    function performGlobalSearch(query) {
        console.log(`执行全局搜索: ${query}`);
        
        // 查找最匹配的内容
        const bestMatch = searchData.find(item => 
            item.text.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
        );
        
        if (bestMatch && bestMatch.type === 'section') {
            // 直接跳转到对应部分
            jumpToSection(bestMatch.target);
            showToast(`正在跳转到: ${bestMatch.text}`, 'success');
        } else {
            // 显示搜索结果
            const results = searchData.filter(item => 
                item.text.toLowerCase().includes(query.toLowerCase()) ||
                item.category.toLowerCase().includes(query.toLowerCase())
            );
            
            if (results.length > 0) {
                showSearchResults(query, results);
            } else {
                showToast('未找到相关内容', 'info');
            }
        }
        
        hideSuggestions();
    }

    // 跳转到指定部分
    function jumpToSection(target) {
        const element = document.querySelector(target);
        if (element) {
            const offsetTop = element.offsetTop - 100; // 减去头部高度
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // 高亮显示目标部分
            highlightSection(element);
        }
    }

    // 高亮显示部分
    function highlightSection(element) {
        element.style.transition = 'all 0.3s ease';
        element.style.boxShadow = '0 0 0 3px rgba(74, 144, 226, 0.3)';
        element.style.transform = 'scale(1.01)';
        
        setTimeout(() => {
            element.style.boxShadow = '';
            element.style.transform = '';
        }, 2000);
    }

    // 搜索功能
    function performSearch(query) {
        filteredSuggestions = searchData.filter(item => 
            item.text.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 10); // 最多显示10个建议

        displaySuggestions(filteredSuggestions);
        currentSuggestionIndex = -1;
    }

    function displaySuggestions(suggestions) {
        if (suggestions.length === 0) {
            hideSuggestions();
            return;
        }

        searchSuggestions.innerHTML = suggestions.map((item, index) => `
            <div class="search-suggestion-item" data-index="${index}" data-target="${item.target}" data-type="${item.type}">
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
        return text.replace(regex, '<mark>$1</mark>');
    }

    function selectSuggestion(suggestion) {
        searchInput.value = suggestion.text;
        hideSuggestions();
        
        // 根据类型执行不同操作
        if (suggestion.type === 'section') {
            jumpToSection(suggestion.target);
            showToast(`正在跳转到: ${suggestion.text}`, 'success');
        } else if (suggestion.type === 'content') {
            jumpToSection(suggestion.target);
            setTimeout(() => {
                // 尝试在目标部分内查找相关内容
                const targetElement = document.querySelector(suggestion.target);
                if (targetElement) {
                    const contentElements = targetElement.querySelectorAll('h3, h4, .card-title, .knowledge-card h3');
                    const matchingElement = Array.from(contentElements).find(el => 
                        el.textContent.toLowerCase().includes(suggestion.text.toLowerCase())
                    );
                    
                    if (matchingElement) {
                        matchingElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        matchingElement.style.background = 'rgba(74, 144, 226, 0.1)';
                        setTimeout(() => {
                            matchingElement.style.background = '';
                        }, 2000);
                    }
                }
            }, 500);
            showToast(`正在查找: ${suggestion.text}`, 'success');
        } else if (suggestion.type === 'function') {
            executeFunction(suggestion.target, suggestion.text);
        }
    }

    function executeFunction(functionName, displayText) {
        switch (functionName) {
            case '#settings':
                showToast('打开个人设置...', 'info');
                break;
            case '#history':
                showToast('查看使用记录...', 'info');
                break;
            case '#help':
                jumpToSection('#knowledge');
                showToast('跳转到帮助中心', 'success');
                break;
            case '#logout':
                if (confirm('确定要退出登录吗？')) {
                    showToast('已退出登录', 'success');
                }
                break;
            default:
                showToast(`执行功能: ${displayText}`, 'info');
        }
    }

    function navigateSuggestions(direction) {
        const items = searchSuggestions.querySelectorAll('.search-suggestion-item');
        if (items.length === 0) return;

        items.forEach(item => item.classList.remove('active'));

        currentSuggestionIndex += direction;
        if (currentSuggestionIndex < 0) currentSuggestionIndex = items.length - 1;
        if (currentSuggestionIndex >= items.length) currentSuggestionIndex = 0;

        if (items[currentSuggestionIndex]) {
            items[currentSuggestionIndex].classList.add('active');
            items[currentSuggestionIndex].scrollIntoView({ block: 'nearest' });
        }
    }

    function hideSuggestions() {
        searchSuggestions.classList.remove('active');
        currentSuggestionIndex = -1;
    }

    // 点击外部隐藏建议
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
            hideSuggestions();
        }
    });

    // 显示搜索结果
    function showSearchResults(query, results) {
        const resultsModal = document.createElement('div');
        resultsModal.className = 'search-results-modal';
        resultsModal.innerHTML = `
            <div class="search-results-content">
                <div class="search-results-header">
                    <h3>搜索结果</h3>
                    <button class="close-results">✕</button>
                </div>
                <div class="search-results-body">
                    <p class="search-results-info">找到 ${results.length} 个相关结果</p>
                    <div class="search-results-list">
                        ${results.map(item => `
                            <div class="search-result-item" data-target="${item.target}" data-type="${item.type}">
                                <div class="result-icon">${item.icon}</div>
                                <div class="result-content">
                                    <div class="result-title">${highlightMatch(item.text, query)}</div>
                                    <div class="result-category">${item.category}</div>
                                </div>
                                <div class="result-action">
                                    ${item.type === 'section' ? '跳转' : item.type === 'content' ? '查看' : '执行'}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(resultsModal);

        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            .search-results-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(5px);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            }
            
            .search-results-content {
                background: white;
                border-radius: 16px;
                width: 90%;
                max-width: 600px;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                animation: slideInUp 0.3s ease;
            }
            
            .search-results-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 24px;
                border-bottom: 1px solid rgba(0, 0, 0, 0.08);
                background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
                border-radius: 16px 16px 0 0;
            }
            
            .search-results-header h3 {
                margin: 0;
                color: #2c3e50;
                font-size: 1.2rem;
            }
            
            .close-results {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #6c757d;
                padding: 4px;
                border-radius: 4px;
                transition: all 0.2s ease;
            }
            
            .close-results:hover {
                background: rgba(0, 0, 0, 0.05);
                color: #dc3545;
            }
            
            .search-results-body {
                padding: 24px;
            }
            
            .search-results-info {
                margin: 0 0 16px 0;
                color: #6c757d;
                font-size: 0.9rem;
            }
            
            .search-results-list {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            
            .search-result-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px;
                border-radius: 8px;
                background: rgba(0, 0, 0, 0.02);
                border: 1px solid rgba(0, 0, 0, 0.05);
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .search-result-item:hover {
                background: rgba(74, 144, 226, 0.05);
                border-color: rgba(74, 144, 226, 0.2);
                transform: translateX(4px);
            }
            
            .result-icon {
                font-size: 1.2rem;
                width: 24px;
                text-align: center;
                flex-shrink: 0;
            }
            
            .result-content {
                flex: 1;
            }
            
            .result-title {
                font-weight: 500;
                color: #2c3e50;
                margin-bottom: 2px;
            }
            
            .result-category {
                font-size: 0.8rem;
                color: #6c757d;
            }
            
            .result-action {
                background: rgba(74, 144, 226, 0.1);
                color: #4A90E2;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 0.7rem;
                font-weight: 500;
                transition: all 0.2s ease;
            }
            
            .search-result-item:hover .result-action {
                background: #4A90E2;
                color: white;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        
        if (!document.querySelector('#search-results-styles')) {
            style.id = 'search-results-styles';
            document.head.appendChild(style);
        }

        // 绑定事件
        resultsModal.querySelector('.close-results').addEventListener('click', function() {
            resultsModal.remove();
        });

        resultsModal.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', function() {
                const target = this.dataset.target;
                const type = this.dataset.type;
                
                resultsModal.remove();
                
                if (type === 'section') {
                    jumpToSection(target);
                } else if (type === 'content') {
                    jumpToSection(target);
                    setTimeout(() => {
                        // 在目标部分内查找相关内容
                        const targetElement = document.querySelector(target);
                        if (targetElement) {
                            const contentElements = targetElement.querySelectorAll('h3, h4, .card-title, .knowledge-card h3');
                            const matchingElement = Array.from(contentElements).find(el => 
                                el.textContent.toLowerCase().includes(item.querySelector('.result-title').textContent.toLowerCase())
                            );
                            
                            if (matchingElement) {
                                matchingElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                matchingElement.style.background = 'rgba(74, 144, 226, 0.1)';
                                setTimeout(() => {
                                    matchingElement.style.background = '';
                                }, 2000);
                            }
                        }
                    }, 500);
                } else if (type === 'function') {
                    executeFunction(target, item.querySelector('.result-title').textContent);
                }
            });
        });

        // 点击遮罩关闭
        resultsModal.addEventListener('click', function(e) {
            if (e.target === this) {
                resultsModal.remove();
            }
        });

        // ESC键关闭
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                resultsModal.remove();
            }
        });
    }

    // 显示提示消息
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = 'header-toast';
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#50C878' : type === 'error' ? '#FF6B6B' : '#4A90E2'};
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10001;
            font-size: 0.9rem;
            font-weight: 500;
            animation: slideInRight 0.3s ease;
            backdrop-filter: blur(10px);
        `;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

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
        
        mark {
            background: rgba(255, 215, 0, 0.3);
            color: inherit;
            padding: 0 2px;
            border-radius: 2px;
        }
    `;
    document.head.appendChild(style);

    console.log('头部导航优化功能初始化完成');
}

// 导出函数供全局使用
window.OptimizedHeader = {
    initializeOptimizedHeader,
    jumpToSection: function(target) {
        const element = document.querySelector(target);
        if (element) {
            const offsetTop = element.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    },
    showToast: function(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = 'header-toast';
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#50C878' : type === 'error' ? '#FF6B6B' : '#4A90E2'};
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10001;
            font-size: 0.9rem;
            font-weight: 500;
            animation: slideInRight 0.3s ease;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
};