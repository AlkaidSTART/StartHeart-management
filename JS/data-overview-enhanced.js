// 数据总览增强功能 - 月度趋势和干预类型分布
document.addEventListener('DOMContentLoaded', function() {
    initializeEnhancedDataOverview();
});

function initializeEnhancedDataOverview() {
    // 初始化月度趋势图表
    initMonthlyTrendChart();
    
    // 初始化干预类型分布图表
    initInterventionDistributionChart();
    
    // 初始化数据表格
    initDataTable();
    
    // 添加交互功能
    addChartInteractions();
    
    console.log('数据总览增强功能初始化完成');
}

// 月度趋势数据
const monthlyTrendData = {
    months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    assessments: [45, 52, 48, 61, 55, 67, 72, 69, 58, 63, 71, 68],
    interventions: [38, 45, 42, 55, 48, 59, 64, 61, 52, 57, 65, 62],
    consultations: [28, 35, 32, 41, 38, 45, 48, 46, 41, 44, 49, 47],
    totalServices: [111, 132, 122, 157, 141, 171, 184, 176, 151, 164, 185, 177]
};

// 干预类型分布数据
const interventionDistributionData = [
    { name: 'ABA应用行为分析', value: 35, color: '#4A90E2', icon: '🎯' },
    { name: '语言治疗', value: 28, color: '#50C878', icon: '💬' },
    { name: '社交技能训练', value: 22, color: '#FF9800', icon: '🤝' },
    { name: '感觉统合训练', value: 18, color: '#9C27B0', icon: '🧘' },
    { name: '认知行为治疗', value: 15, color: '#F44336', icon: '🧠' },
    { name: '其他干预方法', value: 12, color: '#607D8B', icon: '🛠️' }
];

// 详细数据表格
const detailedData = [
    { month: '2024年1月', assessments: 45, interventions: 38, consultations: 28, total: 111, trend: 'up' },
    { month: '2024年2月', assessments: 52, interventions: 45, consultations: 35, total: 132, trend: 'up' },
    { month: '2024年3月', assessments: 48, interventions: 42, consultations: 32, total: 122, trend: 'down' },
    { month: '2024年4月', assessments: 61, interventions: 55, consultations: 41, total: 157, trend: 'up' },
    { month: '2024年5月', assessments: 55, interventions: 48, consultations: 38, total: 141, trend: 'down' },
    { month: '2024年6月', assessments: 67, interventions: 59, consultations: 45, total: 171, trend: 'up' },
    { month: '2024年7月', assessments: 72, interventions: 64, consultations: 48, total: 184, trend: 'up' },
    { month: '2024年8月', assessments: 69, interventions: 61, consultations: 46, total: 176, trend: 'down' },
    { month: '2024年9月', assessments: 58, interventions: 52, consultations: 41, total: 151, trend: 'down' },
    { month: '2024年10月', assessments: 63, interventions: 57, consultations: 44, total: 164, trend: 'up' },
    { month: '2024年11月', assessments: 71, interventions: 65, consultations: 49, total: 185, trend: 'up' },
    { month: '2024年12月', assessments: 68, interventions: 62, consultations: 47, total: 177, trend: 'down' }
];

function initMonthlyTrendChart() {
    const chartContainer = document.getElementById('monthlyTrendChart');
    if (!chartContainer) return;

    // 创建简单的SVG图表
    const svg = createSVGChart(chartContainer, {
        width: '100%',
        height: '100%',
        viewBox: '0 0 800 300'
    });

    // 绘制月度趋势
    drawLineChart(svg, monthlyTrendData);
}

function initInterventionDistributionChart() {
    const chartContainer = document.getElementById('interventionDistributionChart');
    if (!chartContainer) return;

    // 创建饼图
    const svg = createSVGChart(chartContainer, {
        width: '100%',
        height: '100%',
        viewBox: '0 0 300 300'
    });

    // 绘制饼图
    drawPieChart(svg, interventionDistributionData);
}

function initDataTable() {
    const tableContainer = document.getElementById('dataTableContainer');
    if (!tableContainer) return;

    const tableHTML = `
        <div class="table-header-enhanced">
            <h3 class="table-title-enhanced">📊 详细数据统计</h3>
            <div class="table-controls">
                <button class="chart-control-btn" onclick="exportData()">📥 导出数据</button>
                <button class="chart-control-btn" onclick="refreshData()">🔄 刷新</button>
            </div>
        </div>
        <div class="table-container-enhanced">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>月份</th>
                        <th>评估次数</th>
                        <th>干预次数</th>
                        <th>咨询次数</th>
                        <th>总计</th>
                        <th>趋势</th>
                    </tr>
                </thead>
                <tbody>
                    ${detailedData.map(row => `
                        <tr>
                            <td>${row.month}</td>
                            <td>${row.assessments}</td>
                            <td>${row.interventions}</td>
                            <td>${row.consultations}</td>
                            <td><strong>${row.total}</strong></td>
                            <td class="trend-${row.trend}">
                                ${row.trend === 'up' ? '📈 上升' : row.trend === 'down' ? '📉 下降' : '➡️ 平稳'}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;

    tableContainer.innerHTML = tableHTML;
}

function createSVGChart(container, attributes) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    Object.entries(attributes).forEach(([key, value]) => {
        svg.setAttribute(key, value);
    });
    container.appendChild(svg);
    return svg;
}

function drawLineChart(svg, data) {
    const width = 800;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // 创建主组
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('transform', `translate(${margin.left}, ${margin.top})`);
    svg.appendChild(g);

    // 计算比例
    const maxValue = Math.max(...data.totalServices);
    const xScale = chartWidth / (data.months.length - 1);
    const yScale = chartHeight / maxValue;

    // 绘制网格线
    for (let i = 0; i <= 5; i++) {
        const y = chartHeight - (i * chartHeight / 5);
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
    const colors = ['#4A90E2', '#50C878', '#FF9800', '#FF6B6B'];
    const datasets = [data.assessments, data.interventions, data.consultations, data.totalServices];
    const labels = ['评估次数', '干预次数', '咨询次数', '总计'];

    datasets.forEach((dataset, index) => {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        let pathData = `M ${0} ${chartHeight - dataset[0] * yScale}`;
        
        for (let i = 1; i < dataset.length; i++) {
            const x = i * xScale;
            const y = chartHeight - dataset[i] * yScale;
            pathData += ` L ${x} ${y}`;
        }

        path.setAttribute('d', pathData);
        path.setAttribute('stroke', colors[index]);
        path.setAttribute('stroke-width', index === 3 ? '3' : '2');
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        
        if (index === 3) {
            path.setAttribute('stroke-dasharray', '0');
        }
        
        g.appendChild(path);

        // 添加数据点
        dataset.forEach((value, i) => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', i * xScale);
            circle.setAttribute('cy', chartHeight - value * yScale);
            circle.setAttribute('r', index === 3 ? '4' : '3');
            circle.setAttribute('fill', colors[index]);
            circle.setAttribute('stroke', 'white');
            circle.setAttribute('stroke-width', '2');
            circle.style.cursor = 'pointer';
            
            // 添加悬停效果
            circle.addEventListener('mouseenter', function() {
                this.setAttribute('r', '6');
                showTooltip(this, `${data.months[i]}: ${value} ${labels[index]}`);
            });
            
            circle.addEventListener('mouseleave', function() {
                this.setAttribute('r', index === 3 ? '4' : '3');
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

    const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    yAxis.setAttribute('x1', 0);
    yAxis.setAttribute('y1', 0);
    yAxis.setAttribute('x2', 0);
    yAxis.setAttribute('y2', chartHeight);
    yAxis.setAttribute('stroke', '#ccc');
    yAxis.setAttribute('stroke-width', '1');
    g.appendChild(yAxis);

    // 添加月份标签
    data.months.forEach((month, i) => {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', i * xScale);
        text.setAttribute('y', chartHeight + 20);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-size', '12');
        text.setAttribute('fill', '#666');
        text.textContent = month;
        g.appendChild(text);
    });
}

function drawPieChart(svg, data) {
    const width = 300;
    const height = 300;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 20;

    let currentAngle = -Math.PI / 2; // 从顶部开始
    const total = data.reduce((sum, item) => sum + item.value, 0);

    data.forEach((item, index) => {
        const angle = (item.value / total) * 2 * Math.PI;
        const endAngle = currentAngle + angle;

        // 创建扇形路径
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const largeArcFlag = angle > Math.PI ? 1 : 0;
        
        const x1 = centerX + radius * Math.cos(currentAngle);
        const y1 = centerY + radius * Math.sin(currentAngle);
        const x2 = centerX + radius * Math.cos(endAngle);
        const y2 = centerY + radius * Math.sin(endAngle);

        const pathData = [
            `M ${centerX} ${centerY}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z'
        ].join(' ');

        path.setAttribute('d', pathData);
        path.setAttribute('fill', item.color);
        path.setAttribute('stroke', 'white');
        path.setAttribute('stroke-width', '2');
        path.style.cursor = 'pointer';
        path.style.transition = 'all 0.3s ease';

        // 添加悬停效果
        path.addEventListener('mouseenter', function() {
            this.style.transform = `scale(1.05)`;
            this.style.transformOrigin = `${centerX}px ${centerY}px`;
            showTooltip(this, `${item.icon} ${item.name}: ${item.value}%`);
        });

        path.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            hideTooltip();
        });

        svg.appendChild(path);

        // 添加标签
        const labelAngle = currentAngle + angle / 2;
        const labelRadius = radius * 0.7;
        const labelX = centerX + labelRadius * Math.cos(labelAngle);
        const labelY = centerY + labelRadius * Math.sin(labelAngle);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', labelX);
        text.setAttribute('y', labelY);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.setAttribute('font-size', '12');
        text.setAttribute('font-weight', 'bold');
        text.setAttribute('fill', 'white');
        text.setAttribute('filter', 'url(#textOutline)');
        text.textContent = `${item.value}%`;
        svg.appendChild(text);

        currentAngle = endAngle;
    });

    // 添加文本轮廓滤镜
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.setAttribute('id', 'textOutline');
    filter.setAttribute('x', '-20%');
    filter.setAttribute('y', '-20%');
    filter.setAttribute('width', '140%');
    filter.setAttribute('height', '140%');

    const feMorphology = document.createElementNS('http://www.w3.org/2000/svg', 'feMorphology');
    feMorphology.setAttribute('in', 'SourceAlpha');
    feMorphology.setAttribute('operator', 'dilate');
    feMorphology.setAttribute('radius', '1');

    const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
    feGaussianBlur.setAttribute('in', 'SourceAlpha');
    feGaussianBlur.setAttribute('stdDeviation', '1');

    const feColorMatrix = document.createElementNS('http://www.w3.org/2000/svg', 'feColorMatrix');
    feColorMatrix.setAttribute('in', 'SourceAlpha');
    feColorMatrix.setAttribute('type', 'matrix');
    feColorMatrix.setAttribute('values', '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0');

    const feComposite = document.createElementNS('http://www.w3.org/2000/svg', 'feComposite');
    feComposite.setAttribute('in', 'SourceGraphic');
    feComposite.setAttribute('in2', 'SourceAlpha');
    feComposite.setAttribute('operator', 'over');

    filter.appendChild(feMorphology);
    filter.appendChild(feGaussianBlur);
    filter.appendChild(feColorMatrix);
    filter.appendChild(feComposite);
    defs.appendChild(filter);
    svg.appendChild(defs);
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

function addChartInteractions() {
    // 图表控制按钮
    const controlButtons = document.querySelectorAll('.chart-control-btn');
    controlButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除其他按钮的活跃状态
            controlButtons.forEach(b => b.classList.remove('active'));
            // 添加当前按钮的活跃状态
            this.classList.add('active');
            
            // 这里可以添加具体的图表切换逻辑
            const action = this.textContent.trim();
            console.log('图表控制:', action);
        });
    });
}

// 导出功能
function exportData() {
    const csvContent = [
        ['月份', '评估次数', '干预次数', '咨询次数', '总计', '趋势'],
        ...detailedData.map(row => [
            row.month,
            row.assessments,
            row.interventions,
            row.consultations,
            row.total,
            row.trend === 'up' ? '上升' : row.trend === 'down' ? '下降' : '平稳'
        ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', '服务数据统计.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// 刷新功能
function refreshData() {
    const button = event.target;
    const originalText = button.textContent;
    
    button.innerHTML = '<span class="loading-spinner"></span> 刷新中...';
    button.disabled = true;
    
    setTimeout(() => {
        // 模拟数据刷新
        initMonthlyTrendChart();
        initInterventionDistributionChart();
        initDataTable();
        
        button.textContent = originalText;
        button.disabled = false;
        
        // 显示成功提示
        showToast('数据已刷新', 'success');
    }, 1500);
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = 'data-toast';
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

// 导出函数供全局使用
window.EnhancedDataOverview = {
    initializeEnhancedDataOverview,
    exportData,
    refreshData
};