// 知识库功能增强 - 完整mock数据版本
document.addEventListener('DOMContentLoaded', function() {
    initializeKnowledgeBase();
});

function initializeKnowledgeBase() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const searchInput = document.querySelector('.knowledge-search-input');
    const searchBtn = document.querySelector('.knowledge-search-btn');

    // 全面的知识库mock数据
    const knowledgeData = {
        basics: {
            title: '基础知识',
            articles: [
                {
                    id: 1,
                    title: '自闭症谱系障碍概述',
                    description: '了解ASD的基本概念、诊断标准和流行病学数据',
                    icon: '🧠',
                    difficulty: '初级',
                    readTime: '5分钟',
                    category: '基础概念',
                    views: 1250,
                    likes: 89,
                    content: '自闭症谱系障碍（ASD）是一种神经发育性障碍，主要表现为社交沟通障碍、刻板重复行为和兴趣范围狭窄...',
                    tags: ['ASD', '诊断', '流行病学']
                },
                {
                    id: 2,
                    title: '早期识别与预警信号',
                    description: '掌握婴幼儿期自闭症的早期识别方法和关键指标',
                    icon: '🚨',
                    difficulty: '中级',
                    readTime: '8分钟',
                    category: '早期识别',
                    views: 2100,
                    likes: 156,
                    content: '早期识别对于自闭症儿童的干预至关重要。研究表明，18个月前开始干预的效果显著优于后期干预...',
                    tags: ['早期识别', '预警信号', '婴幼儿']
                },
                {
                    id: 3,
                    title: '共患病与鉴别诊断',
                    description: '了解自闭症常见的共患病和鉴别诊断要点',
                    icon: '🔍',
                    difficulty: '高级',
                    readTime: '12分钟',
                    category: '诊断鉴别',
                    views: 890,
                    likes: 67,
                    content: '自闭症儿童常伴有其他神经发育障碍或精神疾病，正确的鉴别诊断对于制定干预方案至关重要...',
                    tags: ['共患病', '鉴别诊断', '并发症']
                },
                {
                    id: 4,
                    title: '神经发育机制',
                    description: '深入了解自闭症的神经生物学基础和发育机制',
                    icon: '🧬',
                    difficulty: '高级',
                    readTime: '15分钟',
                    category: '神经科学',
                    views: 650,
                    likes: 45,
                    content: '自闭症的神经发育机制涉及多个脑区和神经递质系统的异常，包括前额叶、颞叶、杏仁核等关键区域...',
                    tags: ['神经发育', '脑科学', '神经生物学']
                }
            ]
        },
        intervention: {
            title: '干预方法',
            articles: [
                {
                    id: 5,
                    title: 'ABA应用行为分析',
                    description: '系统学习ABA的理论基础和实操技术',
                    icon: '🎯',
                    difficulty: '中级',
                    readTime: '20分钟',
                    category: '行为干预',
                    views: 3200,
                    likes: 234,
                    content: 'ABA是目前循证医学证据最充分的自闭症干预方法，基于行为学原理，通过正向强化改善目标行为...',
                    tags: ['ABA', '行为分析', '正向强化']
                },
                {
                    id: 6,
                    title: '早期介入丹佛模式(ESDM)',
                    description: '针对1-4岁儿童的综合性早期干预模式',
                    icon: '🌱',
                    difficulty: '中级',
                    readTime: '18分钟',
                    category: '早期干预',
                    views: 1800,
                    likes: 145,
                    content: 'ESDM融合了ABA和发展心理学原理，强调在自然情境中进行教学，促进儿童全面发展...',
                    tags: ['ESDM', '早期干预', '发展训练']
                },
                {
                    id: 7,
                    title: '关键反应训练(PRT)',
                    description: '通过关键领域干预促进多重技能发展',
                    icon: '🧩',
                    difficulty: '高级',
                    readTime: '25分钟',
                    category: '认知训练',
                    views: 1200,
                    likes: 98,
                    content: 'PRT关注动机、自我管理和多重线索反应等关键领域，通过系统性干预促进技能泛化...',
                    tags: ['PRT', '关键反应', '认知训练']
                },
                {
                    id: 8,
                    title: '正向行为支持(PBS)',
                    description: '关注行为功能，通过环境调整预防问题行为',
                    icon: '🌟',
                    difficulty: '中级',
                    readTime: '16分钟',
                    category: '行为支持',
                    views: 950,
                    likes: 76,
                    content: 'PBS强调理解行为背后的功能，通过环境调整、技能教导和正向支持来减少问题行为...',
                    tags: ['PBS', '行为支持', '功能性评估']
                }
            ]
        },
        assessment: {
            title: '评估工具',
            articles: [
                {
                    id: 9,
                    title: 'ADOS-2评估系统',
                    description: '自闭症诊断观察量表的标准化使用指南',
                    icon: '📋',
                    difficulty: '高级',
                    readTime: '30分钟',
                    category: '诊断评估',
                    views: 1100,
                    likes: 89,
                    content: 'ADOS-2是目前最权威的自闭症诊断工具之一，通过标准化情境观察来评估社交沟通能力...',
                    tags: ['ADOS', '诊断评估', '标准化工具']
                },
                {
                    id: 10,
                    title: 'VB-MAPP语言行为评估',
                    description: '基于语言行为理论的里程碑评估工具',
                    icon: '🗣️',
                    difficulty: '中级',
                    readTime: '22分钟',
                    category: '语言评估',
                    views: 2800,
                    likes: 198,
                    content: 'VB-MAPP评估儿童的语言行为技能发展水平，包括提要求、命名、对话等关键语言领域...',
                    tags: ['VB-MAPP', '语言评估', '里程碑']
                },
                {
                    id: 11,
                    title: 'ABLLS-R技能评估',
                    description: '基本语言和学习技能评估-修订版',
                    icon: '📊',
                    difficulty: '中级',
                    readTime: '28分钟',
                    category: '技能评估',
                    views: 1600,
                    likes: 134,
                    content: 'ABLLS-R全面评估儿童的基本学习技能，包括语言、社交、学业、生活自理等多个领域...',
                    tags: ['ABLLS-R', '技能评估', '学习技能']
                },
                {
                    id: 12,
                    title: '功能性行为评估(FBA)',
                    description: '系统性评估问题行为的功能和触发因素',
                    icon: '🔬',
                    difficulty: '高级',
                    readTime: '35分钟',
                    category: '行为评估',
                    views: 750,
                    likes: 56,
                    content: 'FBA通过系统性的数据收集分析，确定问题行为的功能，为制定干预策略提供科学依据...',
                    tags: ['FBA', '行为评估', '功能性分析']
                }
            ]
        },
        resources: {
            title: '实用资源',
            articles: [
                {
                    id: 13,
                    title: '家庭干预实用工具包',
                    description: '家长必备的家庭干预工具和使用指南',
                    icon: '🛠️',
                    difficulty: '初级',
                    readTime: '15分钟',
                    category: '家庭资源',
                    views: 4200,
                    likes: 312,
                    content: '家庭干预工具包包含行为记录表、强化物清单、视觉时间表等实用工具，帮助家长有效实施干预...',
                    tags: ['家庭干预', '实用工具', '家长指南']
                },
                {
                    id: 14,
                    title: '感觉统合活动大全',
                    description: '100+个感觉统合训练活动和游戏',
                    icon: '🏃‍♂️',
                    difficulty: '初级',
                    readTime: '40分钟',
                    category: '活动资源',
                    views: 3800,
                    likes: 287,
                    content: '整理了100多个适合家庭和学校使用的感觉统合活动，包括前庭觉、本体觉、触觉训练游戏...',
                    tags: ['感觉统合', '活动游戏', '训练资源']
                },
                {
                    id: 15,
                    title: '社交故事模板库',
                    description: '50个常用社交情境的故事模板',
                    icon: '📖',
                    difficulty: '初级',
                    readTime: '25分钟',
                    category: '社交资源',
                    views: 2600,
                    likes: 201,
                    content: '社交故事模板涵盖学校、家庭、社区等常见社交情境，可直接使用或根据需要进行个性化修改...',
                    tags: ['社交故事', '模板库', '社交技能']
                },
                {
                    id: 16,
                    title: '强化物清单大全',
                    description: '按年龄和兴趣分类的强化物选择指南',
                    icon: '🎁',
                    difficulty: '初级',
                    readTime: '12分钟',
                    category: '强化资源',
                    views: 2900,
                    likes: 223,
                    content: '按年龄、兴趣、活动类型分类的强化物清单，帮助家长和治疗师选择合适的强化物...',
                    tags: ['强化物', '奖励系统', '动机激发']
                }
            ]
        },
        research: {
            title: '最新研究',
            articles: [
                {
                    id: 17,
                    title: '2024年自闭症研究前沿',
                    description: '最新发表的自闭症研究进展和发现',
                    icon: '🚀',
                    difficulty: '高级',
                    readTime: '45分钟',
                    category: '研究前沿',
                    views: 1200,
                    likes: 89,
                    content: '2024年自闭症研究在神经生物学、遗传学、干预方法等领域取得重要进展，包括新的生物标志物发现...',
                    tags: ['研究前沿', '2024', '科学发现']
                },
                {
                    id: 18,
                    title: '肠道菌群与自闭症关系研究',
                    description: '探索肠脑轴在自闭症发病机制中的作用',
                    icon: '🦠',
                    difficulty: '高级',
                    readTime: '35分钟',
                    category: '生物研究',
                    views: 800,
                    likes: 67,
                    content: '最新研究发现肠道菌群失调与自闭症症状存在关联，粪菌移植等干预方法显示出潜在效果...',
                    tags: ['肠道菌群', '肠脑轴', '生物治疗']
                },
                {
                    id: 19,
                    title: 'AI辅助自闭症早期筛查技术',
                    description: '人工智能在早期识别中的应用和前景',
                    icon: '🤖',
                    difficulty: '中级',
                    readTime: '20分钟',
                    category: '技术研究',
                    views: 1500,
                    likes: 112,
                    content: 'AI技术通过分析行为视频、语音特征、眼动模式等，在自闭症早期筛查中显示出良好效果...',
                    tags: ['人工智能', '早期筛查', '技术前沿']
                },
                {
                    id: 20,
                    title: '经颅磁刺激治疗自闭症研究',
                    description: '非侵入性脑刺激技术在自闭症治疗中的应用',
                    icon: '🧠',
                    difficulty: '高级',
                    readTime: '40分钟',
                    category: '治疗研究',
                    views: 600,
                    likes: 45,
                    content: '经颅磁刺激(TMS)技术通过调节大脑神经活动，在改善自闭症患者的社交和认知功能方面显示出潜力...',
                    tags: ['经颅磁刺激', '脑刺激', '新治疗']
                }
            ]
        }
    };

    // 搜索数据库
    const searchDatabase = [];
    Object.values(knowledgeData).forEach(category => {
        category.articles.forEach(article => {
            searchDatabase.push({
                ...article,
                categoryTitle: category.title,
                searchText: `${article.title} ${article.description} ${article.content} ${article.tags.join(' ')}`.toLowerCase()
            });
        });
    });

    // 标签页切换功能
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // 移除所有活动状态
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // 添加活动状态
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // 加载对应内容
            loadCategoryContent(targetTab);
            
            // 初始化图表
            if (targetTab === 'basics') {
                initKnowledgeChart();
            }
        });
    });

    // 加载分类内容
    function loadCategoryContent(category) {
        const content = knowledgeData[category];
        if (!content) return;

        const container = document.getElementById(category);
        if (!container) return;

        // 创建网格布局
        let html = `
            <div class="category-header">
                <h3>${content.title}</h3>
                <p>共 ${content.articles.length} 篇文章</p>
            </div>
            <div class="knowledge-grid">
        `;

        content.articles.forEach(article => {
            html += `
                <div class="knowledge-card" data-id="${article.id}" data-category="${category}">
                    <div class="card-icon">${article.icon}</div>
                    <h3>${article.title}</h3>
                    <p>${article.description}</p>
                    <div class="card-meta">
                        <span class="difficulty">${article.difficulty}</span>
                        <span class="read-time">${article.readTime}</span>
                        <span class="views">👁️ ${article.views}</span>
                        <span class="likes">❤️ ${article.likes}</span>
                    </div>
                    <div class="card-tags">
                        ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <button class="card-btn">开始学习</button>
                </div>
            `;
        });

        html += '</div>';
        container.innerHTML = html;

        // 添加卡片事件
        container.querySelectorAll('.knowledge-card').forEach(card => {
            card.addEventListener('click', function() {
                const id = this.dataset.id;
                const category = this.dataset.category;
                showArticleDetail(id, category);
            });
        });
    }

    // 搜索功能
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm === '') return;

        const results = searchDatabase.filter(item => 
            item.searchText.includes(searchTerm)
        );

        showSearchResults(searchTerm, results);
    }

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // 显示搜索结果
    function showSearchResults(searchTerm, results) {
        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results-modal';
        resultsContainer.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>搜索结果 (${results.length})</h3>
                        <button class="close-modal">✕</button>
                    </div>
                    <div class="modal-body">
                        ${results.length === 0 ? 
                            '<p>未找到相关内容，请尝试其他关键词。</p>' :
                            results.map(item => `
                                <div class="search-result-item" data-id="${item.id}" data-category="${item.category}">
                                    <div class="result-header">
                                        <h4>${item.title}</h4>
                                        <span class="result-category">${item.categoryTitle}</span>
                                    </div>
                                    <p class="result-description">${item.description}</p>
                                    <div class="result-meta">
                                        <span class="difficulty">${item.difficulty}</span>
                                        <span class="read-time">${item.readTime}</span>
                                        <span class="relevance">相关度: ${calculateRelevance(searchTerm, item)}%</span>
                                    </div>
                                </div>
                            `).join('')
                        }
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(resultsContainer);

        // 添加事件监听
        resultsContainer.querySelector('.close-modal').addEventListener('click', function() {
            resultsContainer.remove();
        });

        resultsContainer.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', function() {
                const id = this.dataset.id;
                const category = this.dataset.category;
                resultsContainer.remove();
                showArticleDetail(id, category);
            });
        });

        // 点击遮罩关闭
        resultsContainer.querySelector('.modal-overlay').addEventListener('click', function(e) {
            if (e.target === this) {
                resultsContainer.remove();
            }
        });
    }

    // 计算相关性
    function calculateRelevance(searchTerm, item) {
        const titleMatch = item.title.toLowerCase().includes(searchTerm) ? 50 : 0;
        const descMatch = item.description.toLowerCase().includes(searchTerm) ? 30 : 0;
        const tagMatch = item.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ? 20 : 0;
        return Math.min(100, titleMatch + descMatch + tagMatch);
    }

    // 显示文章详情（浮动模态框版本）
    function showArticleDetail(id, category) {
        const article = knowledgeData[category].articles.find(a => a.id == id);
        if (!article) return;

        const modal = document.createElement('div');
        modal.className = 'floating-modal-overlay';
        modal.innerHTML = `
            <div class="floating-modal-content">
                <div class="floating-modal-header">
                    <h2 class="floating-modal-title">${article.title}</h2>
                    <button class="floating-modal-close">✕</button>
                </div>
                <div class="floating-modal-body">
                    <div class="article-meta-floating">
                        <span class="meta-item-floating category">${article.category}</span>
                        <span class="meta-item-floating difficulty">${article.difficulty}</span>
                        <span class="meta-item-floating read-time">⏱️ ${article.readTime}</span>
                        <span class="meta-item-floating">👁️ ${article.views}</span>
                        <span class="meta-item-floating">❤️ ${article.likes}</span>
                    </div>
                    <div class="article-tags-floating">
                        ${article.tags.map(tag => `<span class="tag-floating">${tag}</span>`).join('')}
                    </div>
                    <div class="progress-bar-floating">
                        <div class="progress-fill-floating" id="readingProgress"></div>
                    </div>
                    <div class="article-content-floating">
                        ${article.content}
                    </div>
                    <div class="article-actions-floating">
                        <div class="actions-left-floating">
                            <button class="action-btn-floating like-btn-floating" data-id="${article.id}">
                                ❤️ 点赞
                            </button>
                            <button class="action-btn-floating share-btn-floating">
                                📤 分享
                            </button>
                            <button class="action-btn-floating collect-btn-floating">
                                ⭐ 收藏
                            </button>
                        </div>
                        <div class="actions-right-floating">
                            <button class="action-btn-floating next-btn-floating">
                                下一篇 →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // 添加阅读进度模拟
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            document.getElementById('readingProgress').style.width = progress + '%';
            if (progress >= 100) clearInterval(progressInterval);
        }, 1000);

        // 添加事件监听
        const closeModal = () => {
            modal.classList.add('closing');
            setTimeout(() => {
                modal.remove();
                clearInterval(progressInterval);
            }, 300);
        };

        modal.querySelector('.floating-modal-close').addEventListener('click', closeModal);

        modal.querySelector('.like-btn-floating').addEventListener('click', function() {
            const id = this.dataset.id;
            likeArticle(id);
            this.classList.add('liked');
            this.innerHTML = '❤️ 已点赞';
            this.disabled = true;
        });

        modal.querySelector('.share-btn-floating').addEventListener('click', function() {
            shareArticle(article);
            this.classList.add('shared');
            this.innerHTML = '📤 已分享';
        });

        modal.querySelector('.collect-btn-floating').addEventListener('click', function() {
            collectArticle(article);
            this.classList.add('collected');
            this.innerHTML = '⭐ 已收藏';
        });

        modal.querySelector('.next-btn-floating').addEventListener('click', function() {
            closeModal();
            // 模拟加载下一篇文章
            const nextId = parseInt(id) + 1;
            const nextArticle = knowledgeData[category].articles.find(a => a.id == nextId);
            if (nextArticle) {
                setTimeout(() => showArticleDetail(nextId, category), 300);
            } else {
                alert('已经是最后一篇了！');
            }
        });

        // 点击遮罩关闭
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });

        // ESC键关闭
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });

        // 显示模态框
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }

    // 点赞文章
    function likeArticle(id) {
        // 模拟点赞功能
        console.log(`文章 ${id} 被点赞`);
        // 这里可以添加实际的点赞逻辑，如发送到服务器
    }

    // 分享文章
    function shareArticle(article) {
        if (navigator.share) {
            navigator.share({
                title: article.title,
                text: article.description,
                url: window.location.href
            });
        } else {
            // 复制到剪贴板
            const shareText = `${article.title}\n${article.description}\n${window.location.href}`;
            navigator.clipboard.writeText(shareText).then(() => {
                alert('分享链接已复制到剪贴板');
            });
        }
    }

    // 收藏文章
    function collectArticle(article) {
        // 模拟收藏功能
        console.log(`文章 "${article.title}" 被收藏`);
        // 这里可以添加实际的收藏逻辑，如保存到本地存储
        const collected = JSON.parse(localStorage.getItem('collectedArticles') || '[]');
        collected.push(article);
        localStorage.setItem('collectedArticles', JSON.stringify(collected));
    }

    // 知识库图表初始化
    function initKnowledgeChart() {
        const chartElement = document.getElementById('knowledgeChart');
        if (!chartElement || typeof echarts === 'undefined') return;

        const knowledgeChart = echarts.init(chartElement);
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['基础知识', '干预方法', '评估工具', '实用资源', '最新研究'],
                axisLabel: {
                    color: '#666'
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: '#666'
                }
            },
            series: [{
                name: '访问次数',
                type: 'bar',
                data: [5200, 7800, 4600, 8900, 3200],
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#6B9FD5' },
                        { offset: 1, color: '#5B8FB9' }
                    ])
                },
                barWidth: '60%',
                borderRadius: [4, 4, 0, 0]
            }]
        };
        
        knowledgeChart.setOption(option);
        
        // 响应式处理
        window.addEventListener('resize', function() {
            knowledgeChart.resize();
        });
    }

    // 初始化第一个标签页
    setTimeout(() => {
        loadCategoryContent('basics');
        initKnowledgeChart();
    }, 100);
}

// 导出函数供其他模块使用
window.KnowledgeBase = {
    initializeKnowledgeBase,
    showArticleDetail,
    likeArticle,
    shareArticle,
    collectArticle
};