// 等待 DOM 加载完成后再初始化图表
document.addEventListener("DOMContentLoaded", function () {
  // 等待窗口加载完成
  window.addEventListener("load", function () {
    initializeCharts();
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
  m1.setOption(option1);

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
  m2.setOption(option2);

  // 响应窗口大小变化

  const chartk = echarts.init(document.getElementById("kechart"));

  // 1. 优化后的数据结构（增加层级标识，方便样式区分）
  const treeData = [
    {
      name: "自闭症知识库",
      depth: 0, // 根节点
      children: [
        {
          name: "基础知识",
          depth: 1, // 一级分类
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

  // 2. 优化后的配置项
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
        orient: "LR", // 从左到右布局
        // layout: "orthogonal", // 改为正交布局
        // orient: "vertical",
        symbol: "rect", // 节点形状：矩形
        symbolSize: (value, params) => {
          // 不同层级节点大小不同
          return params.data.depth === 0
            ? [200, 60] // 根节点宽高
            : params.data.depth === 1
            ? [160, 50] // 一级节点
            : [140, 40]; // 二级节点
        },
        symbolOffset: [0, 0],
        label: {
          show: true,
          position: "inside", // 文字在节点内部
          fontSize: 28,
          verticalAlign: "middle",
          align: "center",
          fontSize: (params) => {
            return params.data.depth === 0 ? 16 : 14;
          },
          fontWeight: (params) => {
            return params.data.depth <= 1 ? "bold" : "normal";
          },
          color: "#fff", // 文字白色，与节点背景对比
          fontFamily: "Arial, sans-serif",
        },
        itemStyle: {
          // 节点样式（不同层级不同颜色）
          color: (params) => {
            const colors = [
              "#3b82f6", // 根节点：蓝色
              "#10b981", // 一级节点：绿色
              "#6366f1", // 二级节点：靛蓝色
            ];
            return colors[params.data.depth];
          },
          borderRadius: 8, // 圆角
          borderWidth: 0,
          shadowBlur: 5, // 阴影
          shadowColor: "rgba(0,0,0,0.1)",
        },
        lineStyle: {
          // 连接线样式
          color: "#94a3b8", // 浅灰蓝色
          width: 1.2,
          type: "dashed", // 虚线，更柔和
          curveness: 0.3, // 轻微弯曲，更自然
        },
        emphasis: {
          // 悬停效果
          itemStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(59, 130, 246, 0.3)", // 同色系阴影
            scale: 1.05, // 轻微放大
          },
        },
        expandAndCollapse: true,
        animationDuration: 600, // 展开/折叠动画更流畅
        animationEasing: "cubicOut",
        initialTreeDepth: 1, // 初始展开根节点+一级节点
        distance: 100, // 同层级节点间距（加大避免拥挤）
        levelDistance: 120, // 层级间距（加大提升清晰度）
        // 折叠/展开图标自定义
        expandAndCollapseIcon: {
          value: "▶", // 展开图标
          fontSize: 16,
          color: "#666",
        },
        collapseIcon: {
          value: "▼", // 折叠图标
          fontSize: 16,
          color: "#666",
        },
      },
    ],
  };

  chartk.setOption(optionk);

  // 3. 点击事件（保留交互性）
  chartk.on("click", function (params) {
    if (params.componentType === "tree") {
      const nodeName = params.data.name;
      const nodeDepth = params.data.depth;

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
        console.log("查看详情：", nodeName);
        window.open(
          "https://www.baidu.com/s?wd=" +
            "自闭症" +
            encodeURIComponent(nodeName)
        );
      }
    }
  });

  // 窗口自适应
  window.addEventListener("resize", () => chartk.resize());
  setTimeout(() => {
    // chartk.resize();
    m1.resize();
    m2.resize();
  }, 100);
}
