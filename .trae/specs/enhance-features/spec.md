# 星心自闭症支持系统功能增强规格

## Why
当前系统已完成基本结构，需要增强以下功能：
1. 侧边栏各模块需要完整的页面内容
2. AI助手需要完整的对话界面
3. 需要添加登录功能（Mock版）
4. 首屏加载动画需要使用GSAP实现更温和的效果

## What Changes
- 完善各模块的详细页面内容
- 新增AI助手对话界面（替代外部iframe）
- 新增Mock登录界面
- 首屏加载动画使用GSAP重新实现

## Impact
- Affected files: index.html, CSS/loading.css, CSS/login.css, CSS/chat.css, JS/loading.js, JS/login.js, JS/chat.js
- 新增3个CSS文件和3个JS文件

## ADDED Requirements

### Requirement: 首屏GSAP加载动画
The system SHALL provide a gentle loading animation using GSAP.

#### Scenario: 页面加载
- **WHEN** 用户打开页面
- **THEN** 显示柔和的渐变背景 + 星星动画 + 加载文字
- **动画效果**:
  - 星星粒子缓慢飘动（从下往上）
  - 标题文字渐入（opacity + y轴移动）
  - 加载指示器脉动动画
  - 1.5秒后渐出，进入主页面

### Requirement: Mock登录界面
The system SHALL provide a mock login interface.

#### Scenario: 登录页面
- **WHEN** 用户访问登录入口
- **THEN** 显示登录表单：
  - 用户名输入框（默认: admin）
  - 密码输入框（默认: 123456）
  - 记住我复选框
  - 登录按钮
- **登录成功**:
  - 显示欢迎消息
  - 隐藏登录按钮，显示用户名
  - 模拟1秒延迟后进入

### Requirement: AI助手对话界面
The system SHALL provide an integrated chat interface.

#### Scenario: 对话界面
- **WHEN** 用户打开AI助手
- **THEN** 显示对话界面：
  - 标题栏（星语助手 + 关闭按钮）
  - 对话消息区域（滚动）
  - 快捷问题按钮
  - 输入框 + 发送按钮
- **功能**:
  - 预设常见问题快速回复
  - 用户消息右侧显示
  - AI消息左侧显示，带头像
  - 消息时间戳
  - 输入框支持Enter发送

### Requirement: 各模块详细页面
The system SHALL provide complete page content for each module.

#### Scenario: 星光总览页面
- **WHEN** 用户访问星光总览
- **THEN** 显示：
  - 欢迎标语 + 系统介绍
  - 6个统计卡片（用户/家庭/儿童数量、服务次数、干预记录、预约量）
  - 快捷操作按钮

#### Scenario: 趋势洞察页面
- **WHEN** 用户访问趋势洞察
- **THEN** 显示：
  - 时间范围切换标签（月度/季度/年度）
  - 3个图表卡片（使用ECharts占位）
  - 数据解读说明

#### Scenario: 干预引路各子页面
- **WHEN** 用户访问干预引路各子模块
- **THEN** 显示：
  - 成长指引：早期识别指南、发展阶段、分龄建议
  - 日常训练：4类训练任务卡片
  - 行为陪伴：情绪安抚、问题行为引导、沟通技巧

#### Scenario: 知识库各子页面
- **WHEN** 用户访问知识库各子模块
- **THEN** 显示：
  - 科普小课堂：文章列表
  - 康复手记：案例展示
  - 家长加油站：心理疏导内容
  - 资料下载：资源列表

#### Scenario: 服务中心各子页面
- **WHEN** 用户访问服务中心各子模块
- **THEN** 显示：
  - 预约陪伴：预约表单
  - 守护团队：6位成员介绍卡片

#### Scenario: 关于我们各子页面
- **WHEN** 用户访问关于我们各子模块
- **THEN** 显示：
  - 星心简介：机构介绍、成立初衷
  - 守护理念：4大价值观卡片
  - 联系我们：联系方式
  - 加入我们：招募信息

## MODIFIED Requirements
### Requirement: 悬浮按钮
- 点击后打开内置对话界面（替代外部iframe）

## REMOVED Requirements
- 移除外部Uify iframe集成
