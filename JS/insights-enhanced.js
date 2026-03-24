// 星光洞察增强功能 - 智能分析和预测
document.addEventListener('DOMContentLoaded', function() {
    // 检查ECharts是否加载成功
    if (typeof echarts === 'undefined') {
        console.error('ECharts未加载成功');
    } else {
        console.log('ECharts已加载，版本:', echarts.version);
    }
    
    initializeEnhancedInsights();
});

function initializeEnhancedInsights() {
    // 初始化洞察卡片
    initInsightCards();
    
    // 初始化趋势图表
    initInsightTrends();
    
    // 初始化预测功能
    initPredictions();
    
    // 初始化推荐系统
    initRecommendations();
    
    // 初始化时间范围选择器
    initTimeRangeSelector();
    

    
    // 添加交互功能
    addInsightInteractions();
    
    console.log('星光洞察增强功能初始化完成');
}

// 初始化时间范围选择器
function initTimeRangeSelector() {
    const buttons = document.querySelectorAll('.time-range-btn-enhanced');
    const sections = document.querySelectorAll('.time-range-section-enhanced');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const timeRange = this.getAttribute('data-time-range');
            
            // 更新按钮状态
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 更新显示内容
            sections.forEach(section => section.classList.remove('active'));
            const targetSection = document.getElementById(`${timeRange}Data`);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            // 更新综合趋势图表
            updateComprehensiveTrendChart(timeRange);
        });
    });
}

// 洞察数据
const insightsData = {
    behavior: {
        title: "行为模式分析",
        category: "行为分析",
        confidence: 92,
        description: "基于过去6个月的数据分析，发现患者在社交互动方面有明显改善趋势。",
        metrics: [
            { label: "改善率", value: "+23%", trend: "up" },
            { label: "稳定性", value: "85%", trend: "stable" },
            { label: "参与度", value: "+15%", trend: "up" }
        ],
        actions: ["查看详情", "生成报告"],
        timestamp: "2小时前"
    },
    progress: {
        title: "干预效果评估",
        category: "效果评估",
        confidence: 88,
        description: "ABA干预方法在本月显示出最佳效果，建议继续加强该领域的投入。",
        metrics: [
            { label: "有效率", value: "89%", trend: "up" },
            { label: "完成度", value: "94%", trend: "up" },
            { label: "满意度", value: "4.8/5", trend: "up" }
        ],
        actions: ["调整方案", "预约咨询"],
        timestamp: "1天前"
    },
    prediction: {
        title: "发展趋势预测",
        category: "智能预测",
        confidence: 78,
        description: "根据当前干预进度和历史数据，预测下月社交技能将有显著提升。",
        metrics: [
            { label: "预测准确率", value: "78%", trend: "up" },
            { label: "预期改善", value: "+18%", trend: "up" },
            { label: "时间窗口", value: "30天", trend: "stable" }
        ],
        actions: ["查看预测", "设置提醒"],
        timestamp: "3小时前"
    },
    recommendation: {
        title: "个性化建议",
        category: "智能推荐",
        confidence: 85,
        description: "建议增加感觉统合训练频次，同时配合语言治疗以获得更好效果。",
        metrics: [
            { label: "推荐度", value: "85%", trend: "up" },
            { label: "匹配度", value: "92%", trend: "up" },
            { label: "可行性", value: "高", trend: "stable" }
        ],
        actions: ["采纳建议", "咨询专家"],
        timestamp: "5小时前"
    }
};

// 趋势数据
const trendsData = {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    datasets: [
        {
            name: '社交互动',
            data: [45, 52, 48, 61, 55, 67, 72, 69, 58, 63, 71, 68],
            color: '#4A90E2'
        },
        {
            name: '语言表达',
            data: [38, 45, 42, 55, 48, 59, 64, 61, 52, 57, 65, 62],
            color: '#50C878'
        },
        {
            name: '行为控制',
            data: [32, 38, 35, 48, 42, 53, 58, 55, 46, 51, 59, 56],
            color: '#FF9800'
        }
    ]
};

// 预测数据
const predictionData = {
    title: "下月发展趋势预测",
    content: "基于机器学习模型分析，预测患者在社交技能、语言表达和行为控制方面将有显著改善。建议继续当前干预方案，并适当增加社交技能训练的频次。",
    confidence: 78,
    timeframe: "30天",
    keyFactors: ["历史数据趋势", "当前干预效果", "患者反馈", "季节性因素"]
};

// 推荐数据
const recommendationsData = [
    {
        text: "建议增加ABA干预频次至每周4次，以加强行为改善效果",
        priority: "high",
        category: "干预方案",
        icon: "🎯",
        impact: "高影响"
    },
    {
        text: "配合感觉统合训练，提升整体干预效果",
        priority: "medium",
        category: "辅助治疗",
        icon: "🧘",
        impact: "中影响"
    },
    {
        text: "建议家长参与培训，提高家庭干预一致性",
        priority: "high",
        category: "家庭支持",
        icon: "👨‍👩‍👧‍👦",
        impact: "高影响"
    },
    {
        text: "考虑引入音乐治疗作为辅助干预手段",
        priority: "low",
        category: "创新疗法",
        icon: "🎵",
        impact: "低影响"
    },
    {
        text: "建议定期评估干预效果，及时调整方案",
        priority: "medium",
        category: "效果评估",
        icon: "📊",
        impact: "中影响"
    }
];

function initInsightCards() {
    const container = document.getElementById('insightsCardsContainer');
    if (!container) return;

    const cardsHTML = Object.entries(insightsData).map(([key, data]) => `
        <div class="insight-card-enhanced ${key}" data-insight-type="${key}">
            <div class="insight-card-header-enhanced">
                <div class="insight-card-meta-enhanced">
                    <h3 class="insight-card-title-enhanced">${data.title}</h3>
                    <span class="insight-card-category-enhanced">${data.category}</span>
                </div>
                <div class="insight-card-confidence-enhanced">
                    <div class="confidence-indicator">
                        <div class="confidence-fill" style="width: ${data.confidence}%"></div>
                    </div>
                    <span>${data.confidence}%</span>
                </div>
            </div>
            
            <div class="insight-card-content-enhanced">
                <p class="insight-card-description-enhanced">${data.description}</p>
                <div class="insight-metrics-enhanced">
                    ${data.metrics.map(metric => `
                        <div class="insight-metric-enhanced">
                            <span class="insight-metric-value-enhanced">
                                ${metric.value}
                                ${metric.trend === 'up' ? '📈' : metric.trend === 'down' ? '📉' : '➡️'}
                            </span>
                            <span class="insight-metric-label-enhanced">${metric.label}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="insight-card-actions-enhanced">
                <div class="insight-card-actions-left">
                    ${data.actions.map(action => `
                        <button class="insight-action-btn-enhanced" onclick="handleInsightAction('${key}', '${action}')">
                            ${action}
                        </button>
                    `).join('')}
                </div>
                <div class="insight-timestamp-enhanced">
                    ${data.timestamp}
                </div>
            </div>
        </div>
    `).join('');

    container.innerHTML = cardsHTML;
}

function initInsightTrends() {
    const container = document.getElementById('insightTrendsContainer');
    if (!container) return;

    const trendsHTML = `
        <div class="insight-trends-enhanced">
            <div class="trends-header-enhanced">
                <h3 class="trends-title-enhanced">干预效果趋势分析</h3>
                <div class="trends-controls">
                    <button class="insights-filter-btn active" onclick="switchTrendView('all')">全部</button>
                    <button class="insights-filter-btn" onclick="switchTrendView('social')">社交</button>
                    <button class="insights-filter-btn" onclick="switchTrendView('language')">语言</button>
                    <button class="insights-filter-btn" onclick="switchTrendView('behavior')">行为</button>
                </div>
            </div>
            <div class="trend-chart-container-enhanced" id="insightTrendChart"></div>
        </div>
    `;

    container.innerHTML = trendsHTML;
    
    // 绘制趋势图表
    drawInsightTrendChart('all');
}

function initPredictions() {
    const container = document.getElementById('predictionContainer');
    if (!container) return;

    const predictionHTML = `
        <div class="prediction-card-enhanced">
            <div class="prediction-header-enhanced">
                <span style="font-size: 1.5rem;">🔮</span>
                <h3 class="prediction-title-enhanced">${predictionData.title}</h3>
                <div class="insight-card-confidence-enhanced">
                    <div class="confidence-indicator">
                        <div class="confidence-fill" style="width: ${predictionData.confidence}%"></div>
                    </div>
                    <span>${predictionData.confidence}%</span>
                </div>
            </div>
            <p class="prediction-content-enhanced">${predictionData.content}</p>
            <div class="prediction-confidence-enhanced">
                <span>📅 预测时间窗口: ${predictionData.timeframe}</span>
                <span>📊 基于: ${predictionData.keyFactors.length}个关键因素</span>
            </div>
        </div>
    `;

    container.innerHTML = predictionHTML;
}

function initRecommendations() {
    const container = document.getElementById('recommendationsContainer');
    if (!container) return;

    const recommendationsHTML = `
        <div class="recommendations-section-enhanced">
            <div class="recommendations-header-enhanced">
                <span style="font-size: 1.5rem;">💡</span>
                <h3 class="recommendations-title-enhanced">智能推荐</h3>
            </div>
            <ul class="recommendations-list-enhanced">
                ${recommendationsData.map((rec, index) => `
                    <li class="recommendation-item-enhanced" data-priority="${rec.priority}">
                        <div class="recommendation-icon-enhanced">${rec.icon}</div>
                        <div class="recommendation-content-enhanced">
                            <p class="recommendation-text-enhanced">${rec.text}</p>
                            <span class="recommendation-priority-enhanced recommendation-priority-${rec.priority}">
                                ${rec.priority === 'high' ? '🔴 高优先级' : rec.priority === 'medium' ? '🟡 中优先级' : '🟢 低优先级'}
                            </span>
                        </div>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;

    container.innerHTML = recommendationsHTML;
}

function drawInsightTrendChart(viewType) {
    const chartContainer = document.getElementById('insightTrendChart');
    if (!chartContainer) return;

    // 根据视图类型过滤数据
    let datasets = trendsData.datasets;
    if (viewType !== 'all') {
        datasets = datasets.filter(dataset => 
            dataset.name.toLowerCase().includes(viewType)
        );
    }

    // 创建简单的SVG图表
    const svg = createSVGChart(chartContainer, {
        width: '100%',
        height: '100%',
        viewBox: '0 0 600 160'
    });

    // 绘制趋势线
    const width = 600;
    const height = 160;
    const margin = { top: 10, right: 20, bottom: 30, left: 40 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('transform', `translate(${margin.left}, ${margin.top})`);
    svg.appendChild(g);

    // 绘制网格线
    for (let i = 0; i <= 4; i++) {
        const y = i * chartHeight / 4;
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', 0);
        line.setAttribute('y1', y);
        line.setAttribute('x2', chartWidth);
        line.setAttribute('y2', y);
        line.setAttribute('stroke', '#f0f0f0');
        line.setAttribute('stroke-width', '1');
        g.appendChild(line);
    }

    // 绘制趋势线
    datasets.forEach((dataset, index) => {
        const maxValue = Math.max(...dataset.data);
        const xScale = chartWidth / (dataset.data.length - 1);
        const yScale = chartHeight / maxValue;

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        let pathData = `M ${0} ${chartHeight - dataset.data[0] * yScale}`;
        
        for (let i = 1; i < dataset.data.length; i++) {
            const x = i * xScale;
            const y = chartHeight - dataset.data[i] * yScale;
            pathData += ` L ${x} ${y}`;
        }

        path.setAttribute('d', pathData);
        path.setAttribute('stroke', dataset.color);
        path.setAttribute('stroke-width', '2');
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        g.appendChild(path);

        // 添加数据点
        dataset.data.forEach((value, i) => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', i * xScale);
            circle.setAttribute('cy', chartHeight - value * yScale);
            circle.setAttribute('r', '3');
            circle.setAttribute('fill', dataset.color);
            circle.setAttribute('stroke', 'white');
            circle.setAttribute('stroke-width', '2');
            circle.style.cursor = 'pointer';
            
            circle.addEventListener('mouseenter', function() {
                this.setAttribute('r', '5');
                showTooltip(this, `${trendsData.labels[i]}: ${value} - ${dataset.name}`);
            });
            
            circle.addEventListener('mouseleave', function() {
                this.setAttribute('r', '3');
                hideTooltip();
            });
            
            g.appendChild(circle);
        });
    });

    // 添加坐标轴
    const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    xAxis.setAttribute('x1', 0);
    xAxis.setAttribute('y1', chartHeight);
    xAxis.setAttribute('x2', chartWidth);
    xAxis.setAttribute('y2', chartHeight);
    xAxis.setAttribute('stroke', '#ccc');
    xAxis.setAttribute('stroke-width', '1');
    g.appendChild(xAxis);

    // 添加月份标签
    trendsData.labels.forEach((label, i) => {
        if (i % 2 === 0) { // 只显示偶数月份
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', i * xScale);
            text.setAttribute('y', chartHeight + 20);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('font-size', '10');
            text.setAttribute('fill', '#666');
            text.textContent = label;
            g.appendChild(text);
        }
    });
}

function createSVGChart(container, attributes) {
    container.innerHTML = ''; // 清空容器
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    Object.entries(attributes).forEach(([key, value]) => {
        svg.setAttribute(key, value);
    });
    container.appendChild(svg);
    return svg;
}

function showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'chart-tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 500;
        z-index: 1000;
        pointer-events: none;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = (rect.left + rect.width / 2) + 'px';
    tooltip.style.top = (rect.top - 40) + 'px';
    tooltip.style.transform = 'translateX(-50%)';
}

function hideTooltip() {
    const tooltip = document.querySelector('.chart-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

function addInsightInteractions() {
    // 洞察卡片点击事件
    document.querySelectorAll('.insight-card-enhanced').forEach(card => {
        card.addEventListener('click', function() {
            const insightType = this.dataset.insightType;
            showInsightDetails(insightType);
        });
    });

    // 推荐项点击事件
    document.querySelectorAll('.recommendation-item-enhanced').forEach(item => {
        item.addEventListener('click', function() {
            this.style.background = 'rgba(156, 39, 176, 0.1)';
            setTimeout(() => {
                this.style.background = '';
            }, 300);
        });
    });
}

function handleInsightAction(insightType, action) {
    console.log(`处理洞察操作: ${insightType} - ${action}`);
    
    // 模拟操作反馈
    showToast(`正在${action}...`, 'info');
    
    setTimeout(() => {
        showToast(`${action}完成`, 'success');
    }, 1500);
}

function switchTrendView(viewType) {
    // 更新按钮状态
    document.querySelectorAll('.trends-controls .insights-filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // 重新绘制图表
    drawInsightTrendChart(viewType);
}

function showInsightDetails(insightType) {
    const insight = insightsData[insightType];
    if (!insight) return;

    const modal = document.createElement('div');
    modal.className = 'insight-detail-modal';
    modal.innerHTML = `
        <div class="insight-detail-content">
            <div class="insight-detail-header">
                <h2>${insight.title}</h2>
                <button class="close-btn" onclick="this.closest('.insight-detail-modal').remove()">✕</button>
            </div>
            <div class="insight-detail-body">
                <p>${insight.description}</p>
                <div class="insight-detail-metrics">
                    ${insight.metrics.map(metric => `
                        <div class="insight-detail-metric">
                            <span class="metric-label">${metric.label}</span>
                            <span class="metric-value">${metric.value}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="insight-detail-confidence">
                    <span>置信度: ${insight.confidence}%</span>
                    <div class="confidence-bar">
                        <div class="confidence-fill" style="width: ${insight.confidence}%"></div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .insight-detail-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(5px);
        }
        
        .insight-detail-content {
            background: white;
            border-radius: 12px;
            padding: 24px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .insight-detail-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 12px;
            border-bottom: 1px solid #e0e0e0;
        }
        
        .close-btn {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
        }
        
        .insight-detail-metrics {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 12px;
            margin: 16px 0;
        }
        
        .insight-detail-metric {
            text-align: center;
            padding: 12px;
            background: #f8f9fa;
            border-radius: 8px;
        }
        
        .metric-label {
            display: block;
            font-size: 0.8rem;
            color: #666;
            margin-bottom: 4px;
        }
        
        .metric-value {
            display: block;
            font-size: 1.2rem;
            font-weight: 700;
            color: #333;
        }
        
        .confidence-bar {
            width: 100%;
            height: 8px;
            background: #e0e0e0;
            border-radius: 4px;
            overflow: hidden;
            margin-top: 8px;
        }
        
        .confidence-fill {
            height: 100%;
            background: linear-gradient(90deg, #4A90E2 0%, #50C878 100%);
            transition: width 0.3s ease;
        }
    `;
    
    if (!document.querySelector('#insight-detail-styles')) {
        style.id = 'insight-detail-styles';
        document.head.appendChild(style);
    }
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = 'insight-toast';
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#50C878' : type === 'error' ? '#FF6B6B' : '#4A90E2'};
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
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

;





// 导出函数供全局使用
window.EnhancedInsights = {
    initializeEnhancedInsights,
    switchTrendView,
    handleInsightAction,
    showInsightDetails
};