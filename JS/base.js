// 导航菜单切换功能
document.addEventListener("DOMContentLoaded", function () {
  // 获取所有导航链接
  const navLinks = document.querySelectorAll("nav a");

  // 获取所有内容模块
  const allModules = document.querySelectorAll("main > section");

  // 默认显示首页内容
  showModule("home");

  // 为每个导航链接添加点击事件
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // 移除所有导航链接的active类
      navLinks.forEach((l) => l.classList.remove("active"));

      // 给当前点击的链接添加active类
      this.classList.add("active");

      // 提取要显示的模块ID
      const moduleId = this.getAttribute("href").substring(1);

      // 显示相应模块
      showModule(moduleId);
    });
  });

  // 显示特定模块的函数
  function showModule(moduleId) {
    // 隐藏所有模块
    allModules.forEach((module) => {
      module.style.display = "none";
    });

    // 显示选中的模块
    const selectedModule = document.getElementById(moduleId);
    if (selectedModule) {
      selectedModule.style.display = "block";
      
      // 如果显示的是数据总览模块，初始化图表
      if (moduleId === "base") {
        initOverviewCharts();
      }
    } else if (moduleId === "home") {
      // 如果是首页但没有首页模块，显示第一个模块
      if (allModules.length > 0) {
        allModules[0].style.display = "block";
      }
    }
  }
});

// 数据总览图表初始化函数
function initOverviewCharts() {
  // 月度服务趋势图
  const monthlyTrendChart = echarts.init(document.getElementById('monthlyTrendChart'));
  const monthlyTrendOption = {
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
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
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
      name: '服务人次',
      type: 'line',
      smooth: true,
      data: [120, 132, 145, 134, 156, 167, 178, 189, 201, 195, 210, 225],
      itemStyle: {
        color: '#5B8FB9'
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(91, 143, 185, 0.3)' },
          { offset: 1, color: 'rgba(91, 143, 185, 0.1)' }
        ])
      }
    }]
  };
  monthlyTrendChart.setOption(monthlyTrendOption);

  // 干预类型分布饼图
  const interventionPieChart = echarts.init(document.getElementById('interventionPieChart'));
  const interventionPieOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      textStyle: {
        color: '#666'
      }
    },
    series: [{
      name: '干预类型',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
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
          fontSize: '18',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 335, name: 'ABA行为干预' },
        { value: 310, name: '感觉统合训练' },
        { value: 234, name: '社交技能培训' },
        { value: 135, name: '语言治疗' },
        { value: 148, name: '家庭支持' }
      ],
      color: ['#5B8FB9', '#B6E0D3', '#87CEEB', '#98D8C8', '#F7DC6F']
    }]
  };
  interventionPieChart.setOption(interventionPieOption);

  // 响应式处理
  window.addEventListener('resize', function() {
    monthlyTrendChart.resize();
    interventionPieChart.resize();
  });
}
