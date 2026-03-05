// 星语助手增强版 - 包含丰富的mock数据和对话功能

// 综合对话数据库
const dialogueDatabase = {
    // 问候和基础对话
    greetings: {
        patterns: ['你好', '您好', '嗨', 'hello', 'hi', '早上好', '下午好', '晚上好'],
        responses: [
            '您好！我是星语助手，很高兴为您提供专业支持。我是专门为自闭症儿童家庭设计的AI助手，有什么我可以帮助您的吗？',
            '您好！感谢您联系星语助手。我具备专业的自闭症相关知识，可以为您提供评估、干预、咨询等全方位支持。',
            '您好！我是星语助手，一个24小时在线的专业AI伙伴。我了解自闭症儿童的特殊需求，让我们一起为孩子的成长努力。'
        ]
    },

    // 自闭症基础知识
    autismBasics: {
        patterns: ['什么是自闭症', '自闭症是什么', '自闭症介绍', '自闭症定义', '孤独症', '自闭症谱系'],
        responses: [
            '自闭症谱系障碍（ASD）是一种神经发育障碍，主要表现为社交沟通障碍、兴趣狭窄和重复刻板行为。每个孩子表现不同，需要个性化支持。早期识别和干预非常重要。',
            '自闭症是一种与生俱来的神经发展差异，不是疾病，而是一种不同的认知方式。患者可能在社交互动、沟通和行为模式方面有独特表现，需要理解和支持。',
            '自闭症谱系障碍（ASD）是一个连续谱系，从轻微到严重不等。核心特征包括社交交流困难、刻板重复行为和感官敏感性。及时的专业评估和个性化干预能显著改善预后。'
        ]
    },

    // 早期识别
    earlySigns: {
        patterns: ['早期表现', '早期信号', '自闭症症状', '自闭症表现', '如何识别', '早期识别', '预警信号'],
        responses: [
            '自闭症早期表现包括：12个月大时叫名字无反应、18个月不会指物分享、24个月不会说两字短语、避免眼神接触、语言发育迟缓、重复刻板动作、对同龄人缺乏兴趣等。',
            '早期预警信号包括：社交微笑缺失、眼神接触异常、语言发育落后、重复性行为、对环境变化敏感、缺乏共同注意力、难以建立同伴关系。建议2岁前进行专业评估。',
            '识别要点：社交互动障碍（如缺乏眼神交流、不会分享兴趣）、沟通困难（语言发育迟缓、不会用手势）、刻板行为（重复动作、坚持例行程序）。发现这些特征应尽早评估。'
        ]
    },

    // 评估诊断
    assessment: {
        patterns: ['评估', '诊断', '测试', '检查', '筛查', 'ADOS', 'ADI-R', 'CARS', 'ABC'],
        responses: [
            '自闭症评估包括：ADOS（自闭症诊断观察量表）、ADI-R（自闭症诊断访谈）、CARS（儿童自闭症评定量表）、ABC（自闭症行为量表）等。需要由专业人员使用标准化工具进行。',
            '专业评估流程：发育史采集、行为观察、标准化评估工具（如ADOS-2、ADI-R）、认知能力测试、语言能力评估、感觉统合评估。多学科团队合作确保诊断准确性。',
            '常用评估工具：ADOS-2用于观察社交沟通行为，ADI-R收集发育史信息，CARS快速筛查，ABC评估行为特征。建议到专业机构进行系统评估。'
        ]
    },

    // 干预方法
    intervention: {
        patterns: ['干预', '治疗', '康复', 'ABA', '言语治疗', '感统', '社交训练', '行为干预', '早期干预'],
        responses: [
            '循证干预方法：ABA应用行为分析（改善行为技能）、言语治疗（提升沟通能力）、感觉统合训练（调节感官反应）、社交技能训练（发展社交能力）、早期介入丹佛模式（综合发展）。',
            '主要干预策略：ABA针对行为问题，TEACCH结构化教学适应自闭症特点，言语治疗改善沟通，感统训练调节感觉处理，社交故事提升社交理解。需要个性化方案。',
            '有效干预方法：早期密集行为干预（EIBI）、关键反应训练（PRT）、言语行为疗法、社交思维训练、感觉统合治疗。建议结合孩子特点选择多种方法。'
        ]
    },

    // ABA具体应用
    abaSpecific: {
        patterns: ['ABA', '应用行为分析', '行为干预', 'DTT', '离散试验', '行为分析', '正向行为支持'],
        responses: [
            'ABA核心原理：正向强化增加期望行为，消退减少问题行为，任务分解复杂技能， prompting提供辅助，泛化确保技能迁移。需要数据收集和持续评估。',
            'ABA常用技术：离散试验训练（DTT）用于技能获得，自然环境教学（NET）促进泛化，正向行为支持（PBS）处理问题行为，功能性行为评估（FBA）确定行为功能。',
            'ABA实施要点：明确目标行为，选择强化物，设计教学程序，记录数据追踪进展，调整干预策略。强调个体化和循证实践。'
        ]
    },

    // 言语治疗
    speechTherapy: {
        patterns: ['语言', '言语', '说话', '沟通', '发音', '词汇', '句子', '交流', 'AAC', '辅助沟通'],
        responses: [
            '言语治疗重点：评估语言理解/表达能力，制定个别化目标，使用视觉支持（图片、符号），结合AAC辅助沟通系统，创造沟通机会，强化主动交流行为。',
            '沟通训练策略：建立共同注意力，使用视觉辅助（PECS图片交换系统），扩展语言表达，教授社交用语，练习对话技能，结合非语言沟通（手势、表情）。',
            'AAC应用：图片交换系统（PECS）适合无口语儿童，语音输出设备（SGD）提供语音支持，核心词汇表建立基础沟通，视觉时间表帮助理解日常安排。'
        ]
    },

    // 感觉统合
    sensoryIntegration: {
        patterns: ['感觉', '感统', '感官', '敏感', '刺激', '触觉', '听觉', '视觉', '前庭', '本体觉'],
        responses: [
            '感觉统合训练：针对触觉防御进行脱敏，前庭刺激改善平衡和注意力，本体感觉输入增强身体意识，感觉饮食调节觉醒状态，环境改造减少感觉超载。',
            '感觉调节策略：识别感觉偏好和厌恶，设计个性化感觉饮食，使用感觉工具（加重毯、摇摆器），创造安全空间，教授自我调节技巧，逐步暴露适应刺激。',
            '感统训练方法：摇摆和旋转活动刺激前庭系统，触觉游戏改善触觉防御，跳跃和攀爬活动提供本体输入，深呼吸练习调节觉醒水平。'
        ]
    },

    // 社交技能
    socialSkills: {
        patterns: ['社交', '社交技能', '交朋友', '互动', '同伴', '游戏', '分享', '轮流', '合作', '情绪'],
        responses: [
            '社交技能训练：教授基本的社交规则（打招呼、轮流、分享），练习对话技巧（开始、维持、结束对话），理解非语言沟通（面部表情、肢体语言），学习情绪识别和表达。',
            '社交发展策略：结构化游戏活动，社交故事教授社交情境，角色扮演练习社交场景，同伴介导干预，团体活动培养合作技能，情绪调节训练。',
            '社交技能要素：共同注意力（分享兴趣和物品），社会认知（理解他人想法和感受），社交沟通（适当的语言和对话），社会适应（灵活应对社交情境）。'
        ]
    },

    // 家庭支持
    familySupport: {
        patterns: ['家长', '家庭', '父母', '照顾', '支持', '帮助', '压力', '情绪', '建议', '指导'],
        responses: [
            '家庭支持建议：建立可预测的日常安排，使用视觉支持工具，分解复杂任务，提供选择机会，庆祝小进步，寻求专业支持，连接其他家长分享经验。',
            '家长指导要点：学习自闭症知识，理解孩子独特需求，建立积极行为支持，寻求喘息服务，维护夫妻关系，关注其他子女需要，保持希望和积极态度。',
            '家庭应对策略：建立支持网络（家人、朋友、专业机构），参加家长培训，寻求心理咨询，安排个人时间，保持生活节奏，记录进展庆祝成功。'
        ]
    },

    // 学校融合
    schoolIntegration: {
        patterns: ['学校', '上学', '教育', '融合', '老师', '同学', '课堂', '学习', 'IEP', '个别化教育'],
        responses: [
            '学校融合支持：制定个别化教育计划（IEP），提供视觉时间表，使用社交故事，安排座位靠近老师，允许感觉休息，提供额外时间，培训同伴支持。',
            '课堂适应策略：结构化教学环境，明确规则和期望，使用视觉提示，分解学习任务，提供选择机会，允许使用辅助工具，建立积极行为支持。',
            '同伴关系建立：教育同学了解自闭症，安排同伴导师，设计合作学习活动，创造共同兴趣机会，教授社交技能，监控和调解冲突。'
        ]
    },

    // 行为管理
    behaviorManagement: {
        patterns: ['行为', '问题行为', '发脾气', '哭闹', '攻击', '自伤', '刻板', '重复', '挑战性行为'],
        responses: [
            '行为管理原则：功能性行为评估确定行为原因，正向行为支持教授替代行为，预防策略减少触发因素，一致性执行规则，数据记录追踪变化，团队协作实施干预。',
            '问题行为应对：保持冷静和一致性，确保安全第一，使用最少限制干预，教授功能性沟通，强化积极行为，寻求专业指导，建立危机处理计划。',
            '行为干预步骤：观察记录行为模式，分析行为功能（获得关注、逃避任务、获得物品、感觉刺激），制定替代行为，教授新技能，强化积极表现。'
        ]
    },

    // 日常生活技能
    dailyLiving: {
        patterns: ['生活技能', '自理', '独立', '穿衣', '吃饭', '洗漱', '如厕', '家务', '日常', '习惯'],
        responses: [
            '生活技能训练：任务分解逐步教学，使用视觉提示（步骤图片），提供充足练习机会，从简单到复杂渐进，使用正向强化，允许额外时间，教授问题解决策略。',
            '自理能力发展：建立日常例程，使用视觉时间表，分解复杂任务（如穿衣步骤），提供适当辅助，逐步减少支持，鼓励独立完成，庆祝小成就。',
            '独立技能培养：选择适合年龄的目标，使用任务分析，创造练习机会，教授自我监控，建立奖励系统，泛化到不同环境，记录进展情况。'
        ]
    },

    // 情绪调节
    emotionRegulation: {
        patterns: ['情绪', '情绪调节', '发脾气', '焦虑', '压力', '冷静', '放松', '情绪管理', '情绪识别'],
        responses: [
            '情绪调节策略：教授情绪识别（使用情绪卡片），建立冷静空间，练习深呼吸技巧，使用感觉工具调节，创造可预测环境，教授应对策略，建立情绪调节例程。',
            '情绪管理方法：情绪温度计帮助识别强度，5-4-3-2-1感官grounding技术，深呼吸和肌肉放松，转移注意力活动，寻求支持系统，逐步暴露减少焦虑。',
            '情绪支持技巧：验证情绪感受，教授情绪词汇，提供表达渠道，建立情绪调节工具包，练习应对策略，创造安全环境，寻求专业帮助。'
        ]
    },

    // 进展评估
    progressMonitoring: {
        patterns: ['进展', '进步', '效果', '评估', '监测', '数据', '记录', '目标', '成果'],
        responses: [
            '进展监测方法：设定SMART目标（具体、可测量、可达成、相关、时限），建立基线数据，定期记录表现，使用图表可视化进展，调整干预策略，庆祝里程碑成就。',
            '数据收集技巧：选择相关测量指标，建立一致记录程序，使用简单数据表，定期分析趋势，与团队分享信息，基于数据做决策，保持客观记录。',
            '效果评估要点：比较干预前后表现，观察技能泛化情况，评估生活质量改善，收集多方反馈，考虑长期维持，调整目标期望，认可小步前进。'
        ]
    },

    // 资源推荐
    resources: {
        patterns: ['资源', '推荐', '书籍', '网站', '机构', '专家', '支持', '帮助', '哪里', '推荐'],
        responses: [
            '推荐资源：自闭症之声（Autism Speaks）提供全面信息，星星雨等家长组织提供支持，专业医院发育行为科，循证干预机构，家长培训课程，在线学习平台。',
            '专业机构：儿童医院发育行为科，妇幼保健院，康复中心，特殊教育学校，心理咨询机构，职业治疗服务，言语治疗诊所，社区支持服务。',
            '学习材料：《自闭症儿童社交游戏训练》指导游戏技能，《自闭症儿童行为管理》教授行为策略，《自闭症儿童家长指南》提供家庭支持，《应用行为分析》专业参考。'
        ]
    },

    // 紧急支持
    emergency: {
        patterns: ['紧急', '危机', '危险', '安全', '伤害', '自杀', '攻击', '逃跑', '求助', '怎么办'],
        responses: [
            '紧急情况下：确保所有人安全，移除危险物品，保持冷静，使用简短清晰指令，给予空间，寻求立即帮助，联系危机干预服务，事后分析原因制定预防计划。',
            '危机处理步骤：评估安全威胁，确保环境安全，使用去升级技术，寻求专业支持，记录事件详情，制定安全计划，提供后续支持，预防未来发生。',
            '安全支持资源：危机干预热线（400-161-9995），儿童医院急诊，当地急救电话，专业危机干预团队，家长支持网络，心理健康专业服务。'
        ]
    },

    // 感谢和告别
    gratitude: {
        patterns: ['谢谢', '感谢', '再见', '拜拜', '有用', '帮助', '辛苦', '不错', '很好'],
        responses: [
            '不客气！我很高兴能够帮助您。如果您还有其他问题，随时可以联系我。祝您和孩子一切顺利！',
            '谢谢您的认可！支持自闭症儿童和家庭是我的使命。请记得，您并不孤单，我们一直在这里支持您。',
            '很高兴能为您提供帮助！您的孩子很幸运有您这样的家长。请保持信心和耐心，每一个小进步都值得庆祝。再见！'
        ]
    }
};

// 专业评估工具数据
const assessmentTools = {
    ados: {
        name: 'ADOS-2（自闭症诊断观察量表）',
        description: '标准化观察评估工具，通过结构化活动评估社交沟通行为',
        modules: ['模块T（幼儿）', '模块1（无语言）', '模块2（短语语言）', '模块3（流利语言）', '模块4（青少年和成人）'],
        duration: '40-60分钟',
        suitable: '疑似自闭症个体，年龄12个月以上'
    },
    adir: {
        name: 'ADI-R（自闭症诊断访谈）',
        description: '标准化访谈工具，收集发育史和行为信息',
        modules: ['社交互动', '沟通技能', '刻板行为', '发育史'],
        duration: '90-150分钟',
        suitable: '疑似自闭症个体，发育史采集'
    },
    cars: {
        name: 'CARS（儿童自闭症评定量表）',
        description: '快速筛查和诊断工具，评定行为特征',
        modules: ['人际关系', '模仿', '情绪反应', '身体使用', '物体使用', '适应变化', '视觉反应', '听觉反应', '味觉嗅觉触觉', '恐惧和紧张', '言语沟通', '非言语沟通', '活动水平', '智力功能', '总体印象'],
        duration: '30分钟',
        suitable: '2岁以上儿童，快速筛查'
    },
    abc: {
        name: 'ABC（自闭症行为量表）',
        description: '行为特征评估工具，识别自闭症相关行为',
        modules: ['感觉', '社交', '身体运动', '语言', '生活自理'],
        duration: '20-30分钟',
        suitable: '3岁以上个体，行为特征评估'
    }
};

// 干预方法数据库
const interventionMethods = {
    aba: {
        name: '应用行为分析（ABA）',
        principles: ['正向强化', '任务分解', '数据驱动', '泛化训练'],
        techniques: ['离散试验训练（DTT）', '自然环境教学（NET）', '关键反应训练（PRT）', '功能性行为评估（FBA）'],
        applications: ['技能获得', '问题行为减少', '社交技能提升', '日常生活技能'],
        evidence: '强循证支持，大量研究证实有效性'
    },
    speech: {
        name: '言语治疗',
        focus: ['语言理解', '语言表达', '发音清晰', '社交沟通'],
        methods: ['PECS图片交换系统', '视觉支持', '社交故事', 'AAC辅助沟通'],
        goals: ['提升沟通能力', '发展社交语言', '改善发音', '建立替代沟通'],
        evidence: '循证支持，改善语言沟通能力'
    },
    sensory: {
        name: '感觉统合训练',
        areas: ['触觉', '前庭觉', '本体觉', '视觉', '听觉'],
        activities: ['摇摆旋转', '跳跃攀爬', '触觉游戏', '深呼吸'],
        objectives: ['改善感觉调节', '减少感觉防御', '提升注意力', '增强身体意识'],
        evidence: '部分循证支持，需要个体化评估'
    },
    social: {
        name: '社交技能训练',
        skills: ['眼神接触', '轮流等待', '分享合作', '情绪识别', '对话技巧'],
        strategies: ['社交故事', '角色扮演', '同伴介导', '团体活动'],
        targets: ['社交理解', '同伴互动', '情绪调节', '冲突解决'],
        evidence: '循证支持，改善社交能力'
    }
};

// 智能响应生成器
class AIResponseGenerator {
    constructor() {
        this.context = {
            conversationHistory: [],
            userPreferences: {},
            sessionInfo: {
                startTime: new Date(),
                messageCount: 0,
                topics: []
            }
        };
    }

    // 匹配用户输入并生成响应
    generateResponse(userInput) {
        this.context.sessionInfo.messageCount++;
        
        // 清理输入
        const cleanedInput = this.cleanInput(userInput);
        
        // 添加到历史记录
        this.context.conversationHistory.push({
            type: 'user',
            content: cleanedInput,
            timestamp: new Date()
        });

        // 分析输入内容
        const analysis = this.analyzeInput(cleanedInput);
        
        // 生成响应
        let response = this.matchResponse(cleanedInput, analysis);
        
        // 个性化调整
        response = this.personalizeResponse(response, analysis);
        
        // 添加到历史记录
        this.context.conversationHistory.push({
            type: 'assistant',
            content: response,
            timestamp: new Date()
        });

        // 更新会话信息
        if (analysis.category && !this.context.sessionInfo.topics.includes(analysis.category)) {
            this.context.sessionInfo.topics.push(analysis.category);
        }

        return {
            response,
            analysis,
            suggestions: this.generateSuggestions(analysis),
            resources: this.getRelatedResources(analysis)
        };
    }

    // 输入清理
    cleanInput(input) {
        return input.trim().replace(/[^\u4e00-\u9fa5a-zA-Z0-9\s]/g, '');
    }

    // 输入分析
    analyzeInput(input) {
        const words = input.split(/\s+/);
        const analysis = {
            category: null,
            keywords: [],
            sentiment: 'neutral',
            urgency: 'normal',
            complexity: 'simple'
        };

        // 关键词匹配
        for (const [category, data] of Object.entries(dialogueDatabase)) {
            for (const pattern of data.patterns) {
                if (input.includes(pattern)) {
                    analysis.category = category;
                    analysis.keywords.push(pattern);
                    break;
                }
            }
        }

        // 情感分析
        if (input.includes('担心') || input.includes('焦虑') || input.includes('害怕')) {
            analysis.sentiment = 'concerned';
        } else if (input.includes('开心') || input.includes('感谢') || input.includes('有用')) {
            analysis.sentiment = 'positive';
        } else if (input.includes('紧急') || input.includes('危险') || input.includes('危机')) {
            analysis.sentiment = 'urgent';
            analysis.urgency = 'high';
        }

        // 复杂度分析
        if (words.length > 20) {
            analysis.complexity = 'complex';
        } else if (words.length > 10) {
            analysis.complexity = 'moderate';
        }

        return analysis;
    }

    // 匹配响应
    matchResponse(input, analysis) {
        if (analysis.category && dialogueDatabase[analysis.category]) {
            const responses = dialogueDatabase[analysis.category].responses;
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            
            // 根据情感调整响应
            if (analysis.sentiment === 'concerned') {
                return `我理解您的担心。${randomResponse}请放心，我们会一起找到最适合的解决方案。`;
            } else if (analysis.sentiment === 'urgent') {
                return `我理解情况的紧急性。${randomResponse}如果情况危急，请立即联系专业机构或拨打危机干预热线。`;
            }
            
            return randomResponse;
        }

        // 通用响应
        const generalResponses = [
            '我理解您的关注。基于我的专业知识，我建议您考虑以下方面：',
            '这是一个很好的问题。让我为您提供一些专业见解：',
            '感谢您分享这个情况。根据自闭症支持的最佳实践，我建议：',
            '我明白您的需求。以下是一些可能有帮助的建议：'
        ];

        return generalResponses[Math.floor(Math.random() * generalResponses.length)];
    }

    // 个性化响应
    personalizeResponse(response, analysis) {
        // 根据对话历史个性化
        if (this.context.conversationHistory.length > 4) {
            response += '\n\n看起来您对这个话题很关注。我建议您可以考虑预约专业评估，或者参加相关的家长培训课程。';
        }

        // 根据情感状态个性化
        if (analysis.sentiment === 'concerned') {
            response += '\n\n请记住，每个孩子的发展节奏不同，早期干预通常能取得良好效果。保持耐心和信心很重要。';
        }

        return response;
    }

    // 生成建议
    generateSuggestions(analysis) {
        const suggestions = [];

        if (analysis.category === 'earlySigns') {
            suggestions.push('预约专业评估', '记录行为观察', '寻求早期干预');
        } else if (analysis.category === 'intervention') {
            suggestions.push('了解干预方法', '制定训练计划', '寻找专业机构');
        } else if (analysis.category === 'behaviorManagement') {
            suggestions.push('功能性行为评估', '制定行为支持计划', '寻求专业指导');
        } else if (analysis.category === 'familySupport') {
            suggestions.push('参加家长培训', '建立支持网络', '寻求心理咨询');
        }

        return suggestions.length > 0 ? suggestions : ['继续咨询', '预约评估', '了解资源'];
    }

    // 获取相关资源
    getRelatedResources(analysis) {
        const resources = [];

        if (analysis.category === 'assessment' || analysis.category === 'earlySigns') {
            resources.push(
                { name: '专业评估机构', type: '机构', url: '#assessment' },
                { name: 'ADOS评估介绍', type: '工具', url: '#ados-info' }
            );
        } else if (analysis.category === 'intervention') {
            resources.push(
                { name: 'ABA干预方法', type: '方法', url: '#aba-methods' },
                { name: '干预机构推荐', type: '机构', url: '#intervention-centers' }
            );
        } else if (analysis.category === 'familySupport') {
            resources.push(
                { name: '家长支持小组', type: '支持', url: '#parent-support' },
                { name: '家庭指导服务', type: '服务', url: '#family-guidance' }
            );
        }

        return resources;
    }

    // 获取会话统计
    getSessionStats() {
        const duration = new Date() - this.context.sessionInfo.startTime;
        const minutes = Math.floor(duration / 60000);
        
        return {
            duration: minutes,
            messageCount: this.context.sessionInfo.messageCount,
            topics: this.context.sessionInfo.topics,
            conversationLength: this.context.conversationHistory.length
        };
    }
}

// 全局AI响应生成器实例
let aiGenerator = new AIResponseGenerator();

// 增强版AI助手初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeEnhancedAI();
});

function initializeEnhancedAI() {
    const assistantContainer = document.querySelector('.assistant-container');
    const minimizeBtn = document.querySelector('.minimize-btn');
    const chatInput = document.querySelector('.chat-input');
    const sendBtn = document.querySelector('.send-btn');
    const chatMessages = document.querySelector('.chat-messages');
    const quickFunctions = document.querySelector('.quick-functions');
    
    if (!assistantContainer) return;

    let isMinimized = false;
    let isDragging = false;
    let dragOffset = { x: 0, y: 0 };

    // 初始化位置
    resetAssistantPosition();

    // 最小化/展开功能
    if (minimizeBtn) {
        minimizeBtn.addEventListener('click', function() {
            toggleMinimize();
        });
    }

    // 点击最小化状态恢复
    assistantContainer.addEventListener('click', function(e) {
        if (isMinimized && !e.target.closest('.drag-handle')) {
            toggleMinimize();
        }
    });

    // 拖拽功能
    const dragHandle = document.querySelector('.drag-handle');
    if (dragHandle) {
        dragHandle.addEventListener('mousedown', startDrag);
        dragHandle.addEventListener('touchstart', startDrag, { passive: false });
    }

    // 发送消息功能
    if (sendBtn && chatInput) {
        sendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    // 快速功能按钮
    const quickFunctionItems = document.querySelectorAll('.quick-function-item');
    quickFunctionItems.forEach(item => {
        item.addEventListener('click', function() {
            const message = this.textContent.trim();
            if (message) {
                addMessage(message, 'user');
                generateEnhancedAIResponse(message);
            }
        });
    });

    // 初始化欢迎消息
    setTimeout(() => {
        const welcomeMessages = [
            '您好！我是星语助手，很高兴为您提供专业的自闭症支持服务。我可以回答关于自闭症评估、干预、家庭支持等各方面的问题。有什么我可以帮助您的吗？',
            '欢迎来到星语助手！我是专门为自闭症儿童家庭设计的AI伙伴。我具备丰富的专业知识，可以为您提供个性化的建议和支持。请随时向我提问！',
            '您好！感谢您使用星语助手。我了解自闭症儿童的特殊需求，可以为您提供专业的指导和建议。让我们一起为孩子的成长努力！'
        ];
        
        const welcomeMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
        addMessage(welcomeMessage, 'assistant');
        showQuickFunctions();
    }, 1000);

    // 功能函数
    function toggleMinimize() {
        isMinimized = !isMinimized;
        assistantContainer.classList.toggle('minimized', isMinimized);
        
        if (isMinimized) {
            assistantContainer.style.right = '30px';
            assistantContainer.style.bottom = '30px';
            assistantContainer.style.left = 'auto';
            assistantContainer.style.top = 'auto';
        }
    }

    function resetAssistantPosition() {
        assistantContainer.style.right = '30px';
        assistantContainer.style.bottom = '30px';
        assistantContainer.style.left = 'auto';
        assistantContainer.style.top = 'auto';
    }

    function startDrag(e) {
        if (isMinimized) return;
        
        isDragging = true;
        assistantContainer.classList.add('dragging');
        
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        
        const rect = assistantContainer.getBoundingClientRect();
        dragOffset.x = clientX - rect.left;
        dragOffset.y = clientY - rect.top;
        
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('touchmove', drag, { passive: false });
        document.addEventListener('touchend', stopDrag);
        
        e.preventDefault();
    }

    function drag(e) {
        if (!isDragging) return;
        
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        
        let newX = clientX - dragOffset.x;
        let newY = clientY - dragOffset.y;
        
        const rect = assistantContainer.getBoundingClientRect();
        const maxX = window.innerWidth - rect.width;
        const maxY = window.innerHeight - rect.height;
        
        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));
        
        assistantContainer.style.left = newX + 'px';
        assistantContainer.style.top = newY + 'px';
        assistantContainer.style.right = 'auto';
        assistantContainer.style.bottom = 'auto';
        
        e.preventDefault();
    }

    function stopDrag() {
        isDragging = false;
        assistantContainer.classList.remove('dragging');
        
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchmove', drag);
        document.removeEventListener('touchend', stopDrag);
    }

    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        addMessage(message, 'user');
        chatInput.value = '';
        chatInput.style.height = 'auto';
        
        // 显示打字指示器
        showTypingIndicator();
        
        // 生成AI响应
        setTimeout(() => {
            hideTypingIndicator();
            generateEnhancedAIResponse(message);
        }, 1500 + Math.random() * 1000);
    }

    function addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const time = new Date().toLocaleTimeString('zh-CN', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        messageDiv.innerHTML = `
            <div class="message-avatar">${sender === 'user' ? '👤' : '🤖'}</div>
            <div>
                <div class="message-content">${escapeHtml(content)}</div>
                <div class="message-time">${time}</div>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        
        // 滚动到底部
        scrollToBottom();
        
        // 限制消息数量
        const messages = chatMessages.querySelectorAll('.message');
        if (messages.length > 100) {
            messages[0].remove();
        }
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message assistant typing-message';
        typingDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        
        chatMessages.appendChild(typingDiv);
        scrollToBottom();
        
        // 添加打字状态到容器
        assistantContainer.classList.add('typing');
    }

    function hideTypingIndicator() {
        const typingMessage = chatMessages.querySelector('.typing-message');
        if (typingMessage) {
            typingMessage.remove();
        }
        
        // 移除打字状态
        assistantContainer.classList.remove('typing');
    }

    function generateEnhancedAIResponse(userMessage) {
        const result = aiGenerator.generateResponse(userMessage);
        
        // 显示主要响应
        addMessage(result.response, 'assistant');
        
        // 显示相关建议
        if (result.suggestions.length > 0) {
            setTimeout(() => {
                const suggestionMessage = `💡 相关建议：\n${result.suggestions.map(s => `• ${s}`).join('\n')}`;
                addMessage(suggestionMessage, 'assistant');
            }, 800);
        }
        
        // 显示相关资源
        if (result.resources.length > 0) {
            setTimeout(() => {
                const resourceMessage = `📚 推荐资源：\n${result.resources.map(r => `• ${r.name} (${r.type})`).join('\n')}`;
                addMessage(resourceMessage, 'assistant');
            }, 1600);
        }
        
        // 50%概率显示快速功能
        if (Math.random() < 0.5) {
            setTimeout(() => {
                showQuickFunctions();
            }, 2000);
        }
        
        // 记录分析结果用于后续个性化
        console.log('AI分析结果:', result.analysis);
    }

    function showQuickFunctions() {
        if (quickFunctions) {
            quickFunctions.classList.add('active');
            setTimeout(() => {
                quickFunctions.classList.remove('active');
            }, 8000);
        }
    }

    function scrollToBottom() {
        setTimeout(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 100);
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // 自动调整输入框高度
    if (chatInput) {
        chatInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        });
    }

    // 键盘快捷键
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + / 聚焦到AI助手
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            if (isMinimized) {
                toggleMinimize();
            }
            setTimeout(() => {
                chatInput?.focus();
            }, 300);
        }
        
        // Escape键最小化
        if (e.key === 'Escape' && !isMinimized) {
            toggleMinimize();
        }
    });

    // 窗口大小变化时重新定位
    window.addEventListener('resize', debounce(function() {
        if (!isMinimized && !isDragging) {
            const rect = assistantContainer.getBoundingClientRect();
            if (rect.right > window.innerWidth || rect.bottom > window.innerHeight) {
                resetAssistantPosition();
            }
        }
    }, 250));

    // 防止页面滚动时的拖拽问题
    document.addEventListener('scroll', function() {
        if (isDragging) {
            stopDrag();
        }
    });

    // 清理函数
    function cleanup() {
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchmove', drag);
        document.removeEventListener('touchend', stopDrag);
    }

    // 页面卸载时清理
    window.addEventListener('beforeunload', cleanup);

    console.log('星语助手增强版初始化完成');
    
    // 显示会话统计（调试用）
    setTimeout(() => {
        const stats = aiGenerator.getSessionStats();
        console.log('会话统计:', stats);
    }, 30000);
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 全局访问
window.EnhancedAI = {
    initializeEnhancedAI,
    aiGenerator,
    dialogueDatabase,
    debounce
};