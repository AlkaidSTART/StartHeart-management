# 星心守护页面重构规格

## Why
当前系统页面存在以下问题需要解决：
1. 页面中使用了大量emoji图标（🎯、💪、🤝等），影响专业度
2. 许多交互按钮没有实际功能实现
3. 页面风格需要统一为干净、专业、简洁的设计
4. 需要确保所有页面的交互逻辑完整可用

## What Changes
- **移除所有emoji字符**：统一替换为Remix Icon图标
- **完善所有交互功能**：为所有按钮和交互元素添加实际功能
- **优化页面样式**：统一为干净、专业、简洁的视觉风格
- **清理冗余代码**：移除未使用的CSS和JS代码

## Impact
- Affected files: index.html, CSS/styles.css, CSS/chat.css, CSS/login.css, JS/chat.js, JS/login.js, JS/scripts.js
- 需要全面检查并修改所有页面内容

## ADDED Requirements

### Requirement: 图标统一规范
The system SHALL use only Remix Icon for all icons.

#### Scenario: 图标替换
- **WHEN** 页面渲染时
- **THEN** 所有图标使用Remix Icon（如ri-star-line, ri-user-line等）
- **AND** 不出现任何emoji字符

**需要替换的emoji映射：**
- 🎯 → ri-focus-3-line
- 💪 → ri-heart-pulse-line
- 🤝 → ri-hand-heart-line
- 📅 → ri-calendar-line
- 📚 → ri-book-open-line
- 📝 → ri-file-list-line
- ⛽ → ri-gas-station-line
- 📥 → ri-download-line
- 🩺 → ri-hospital-line
- 🔄 → ri-refresh-line
- 👫 → ri-team-line
- 🧘 → ri-meditation-line
- 💫 → ri-shining-line
- 🏢 → ri-building-line
- 💝 → ri-heart-line
- 🎯 → ri-focus-line
- 💎 → ri-vip-diamond-line
- 📍 → ri-map-pin-line
- 📱 → ri-smartphone-line
- 🕐 → ri-time-line
- 💬 → ri-chat-3-line
- 🤝 → ri-hand-heart-line
- 🙋 → ri-user-add-line
- 💼 → ri-briefcase-line
- 🤖 → ri-robot-line
- ✓ → ri-check-line
- ↑ → ri-arrow-up-line
- → → ri-arrow-right-line
- ⭐ → ri-star-fill
- ☎️ → ri-phone-line
- 💻 → ri-computer-line
- 📧 → ri-mail-line
- 🎓 → ri-graduation-cap-line
- 🏆 → ri-trophy-line
- 🏥 → ri-hospital-line
- 🏫 → ri-school-line
- 🔔 → ri-notification-line
- ⚠️ → ri-error-warning-line

### Requirement: 星光总览页面交互
The system SHALL provide complete interactions for data overview.

#### Scenario: 统计卡片
- **WHEN** 用户进入页面
- **THEN** 统计数字显示滚动动画
- **AND** 趋势指示器正确显示上升/下降状态

#### Scenario: 图表切换
- **WHEN** 用户点击时间范围按钮
- **THEN** 图表数据切换对应时间范围
- **AND** 按钮显示选中状态

### Requirement: 趋势洞察页面交互
The system SHALL provide complete interactions for trend insights.

#### Scenario: 时间筛选
- **WHEN** 用户点击月度/季度/年度按钮
- **THEN** 数据筛选为对应时间范围
- **AND** 选中按钮高亮显示

#### Scenario: 查看详情
- **WHEN** 用户点击"查看详情"按钮
- **THEN** 展开显示详细数据或弹出详情模态框

### Requirement: 成长指引页面交互
The system SHALL provide complete interactions for growth guidance.

#### Scenario: 工具包展开
- **WHEN** 用户点击"查看详情"或"了解特点"按钮
- **THEN** 展开显示详细内容或弹出详情模态框

### Requirement: 日常训练页面交互
The system SHALL provide complete interactions for daily training.

#### Scenario: 分类切换
- **WHEN** 用户点击分类标签（生活自理/社交技能/语言能力/感统训练）
- **THEN** 切换显示对应类别的训练卡片
- **AND** 选中标签高亮显示

#### Scenario: 训练卡片操作
- **WHEN** 用户点击"开始训练"按钮
- **THEN** 显示训练开始提示或跳转到训练页面

- **WHEN** 用户点击"查看详情"按钮
- **THEN** 弹出训练详情模态框

### Requirement: 行为陪伴页面交互
The system SHALL provide complete interactions for behavior companion.

#### Scenario: 方法卡片
- **WHEN** 用户点击"学习技巧"或"查看策略"按钮
- **THEN** 展开显示详细内容

### Requirement: 知识库页面交互
The system SHALL provide complete interactions for knowledge base.

#### Scenario: 分类筛选
- **WHEN** 用户点击分类标签
- **THEN** 筛选显示对应类别的文章

#### Scenario: 搜索功能
- **WHEN** 用户在搜索框输入关键词并点击搜索
- **THEN** 显示搜索结果

#### Scenario: 文章阅读
- **WHEN** 用户点击"阅读全文"或"了解真相"按钮
- **THEN** 展开显示文章详情或弹出阅读模态框

### Requirement: 资料下载页面交互
The system SHALL provide complete interactions for resources download.

#### Scenario: 下载功能
- **WHEN** 用户点击"下载"按钮
- **THEN** 显示下载提示（模拟下载功能）

### Requirement: 预约陪伴页面交互
The system SHALL provide complete interactions for appointment.

#### Scenario: 服务类型选择
- **WHEN** 用户点击服务类型卡片
- **THEN** 选中该服务类型并更新表单

#### Scenario: 表单提交
- **WHEN** 用户填写表单并点击提交
- **THEN** 验证表单数据
- **AND** 显示提交成功提示

#### Scenario: 预约查询
- **WHEN** 用户输入预约编号并点击查询
- **THEN** 显示预约状态信息

### Requirement: 加入我们页面交互
The system SHALL provide complete interactions for join us.

#### Scenario: 志愿者申请
- **WHEN** 用户点击"申请成为志愿者"按钮
- **THEN** 弹出申请表单模态框

#### Scenario: 合作意向提交
- **WHEN** 用户填写合作表单并提交
- **THEN** 验证数据并显示提交成功提示

### Requirement: 星语助手交互
The system SHALL provide complete chat functionality.

#### Scenario: 对话功能
- **WHEN** 用户发送消息
- **THEN** 显示用户消息并回复AI消息

#### Scenario: 快捷问题
- **WHEN** 用户点击快捷问题按钮
- **THEN** 自动发送该问题并显示回复

### Requirement: 登录功能
The system SHALL provide complete login functionality.

#### Scenario: 登录流程
- **WHEN** 用户输入账号密码并点击登录
- **THEN** 验证账号密码
- **AND** 登录成功后更新用户状态

#### Scenario: 退出登录
- **WHEN** 用户点击退出登录
- **THEN** 清除登录状态并更新界面

## MODIFIED Requirements
### 页面样式统一
- 统一使用简洁的卡片设计
- 统一按钮样式和交互反馈
- 统一颜色主题（暖蓝色调）
- 统一字体和间距

## REMOVED Requirements
### 移除emoji
- 移除所有emoji字符
- 统一使用Remix Icon图标库
