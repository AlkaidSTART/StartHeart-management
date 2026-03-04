// 性能优化脚本
document.addEventListener('DOMContentLoaded', function() {
    // 优化图片加载
    optimizeImageLoading();
    
    // 优化图表加载
    optimizeChartLoading();
    
    // 移除加载遮罩
    removeLoadingOverlay();
    
    // 预加载关键资源
    preloadCriticalResources();
});

// 优化图片加载
function optimizeImageLoading() {
    const images = document.querySelectorAll('img');
    
    // 为所有图片添加懒加载
    images.forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });
    
    // 使用 Intersection Observer 实现更智能的图片加载
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// 优化图表加载 - 延迟加载非关键图表
function optimizeChartLoading() {
    // 延迟加载非关键图表
    setTimeout(() => {
        const charts = document.querySelectorAll('[id*="chart"]');
        charts.forEach(chart => {
            if (chart.id !== 'monthlyTrendChart' && chart.id !== 'interventionPieChart') {
                // 延迟加载非关键图表
                setTimeout(() => {
                    if (typeof echarts !== 'undefined' && echarts.init) {
                        // 初始化非关键图表
                        initNonCriticalCharts();
                    }
                }, 1000);
            }
        });
    }, 500);
}

// 移除加载遮罩
function removeLoadingOverlay() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        setTimeout(() => {
            loadingOverlay.classList.add('fade-out');
            setTimeout(() => {
                loadingOverlay.remove();
            }, 500);
        }, 800);
    }
}

// 预加载关键资源
function preloadCriticalResources() {
    const criticalResources = [
        './JS/base.js',
        './JS/scripts.js'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'script';
        document.head.appendChild(link);
    });
}

// 初始化非关键图表
function initNonCriticalCharts() {
    // 这里可以添加非关键图表的初始化代码
    // 例如：其他页面的图表，可以延迟加载
}

// 添加性能监控
function monitorPerformance() {
    if ('PerformanceObserver' in window) {
        const perfObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                // 监控长任务
                if (entry.duration > 50) {
                    console.warn('Long task detected:', entry.duration + 'ms');
                }
            }
        });
        
        perfObserver.observe({ entryTypes: ['longtask'] });
    }
}

// 启动性能监控
monitorPerformance();

// 优化内存使用
function optimizeMemoryUsage() {
    // 定期清理未使用的对象
    setInterval(() => {
        if (window.gc) {
            window.gc();
        }
    }, 30000); // 每30秒执行一次垃圾回收
}

// 启动内存优化
optimizeMemoryUsage();