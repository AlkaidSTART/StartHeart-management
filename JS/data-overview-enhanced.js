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

    // 初始化ECharts实例
    const chart = echarts.init(chartContainer);

    // 设置图表配置项
    const option = {
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderColor: 'transparent',
            textStyle: {
                color: '#fff'
            },
            formatter: function(params) {
                let result = params[0].name + '<br/>';
                params.forEach(item => {
                    result += `${item.marker} ${item.seriesName}: ${item.value}<br/>`;
                });
                return result;
            }
        },
        legend: {
            data: ['评估次数', '干预次数', '咨询次数', '总计'],
            top: 0,
            textStyle: {
                color: '#666'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {
                    pixelRatio: 2,
                    backgroundColor: '#fff'
                }
            },
            right: 10
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: monthlyTrendData.months,
            axisLine: {
                lineStyle: {
                    color: '#e8e8e8'
                }
            },
            axisLabel: {
                color: '#666'
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                show: false
            },
            axisLabel: {
                color: '#666'
            },
            axisTick: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    color: '#f0f0f0'
                }
            }
        },
        series: [
            {
                name: '评估次数',
                type: 'line',
                stack: 'Total',
                data: monthlyTrendData.assessments,
                smooth: true,
                lineStyle: {
                    color: '#4A90E2',
                    width: 3
                },
                itemStyle: {
                    color: '#4A90E2'
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(74, 144, 226, 0.3)' },
                        { offset: 1, color: 'rgba(74, 144, 226, 0.05)' }
                    ])
                }
            },
            {
                name: '干预次数',
                type: 'line',
                stack: 'Total',
                data: monthlyTrendData.interventions,
                smooth: true,
                lineStyle: {
                    color: '#50C878',
                    width: 3
                },
                itemStyle: {
                    color: '#50C878'
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(80, 200, 120, 0.3)' },
                        { offset: 1, color: 'rgba(80, 200, 120, 0.05)' }
                    ])
                }
            },
            {
                name: '咨询次数',
                type: 'line',
                stack: 'Total',
                data: monthlyTrendData.consultations,
                smooth: true,
                lineStyle: {
                    color: '#FF9800',
                    width: 3
                },
                itemStyle: {
                    color: '#FF9800'
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(255, 152, 0, 0.3)' },
                        { offset: 1, color: 'rgba(255, 152, 0, 0.05)' }
                    ])
                }
            },
            {
                name: '总计',
                type: 'line',
                data: monthlyTrendData.totalServices,
                smooth: true,
                lineStyle: {
                    color: '#FF6B6B',
                    width: 4
                },
                itemStyle: {
                    color: '#FF6B6B'
                },
                emphasis: {
                    focus: 'series'
                }
            }
        ]
    };

    // 应用图表配置
    chart.setOption(option);

    // 响应式调整
    window.addEventListener('resize', function() {
        chart.resize();
    });
}

function initInterventionDistributionChart() {
    const chartContainer = document.getElementById('interventionDistributionChart');
    if (!chartContainer) return;

    // 初始化ECharts实例
    const chart = echarts.init(chartContainer);

    // 处理数据格式
    const processedData = interventionDistributionData.map(item => ({
        name: item.name,
        value: item.value,
        itemStyle: {
            color: item.color
        }
    }));

    // 设置图表配置项
    const option = {
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderColor: 'transparent',
            textStyle: {
                color: '#fff'
            },
            formatter: function(params) {
                return `${params.marker} ${params.name}<br/>占比: ${params.percent}%<br/>数量: ${params.value}`;
            }
        },
        legend: {
            orient: 'horizontal',
            bottom: 10,
            left: 'center',
            textStyle: {
                color: '#666',
                fontSize: '12'
            },
            itemGap: 15
        },
        toolbox: {
            feature: {
                saveAsImage: {
                    pixelRatio: 2,
                    backgroundColor: '#fff'
                }
            },
            right: 10,
            top: 10
        },
        series: [
            {
                name: '干预类型分布',
                type: 'pie',
                radius: ['45%', '70%'],
                avoidLabelOverlap: false,
                center: ['50%', '45%'],
                itemStyle: {
                    borderRadius: 8,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '14',
                        fontWeight: 'bold',
                        color: '#333'
                    }
                },
                labelLine: {
                    show: false
                },
                data: processedData
            }
        ]
    };

    // 应用图表配置
    chart.setOption(option);

    // 响应式调整
    window.addEventListener('resize', function() {
        chart.resize();
    });
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

// ECharts已经内置了工具提示功能，不再需要自定义tooltip函数

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