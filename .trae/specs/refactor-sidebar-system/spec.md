# 星心自闭症支持系统重构规格

## Why
当前系统需要按照新的业务逻辑重新组织，将原有的分散模块整合为5大核心模块（数据总览、干预引路、知识库、服务中心、关于我们），并优化用户体验，使内容结构更清晰、导航更直观。

## What Changes
- **数据总览模块**: 整合星光总览和趋势洞察，展示系统核心数据指标
- **干预引路模块**: 重构为成长指引、日常训练、行为陪伴三个子模块
- **知识库模块**: 重构为科普小课堂、康复手记、家长加油站、资料下载四个子模块
- **服务中心模块**: 合并预约和守护团队，优化为预约陪伴和守护团队
- **关于我们模块**: 新增星心简介、守护理念、联系我们、加入我们
- **悬浮按钮**: 保留星语助手，提供智能问答和快捷咨询入口

## Impact
- Affected files: index.html, CSS/*, JS/*
- 需要创建新的模块HTML结构和对应的CSS/JS文件
- 侧边栏导航需要完全重构

## ADDED Requirements

### Requirement: 数据总览模块
The system SHALL provide a comprehensive data overview dashboard.

#### Scenario: 星光总览
- **WHEN** 用户访问数据总览页面
- **THEN** 系统应展示：
  - 用户/家庭/儿童数量统计
  - 服务次数、干预记录、预约量等核心指标
  - 实时数据更新和趋势指示

#### Scenario: 趋势洞察
- **WHEN** 用户查看趋势洞察
- **THEN** 系统应展示：
  - 成长趋势图表
  - 服务趋势分析
  - 行为变化趋势可视化

### Requirement: 干预引路模块
The system SHALL provide intervention guidance with three sub-modules.

#### Scenario: 成长指引
- **WHEN** 用户访问成长指引
- **THEN** 系统应提供：
  - 自闭症早期识别指南
  - 发展阶段特点说明
  - 分龄成长建议
  - 家庭观察要点

#### Scenario: 日常训练
- **WHEN** 用户访问日常训练
- **THEN** 系统应提供：
  - 生活自理训练任务
  - 社交技能训练
  - 语言能力训练
  - 感统训练小任务

#### Scenario: 行为陪伴
- **WHEN** 用户访问行为陪伴
- **THEN** 系统应提供：
  - 情绪安抚方法
  - 问题行为引导策略
  - 家长沟通技巧
  - 陪伴心态建议

### Requirement: 知识库模块
The system SHALL provide a comprehensive knowledge base.

#### Scenario: 科普小课堂
- **WHEN** 用户访问科普小课堂
- **THEN** 系统应提供：
  - 自闭症基础科普文章
  - 常见误区辟谣
  - 专业但易懂的知识内容

#### Scenario: 康复手记
- **WHEN** 用户访问康复手记
- **THEN** 系统应展示：
  - 康复案例分享
  - 真实成长故事
  - 老师/家长/孩子的经验记录

#### Scenario: 家长加油站
- **WHEN** 用户访问家长加油站
- **THEN** 系统应提供：
  - 家长心理疏导内容
  - 压力缓解方法
  - 育儿心态指导
  - 家庭支持资源

#### Scenario: 资料下载
- **WHEN** 用户访问资料下载
- **THEN** 系统应提供：
  - 评估表下载
  - 训练记录表
  - 干预手册
  - 宣传材料

### Requirement: 服务中心模块
The system SHALL integrate appointment and team services.

#### Scenario: 预约陪伴
- **WHEN** 用户需要预约服务
- **THEN** 系统应提供：
  - 咨询预约表单
  - 线下服务预约
  - 预约进度查询
  - 取消/改期功能

#### Scenario: 守护团队
- **WHEN** 用户查看守护团队
- **THEN** 系统应展示：
  - 特教老师介绍
  - 心理咨询师介绍
  - 康复师介绍
  - 团队理念和专业背景

### Requirement: 关于我们模块
The system SHALL provide organization information.

#### Scenario: 星心简介
- **WHEN** 用户访问星心简介
- **THEN** 系统应展示机构介绍、成立初衷、使命愿景

#### Scenario: 守护理念
- **WHEN** 用户访问守护理念
- **THEN** 系统应展示价值观：尊重、陪伴、科学、温暖

#### Scenario: 联系我们
- **WHEN** 用户需要联系
- **THEN** 系统应提供地址、电话、微信、咨询渠道

#### Scenario: 加入我们
- **WHEN** 用户希望加入
- **THEN** 系统应提供志愿者招募、人才招聘、合作意向入口

### Requirement: 星语助手悬浮按钮
The system SHALL provide a floating assistant button.

#### Scenario: 智能问答
- **WHEN** 用户点击星语助手
- **THEN** 系统应提供科普、训练、情绪问题的快速解答

#### Scenario: 快捷咨询
- **WHEN** 用户需要咨询
- **THEN** 系统应提供快捷咨询入口，全程陪伴

## MODIFIED Requirements
### Requirement: 侧边栏导航
- 重构为5大模块结构
- 每个模块包含对应的子菜单
- 支持展开/收起功能
- 当前选中状态高亮显示

## REMOVED Requirements
### Requirement: 旧版分散模块
**Reason**: 模块结构重组，整合为新的5大模块体系
**Migration**: 原有功能迁移至新模块对应位置
