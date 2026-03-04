// 星语助手聊天功能增强版
document.addEventListener('DOMContentLoaded', function() {
    initializeXingyuAssistant();
});

function initializeXingyuAssistant() {
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');
    const clearChatBtn = document.getElementById('clearChat');
    const voiceToggle = document.getElementById('voiceToggle');
    const functionButtons = document.querySelectorAll('.function-btn');
    const suggestionButtons = document.querySelectorAll('.suggestion-btn');

    // 综合问答数据库
    const qaDatabase = {
        // 基础知识类
        '什么是自闭症': {
            type: 'knowledge',
            response: `自闭症谱系障碍（ASD）是一种神经发育性障碍，主要表现为：

🔍 **核心特征**：
• 社交沟通障碍
• 刻板重复行为
• 兴趣范围狭窄
• 感官处理异常

📊 **统计数据**：
• 发病率：约1/54（美国CDC数据）
• 男女比例：4:1
• 早期识别：18个月可初步筛查

🎯 **重要提醒**：
• 每个自闭症儿童都是独特的
• 早期干预效果显著
• 需要个体化支持方案
• 家庭参与至关重要

想了解更多具体信息吗？比如诊断标准、干预方法等。`
        },

        '早期识别': {
            type: 'knowledge',
            response: `🚨 **早期预警信号（12-18个月）**：

**社交沟通方面**：
• 缺乏共同注意（不指、不看、不说）
• 对名字呼唤无反应
• 缺乏眼神接触
• 不会展示或分享物品

**行为模式**：
• 刻板重复动作（摇晃、旋转）
• 对玩具的不寻常使用方式
• 过度关注某些物品或部分
• 抗拒日常变化

**语言发展**：
• 语言发育迟缓或倒退
• 缺乏功能性语言使用
• 重复性语言（仿说、电视语言）

🩺 **专业筛查工具**：
• M-CHAT-R（改良婴幼儿自闭症筛查量表）
• STAT（自闭症筛查工具）
• ADOS（自闭症诊断观察量表）

如果您观察到这些信号，建议及时咨询专业医生。我可以为您提供更多筛查资源。`
        },

        // 干预方法类
        'ABA训练': {
            type: 'intervention',
            response: `🎯 **ABA（应用行为分析）详解**：

**基本原理**：
• 行为学原理应用
• 正向强化技术
• 数据驱动决策
• 个体化方案设计

📋 **实施步骤**：
1. **评估阶段**：功能性行为评估（FBA）
2. **目标设定**：SMART目标制定
3. **干预实施**：DTT、NET等技术
4. **数据收集**：系统性记录分析
5. **效果评估**：定期回顾调整

📊 **循证效果**：
• 语言技能提升：平均65%改善
• 社交技能：显著进步率78%
• 问题行为：减少率82%
• 认知能力：提升率71%

⏰ **训练强度建议**：
• 早期干预：25-40小时/周
• 学龄期：15-25小时/周
• 维持期：5-10小时/周

💡 **家庭配合要点**：
• 保持一致性
• 数据记录准确
• 及时沟通交流
• 泛化训练重要

需要我帮您制定具体的ABA训练计划吗？`
        },

        '感觉统合': {
            type: 'intervention',
            response: `⚖️ **感觉统合训练完整指南**：

**理论基础**：
• 感觉输入整合理论
• 神经可塑性原理
• 适应性反应发展

🎯 **训练目标**：
• 改善感觉调节能力
• 增强身体协调性
• 提升注意力和专注
• 减少感觉防御行为

🏃‍♂️ **前庭觉训练活动**：
• 秋千（直线、旋转、摆动）
• 滑梯（直线、螺旋）
• 跳跃（蹦床、跳绳）
• 旋转（转椅、旋转盘）

💪 **本体觉训练活动**：
• 推拉重物（推车、搬箱子）
• 攀爬（攀岩墙、绳网）
• 关节挤压（按摩、拥抱）
• 重量活动（举重、沙袋）

👋 **触觉训练活动**：
• 不同质地探索（沙盘、豆袋）
• 触觉脱敏（刷子、振动器）
• 手工活动（黏土、手指画）
• 水疗活动（游泳、水游戏）

⚠️ **安全注意事项**：
• 专业评估先行
• 循序渐进原则
• 观察孩子反应
• 避免过度刺激

需要我为您制定个性化的感觉统合训练方案吗？`
        },

        // 社交技能类
        '社交技能训练': {
            type: 'social',
            response: `👥 **社交技能训练系统化方案**：

**训练层级**：
• **基础技能**：眼神接触、共同注意、模仿能力
• **互动技能**：轮流对话、分享展示、合作游戏
• **高级技能**：情绪理解、观点采择、冲突解决

🎭 **训练方法**：

**1. 社交故事法**：
• 个性化故事编写
• 情境预演练习
• 视觉支持工具
• 泛化应用训练

**2. 视频建模法**：
• 同龄人示范视频
• 逐步分解动作
• 重复观看练习
• 实际情境应用

**3. 角色扮演法**：
• 结构化角色设定
• 安全练习环境
• 即时反馈指导
• 技能逐步建构

**4. 团体训练法**：
• 3-6人小组设置
• 结构化活动设计
• 同伴互动机会
• 社交规则学习

📈 **进展评估指标**：
• 主动发起互动频率
• 维持对话时长
• 适当回应比例
• 情绪调节能力
• 同伴关系质量

🎯 **家庭延伸活动**：
• 家庭游戏时间
• 社区活动参与
• 兄弟姐妹互动
• 宠物照料活动

需要我为您设计具体的社交技能训练计划吗？`
        },

        // 情绪管理类
        '情绪管理': {
            type: 'emotional',
            response: `😊 **情绪管理能力培养方案**：

**发展阶段理论**：
• **识别阶段**：认识基本情绪
• **理解阶段**：理解情绪原因
• **表达阶段**：适当表达情绪
• **调节阶段**：有效管理情绪

🎨 **情绪识别训练**：

**视觉支持工具**：
• 情绪卡片（表情图片）
• 情绪温度计（1-10分级）
• 情绪颜色编码（红-愤怒，蓝-悲伤等）
• 情绪日记模板

**训练活动**：
• 表情模仿游戏
• 情绪配对练习
• 情境情绪判断
• 镜子表情观察

🛠️ **情绪调节策略**：

**身体调节**：
• 深呼吸练习（4-7-8呼吸法）
• 肌肉放松训练
• 感觉调节活动（压力球、weighted blanket）
• 运动释放（跑步、跳跃）

**认知调节**：
• 积极自我对话
• 重新评估情境
• 问题解决思维
• 注意力转移技巧

**环境调节**：
• 安全空间设置
• 减少感官刺激
• 预测性环境
• 选择权给予

⚠️ **问题行为处理**：
• 预防策略优先
• 功能性行为评估
• 替代行为教导
• 危机干预预案

需要我帮您制定个性化的情绪管理支持计划吗？`
        },

        // 家庭支持类
        '家庭支持': {
            type: 'family',
            response: `🏠 **家庭支持系统建设指南**：

**家长心理健康**：
• 接受诊断过程支持
• 压力管理技巧
• 自我关怀实践
• 支持网络建立
• 专业心理咨询

👨‍👩‍👧‍👦 **家庭关系维护**：
• 夫妻关系协调
• 兄弟姐妹支持
• 扩展家庭教育
• 家庭会议制度
• 共同目标设定

📋 **日常生活管理**：

**结构化日程**：
• 可视化时间表
• 过渡提醒策略
• 活动预告系统
• 灵活调整机制

**家务参与**：
• 适合能力任务
• 视觉指导系统
• 逐步责任增加
• 成功体验创造

**休闲活动**：
• 家庭传统建立
• 共同兴趣培养
• 户外活动规划
• 庆祝活动适应

💰 **经济资源管理**：
• 干预费用规划
• 保险政策了解
• 政府补助申请
• 社区资源利用
• 税务优惠了解

🤝 **支持网络建设**：
• 家长互助群体
• 专业团队联系
• 社区资源整合
• 在线平台利用
• 志愿服务参与

需要我为您提供具体的家庭支持资源清单吗？`
        },

        // 教育支持类
        '教育支持': {
            type: 'education',
            response: `🎓 **教育支持全程指导**：

**学前教育阶段**：
• 融合教育准备
• 个别化教育计划(IEP)
• 转衔计划制定
• 家长-学校合作

🏫 **义务教育支持**：

**普通学校融合**：
• 资源教师配置
• 同伴支持项目
• 课程调整适应
• 考试评估安排

**特殊教育服务**：
• 特教学校选择
• 专业师资配备
• 康复训练整合
• 职业技能培养

📋 **IEP计划制定**：

**核心要素**：
• 现状评估报告
• 年度目标设定
• 短期目标分解
• 服务提供安排
• 进展评估机制

**目标领域**：
• 学业技能发展
• 社交沟通提升
• 生活自理能力
• 职业技能准备
• 休闲技能培养

🎯 **学习策略支持**：

**视觉支持**：
• 图片交换系统
• 视觉时间表
• 工作分析图表
• 提示卡系统

**结构化教学**：
• 环境结构化
• 时间表结构化
• 工作系统结构化
• 视觉结构化

**注意力管理**：
• 环境干扰减少
• 任务分解细化
• 频繁休息安排
• 动机系统建立

📈 **转衔准备**：
• 中学到高中转衔
• 高中到大学转衔
• 学校到职场转衔
• 家庭到社区转衔

需要我帮您制定具体的教育支持计划吗？`
        },

        // 进展评估类
        '进展评估': {
            type: 'assessment',
            response: `📊 **进展评估科学化方法**：

**评估类型**：

**形成性评估**：
• 日常数据收集
• 每周进展回顾
• 月度目标检查
• 季度计划调整

**总结性评估**：
• 半年度综合评估
• 年度效果评价
• 干预方案修订
• 长期目标重设

📈 **数据收集方法**：

**量化指标**：
• 行为频率记录
• 持续时间测量
• 正确率统计
• 技能掌握度评估

**质性观察**：
• 行为质量变化
• 泛化情况观察
• 独立性提升
• 主动性表现

**标准化工具**：
• VB-MAPP（语言行为里程碑）
• ABLLS-R（基本语言和学习技能）
• AFLS（功能性生活技能）
• PEAK（提升应用知识）

🎯 **评估维度**：

**核心技能**：
• 语言沟通能力
• 社交互动技能
• 认知学习能力
• 生活自理能力
• 情绪调节能力

**功能性技能**：
• 日常生活技能
• 社区参与能力
• 休闲娱乐技能
• 职业技能准备

**行为挑战**：
• 问题行为减少
• 替代行为增加
• 自我管理提升
• 危机应对改善

📋 **报告撰写**：
• 数据可视化呈现
• 进展趋势分析
• 目标达成评价
• 下阶段建议
• 家庭指导要点

需要我帮您设计个性化的进展评估方案吗？`
        },

        // 危机干预类
        '危机干预': {
            type: 'emergency',
            response: `🚨 **危机干预紧急预案**：

**危机识别信号**：
• 自伤行为增加
• 攻击行为升级
• 极度焦虑恐慌
• 完全退缩隔离
• 睡眠饮食严重紊乱

⚡ **即时应对步骤**：

**第一步：安全确保**
• 移除危险物品
• 创造安全空间
• 减少感官刺激
• 保持冷静态度
• 避免身体约束

**第二步：情绪支持**
• 使用简短语言
• 提供选择机会
• 运用熟悉策略
• 给予充足时间
• 尊重个人空间

**第三步：专业求助**
• 联系治疗团队
• 寻求医疗支持
• 通知紧急联系人
• 记录事件详情
• 后续跟进安排

🏥 **医疗资源**：

**紧急情况**：
• 120急救电话
• 精神科急诊
• 儿童医院急诊
• 危机干预热线

**专业支持**：
• 主治医生联系
• 治疗师紧急咨询
• 心理咨询师支持
• 社会工作者协助

📞 **危机热线**：
• 全国心理援助热线：400-161-9995
• 北京回龙观医院：800-810-1117
• 上海市精神卫生中心：021-12320 转5
• 广东省危机干预热线：020-81899120

📝 **事后处理**：
• 事件详细记录
• 触发因素分析
• 预防策略调整
• 支持系统强化
• 家庭指导加强

⚠️ **重要提醒**：
如果孩子出现自伤、伤人等危险行为，请立即寻求专业医疗帮助！`
        }
    };

    // 功能按钮响应
    const functionResponses = {
        'assessment': {
            title: '📊 专业评估指导',
            content: `我可以为您提供以下评估支持：

🔍 **筛查评估**：
• M-CHAT-R婴幼儿筛查
• 早期预警信号识别
• 发展里程碑检查
• 行为观察指导

📋 **诊断评估**：
• ADOS评估介绍
• ADI-R访谈指导
• 认知能力评估
• 语言能力评估

📈 **进展评估**：
• VB-MAPP里程碑评估
• ABLLS-R技能评估
• AFLS生活技能评估
• 个性化目标设定

请告诉我孩子的具体情况，我会为您推荐最适合的评估工具。`
        },
        'intervention': {
            title: '🎯 干预方案制定',
            content: `让我为您制定个性化干预方案：

🏥 **医学干预**：
• 药物治疗咨询
• 营养补充建议
• 睡眠管理方案
• 共患病处理

🧠 **行为干预**：
• ABA应用行为分析
• 正向行为支持
• 关键反应训练
• 早期介入丹佛模式

🗣️ **沟通训练**：
• 言语语言治疗
• PECS图片交换系统
• 辅助沟通技术
• 社交沟通训练

👥 **社交技能**：
• 社交故事训练
• 团体技能训练
• 同伴支持项目
• 情绪管理训练

请描述孩子的主要挑战，我会为您推荐循证有效的干预方法。`
        },
        'knowledge': {
            title: '📚 专业知识库',
            content: `我拥有丰富的专业知识，涵盖：

🧠 **基础理论**：
• 自闭症谱系障碍概述
• 神经发育机制
• 遗传和环境因素
• 共患病介绍

🔬 **诊断标准**：
• DSM-5诊断标准
• ICD-11分类系统
• 早期识别指标
• 鉴别诊断要点

🎯 **干预方法**：
• 循证干预实践
• 治疗方法比较
• 效果评估指标
• 个体化方案设计

🏠 **家庭支持**：
• 家庭适应过程
• 兄弟姐妹支持
• 经济资源管理
• 社会支持网络

您想了解哪个方面的知识？我可以为您提供详细、专业的解答。`
        },
        'emergency': {
            title: '🚨 紧急支持服务',
            content: `我理解您可能遇到了紧急情况。请保持冷静，我会为您提供：

⚡ **即时指导**：
• 危机情况识别
• 安全保护措施
• 情绪稳定技巧
• 沟通支持方法

🏥 **医疗资源**：
• 紧急医疗联系
• 精神科急诊信息
• 危机干预热线
• 专业团队支持

📞 **热线支持**：
• 全国心理援助热线：400-161-9995
• 各地精神卫生中心
• 在线专业咨询
• 家长互助热线

📝 **后续跟进**：
• 事件记录分析
• 预防策略制定
• 支持系统强化
• 专业转介服务

请告诉我具体情况，我会立即为您提供针对性的支持和指导。`
        },
        'progress': {
            title: '📈 进展跟踪指导',
            content: `进展跟踪对干预效果至关重要：

📊 **数据收集**：
• 行为频率记录
• 技能掌握评估
• 目标达成测量
• 泛化情况观察

📋 **评估工具**：
• VB-MAPP里程碑
• ABLLS-R技能评估
• AFLS功能性评估
• PEAK应用知识评估

📈 **进展分析**：
• 趋势图表制作
• 目标调整建议
• 干预策略优化
• 下阶段规划

🎯 **家庭参与**：
• 日常数据记录
• 技能泛化支持
• 环境一致性
• 庆祝成功时刻

我可以帮您建立科学的进展跟踪系统，确保干预效果最大化。`
        },
        'resources': {
            title: '🌟 资源推荐服务',
            content: `我为您精选优质资源：

📚 **专业书籍**：
• 《自闭症儿童社交游戏训练》
• 《应用行为分析入门》
• 《感觉统合理论与实践》
• 《自闭症儿童家长指南》

🏥 **专业机构**：
• 各地儿童医院发育行为科
• 精神卫生中心儿童科
• 康复中心自闭症科
• 特殊教育学校资源

🌐 **在线平台**：
• 自闭症之声（Autism Speaks）
• 国家自闭症中心
• 中国精神残疾人及亲友协会
• 各地家长互助组织

💰 **经济支持**：
• 政府补助政策
• 医疗保险覆盖
• 慈善基金申请
• 税务优惠政策

请告诉我您的具体需求，我会为您推荐最适合的资源。`
        }
    };

    // 快速建议问题库
    const suggestionQuestions = [
        '我的孩子3岁了还不会说话，该怎么办？',
        '孩子总是重复某些动作，这是刻板行为吗？',
        '如何帮助孩子改善眼神接触？',
        '孩子情绪爆发时我该如何应对？',
        'ABA训练每天需要多长时间？',
        '感觉统合训练适合所有自闭症儿童吗？',
        '如何为孩子制定合适的IEP目标？',
        '兄弟姐妹如何与自闭症兄弟姐妹相处？',
        '孩子上学需要哪些特殊安排？',
        '如何判断干预方法是否有效？'
    ];

    // 发送消息功能
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;

        // 添加用户消息
        addMessage(message, 'user');
        
        // 清空输入框
        chatInput.value = '';
        
        // 显示输入状态
        showTypingIndicator();
        
        // 模拟AI思考时间
        setTimeout(() => {
            hideTypingIndicator();
            generateAIResponse(message);
        }, 1500 + Math.random() * 1000);
    }

    // 添加消息到聊天区域
    function addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.textContent = sender === 'user' ? '👤' : '🤖';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        if (typeof content === 'string') {
            // 处理换行符和列表
            const lines = content.split('\n');
            lines.forEach(line => {
                if (line.trim() === '') {
                    const br = document.createElement('br');
                    contentDiv.appendChild(br);
                } else if (line.startsWith('•') || line.startsWith('-')) {
                    const li = document.createElement('li');
                    li.textContent = line.substring(1).trim();
                    li.style.marginLeft = '20px';
                    li.style.marginBottom = '5px';
                    contentDiv.appendChild(li);
                } else if (line.match(/^\d+\./)) {
                    const li = document.createElement('li');
                    li.textContent = line.substring(line.indexOf('.') + 1).trim();
                    li.style.marginLeft = '20px';
                    li.style.marginBottom = '5px';
                    li.style.listStyle = 'decimal';
                    contentDiv.appendChild(li);
                } else if (line.includes('**')) {
                    const strong = document.createElement('strong');
                    strong.innerHTML = line.replace(/\*\*/g, '');
                    strong.style.color = '#6B9FD5';
                    strong.style.display = 'block';
                    strong.style.marginBottom = '10px';
                    contentDiv.appendChild(strong);
                } else if (line.includes('🎯') || line.includes('📊') || line.includes('💡') || line.includes('⚠️') || line.includes('🚨') || line.includes('🏥') || line.includes('📋') || line.includes('🌟') || line.includes('📚') || line.includes('👥') || line.includes('😊') || line.includes('🏠') || line.includes('🎓') || line.includes('📈') || line.includes('⚡') || line.includes('🌐') || line.includes('💰') || line.includes('🤝') || line.includes('🏃‍♂️') || line.includes('💪') || line.includes('👋') || line.includes('⚖️')) {
                    const emojiLine = document.createElement('div');
                    emojiLine.innerHTML = line;
                    emojiLine.style.fontSize = '1.1em';
                    emojiLine.style.marginBottom = '10px';
                    contentDiv.appendChild(emojiLine);
                } else {
                    const p = document.createElement('p');
                    p.textContent = line;
                    p.style.marginBottom = '10px';
                    contentDiv.appendChild(p);
                }
            });
        } else {
            contentDiv.appendChild(content);
        }
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        chatMessages.appendChild(messageDiv);
        
        // 滚动到底部
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // 显示输入状态
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message assistant-message typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // 隐藏输入状态
    function hideTypingIndicator() {
        const typingIndicator = chatMessages.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // 生成AI回复
    function generateAIResponse(userMessage) {
        // 搜索关键词匹配
        let bestMatch = null;
        let bestMatchScore = 0;

        // 遍历问答数据库寻找最佳匹配
        for (const [key, data] of Object.entries(qaDatabase)) {
            const score = calculateSimilarity(userMessage, key);
            if (score > bestMatchScore && score > 0.3) { // 相似度阈值
                bestMatch = { key, data };
                bestMatchScore = score;
            }
        }

        let response;
        if (bestMatch) {
            response = bestMatch.data.response;
        } else {
            // 检查关键词
            response = generateContextualResponse(userMessage);
        }

        addMessage(response, 'assistant');
        
        // 添加相关建议
        addRelatedSuggestions(userMessage);
    }

    // 计算文本相似度（简单实现）
    function calculateSimilarity(text1, text2) {
        const words1 = text1.toLowerCase().split(/\s+/);
        const words2 = text2.toLowerCase().split(/\s+/);
        
        const intersection = words1.filter(word => words2.includes(word));
        const union = [...new Set([...words1, ...words2])];
        
        return intersection.length / union.length;
    }

    // 生成情境化回复
    function generateContextualResponse(message) {
        const keywords = {
            '情绪': '情绪管理',
            '社交': '社交技能训练',
            '语言': '语言发展',
            '行为': '行为干预',
            '感觉': '感觉统合',
            '评估': '进展评估',
            '学校': '教育支持',
            '家庭': '家庭支持',
            '危机': '危机干预',
            'ABA': 'ABA训练',
            'IEP': '教育支持',
            '早期': '早期识别'
        };

        let detectedKeyword = null;
        for (const [keyword, topic] of Object.entries(keywords)) {
            if (message.includes(keyword)) {
                detectedKeyword = topic;
                break;
            }
        }

        if (detectedKeyword && qaDatabase[detectedKeyword]) {
            return qaDatabase[detectedKeyword].response;
        }

        // 通用智能回复
        return `感谢您的提问。基于我的专业知识，我理解您关心的是：${message}

🤔 **我的建议**：
• 每个自闭症儿童的情况都是独特的
• 需要综合考虑孩子的年龄、能力水平、兴趣偏好
• 建议寻求专业团队的评估和指导
• 家庭参与和支持至关重要

💡 **下一步行动**：
• 详细记录孩子的具体表现
• 咨询专业医生或治疗师的意見
• 考虑进行专业评估
• 制定个体化的支持计划

如果您能提供更多具体信息（如孩子年龄、主要表现等），我可以为您提供更有针对性的建议。或者您可以尝试问我：
• 什么是自闭症？
• 如何早期识别？
• ABA训练怎么做？
• 情绪管理有什么方法？`;
    }

    // 添加相关建议
    function addRelatedSuggestions(userMessage) {
        setTimeout(() => {
            const relatedTopics = findRelatedTopics(userMessage);
            if (relatedTopics.length > 0) {
                const suggestionsDiv = document.createElement('div');
                suggestionsDiv.className = 'related-suggestions';
                suggestionsDiv.innerHTML = `
                    <div class="suggestions-header">💡 您可能还想了解：</div>
                    <div class="suggestions-list">
                        ${relatedTopics.map(topic => 
                            `<button class="suggestion-chip" data-topic="${topic}">${topic}</button>`
                        ).join('')}
                    </div>
                `;
                
                const messageDiv = document.createElement('div');
                messageDiv.className = 'message assistant-message';
                messageDiv.appendChild(suggestionsDiv);
                
                chatMessages.appendChild(messageDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // 添加建议按钮事件
                suggestionsDiv.querySelectorAll('.suggestion-chip').forEach(chip => {
                    chip.addEventListener('click', function() {
                        const topic = this.dataset.topic;
                        chatInput.value = topic;
                        sendMessage();
                    });
                });
            }
        }, 1000);
    }

    // 查找相关主题
    function findRelatedTopics(message) {
        const allTopics = Object.keys(qaDatabase);
        const relatedTopics = [];
        
        // 简单的相关性匹配
        for (const topic of allTopics) {
            if (calculateSimilarity(message, topic) > 0.2) {
                relatedTopics.push(topic);
            }
            if (relatedTopics.length >= 3) break;
        }
        
        // 如果找不到足够相关主题，返回一些通用主题
        if (relatedTopics.length < 3) {
            const generalTopics = ['什么是自闭症', '早期识别', 'ABA训练', '情绪管理', '家庭支持'];
            relatedTopics.push(...generalTopics.filter(topic => !relatedTopics.includes(topic)));
        }
        
        return relatedTopics.slice(0, 3);
    }

    // 事件监听器
    sendButton.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // 清空聊天
    clearChatBtn.addEventListener('click', function() {
        if (confirm('确定要清空聊天记录吗？')) {
            chatMessages.innerHTML = `
                <div class="message assistant-message">
                    <div class="message-avatar">🤖</div>
                    <div class="message-content">
                        <p>您好！我是星语助手，专业自闭症支持AI伙伴。</p>
                        <p>💡 我可以为您提供：</p>
                        <li>专业知识解答</li>
                        <li>个性化干预建议</li>
                        <li>进展跟踪指导</li>
                        <li>紧急情况支持</li>
                        <li>资源推荐服务</li>
                        <p>🎯 您可以问我：</p>
                        <li>什么是自闭症？</li>
                        <li>如何早期识别？</li>
                        <li>ABA训练怎么做？</li>
                        <li>情绪管理有什么方法？</li>
                        <p>有什么可以帮助您的吗？</p>
                    </div>
                </div>
            `;
        }
    });

    // 语音功能（模拟）
    voiceToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        const isActive = this.classList.contains('active');
        this.textContent = isActive ? '🔴' : '🎤';
        
        if (isActive) {
            addMessage('语音输入已开启，请对着麦克风说话。', 'assistant');
        } else {
            addMessage('语音输入已关闭。', 'assistant');
        }
    });

    // 功能按钮
    functionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const functionType = this.dataset.function;
            const responseData = functionResponses[functionType];
            
            if (responseData) {
                addMessage(`**${responseData.title}**\n\n${responseData.content}`, 'assistant');
            }
        });
    });

    // 快速建议按钮
    suggestionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const randomQuestion = suggestionQuestions[Math.floor(Math.random() * suggestionQuestions.length)];
            chatInput.value = randomQuestion;
            sendMessage();
        });
    });

    // 模拟实时响应
    setInterval(() => {
        const statusIndicator = document.querySelector('.status-indicator');
        if (statusIndicator) {
            statusIndicator.style.opacity = Math.random() > 0.5 ? '1' : '0.7';
        }
    }, 2000);
}

// 导出函数供其他模块使用
window.XingyuAssistant = {
    initializeXingyuAssistant,
    addMessage: function(content, sender) {
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}-message`;
            
            const avatarDiv = document.createElement('div');
            avatarDiv.className = 'message-avatar';
            avatarDiv.textContent = sender === 'user' ? '👤' : '🤖';
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'message-content';
            
            if (typeof content === 'string') {
                const p = document.createElement('p');
                p.textContent = content;
                contentDiv.appendChild(p);
            } else {
                contentDiv.appendChild(content);
            }
            
            messageDiv.appendChild(avatarDiv);
            messageDiv.appendChild(contentDiv);
            
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
};