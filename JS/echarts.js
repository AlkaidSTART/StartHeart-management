// 等待 DOM 加载完成后再初始化图表
document.addEventListener("DOMContentLoaded", function () {
  // 等待窗口加载完成
  window.addEventListener("load", function () {
    // 添加一个小延迟确保所有资源加载完成
    setTimeout(function () {
      initializeCharts();
    }, 1000);
  });
});

function initializeCharts() {
  // 初始化第一个图表
  let m1 = echarts.init(document.getElementById("chart1"), "vintage");
  let option1 = {
    title: {
      text: "八年轨迹：自闭症群体增长趋势观察",
    },
    tooltip: {
      trigger: "axis",
    },
    dataset: {
      source: [
        [
          "year",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
          "2025",
        ],
        ["number", 1080, 1120, 1160, 1200, 1240, 1280, 1320, 1360],
      ],
    },
    xAxis: {
      type: "category",
      name: "年份",
    },
    yAxis: {
      type: "value",
      name: "诊断数量（万）",
    },
    series: [
      {
        name: "自闭症数量",
        type: "bar",
        realtimeSort: true,
        seriesLayoutBy: "row",
        encode: {
          x: 0,
          y: 1,
        },
      },
    ],
    legend: {
      bottom: 0,
      data: ["自闭症数量"],
    },
    animationDuration: 3000,
    animationDurationUpdate: 3000,
    animationEasing: "linear",
    animationEasingUpdate: "linear",
  };

  // 初始化第二个图表
  let m2 = echarts.init(document.getElementById("chart2"), "vintage");
  let option2 = {
    title: {
      text: "性别分布",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "bottom",
    },
    series: [
      {
        name: "性别分布",
        type: "pie",
        radius: ["40%", "70%"],
        data: [
          { value: 1080, name: "男生" },
          { value: 280, name: "女生" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  // 获取当前模块ID
  const modules = document.querySelectorAll("main > section");
  modules.forEach((module) => {
    const moduleID = module.id;
    if (moduleID === "home") {
      m1.setOption(option1);
      m2.setOption(option2);
    }
  });

  // 初始化知识库树状图
  const kechartContainer = document.getElementById("kechart");
  if (!kechartContainer) {
    console.error("找不到ID为kechart的元素");
    return;
  }

  const chartk = echarts.init(kechartContainer);

  // 数据结构
  const treeData = [
    {
      name: "自闭症知识库",
      depth: 0,
      children: [
        {
          name: "基础知识",
          depth: 1,
          children: [
            { name: "定义与诊断标准", depth: 2 },
            { name: "谱系障碍的类型", depth: 2 },
            { name: "常见误解与科学认知", depth: 2 },
          ],
        },
        {
          name: "家庭支持指南",
          depth: 1,
          children: [
            { name: "家庭干预技巧", depth: 2 },
            { name: "兄弟姐妹支持", depth: 2 },
            { name: "家长心理健康", depth: 2 },
          ],
        },
        {
          name: "教育与学校适应",
          depth: 1,
          children: [
            { name: "融合教育资源", depth: 2 },
            { name: "IEP计划制定", depth: 2 },
            { name: "课堂适应策略", depth: 2 },
          ],
        },
      ],
    },
  ];

  const optionk = {
    title: {
      text: "自闭症知识库体系",
      left: "center",
      top: 10,
      textStyle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#2c3e50",
        fontFamily: "Arial, sans-serif",
      },
      subtext: "点击二级节点查看详情",
      subtextStyle: {
        fontSize: 14,
        color: "#666",
      },
    },
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(255,255,255,0.9)",
      borderColor: "#e0e0e0",
      borderWidth: 1,
      borderRadius: 6,
      padding: [8, 12],
      formatter: "{b}",
      textStyle: { color: "#333", fontSize: 14 },
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
    series: [
      {
        type: "tree",
        data: treeData,
        layout: "vertical",
        orient: "LR",
        symbol: "rect",
        symbolSize: (value, params) => {
          return params.data.depth === 0
            ? [200, 60]
            : params.data.depth === 1
            ? [160, 50]
            : [140, 40];
        },
        symbolOffset: [0, 0],
        label: {
          show: true,
          position: "inside",
          fontSize: 28,
          verticalAlign: "middle",
          align: "center",
          fontSize: (params) => {
            return params.data.depth === 0 ? 16 : 14;
          },
          fontWeight: (params) => {
            return params.data.depth <= 1 ? "bold" : "normal";
          },
          color: "#fff",
          fontFamily: "Arial, sans-serif",
        },
        itemStyle: {
          color: (params) => {
            const colors = ["#3b82f6", "#10b981", "#6366f1"];
            return colors[params.data.depth];
          },
          borderRadius: 8,
          borderWidth: 0,
          shadowBlur: 5,
          shadowColor: "rgba(0,0,0,0.1)",
        },
        lineStyle: {
          color: "#94a3b8",
          width: 1.2,
          type: "dashed",
          curveness: 0.3,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(59, 130, 246, 0.3)",
            scale: 1.05,
          },
        },
        expandAndCollapse: true,
        animationDuration: 600,
        animationEasing: "cubicOut",
        initialTreeDepth: 1,
        distance: 100,
        levelDistance: 120,
      },
    ],
  };

  chartk.setOption(optionk);

  // 添加点击事件处理
  chartk.on("click", function (params) {
    // 添加调试日志
    console.log("节点被点击:", params);

    if (params.componentType === "series" && params.seriesType === "tree") {
      const nodeName = params.data.name;
      const nodeDepth = params.data.depth;

      console.log("节点信息:", { nodeName, nodeDepth });

      // 一级节点：切换展开/折叠
      if (nodeDepth === 1) {
        chartk.dispatchAction({
          type: "toggleTreeExpand",
          dataIndex: params.dataIndex,
          seriesIndex: 0,
        });
      }

      // 二级节点：跳转示例
      if (nodeDepth === 2) {
        console.log("准备跳转到百度搜索:", nodeName);

        // 使用try-catch捕获可能的错误
        try {
          const searchUrl =
            "https://www.baidu.com/s?wd=" +
            encodeURIComponent("自闭症" + nodeName);
          // 尝试多种方式打开链接
          const opened = window.open(searchUrl, "_blank");

          // 检查是否成功打开
          if (!opened) {
            console.warn("弹窗可能被浏览器阻止，请检查浏览器设置");
            // 提供替代方案
            alert("请允许弹窗或点击以下链接查看:\n" + searchUrl);
          }
        } catch (error) {
          console.error("打开链接时出错:", error);
        }
      }
    }
  });

  // 窗口自适应
  window.addEventListener("resize", () => chartk.resize());
  setTimeout(() => {
    m1.resize();
    m2.resize();
  }, 100);
}
