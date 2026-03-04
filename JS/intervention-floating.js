// 干预训练悬浮显示功能
document.addEventListener('DOMContentLoaded', function() {
    initializeInterventionFloating();
});

function initializeInterventionFloating() {
    // 创建悬浮面板和遮罩
    createFloatingPanel();
    
    // 绑定事件
    bindInterventionEvents();
    
    console.log('干预训练悬浮功能初始化完成');
}

function createFloatingPanel() {
    // 创建遮罩层
    const overlay = document.createElement('div');
    overlay.className = 'intervention-overlay';
    overlay.id = 'interventionOverlay';
    
    // 创建悬浮面板
    const panel = document.createElement('div');
    panel.className = 'intervention-floating-panel';
    panel.id = 'interventionFloatingPanel';
    
    panel.innerHTML = `
        <div class="floating-panel-header">
            <div>
                <h3 class="floating-panel-title">干预训练详情</h3>
                <p class="floating-panel-subtitle">专业指导，科学训练</p>
            </div>
            <button class="floating-panel-close" id="closeInterventionPanel">✕</button>
        </div>
        
        <div class="floating-panel-content" id="interventionPanelContent">
            <!-- 动态内容将在这里插入 -->
        </div>
        
        <div class="floating-panel-footer">
            <button class="floating-panel-btn secondary" id="interventionPrevBtn">
                ← 上一个
            </button>
            <button class="floating-panel-btn" id="interventionStartBtn">
                开始训练
            </button>
            <button class="floating-panel-btn secondary" id="interventionNextBtn">
                下一个 →
            </button>
        </div>
    `;
    
    document.body.appendChild(overlay);
    document.body.appendChild(panel);
    
    // 绑定关闭事件
    document.getElementById('closeInterventionPanel').addEventListener('click', closeInterventionPanel);
    document.getElementById('interventionOverlay').addEventListener('click', closeInterventionPanel);
    
    // 阻止面板内点击事件冒泡
    panel.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

function bindInterventionEvents() {
    // 绑定干预训练卡片的点击事件
    document.addEventListener('click', function(e) {
        const interventionCard = e.target.closest('.intervention-card, .intervention-item');
        if (interventionCard) {
            e.preventDefault();
            const interventionId = interventionCard.dataset.interventionId || 
                                 interventionCard.dataset.id || 
                                 'default-intervention';
            showInterventionDetail(interventionId);
        }
    });
    
    // 绑定导航按钮事件
    document.addEventListener('click', function(e) {
        if (e.target.id === 'interventionPrevBtn') {
            navigateIntervention('prev');
        } else if (e.target.id === 'interventionNextBtn') {
            navigateIntervention('next');
        } else if (e.target.id === 'interventionStartBtn') {
            startInterventionTraining();
        }
    });
    
    // 键盘事件
    document.addEventListener('keydown', function(e) {
        const panel = document.getElementById('interventionFloatingPanel');
        if (panel && panel.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeInterventionPanel();
            } else if (e.key === 'ArrowLeft') {
                navigateIntervention('prev');
            } else if (e.key === 'ArrowRight') {
                navigateIntervention('next');
            }
        }
    });
}

function showInterventionDetail(interventionId) {
    const interventionData = getInterventionData(interventionId);
    const content = document.getElementById('interventionPanelContent');
    
    if (!interventionData) {
        content.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">未找到干预训练详情</p>';
    } else {
        content.innerHTML = generateInterventionHTML(interventionData);
    }
    
    // 显示面板
    document.getElementById('interventionOverlay').classList.add('active');
    document.getElementById('interventionFloatingPanel').classList.add('active');
    
    // 添加打开动画
    setTimeout(() => {
        content.style.opacity = '0';
        content.style.transform = 'translateY(20px)';
        setTimeout(() => {
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
        }, 100);
    }, 200);
    
    // 更新导航按钮状态
    updateNavigationButtons(interventionId);
    
    // 阻止背景滚动
    document.body.style.overflow = 'hidden';
}

function closeInterventionPanel() {
    const overlay = document.getElementById('interventionOverlay');
    const panel = document.getElementById('interventionFloatingPanel');
    
    if (!overlay.classList.contains('active')) return;
    
    // 添加关闭动画
    panel.style.animation = 'floatOut 0.3s ease';
    overlay.style.animation = 'fadeOut 0.3s ease';
    
    setTimeout(() => {
        overlay.classList.remove('active');
        panel.classList.remove('active');
        panel.style.animation = '';
        overlay.style.animation = '';
        
        // 恢复背景滚动
        document.body.style.overflow = '';
    }, 300);
}

function generateInterventionHTML(data) {
    return `
        <div class="intervention-detail-card">
            <div class="intervention-detail-header">
                <div class="intervention-detail-icon">${data.icon || '🎯'}</div>
                <div>
                    <h3 class="intervention-detail-title">${data.title}</h3>
                    <span class="intervention-detail-category">${data.category}</span>
                </div>
            </div>
            
            <div class="intervention-detail-description">
                ${data.description}
            </div>
            
            <div class="intervention-detail-steps">
                <h4>训练步骤</h4>
                ${data.steps.map((step, index) => `
                    <div class="intervention-step">
                        <div class="step-number">${index + 1}</div>
                        <div class="step-content">${step}</div>
                    </div>
                `).join('')}
            </div>
            
            ${data.successCases ? `
                <div class="success-cases-section">
                    <h4 class="success-cases-title">成功案例</h4>
                    ${data.successCases.map(case_ => `
                        <div class="success-case-card">
                            <div class="success-case-header">
                                <img src="${case_.avatar || 'https://via.placeholder.com/32x32/4CAF50/white?text=👶'}" 
                                     alt="${case_.name}" 
                                     class="success-case-avatar">
                                <div class="success-case-info">
                                    <div class="success-case-name">${case_.name}</div>
                                    <div class="success-case-age">${case_.age}岁</div>
                                </div>
                            </div>
                            <div class="success-case-content">
                                ${case_.content}
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `;
}

function getInterventionData(interventionId) {
    // 模拟干预训练数据
    const interventions = {
        'aba-basics': {
            id: 'aba-basics',
            title: 'ABA基础训练',
            category: '行为干预',
            icon: '🎯',
            description: '应用行为分析(ABA)是一种基于科学的行为干预方法，通过正向强化和系统性教学来改善目标行为。',
            steps: [
                '建立良好的师生关系，创造安全的学习环境',
                '评估儿童的当前能力水平和兴趣点',
                '设定清晰、可测量的训练目标',
                '使用分解教学法，将复杂技能分解为小步骤',
                '提供即时正向强化，增强学习动机',
                '记录训练数据，定期评估进展情况'
            ],
            successCases: [
                {
                    name: '小明',
                    age: 4,
                    avatar: 'https://via.placeholder.com/32x32/4CAF50/white?text=明',
                    content: '经过3个月的ABA训练，小明的社交互动能力显著提升，能够主动与同伴进行简单的游戏互动。'
                },
                {
                    name: '小红',
                    age: 5,
                    avatar: 'https://via.placeholder.com/32x32/FF9800/white?text=红',
                    content: '通过系统性的ABA干预，小红的语言表达能力从单词阶段提升到简单句子水平。'
                }
            ]
        },
        'speech-therapy': {
            id: 'speech-therapy',
            title: '语言治疗训练',
            category: '语言干预',
            icon: '💬',
            description: '语言治疗专注于改善儿童的言语和语言能力，包括发音、词汇、语法和交流技巧。',
            steps: [
                '进行全面的语言能力评估',
                '制定个性化的语言治疗计划',
                '使用图片、玩具等辅助工具进行训练',
                '练习发音和口部肌肉运动',
                '扩展词汇量和句子结构',
                '练习日常对话和社交语言'
            ],
            successCases: [
                {
                    name: '小刚',
                    age: 6,
                    avatar: 'https://via.placeholder.com/32x32/2196F3/white?text=刚',
                    content: '语言治疗帮助小刚改善了发音清晰度，现在能够更清楚地表达自己的想法和需求。'
                }
            ]
        },
        'social-skills': {
            id: 'social-skills',
            title: '社交技能训练',
            category: '社交干预',
            icon: '🤝',
            description: '社交技能训练帮助儿童学习适当的社会互动行为，提高与同伴和成人的交往能力。',
            steps: [
                '教授基本的社交规则和行为规范',
                '练习眼神接触和面部表情识别',
                '学习轮流对话和倾听技巧',
                '练习分享、合作和解决冲突',
                '参与小组活动和角色扮演',
                '泛化技能到自然环境中'
            ],
            successCases: [
                {
                    name: '小丽',
                    age: 7,
                    avatar: 'https://via.placeholder.com/32x32/E91E63/white?text=丽',
                    content: '社交技能训练让小丽学会了如何主动邀请同伴一起玩耍，她的朋友圈明显扩大了。'
                }
            ]
        }
    };
    
    return interventions[interventionId] || interventions['aba-basics'];
}

function updateNavigationButtons(currentId) {
    // 这里可以实现导航逻辑
    // 简化版本：始终启用按钮
    const prevBtn = document.getElementById('interventionPrevBtn');
    const nextBtn = document.getElementById('interventionNextBtn');
    
    if (prevBtn && nextBtn) {
        prevBtn.disabled = false;
        nextBtn.disabled = false;
    }
}

function navigateIntervention(direction) {
    // 简化导航：随机选择一个干预训练
    const interventions = ['aba-basics', 'speech-therapy', 'social-skills'];
    const randomId = interventions[Math.floor(Math.random() * interventions.length)];
    
    // 添加过渡效果
    const content = document.getElementById('interventionPanelContent');
    content.style.opacity = '0';
    content.style.transform = direction === 'next' ? 'translateX(-20px)' : 'translateX(20px)';
    
    setTimeout(() => {
        showInterventionDetail(randomId);
        content.style.opacity = '1';
        content.style.transform = 'translateX(0)';
    }, 200);
}

function startInterventionTraining() {
    const startBtn = document.getElementById('interventionStartBtn');
    
    // 添加开始动画
    startBtn.style.transform = 'scale(0.95)';
    startBtn.innerHTML = '<span class="loading-spinner"></span> 开始中...';
    
    setTimeout(() => {
        startBtn.style.transform = '';
        startBtn.innerHTML = '开始训练';
        
        // 显示开始消息
        alert('🎯 训练即将开始！\n\n请按照步骤指引进行训练，我们会记录您的训练进度。');
        
        // 可以添加更多训练开始逻辑
        console.log('干预训练开始');
    }, 1000);
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes floatOut {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
        }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    .loading-spinner {
        display: inline-block;
        width: 14px;
        height: 14px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top: 2px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-right: 6px;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// 导出函数
window.InterventionFloating = {
    initializeInterventionFloating,
    showInterventionDetail,
    closeInterventionPanel
};