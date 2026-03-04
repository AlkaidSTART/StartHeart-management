// 星光引路功能增强
document.addEventListener('DOMContentLoaded', function() {
    initializeInterventionSystem();
});

function initializeInterventionSystem() {
    const pillButtons = document.querySelectorAll('.pill-btn');
    const interventionTabs = document.querySelectorAll('.intervention-tab');
    const ageFilter = document.querySelector('.age-filter');
    const severityFilter = document.querySelector('.severity-filter');

    // 标签页切换功能
    pillButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetIntervention = this.dataset.intervention;
            
            // 移除所有活动状态
            pillButtons.forEach(btn => btn.classList.remove('active'));
            interventionTabs.forEach(tab => tab.classList.remove('active'));
            
            // 添加活动状态
            this.classList.add('active');
            document.getElementById(targetIntervention).classList.add('active');
            
            // 初始化对应标签页的内容
            initializeInterventionContent(targetIntervention);
        });
    });

    // 过滤器功能
    function applyFilters() {
        const selectedAge = ageFilter.value;
        const selectedSeverity = severityFilter.value;
        
        filterInterventionCards(selectedAge, selectedSeverity);
    }

    ageFilter.addEventListener('change', applyFilters);
    severityFilter.addEventListener('change', applyFilters);

    // 初始化干预内容
    function initializeInterventionContent(interventionType) {
        // 根据不同类型初始化特定内容
        switch(interventionType) {
            case 'behavioral':
                initBehavioralInterventions();
                break;
            case 'developmental':
                initDevelopmentalInterventions();
                break;
            case 'social':
                initSocialInterventions();
                break;
            case 'communication':
                initCommunicationInterventions();
                break;
            case 'sensory':
                initSensoryInterventions();
                break;
        }
    }

    // 行为干预初始化
    function initBehavioralInterventions() {
        // 添加动画效果
        const cards = document.querySelectorAll('#behavioral .intervention-card-enhanced');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            }, index * 200);
        });
    }

    // 发展训练初始化
    function initDevelopmentalInterventions() {
        // 可以添加特定的发展训练逻辑
        console.log('初始化发展训练内容');
    }

    // 社交技能初始化
    function initSocialInterventions() {
        // 可以添加特定的社交技能逻辑
        console.log('初始化社交技能内容');
    }

    // 沟通训练初始化
    function initCommunicationInterventions() {
        // 可以添加特定的沟通训练逻辑
        console.log('初始化沟通训练内容');
    }

    // 感觉统合初始化
    function initSensoryInterventions() {
        // 可以添加特定的感觉统合逻辑
        console.log('初始化感觉统合内容');
    }

    // 过滤干预卡片
    function filterInterventionCards(age, severity) {
        const allCards = document.querySelectorAll('.intervention-card-enhanced');
        
        allCards.forEach(card => {
            let showCard = true;
            
            // 获取卡片信息
            const ageRange = card.querySelector('.meta-item .meta-value')?.textContent;
            const severityLevel = card.dataset.severity; // 如果添加了严重程度数据属性
            
            // 年龄过滤
            if (age && ageRange) {
                const cardAgeRange = parseAgeRange(ageRange);
                const selectedAge = parseInt(age);
                
                if (cardAgeRange && !isAgeInRange(selectedAge, cardAgeRange)) {
                    showCard = false;
                }
            }
            
            // 严重程度过滤
            if (severity && severityLevel) {
                if (severityLevel !== severity) {
                    showCard = false;
                }
            }
            
            // 显示/隐藏卡片
            if (showCard) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.6s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // 解析年龄范围
    function parseAgeRange(ageText) {
        const ageMatch = ageText.match(/(\d+)(?:-(\d+))?/);
        if (ageMatch) {
            const startAge = parseInt(ageMatch[1]);
            const endAge = ageMatch[2] ? parseInt(ageMatch[2]) : startAge;
            return { start: startAge, end: endAge };
        }
        return null;
    }

    // 检查年龄是否在范围内
    function isAgeInRange(selectedAge, ageRange) {
        return selectedAge >= ageRange.start && selectedAge <= ageRange.end;
    }

    // 添加卡片点击事件
    document.querySelectorAll('.primary-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.intervention-card-enhanced');
            const title = card.querySelector('h3').textContent;
            startIntervention(title);
        });
    });

    document.querySelectorAll('.secondary-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.intervention-card-enhanced');
            const title = card.querySelector('h3').textContent;
            showInterventionDetails(title);
        });
    });

    // 开始干预训练
    function startIntervention(interventionName) {
        // 显示确认对话框
        const modal = document.createElement('div');
        modal.className = 'intervention-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>开始干预训练</h3>
                        <button class="close-modal">✕</button>
                    </div>
                    <div class="modal-body">
                        <h4>您选择了：${interventionName}</h4>
                        <p>我们将为您制定个性化的训练计划，包括：</p>
                        <ul>
                            <li>详细的训练目标和步骤</li>
                            <li>专业的指导和监督</li>
                            <li>定期的进展评估</li>
                            <li>家长培训和资源支持</li>
                        </ul>
                        <div class="modal-actions">
                            <button class="confirm-btn">确认开始</button>
                            <button class="cancel-btn">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // 添加事件监听
        modal.querySelector('.close-modal').addEventListener('click', function() {
            modal.remove();
        });

        modal.querySelector('.cancel-btn').addEventListener('click', function() {
            modal.remove();
        });

        modal.querySelector('.confirm-btn').addEventListener('click', function() {
            modal.remove();
            showInterventionSetup(interventionName);
        });

        // 点击遮罩关闭
        modal.querySelector('.modal-overlay').addEventListener('click', function(e) {
            if (e.target === this) {
                modal.remove();
            }
        });
    }

    // 显示干预详情
    function showInterventionDetails(interventionName) {
        const modal = document.createElement('div');
        modal.className = 'intervention-details-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>${interventionName} - 详细信息</h3>
                        <button class="close-modal">✕</button>
                    </div>
                    <div class="modal-body">
                        <div class="loading-spinner"></div>
                        <p>正在加载详细信息...</p>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // 关闭事件
        modal.querySelector('.close-modal').addEventListener('click', function() {
            modal.remove();
        });

        modal.querySelector('.modal-overlay').addEventListener('click', function(e) {
            if (e.target === this) {
                modal.remove();
            }
        });

        // 模拟加载详细信息
        setTimeout(() => {
            const modalBody = modal.querySelector('.modal-body');
            modalBody.innerHTML = `
                <div class="intervention-details">
                    <div class="detail-section">
                        <h4>🎯 干预原理</h4>
                        <p>基于循证实践，通过科学的方法改善目标技能和行为表现。</p>
                    </div>
                    <div class="detail-section">
                        <h4>📋 实施步骤</h4>
                        <ol>
                            <li>初步评估和能力分析</li>
                            <li>制定个性化干预计划</li>
                            <li>专业指导和技能训练</li>
                            <li>家庭支持和泛化练习</li>
                            <li>定期评估和计划调整</li>
                        </ol>
                    </div>
                    <div class="detail-section">
                        <h4>📊 预期效果</h4>
                        <p>根据大量实践数据，该干预方法在改善相关技能方面具有显著效果。</p>
                        <div class="effectiveness-chart">
                            <div class="chart-item">
                                <span>技能改善率</span>
                                <div class="chart-bar">
                                    <div class="chart-fill" style="width: 85%"></div>
                                </div>
                                <span>85%</span>
                            </div>
                            <div class="chart-item">
                                <span>家长满意度</span>
                                <div class="chart-bar">
                                    <div class="chart-fill" style="width: 92%"></div>
                                </div>
                                <span>92%</span>
                            </div>
                        </div>
                    </div>
                    <div class="detail-section">
                        <h4>💡 专家建议</h4>
                        <ul>
                            <li>保持训练的连续性和一致性</li>
                            <li>与专业人员密切合作</li>
                            <li>关注孩子的兴趣和动机</li>
                            <li>及时记录和调整训练策略</li>
                        </ul>
                    </div>
                    <div class="modal-actions">
                        <button class="start-btn">开始训练</button>
                        <button class="close-btn">关闭</button>
                    </div>
                </div>
            `;

            // 添加开始训练事件
            modalBody.querySelector('.start-btn').addEventListener('click', function() {
                modal.remove();
                startIntervention(interventionName);
            });

            modalBody.querySelector('.close-btn').addEventListener('click', function() {
                modal.remove();
            });
        }, 1000);
    }

    // 显示干预设置
    function showInterventionSetup(interventionName) {
        const modal = document.createElement('div');
        modal.className = 'intervention-setup-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>干预训练设置</h3>
                        <button class="close-modal">✕</button>
                    </div>
                    <div class="modal-body">
                        <form class="setup-form">
                            <div class="form-group">
                                <label>训练目标</label>
                                <textarea placeholder="请描述您希望通过训练达到的具体目标..." rows="3"></textarea>
                            </div>
                            <div class="form-group">
                                <label>训练频率</label>
                                <select>
                                    <option value="">请选择训练频率</option>
                                    <option value="daily">每天</option>
                                    <option value="3-4week">每周3-4次</option>
                                    <option value="2week">每周2次</option>
                                    <option value="1week">每周1次</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>每次训练时长</label>
                                <select>
                                    <option value="">请选择训练时长</option>
                                    <option value="30min">30分钟</option>
                                    <option value="45min">45分钟</option>
                                    <option value="60min">60分钟</option>
                                    <option value="90min">90分钟</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>特殊需求或注意事项</label>
                                <textarea placeholder="请描述孩子的特殊需求、偏好或需要注意的事项..." rows="3"></textarea>
                            </div>
                            <div class="form-actions">
                                <button type="submit" class="submit-btn">提交设置</button>
                                <button type="button" class="cancel-btn">取消</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // 表单提交事件
        modal.querySelector('.setup-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 收集表单数据
            const formData = new FormData(this);
            const settings = {
                intervention: interventionName,
                goals: this.querySelector('textarea[placeholder*="目标"]').value,
                frequency: this.querySelector('select').value,
                duration: this.querySelectorAll('select')[1].value,
                notes: this.querySelector('textarea[placeholder*="特殊需求"]').value
            };

            modal.remove();
            showSuccessMessage(interventionName, settings);
        });

        // 关闭事件
        modal.querySelector('.close-modal').addEventListener('click', function() {
            modal.remove();
        });

        modal.querySelector('.cancel-btn').addEventListener('click', function() {
            modal.remove();
        });

        modal.querySelector('.modal-overlay').addEventListener('click', function(e) {
            if (e.target === this) {
                modal.remove();
            }
        });
    }

    // 显示成功消息
    function showSuccessMessage(interventionName, settings) {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.innerHTML = `
            <div class="message-content">
                <div class="message-icon">✅</div>
                <h3>设置成功！</h3>
                <p>您的${interventionName}训练计划已创建完成</p>
                <p>我们的专业团队将在24小时内与您联系，为您安排首次训练</p>
                <div class="message-actions">
                    <button class="view-plan-btn">查看训练计划</button>
                    <button class="close-message-btn">关闭</button>
                </div>
            </div>
        `;

        document.body.appendChild(message);

        // 事件处理
        message.querySelector('.view-plan-btn').addEventListener('click', function() {
            message.remove();
            showTrainingPlan(interventionName, settings);
        });

        message.querySelector('.close-message-btn').addEventListener('click', function() {
            message.remove();
        });

        // 3秒后自动关闭
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 3000);
    }

    // 显示训练计划
    function showTrainingPlan(interventionName, settings) {
        console.log('显示训练计划:', interventionName, settings);
        alert(`训练计划已创建：\n干预方法：${interventionName}\n训练目标：${settings.goals}\n训练频率：${settings.frequency}\n训练时长：${settings.duration}\n\n请查看您的个人中心获取详细计划！`);
    }

    // 工具按钮事件
    document.querySelectorAll('.tool-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const toolName = this.closest('.tool-item').querySelector('h4').textContent;
            showToolDetails(toolName);
        });
    });

    // 显示工具详情
    function showToolDetails(toolName) {
        alert(`正在打开 ${toolName} 工具...`);
        // 这里可以实现具体的工具功能
    }

    // 个性化推荐按钮事件
    document.querySelectorAll('.rec-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const recType = this.closest('.recommendation-card').querySelector('h4').textContent;
            handleRecommendation(recType);
        });
    });

    // 处理推荐功能
    function handleRecommendation(recType) {
        switch(recType) {
            case '智能匹配系统':
                showAssessmentSystem();
                break;
            case '目标设定助手':
                showGoalSettingAssistant();
                break;
            case '进展追踪系统':
                showProgressTracking();
                break;
        }
    }

    // 显示评估系统
    function showAssessmentSystem() {
        alert('启动智能评估系统，请回答几个简单问题...');
    }

    // 显示目标设定助手
    function showGoalSettingAssistant() {
        alert('启动目标设定助手，帮助您制定SMART目标...');
    }

    // 显示进展追踪
    function showProgressTracking() {
        alert('查看干预进展追踪报告...');
    }

    // 初始化第一个标签页
    setTimeout(() => {
        initBehavioralInterventions();
    }, 100);
}

// 导出函数供其他模块使用
window.InterventionSystem = {
    initializeInterventionSystem,
    startIntervention,
    showInterventionDetails
};