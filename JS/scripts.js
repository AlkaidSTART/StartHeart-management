/**
 * 星心守护 - 主要交互逻辑脚本
 * 包含：统计动画、训练切换、知识库筛选、预约功能、模态框、Toast提示等
 */

// ==========================================
// 全局函数声明
// ==========================================
function showGrowthDetail(key) {}
function updateSessionTimer() {}

// ==========================================
// 全局工具函数
// ==========================================

/**
 * 显示Toast提示消息
 * @param {string} message - 提示消息内容
 * @param {string} type - 提示类型: 'success' | 'error' | 'info' | 'warning'
 * @param {number} duration - 显示时长(毫秒)，默认3000ms
 */
function showToast(message, type = 'info', duration = 3000) {
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    
    const icons = {
        success: '✓',
        error: '✗',
        info: 'ℹ',
        warning: '⚠'
    }
};

// 服务类型详情数据
const serviceTypeDetails = {
  'initial-assessment': {
    title: '初诊评估',
    description: '由专业评估师进行全面的发展评估，了解孩子的能力水平和需求，为制定个性化干预计划提供依据。',
    duration: '约90分钟',
    price: '¥800',
    process: [
      '家长访谈：了解发展历程和主要困扰',
      '标准化评估工具测试',
      '观察记录：在自然情境中观察孩子表现',
      '结果反馈与建议报告'
    ]
  },
  'follow-up': {
    title: '复诊跟踪',
    description: '定期跟踪孩子的发展进展，评估干预效果，及时调整训练计划。',
    duration: '约60分钟',
    price: '¥500',
    process: [
      '进展回顾：了解近期表现和变化',
      '能力复评：对比前后测数据',
      '计划调整：根据进展优化方案',
      '家长指导：提供家庭训练建议'
    ]
  },
  'parent-consultation': {
    title: '家长咨询',
    description: '为家长提供专业的育儿指导和心理支持，帮助家长更好地理解和支持孩子。',
    duration: '约50分钟',
    price: '¥400',
    process: [
      '问题收集：了解家长当前困扰',
      '专业解答：提供针对性建议',
      '策略指导：教授具体方法',
      '资源推荐：提供相关学习资料'
    ]
  },
  'group-training': {
    title: '团体训练',
    description: '在小组环境中进行社交技能训练，帮助孩子学习与他人互动和合作。',
    duration: '约90分钟',
    price: '¥300/节',
    process: [
      '小组配对：根据能力和年龄分组',
      '结构化活动：设计目标导向的游戏',
      '社交练习：在引导下进行互动',
      '反馈总结：回顾表现和进步'
    ]
  },
  'individual-therapy': {
    title: '个别化治疗',
    description: '一对一的专业治疗服务，针对孩子的具体需求进行密集训练。',
    duration: '约60分钟',
    price: '¥600/节',
    process: [
      '能力评估：确定当前水平和目标',
      '个性化方案：制定针对性训练计划',
      '密集训练：专业治疗师一对一指导',
      '进展记录：详细记录每节内容'
    ]
  },
  'sensory-training': {
    title: '感统训练',
    description: '通过专业的感觉统合活动，改善孩子的感官处理能力，提升身体协调和注意力。',
    duration: '约60分钟',
    price: '¥450/节',
    process: [
      '感统评估：识别感官处理特点',
      '活动设计：定制感统活动方案',
      '专业指导：在保护下进行训练',
      '家庭延伸：提供居家活动建议'
    ]
  }
};

// 职位详情数据
const jobDetails = {
  '特教老师': {
    title: '特教老师',
    department: '教学部',
    salary: '8K-15K',
    benefits: ['五险一金', '带薪年假', '专业培训', '节日福利', '员工体检'],
    responsibilities: [
      '负责自闭症儿童的日常教学工作',
      '制定和执行个别化教育计划（IEP）',
      '记录学生进展，定期与家长沟通',
      '参与教研活动，持续专业成长',
      '配合团队完成其他相关工作'
    ],
    requirements: [
      '特殊教育、学前教育或相关专业本科及以上学历',
      '持有教师资格证，有特教经验者优先',
      '热爱特殊教育事业，有耐心和爱心',
      '具备良好的沟通能力和团队协作精神',
      '愿意接受专业培训，持续学习成长'
    ]
  },
  '康复治疗师': {
    title: '康复治疗师',
    department: '康复部',
    salary: '10K-18K',
    benefits: ['五险一金', '带薪年假', '专业培训', '节日福利', '员工体检', '绩效奖金'],
    responsibilities: [
      '为自闭症儿童提供专业的康复治疗服务',
      '进行评估并制定个性化康复方案',
      '实施OT、ST等康复训练',
      '跟踪康复进展，调整治疗方案',
      '指导家长进行家庭康复训练'
    ],
    requirements: [
      '康复治疗学、作业治疗等相关专业本科及以上学历',
      '持有康复治疗师资格证书',
      '有儿童康复工作经验者优先',
      '熟悉ABA、感觉统合等康复方法',
      '具备良好的职业道德和服务意识'
    ]
  },
  '心理咨询师': {
    title: '心理咨询师',
    department: '心理支持部',
    salary: '12K-20K',
    benefits: ['五险一金', '带薪年假', '专业培训', '节日福利', '员工体检', '弹性工作'],
    responsibilities: [
      '为自闭症儿童及家长提供心理咨询服务',
      '进行心理评估和危机干预',
      '开展家长心理支持团体活动',
      '参与案例讨论和督导',
      '撰写咨询记录和报告'
    ],
    requirements: [
      '心理学、临床心理学等相关专业硕士及以上学历',
      '持有国家二级心理咨询师证书或同等资质',
      '有儿童青少年心理咨询经验',
      '熟悉自闭症相关心理特点和干预方法',
      '具备良好的倾听和共情能力'
    ]
  }
};

// 预约数据存储系统
const appointmentSystem = {
  // 生成预约号
  generateAppointmentId() {
    const date = new Date();
    const dateStr = date.getFullYear().toString() +
                   String(date.getMonth() + 1).padStart(2, '0') +
                   String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 9000) + 1000;
    return `AP${dateStr}${random}`;
  },

  // 保存预约
  saveAppointment(data) {
    const appointments = this.getAllAppointments();
    const appointmentId = this.generateAppointmentId();
    const appointmentRecord = {
      id: appointmentId,
      ...data,
      status: 'pending',
      submitTime: new Date().toISOString(),
      updateTime: new Date().toISOString()
    };
    appointments.push(appointmentRecord);
    localStorage.setItem('smartHeartAppointments', JSON.stringify(appointments));
    return appointmentRecord;
  },

  // 查询预约
  findAppointment(query) {
    const appointments = this.getAllAppointments();
    const searchTerm = query.trim();
    return appointments.filter(apt =>
      apt.id === searchTerm ||
      apt.contactPhone === searchTerm
    );
  },

  // 取消预约
  cancelAppointment(id) {
    const appointments = this.getAllAppointments();
    const index = appointments.findIndex(apt => apt.id === id);
    if (index !== -1) {
      appointments[index].status = 'cancelled';
      appointments[index].updateTime = new Date().toISOString();
      localStorage.setItem('smartHeartAppointments', JSON.stringify(appointments));
      return true;
    }
    return false;
  },

  // 确认预约
  confirmAppointment(id) {
    const appointments = this.getAllAppointments();
    const index = appointments.findIndex(apt => apt.id === id);
    if (index !== -1) {
      appointments[index].status = 'confirmed';
      appointments[index].updateTime = new Date().toISOString();
      localStorage.setItem('smartHeartAppointments', JSON.stringify(appointments));
      return true;
    }
    return false;
  },

  // 完成预约
  completeAppointment(id) {
    const appointments = this.getAllAppointments();
    const index = appointments.findIndex(apt => apt.id === id);
    if (index !== -1) {
      appointments[index].status = 'completed';
      appointments[index].updateTime = new Date().toISOString();
      localStorage.setItem('smartHeartAppointments', JSON.stringify(appointments));
      return true;
    }
    return false;
  },

  // 获取所有预约
  getAllAppointments() {
    return JSON.parse(localStorage.getItem('smartHeartAppointments') || '[]');
  }
};

// 3. 行为陪伴详情内容数据
const behaviorContent = {
  emotionRecognition: {
    title: "识别情绪信号",
    content: `
      <h4>如何识别孩子的情绪信号</h4>
      <p><strong>身体信号：</strong></p>
      <ul>
        <li>肌肉紧张、握拳、咬紧牙关 - 可能表示愤怒或焦虑</li>
        <li>退缩、躲避、低头 - 可能表示害怕或不适</li>
        <li>过度活跃、无法静坐 - 可能表示兴奋或焦虑</li>
        <li>重复性动作增加 - 可能表示压力或自我安抚</li>
      </ul>
      <p><strong>行为信号：</strong></p>
      <ul>
        <li>逃避任务或活动 - 可能是任务太难或感官不适</li>
        <li>攻击性或自伤行为 - 通常是沟通困难的表现</li>
        <li>刻板行为增加 - 可能是应对压力的方式</li>
        <li>食欲或睡眠改变 - 可能是身体不适或情绪问题</li>
      </ul>
      <p><strong>应对策略：</strong></p>
      <ul>
        <li>建立情绪日记，记录触发因素</li>
        <li>教授替代性的情绪表达方式</li>
        <li>使用视觉工具帮助孩子识别和表达情绪</li>
        <li>及时提供支持和安抚</li>
      </ul>
    `
  },
  deepBreathing: {
    title: "深呼吸法",
    content: `
      <h4>深呼吸放松技巧</h4>
      <p><strong>基础深呼吸：</strong></p>
      <ol>
        <li>找一个舒适的姿势坐下或站立</li>
        <li>一只手放在胸部，一只手放在腹部</li>
        <li>缓慢吸气，感受腹部隆起（4秒）</li>
        <li>屏住呼吸（2秒）</li>
        <li>缓慢呼气，感受腹部下降（6秒）</li>
        <li>重复5-10次</li>
      </ol>
      <p><strong>儿童友好版本：</strong></p>
      <ul>
        <li>"吹蜡烛" - 想象吹灭生日蜡烛</li>
        <li>"闻花香吹羽毛" - 先闻花香（吸气），再吹羽毛（呼气）</li>
        <li>"气球呼吸" - 想象肚子是气球，充气放气</li>
        <li>使用视觉提示卡辅助练习</li>
      </ul>
      <p><strong>使用时机：</strong></p>
      <ul>
        <li>感到焦虑或紧张时</li>
        <li>睡前放松</li>
        <li>情绪爆发前兆时</li>
        <li>作为日常放松练习</li>
      </ul>
    `
  },
  hugComfort: {
    title: "拥抱安抚",
    content: `
      <h4>拥抱与身体安抚技巧</h4>
      <p><strong>深压觉安抚：</strong></p>
      <ul>
        <li>紧紧拥抱 - 提供深压觉输入</li>
        <li>包裹在毯子中 - 创造安全感</li>
        <li>使用加重毯 - 提供持续深压</li>
        <li>关节挤压 - 温和的关节按压</li>
      </ul>
      <p><strong>注意事项：</strong></p>
      <ul>
        <li>尊重孩子的个人空间偏好</li>
        <li>有些孩子可能不喜欢被拥抱</li>
        <li>观察孩子的反应，调整力度</li>
        <li>提供其他替代安抚方式</li>
      </ul>
      <p><strong>替代安抚方式：</strong></p>
      <ul>
        <li>轻拍背部或肩膀</li>
        <li>握手或牵手</li>
        <li>坐在旁边陪伴</li>
        <li>提供安抚物品（如毛绒玩具）</li>
      </ul>
    `
  },
  distraction: {
    title: "转移注意力",
    content: `
      <h4>转移注意力技巧</h4>
      <p><strong>视觉转移：</strong></p>
      <ul>
        <li>指向有趣的物体或活动</li>
        <li>展示喜欢的玩具或图片</li>
        <li>改变环境（如走到窗边）</li>
        <li>使用视觉惊喜（如泡泡、灯光）</li>
      </ul>
      <p><strong>活动转移：</strong></p>
      <ul>
        <li>提议进行喜欢的活动</li>
        <li>开始一个熟悉的游戏</li>
        <li>提供感官玩具</li>
        <li>播放喜欢的音乐或视频</li>
      </ul>
      <p><strong>语言转移：</strong></p>
      <ul>
        <li>谈论感兴趣的话题</li>
        <li>提问关于喜欢的事物</li>
        <li>唱喜欢的歌曲</li>
        <li>使用幽默和玩笑</li>
      </ul>
      <p><strong>最佳使用时机：</strong>在情绪升级初期使用效果最佳。</p>
    `
  },
  tantrum: {
    title: "发脾气应对",
    content: `
      <h4>应对发脾气的策略</h4>
      <p><strong>预防策略：</strong></p>
      <ul>
        <li>建立清晰的日常规律和期望</li>
        <li>使用视觉时间表</li>
        <li>提前预告活动和转换</li>
        <li>确保基本需求得到满足（饥饿、疲劳）</li>
        <li>识别并避免触发因素</li>
      </ul>
      <p><strong>当下应对：</strong></p>
      <ul>
        <li>保持冷静，控制自己的情绪</li>
        <li>确保孩子和环境的安全</li>
        <li>给予空间，不要过度干预</li>
        <li>使用简短、清晰的语言</li>
        <li>等待情绪高峰过去</li>
      </ul>
      <p><strong>事后处理：</strong></p>
      <ul>
        <li>等孩子完全冷静后再讨论</li>
        <li>简单回顾发生了什么</li>
        <li>教授替代行为</li>
        <li>不要过度惩罚或责备</li>
        <li>记录事件以便识别模式</li>
      </ul>
    `
  },
  stereotypy: {
    title: "刻板行为干预",
    content: `
      <h4>刻板行为的管理与干预</h4>
      <p><strong>理解刻板行为：</strong></p>
      <ul>
        <li>刻板行为是自我安抚的一种方式</li>
        <li>可能表示焦虑、无聊或感官需求</li>
        <li>在某些情境下是适应性的</li>
        <li>完全消除可能不现实也不必要</li>
      </ul>
      <p><strong>干预策略：</strong></p>
      <ul>
        <li>识别触发因素和前置条件</li>
        <li>提供替代性的感官活动</li>
        <li>增加结构和可预测性</li>
        <li>教授适当的行为替代方式</li>
        <li>使用正向行为支持</li>
      </ul>
      <p><strong>何时需要干预：</strong></p>
      <ul>
        <li>行为干扰学习或社交</li>
        <li>行为对自己或他人造成伤害</li>
        <li>行为频率或强度显著增加</li>
        <li>行为影响日常生活功能</li>
      </ul>
    `
  },
  escape: {
    title: "逃避行为处理",
    content: `
      <h4>处理逃避行为</h4>
      <p><strong>理解逃避行为：</strong></p>
      <ul>
        <li>任务太难或太无聊</li>
        <li>感官不适（环境太吵、太亮）</li>
        <li>缺乏完成任务的动力</li>
        <li>之前通过逃避成功避免了任务</li>
      </ul>
      <p><strong>预防策略：</strong></p>
      <ul>
        <li>确保任务在能力范围内</li>
        <li>将大任务分解成小步骤</li>
        <li>提供选择和自主权</li>
        <li>增加任务的趣味性</li>
        <li>调整环境减少感官不适</li>
      </ul>
      <p><strong>应对策略：</strong></p>
      <ul>
        <li>温和而坚定地坚持要求</li>
        <li>提供适当的辅助</li>
        <li>使用"先...然后..."的语言</li>
        <li>完成任务后给予积极强化</li>
        <li>逐步增加任务难度和要求</li>
      </ul>
    `
  },
  positiveSupport: {
    title: "正向行为支持",
    content: `
      <h4>正向行为支持策略</h4>
      <p><strong>核心原则：</strong></p>
      <ul>
        <li>关注并强化期望行为，而非仅关注问题行为</li>
        <li>理解行为背后的功能和原因</li>
        <li>教授替代性的适当行为</li>
        <li>调整环境以支持成功</li>
      </ul>
      <p><strong>强化策略：</strong></p>
      <ul>
        <li>即时、具体的口头表扬</li>
        <li>使用代币系统或奖励图表</li>
        <li>提供活动或物品奖励</li>
        <li>社交强化（拥抱、击掌）</li>
      </ul>
      <p><strong>环境调整：</strong></p>
      <ul>
        <li>建立清晰的规则和期望</li>
        <li>使用视觉提示和支持</li>
        <li>提供可预测的结构</li>
        <li>减少干扰和触发因素</li>
      </ul>
    `
  },
  activeListening: {
    title: "积极倾听",
    content: `
      <h4>积极倾听技巧</h4>
      <p><strong>身体语言：</strong></p>
      <ul>
        <li>蹲下来，与孩子保持平视</li>
        <li>面向孩子，表示关注</li>
        <li>保持开放的身体姿态</li>
        <li>适当的点头和表情回应</li>
      </ul>
      <p><strong>语言回应：</strong></p>
      <ul>
        <li>使用简单的词语回应（"嗯"、"我明白"）</li>
        <li>重复或总结孩子说的话</li>
        <li>反映孩子的感受</li>
        <li>避免打断或急于给建议</li>
      </ul>
      <p><strong>对于语言有限的孩子：</strong></p>
      <ul>
        <li>观察非语言沟通</li>
        <li>关注行为传达的信息</li>
        <li>使用图片或手势辅助理解</li>
        <li>给予充足的处理时间</li>
      </ul>
    `
  },
  visualAid: {
    title: "视觉辅助工具",
    content: `
      <h4>视觉辅助工具的使用</h4>
      <p><strong>视觉时间表：</strong></p>
      <ul>
        <li>展示一天的活动顺序</li>
        <li>使用图片、文字或两者结合</li>
        <li>帮助孩子理解即将发生什么</li>
        <li>减少因不确定性引起的焦虑</li>
      </ul>
      <p><strong>任务分解图：</strong></p>
      <ul>
        <li>将复杂任务分解为步骤</li>
        <li>每个步骤配以清晰的图片</li>
        <li>可以勾选或移除完成的步骤</li>
        <li>适用于日常生活技能训练</li>
      </ul>
      <p><strong>视觉提示卡：</strong></p>
      <ul>
        <li>情绪卡片 - 帮助识别和表达情绪</li>
        <li>社交脚本 - 展示社交情境中的适当行为</li>
        <li>选择板 - 提供视觉化的选择</li>
        <li>规则提示 - 提醒期望行为</li>
      </ul>
    `
  },
  clearInstruction: {
    title: "简洁明确指令",
    content: `
      <h4>给出简洁明确指令的技巧</h4>
      <p><strong>指令原则：</strong></p>
      <ul>
        <li>一次只给一个指令</li>
        <li>使用简单、具体的语言</li>
        <li>避免使用否定句（说"请坐"而非"不要跑"）</li>
        <li>给予充足的处理时间（5-10秒）</li>
      </ul>
      <p><strong>增强理解：</strong></p>
      <ul>
        <li>配合手势或指向</li>
        <li>使用视觉提示卡</li>
        <li>示范期望的行为</li>
        <li>确保获得孩子的注意后再给指令</li>
      </ul>
      <p><strong>避免：</strong></p>
      <ul>
        <li>冗长的解释或说教</li>
        <li>模糊的指令（"乖一点"）</li>
        <li>连续快速给出多个指令</li>
        <li>在嘈杂或分散注意的环境中给指令</li>
      </ul>
    `
  },
  positiveFeedback: {
    title: "积极反馈",
    content: `
      <h4>有效积极反馈的技巧</h4>
      <p><strong>具体描述：</strong></p>
      <ul>
        <li>避免笼统的"做得好"</li>
        <li>具体描述孩子做了什么（"你自己把玩具收拾好了！"）</li>
        <li>强调努力和过程，而非仅结果</li>
        <li>真诚地表达赞赏</li>
      </ul>
      <p><strong>即时性：</strong></p>
      <ul>
        <li>在行为发生后立即给予反馈</li>
        <li>不要等到事后才表扬</li>
        <li>对于年幼孩子，即时性尤为重要</li>
      </ul>
      <p><strong>多种形式：</strong></p>
      <ul>
        <li>口头表扬</li>
        <li>肢体语言（拥抱、击掌、竖起大拇指）</li>
        <li>代币或贴纸奖励</li>
        <li>特权或活动奖励</li>
        <li>书面表扬或成就证书</li>
      </ul>
      <p><strong>比例：</strong>努力保持积极反馈与纠正的比例为5:1或更高。</p>
    `
  }
};

// 4. 知识库文章完整内容
const knowledgeArticles = {
  whatIsAutism: {
    title: "什么是自闭症谱系障碍",
    content: `
      <h4>自闭症谱系障碍（ASD）全面解读</h4>
      <p><strong>定义：</strong></p>
      <p>自闭症谱系障碍（Autism Spectrum Disorder，简称ASD）是一种神经发育障碍，主要影响个体的社交沟通能力和行为模式。"谱系"一词意味着自闭症的表现形式非常多样，从需要大量支持的重度障碍到能够独立生活的高功能个体都包含在内。</p>
      
      <p><strong>核心特征：</strong></p>
      <ul>
        <li><strong>社交沟通障碍：</strong>难以理解社交线索、建立和维持人际关系、进行双向交流</li>
        <li><strong>受限的兴趣和行为模式：</strong>重复性行为、对特定话题的强烈兴趣、坚持固定程序</li>
        <li><strong>感官敏感性：</strong>对声音、光线、触觉等感官刺激可能过度敏感或迟钝</li>
      </ul>
      
      <p><strong>诊断标准（DSM-5）：</strong></p>
      <ul>
        <li>在社交沟通和互动方面存在持续性缺陷</li>
        <li>存在受限的、重复的行为模式、兴趣或活动</li>
        <li>症状在儿童早期出现</li>
        <li>症状导致社交、职业或其他重要功能领域的显著损害</li>
      </ul>
      
      <p><strong>常见误解澄清：</strong></p>
      <ul>
        <li>自闭症不是精神疾病，而是神经发育差异</li>
        <li>自闭症不是由父母教养方式造成的</li>
        <li>自闭症患者有情感，只是表达方式可能不同</li>
        <li>自闭症无法"治愈"，但适当的支持可以显著改善生活质量</li>
      </ul>
      
      <p><strong>早期识别的重要性：</strong></p>
      <p>早期识别和干预可以显著改善自闭症儿童的长期预后。研究表明，2-3岁开始干预的儿童在语言、认知和社交技能方面都有更好的发展。</p>
    `
  },
  causes: {
    title: "自闭症的成因与机制",
    content: `
      <h4>自闭症的成因与神经生物学机制</h4>
      <p><strong>遗传因素：</strong></p>
      <ul>
        <li>遗传度估计为80-90%，是自闭症最主要的危险因素</li>
        <li>同卵双胞胎同病率约为60-90%</li>
        <li>已识别数百个与自闭症相关的基因变异</li>
        <li>大多数病例是多基因共同作用的结果</li>
      </ul>
      
      <p><strong>环境因素：</strong></p>
      <ul>
        <li>孕期感染（如风疹病毒）</li>
        <li>孕期接触某些药物（如丙戊酸）</li>
        <li>父母年龄（特别是父亲年龄）</li>
        <li>早产和低出生体重</li>
        <li><strong>重要澄清：</strong>疫苗与自闭症没有因果关系，这一谣言已被大量科学研究否定</li>
      </ul>
      
      <p><strong>神经生物学机制：</strong></p>
      <ul>
        <li><strong>大脑结构：</strong>早期大脑过度生长，特别是额叶和颞叶</li>
        <li><strong>神经连接：</strong>局部连接增强，长距离连接减弱</li>
        <li><strong>神经递质：</strong>血清素、多巴胺、GABA等系统异常</li>
        <li><strong>镜像神经元系统：</strong>可能参与社交认知障碍</li>
      </ul>
      
      <p><strong>当前研究前沿：</strong></p>
      <p>科学家正在研究基因-环境交互作用、肠道-脑轴、免疫系统在自闭症中的作用，以及开发更有针对性的干预方法。</p>
    `
  },
  earlyScreening: {
    title: "早期筛查与诊断",
    content: `
      <h4>自闭症早期筛查与诊断指南</h4>
      <p><strong>早期预警信号（0-3岁）：</strong></p>
      <ul>
        <li>6个月：很少或没有大笑或其他温暖、快乐的表情</li>
        <li>9个月：很少或没有双向的声音交流、微笑或其他面部表情</li>
        <li>12个月：很少或没有咿呀学语、很少或没有指向、展示等手势</li>
        <li>16个月：很少或没有语言</li>
        <li>24个月：很少或没有有意义的两词短语</li>
        <li>任何年龄：失去已掌握的语言或社交技能</li>
      </ul>
      
      <p><strong>常用筛查工具：</strong></p>
      <ul>
        <li><strong>M-CHAT：</strong>改良版幼儿自闭症筛查量表，适用于16-30个月</li>
        <li><strong>STAT：</strong>幼儿自闭症筛查工具</li>
        <li><strong>ASQ：</strong>年龄与发育进程问卷</li>
      </ul>
      
      <p><strong>诊断流程：</strong></p>
      <ol>
        <li>发育监测（儿科常规体检）</li>
        <li>标准化筛查工具评估</li>
        <li>综合诊断评估（通常需要多学科团队）</li>
        <li>包括：病史采集、行为观察、认知评估、语言能力评估</li>
      </ol>
      
      <p><strong>诊断团队：</strong></p>
      <ul>
        <li>发育行为儿科医生</li>
        <li>儿童精神科医生</li>
        <li>心理学家</li>
        <li>言语治疗师</li>
        <li>职业治疗师</li>
      </ul>
      
      <p><strong>早期干预的重要性：</strong></p>
      <p>大脑在生命早期具有最强的可塑性。早期识别和干预可以最大化地利用这一关键时期，显著改善儿童的长期发展结果。</p>
    `
  },
  comorbidity: {
    title: "常见共患病",
    content: `
      <h4>自闭症常见共患病</h4>
      <p><strong>智力障碍：</strong></p>
      <ul>
        <li>约45%的自闭症患者伴有智力障碍</li>
        <li>但也有约25%智力正常，甚至超常（学者综合征）</li>
        <li>需要个别化教育计划（IEP）</li>
      </ul>
      
      <p><strong>注意缺陷多动障碍（ADHD）：</strong></p>
      <ul>
        <li>约30-50%的自闭症患者同时有ADHD</li>
        <li>注意力困难、多动和冲动行为</li>
        <li>可能需要药物治疗和行为干预</li>
      </ul>
      
      <p><strong>焦虑障碍：</strong></p>
      <ul>
        <li>约40%的自闭症患者伴有焦虑障碍</li>
        <li>社交焦虑尤为常见</li>
        <li>认知行为疗法（CBT）可能有帮助</li>
      </ul>
      
      <p><strong>癫痫：</strong></p>
      <ul>
        <li>约20-30%的自闭症患者会发展癫痫</li>
        <li>风险随智力障碍程度增加而增加</li>
        <li>需要神经科医生的评估和管理</li>
      </ul>
      
      <p><strong>其他常见共患病：</strong></p>
      <ul>
        <li>睡眠障碍（50-80%）</li>
        <li>胃肠道问题（20-70%）</li>
        <li>感觉处理障碍（90%以上）</li>
        <li>抑郁症（青少年和成人期）</li>
        <li>强迫症</li>
      </ul>
      
      <p><strong>综合管理的重要性：</strong></p>
      <p>识别和治疗共患病对于改善自闭症患者的整体生活质量至关重要。需要多学科团队的协作。</p>
    `
  },
  vaccineMyth: {
    title: "疫苗导致自闭症？",
    content: `
      <h4>辟谣：疫苗与自闭症</h4>
      <p><strong>谣言起源：</strong></p>
      <p>1998年，英国医生安德鲁·韦克菲尔德在《柳叶刀》杂志发表了一篇论文，声称麻疹-腮腺炎-风疹（MMR）疫苗与自闭症有关。这篇论文后来被证实存在严重的科学欺诈和数据操纵，于2010年被撤稿，韦克菲尔德也被吊销了行医执照。</p>
      
      <p><strong>科学证据：</strong></p>
      <ul>
        <li>超过20项大型流行病学研究，涉及数百万儿童，均未发现疫苗与自闭症的关联</li>
        <li>美国疾病控制与预防中心（CDC）、世界卫生组织（WHO）等权威机构均确认疫苗的安全性</li>
        <li>即使移除疫苗中的防腐剂硫柳汞（作为预防措施），自闭症发病率仍在上升</li>
        <li>疫苗成分中的铝含量远低于婴儿通过母乳或配方奶摄入的量</li>
      </ul>
      
      <p><strong>时间上的巧合：</strong></p>
      <p>MMR疫苗通常在12-15个月接种，而自闭症的早期症状也在这个年龄段开始显现。这种时间上的巧合导致了错误的因果联想。</p>
      
      <p><strong>不接种疫苗的风险：</strong></p>
      <ul>
        <li>疫苗犹豫导致麻疹等疾病在多国重新爆发</li>
        <li>未接种疫苗的儿童面临严重疾病甚至死亡的风险</li>
        <li>降低了群体免疫力，威胁免疫缺陷人群</li>
      </ul>
      
      <p><strong>结论：</strong></p>
      <p>疫苗不会导致自闭症。疫苗是安全、有效的疾病预防手段，对保护个人和公共健康至关重要。</p>
    `
  },
  cureMyth: {
    title: "自闭症可以治愈？",
    content: `
      <h4>辟谣：自闭症可以治愈吗？</h4>
      <p><strong>核心事实：</strong></p>
      <p>自闭症是一种神经发育差异，不是疾病，因此不存在"治愈"的概念。自闭症是大脑结构和功能的固有差异，是人格的一部分。</p>
      
      <p><strong>关于"治愈"的误区：</strong></p>
      <ul>
        <li>一些机构声称可以"治愈"自闭症，往往使用未经证实甚至有害的方法</li>
        <li>这些方法包括：螯合疗法（去除重金属）、高压氧舱、特殊饮食、干细胞治疗等</li>
        <li>这些方法不仅无效，还可能对孩子的健康造成伤害</li>
        <li>费用昂贵，给家庭带来经济负担</li>
      </ul>
      
      <p><strong>什么是有效的：</strong></p>
      <ul>
        <li><strong>早期干预：</strong>可以显著改善功能，但不是"治愈"</li>
        <li><strong>行为干预：</strong>应用行为分析（ABA）、早期介入丹佛模式（ESDM）等</li>
        <li><strong>教育支持：</strong>个别化教育计划、特殊教育服务</li>
        <li><strong>治疗服务：</strong>言语治疗、职业治疗、物理治疗</li>
        <li><strong>家庭支持：</strong>家长培训、支持团体、喘息服务</li>
      </ul>
      
      <p><strong>神经多样性视角：</strong></p>
      <p>越来越多的自闭症倡导者和研究者采用"神经多样性"视角，认为自闭症是人类神经发育的自然变异，应该被接纳和尊重，而非"治愈"。重点是提供支持，帮助自闭症患者发挥潜能，过上充实的生活。</p>
      
      <p><strong>给家长的建议：</strong></p>
      <p>对那些承诺"治愈"自闭症的疗法保持警惕。将资源投入到有科学依据的干预和支持服务上，同时接纳和爱你的孩子本来的样子。</p>
    `
  },
  emotionMyth: {
    title: "自闭症患者没有感情？",
    content: `
      <h4>辟谣：自闭症患者有感情吗？</h4>
      <p><strong>误解的来源：</strong></p>
      <p>自闭症患者可能在表达情感方面存在困难，这导致了一些人误以为他们没有感情。事实上，自闭症患者有丰富而深刻的情感，只是表达和理解情感的方式可能与常人不同。</p>
      
      <p><strong>情感表达的特点：</strong></p>
      <ul>
        <li><strong>面部表达：</strong>可能较少使用面部表情，或表情与内心感受不完全匹配</li>
        <li><strong>身体语言：</strong>可能较少使用手势、姿势来表达情感</li>
        <li><strong>语言表达：</strong>可能难以用语言表达复杂的情感</li>
        <li><strong>共情能力：</strong>研究表明自闭症患者有共情能力，但可能以不同的方式表达</li>
      </ul>
      
      <p><strong>情感体验：</strong></p>
      <ul>
        <li>自闭症患者能够体验爱、喜悦、悲伤、恐惧等所有人类情感</li>
        <li>许多自闭症患者报告他们有非常强烈的情感体验</li>
        <li>感官敏感性可能使某些情感体验更加强烈</li>
        <li>对特定兴趣的热情可以非常强烈</li>
      </ul>
      
      <p><strong>建立情感连接：</strong></p>
      <ul>
        <li>学习识别自闭症患者独特的情感表达方式</li>
        <li>尊重他们的沟通方式</li>
        <li>通过共同的兴趣建立连接</li>
        <li>给予充足的时间和空间</li>
        <li>直接、清晰地表达情感</li>
      </ul>
      
      <p><strong>自闭症患者的声音：</strong></p>
      <p>许多自闭症成年人在自述中写道，他们一直都有丰富的内心世界和深刻的情感，只是不知道如何表达。理解这一点对于支持自闭症患者至关重要。</p>
    `
  }
};

// 2. 日常训练详情内容数据（16个训练项目）
const trainingContent = {
  // 生活自理类
  dressing: {
    title: "穿衣训练",
    steps: [
      "选择简单、宽松、易穿脱的衣物",
      "使用视觉提示卡展示穿衣顺序",
      "从最后一步开始逆向教学（逆向链锁法）",
      "逐步减少辅助，从身体辅助到语言提示",
      "使用标签区分衣服的前后和正反",
      "建立固定的穿衣顺序和习惯"
    ],
    tips: [
      "选择有弹性的衣物，减少纽扣和拉链的使用",
      "使用图片或视频示范穿衣步骤",
      "给予充足的时间，不要催促",
      "及时给予正面强化和表扬",
      "从孩子感兴趣的衣物开始训练"
    ]
  },
  eating: {
    title: "独立进餐",
    steps: [
      "准备适合孩子使用的餐具（防滑碗、粗柄勺）",
      "教授正确的坐姿和餐具握法",
      "从抓取食物开始，逐步过渡到使用餐具",
      "练习舀取、切割、叉取等不同动作",
      "学习餐桌礼仪和进食规则",
      "逐步增加食物的种类和质地"
    ],
    tips: [
      "创造安静、无干扰的用餐环境",
      "固定用餐时间和地点",
      "允许孩子用手探索食物质地",
      "不要强迫进食，尊重孩子的饱腹感",
      "使用社交故事解释用餐规则"
    ]
  },
  washing: {
    title: "洗漱整理",
    steps: [
      "使用视觉时间表展示洗漱流程",
      "从简单的洗手开始，逐步增加步骤",
      "教授正确的刷牙方法（可使用电动牙刷）",
      "练习洗脸、擦手、梳头等技能",
      "建立早晚固定的洗漱习惯",
      "学习整理个人物品（毛巾、牙刷等）"
    ],
    tips: [
      "使用计时器确保充足的洗漱时间",
      "选择孩子喜欢的洗漱用品味道",
      "使用镜子帮助孩子观察自己的动作",
      "将复杂任务分解成小步骤",
      "使用图片提示卡辅助记忆"
    ]
  },
  bedMaking: {
    title: "整理床铺",
    steps: [
      "选择简单的床上用品（避免过多装饰枕头）",
      "教授铺平床单的方法",
      "学习对折和整理被子",
      "练习摆放枕头和整理床边",
      "建立早晨整理床铺的习惯",
      "使用视觉提示展示整理步骤"
    ],
    tips: [
      "使用有标记的床单（帮助对齐）",
      "从简单的任务开始（如只整理枕头）",
      "将任务分解成小步骤逐步教学",
      "使用正向强化鼓励独立完成任务",
      "保持耐心，允许孩子以自己的节奏学习"
    ]
  },
  // 社交沟通类
  eyeContact: {
    title: "眼神交流训练",
    steps: [
      "从孩子感兴趣的活动或物品开始",
      "将物品放在眼睛附近，引导视线接触",
      "使用游戏化方式练习眼神接触（如照镜子）",
      "教授替代性的社交关注方式（如看向脸部）",
      "在日常生活中创造眼神交流的机会",
      "逐步延长眼神接触的持续时间"
    ],
    tips: [
      "不要强迫眼神接触，避免造成压力",
      "尊重孩子的舒适度，接受短暂的眼神接触",
      "使用孩子喜欢的活动作为强化物",
      "在自然情境中练习，而非强迫训练",
      "理解有些自闭症患者通过其他方式关注他人"
    ]
  },
  waiting: {
    title: "轮流等待训练",
    steps: [
      "从简单的两人轮流开始",
      "使用'等待'手势或卡片作为视觉提示",
      "使用计时器可视化等待时间",
      "在游戏中练习轮流（如滚球、搭积木）",
      "逐步增加等待的时间和人数",
      "在日常生活中创造轮流的机会"
    ],
    tips: [
      "开始时等待时间要很短（几秒钟）",
      "使用'我的回合/你的回合'等清晰语言",
      "在等待时给予孩子可以做的事情",
      "及时强化成功的等待行为",
      "保持一致的规则和期望"
    ]
  },
  sharing: {
    title: "分享合作训练",
    steps: [
      "从分享孩子不太感兴趣的物品开始",
      "使用计时器设定每人使用的时间",
      "在活动中练习合作（如一起完成拼图）",
      "教授分享的语言（'可以借我吗？'）",
      "在游戏中体验分享的乐趣",
      "逐步过渡到分享更喜欢的物品"
    ],
    tips: [
      "理解分享对自闭症孩子来说可能很困难",
      "不要强迫分享特别珍贵的物品",
      "使用社交故事解释分享的概念",
      "及时表扬分享行为",
      "创造需要合作才能完成的有趣活动"
    ]
  },
  greeting: {
    title: "问候回应训练",
    steps: [
      "教授简单的问候语（'你好'、'再见'）",
      "使用视觉提示卡展示不同情境的问候",
      "练习挥手、点头等非语言问候",
      "在家庭环境中练习问候",
      "逐步扩展到熟悉的人和陌生人",
      "教授回应他人问候的方式"
    ],
    tips: [
      "从熟悉的人和环境开始",
      "使用角色扮演练习问候",
      "不要强迫孩子在不舒服的情况下问候",
      "接受非语言的问候方式",
      "在日常生活中创造问候的机会"
    ]
  },
  // 语言训练类
  pronunciation: {
    title: "发音练习",
    steps: [
      "评估孩子的发音能力和困难音",
      "从简单的元音和辅音开始",
      "使用镜子帮助孩子观察口型",
      "练习发音部位和方法",
      "将音素组合成音节和单词",
      "在日常对话中练习正确发音"
    ],
    tips: [
      "使发音练习游戏化、有趣",
      "使用视觉提示展示正确的口型",
      "给予充分的练习时间",
      "使用强化物激励练习",
      "必要时寻求言语治疗师的帮助"
    ]
  },
  vocabulary: {
    title: "词汇扩展",
    steps: [
      "从孩子熟悉和感兴趣的物品开始",
      "使用实物、图片进行词汇教学",
      "在日常生活中标记物品名称",
      "学习不同类别的词汇（食物、动物、动作等）",
      "练习将词汇用于表达需求",
      "逐步扩展词汇的复杂度和抽象性"
    ],
    tips: [
      "创造丰富的语言环境",
      "重复新词汇多次",
      "将词汇与孩子的生活经验联系",
      "使用绘本和卡片扩展词汇",
      "鼓励使用新学的词汇"
    ]
  },
  sentence: {
    title: "句子构建",
    steps: [
      "从双词短语开始（如'要饼干'）",
      "使用视觉提示扩展句子长度",
      "教授句子成分（主语+动词+宾语）",
      "练习不同类型的句子（陈述、疑问、否定）",
      "在日常生活中练习完整表达",
      "逐步增加句子的复杂度"
    ],
    tips: [
      "使用扩展技术：重复孩子的话并添加内容",
      "提供句子框架供孩子填充",
      "鼓励表达完整的需求",
      "使用绘本讨论故事情节",
      "耐心等待，不要打断孩子的尝试"
    ]
  },
  dialogue: {
    title: "情境对话",
    steps: [
      "从简单的问答开始",
      "教授常见社交情境的对话脚本",
      "使用角色扮演练习对话",
      "学习话题的开启、维持和转换",
      "练习理解言外之意和社交暗示",
      "在不同情境中应用对话技能"
    ],
    tips: [
      "从熟悉的日常情境开始",
      "使用社交故事准备对话情境",
      "提供对话的脚本和提示",
      "创造安全的练习环境",
      "逐步减少提示，促进独立对话"
    ]
  },
  // 感统训练类
  balance: {
    title: "平衡练习",
    steps: [
      "从稳定的平面开始（如双脚站立）",
      "练习单脚站立（扶墙辅助）",
      "使用平衡垫或平衡木进行训练",
      "进行走直线、走平衡木等活动",
      "尝试不稳定的平面（如软垫、摇摆板）",
      "结合游戏进行平衡训练"
    ],
    tips: [
      "确保训练环境安全",
      "根据孩子的能力调整难度",
      "使用有趣的游戏形式",
      "给予充分的身体支持",
      "逐步减少辅助"
    ]
  },
  tactile: {
    title: "触觉体验",
    steps: [
      "从孩子能接受的质地开始",
      "逐步引入新的触觉体验",
      "使用不同质地的材料进行探索",
      "进行触觉辨识游戏（摸箱游戏）",
      "在日常生活中融入触觉活动",
      "尊重孩子的触觉偏好和敏感度"
    ],
    tips: [
      "不要强迫孩子接触不喜欢的质地",
      "使用游戏方式让触觉体验有趣",
      "给予孩子控制感（自己决定是否触摸）",
      "从间接接触开始（如用工具）",
      "注意孩子的反应，及时调整"
    ]
  },
  proprioception: {
    title: "本体觉训练",
    steps: [
      "进行推拉重物活动",
      "练习跳跃、攀爬等大肌肉活动",
      "使用弹力带进行阻力训练",
      "进行关节挤压和肌肉按压",
      "参与有阻力的日常活动",
      "使用加重毯或背包提供深压觉"
    ],
    tips: [
      "这些活动通常有镇静效果",
      "可以在焦虑或过度兴奋时使用",
      "确保活动安全，避免受伤",
      "观察孩子的反应，找到最适合的活动",
      "将训练融入日常游戏"
    ]
  },
  handEye: {
    title: "手眼协调",
    steps: [
      "从简单的抓握和释放开始",
      "练习投掷和接球",
      "进行串珠、拼图等活动",
      "练习剪纸、涂色等精细动作",
      "进行搭建积木、拼插玩具",
      "逐步增加活动的复杂度"
    ],
    tips: [
      "选择孩子感兴趣的活动",
      "从简单任务开始，逐步增加难度",
      "提供适当的工具和辅助",
      "给予充分的练习时间",
      "庆祝每一个小进步"
    ]
  }
};

/**
 * 打开模态框
 * @param {string} title - 模态框标题
 * @param {string} content - 模态框内容(支持HTML)
 * @param {Object} options - 可选配置
 */
function openModal(title, content, options = {}) {
    console.log('openModal called with title:', title);
    const existingModal = document.getElementById('globalModal');
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.id = 'globalModal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-container">
            <div class="modal-header">
                <h3 class="modal-title">${title}</h3>
                <button class="modal-close" onclick="closeModal()">×</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
            ${options.showFooter !== false ? `
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeModal()">关闭</button>
                ${options.confirmText ? `<button class="btn btn-primary" onclick="${options.confirmCallback || 'closeModal()'}">${options.confirmText}</button>` : ''}
            </div>
            ` : ''}
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    requestAnimationFrame(() => {
        modal.classList.add('active');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', handleModalKeydown);
}

/**
 * 关闭模态框
 */
function closeModal() {
    const modal = document.getElementById('globalModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
    document.removeEventListener('keydown', handleModalKeydown);
}

function handleModalKeydown(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
}

/**
 * 数字滚动动画函数
 * @param {HTMLElement} element - 目标元素
 * @param {number} targetValue - 目标数值
 * @param {number} duration - 动画时长(毫秒)
 * @param {string} suffix - 数字后缀(如 '+', '%')
 */
function animateNumber(element, targetValue, duration = 1500, suffix = '') {
    if (!element) return;
    
    const startValue = 0;
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuart);
        
        element.textContent = currentValue.toLocaleString() + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = targetValue.toLocaleString() + suffix;
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// ==========================================
// 日常训练模块
// ==========================================

/**
 * 切换训练分类标签
 * @param {string} tabName - 标签名称
 */
function switchTrainingTab(tabName) {
    const tabBtns = document.querySelectorAll('.training-tab-btn');
    const tabContents = document.querySelectorAll('.training-tab-content');
    
    tabBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tabName) {
            btn.classList.add('active');
        }
    });
    
    tabContents.forEach(content => {
        if (content.id === tabName) {
            content.style.display = 'grid';
            content.classList.add('fade-in');
            setTimeout(() => content.classList.remove('fade-in'), 500);
        } else {
            content.style.display = 'none';
        }
    });
}

// ==========================================
// 知识库模块
// ==========================================

/**
 * 知识库分类筛选
 * @param {string} category - 分类名称
 */
function filterKnowledge(category) {
    const filterBtns = document.querySelectorAll('.knowledge-filter-btn');
    const articles = document.querySelectorAll('.knowledge-card, .article-card');
    
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category || (category === 'all' && !btn.dataset.category)) {
            btn.classList.add('active');
        }
    });
    
    articles.forEach(article => {
        const articleCategory = article.dataset.category;
        
        if (category === 'all' || !category || articleCategory === category) {
            article.style.display = 'block';
            article.classList.add('fade-in');
            setTimeout(() => article.classList.remove('fade-in'), 500);
        } else {
            article.style.display = 'none';
        }
    });
    
    const visibleCount = Array.from(articles).filter(a => a.style.display !== 'none').length;
    showToast(`显示 ${visibleCount} 篇文章`, 'info', 2000);
}

/**
 * 知识库搜索
 * @param {string} keyword - 搜索关键词
 */
function searchKnowledge(keyword) {
    if (!keyword || keyword.trim() === '') {
        showToast('请输入搜索关键词', 'warning');
        return;
    }
    
    const articles = document.querySelectorAll('.knowledge-card, .article-card');
    const searchTerm = keyword.toLowerCase().trim();
    let matchCount = 0;
    
    articles.forEach(article => {
        const title = article.querySelector('h3, h4, .card-title')?.textContent?.toLowerCase() || '';
        const content = article.querySelector('p, .card-desc')?.textContent?.toLowerCase() || '';
        const tags = article.dataset.tags?.toLowerCase() || '';
        
        if (title.includes(searchTerm) || content.includes(searchTerm) || tags.includes(searchTerm)) {
            article.style.display = 'block';
            article.classList.add('highlight-match');
            setTimeout(() => article.classList.remove('highlight-match'), 2000);
            matchCount++;
        } else {
            article.style.display = 'none';
        }
    });
    
    if (matchCount > 0) {
        showToast(`找到 ${matchCount} 篇相关文章`, 'success');
    } else {
        showToast('未找到相关文章，请尝试其他关键词', 'info');
        articles.forEach(article => article.style.display = 'block');
    }
}

// ==========================================
// 预约功能模块
// ==========================================

/**
 * 选择服务类型
 * @param {string} serviceType - 服务类型
 */
function selectServiceType(serviceType) {
    const serviceCards = document.querySelectorAll('.service-type-card');
    const serviceSelect = document.getElementById('serviceType');

    serviceCards.forEach(card => {
        card.classList.remove('selected');
        if (card.dataset.service === serviceType) {
            card.classList.add('selected');
        }
    });

    if (serviceSelect) {
        serviceSelect.value = serviceType;
    }

    // 显示服务详情
    showServiceTypeDetail(serviceType);

    const serviceNames = {
        'initial-assessment': '初诊评估',
        'follow-up': '复诊跟踪',
        'parent-consultation': '家长咨询',
        'group-training': '团体训练',
        'individual-therapy': '个别化治疗',
        'sensory-training': '感统训练',
        'assessment': '专业评估',
        'training': '康复训练',
        'consultation': '专家咨询',
        'group': '团体课程'
    };

    showToast(`已选择：${serviceNames[serviceType] || serviceType}`, 'info', 2000);
}

/**
 * 显示服务类型详情
 * @param {string} serviceType - 服务类型
 */
function showServiceTypeDetail(serviceType) {
    const detail = serviceTypeDetails[serviceType];
    if (!detail) return;

    const content = `
        <div class="service-detail-modal">
            <div class="service-detail-header">
                <h4>${detail.title}</h4>
                <div class="service-meta">
                    <span class="service-duration">⏱ ${detail.duration}</span>
                    <span class="service-price">${detail.price}</span>
                </div>
            </div>
            <div class="service-detail-body">
                <p class="service-description">${detail.description}</p>
                <h5>服务流程：</h5>
                <ol class="service-process">
                    ${detail.process.map(step => `<li>${step}</li>`).join('')}
                </ol>
            </div>
        </div>
    `;

    openModal(detail.title, content, {
        showFooter: false
    });
}

/**
 * 提交预约表单
 * @param {Event} event - 表单提交事件
 * @returns {Promise<boolean>}
 */
function submitAppointment(event) {
    if (event) {
        event.preventDefault();
    }

    return new Promise((resolve) => {
        const form = document.getElementById('appointmentForm');
        if (!form) {
            showToast('表单不存在', 'error');
            resolve(false);
            return;
        }

        const formData = {
            serviceType: form.querySelector('[name="serviceType"]')?.value || document.getElementById('serviceType')?.value,
            appointmentDate: form.querySelector('[name="appointmentDate"]')?.value || document.getElementById('appointmentDate')?.value,
            appointmentTime: form.querySelector('[name="appointmentTime"]')?.value || document.getElementById('appointmentTime')?.value || '',
            contactName: form.querySelector('[name="contactName"]')?.value || document.getElementById('contactName')?.value,
            contactPhone: form.querySelector('[name="contactPhone"]')?.value || document.getElementById('contactPhone')?.value,
            childName: form.querySelector('[name="childName"]')?.value || document.getElementById('childName')?.value || '',
            childAge: form.querySelector('[name="childAge"]')?.value || document.getElementById('childAge')?.value || '',
            remarks: form.querySelector('[name="remarks"]')?.value || document.getElementById('remarks')?.value || ''
        };

        // 验证表单数据完整性
        if (!formData.serviceType) {
            showToast('请选择服务类型', 'warning');
            resolve(false);
            return;
        }

        if (!formData.appointmentDate) {
            showToast('请选择预约日期', 'warning');
            resolve(false);
            return;
        }

        if (!formData.contactName || formData.contactName.trim().length < 2) {
            showToast('请输入正确的联系人姓名（至少2个字符）', 'warning');
            resolve(false);
            return;
        }

        // 验证手机号格式
        const phoneRegex = /^1[3-9]\d{9}$/;
        if (!formData.contactPhone) {
            showToast('请输入手机号码', 'warning');
            resolve(false);
            return;
        }
        if (!phoneRegex.test(formData.contactPhone)) {
            showToast('请输入正确的11位手机号码', 'warning');
            resolve(false);
            return;
        }

        // 验证日期不能早于今天
        const selectedDate = new Date(formData.appointmentDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            showToast('预约日期不能早于今天', 'warning');
            resolve(false);
            return;
        }

        // 验证日期不能晚于90天后
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 90);
        if (selectedDate > maxDate) {
            showToast('预约日期不能超过90天', 'warning');
            resolve(false);
            return;
        }

        // 使用预约系统保存数据
        const appointmentRecord = appointmentSystem.saveAppointment(formData);

        // 显示提交成功提示
        showToast(`预约成功！预约号：${appointmentRecord.id}`, 'success', 5000);

        // 发送确认通知（模拟）
        sendAppointmentNotification(appointmentRecord);

        // 重置表单
        form.reset();
        document.querySelectorAll('.service-type-card').forEach(card => {
            card.classList.remove('selected');
        });

        resolve(true);
    });
}

/**
 * 发送预约确认通知（模拟）
 * @param {Object} appointment - 预约记录
 */
function sendAppointmentNotification(appointment) {
    const serviceNames = {
        'initial-assessment': '初诊评估',
        'follow-up': '复诊跟踪',
        'parent-consultation': '家长咨询',
        'group-training': '团体训练',
        'individual-therapy': '个别化治疗',
        'sensory-training': '感统训练'
    };

    console.log('=== 预约确认通知 ===');
    console.log(`预约号：${appointment.id}`);
    console.log(`联系人：${appointment.contactName}`);
    console.log(`手机号：${appointment.contactPhone}`);
    console.log(`服务类型：${serviceNames[appointment.serviceType] || appointment.serviceType}`);
    console.log(`预约日期：${appointment.appointmentDate}`);
    console.log(`预约时间：${appointment.appointmentTime || '未指定'}`);
    console.log(`状态：待确认`);
    console.log('===================');

    // 模拟发送短信/邮件
    setTimeout(() => {
        showToast('确认通知已发送至您的手机', 'info', 3000);
    }, 1000);
}

/**
 * 查询预约状态
 * @param {string} query - 查询内容(预约号或手机号)
 * @returns {Array} 查询结果
 */
function queryAppointment(query) {
    if (!query || query.trim() === '') {
        showToast('请输入预约号或手机号', 'warning');
        return [];
    }

    const results = appointmentSystem.findAppointment(query);

    if (results.length === 0) {
        showToast('未找到相关预约记录', 'info');
    } else {
        displayAppointmentResults(results);
    }

    return results;
}

/**
 * 显示预约查询结果
 * @param {Array} appointments - 预约记录数组
 */
function displayAppointmentResults(appointments) {
    const statusMap = {
        'pending': '待确认',
        'confirmed': '已确认',
        'completed': '已完成',
        'cancelled': '已取消'
    };

    const serviceNames = {
        'initial-assessment': '初诊评估',
        'follow-up': '复诊跟踪',
        'parent-consultation': '家长咨询',
        'group-training': '团体训练',
        'individual-therapy': '个别化治疗',
        'sensory-training': '感统训练',
        'assessment': '专业评估',
        'training': '康复训练',
        'consultation': '专家咨询',
        'group': '团体课程'
    };

    const statusClassMap = {
        'pending': 'status-pending',
        'confirmed': 'status-confirmed',
        'completed': 'status-completed',
        'cancelled': 'status-cancelled'
    };

    const content = appointments.map((apt, index) => `
        <div class="appointment-detail-item" data-appointment-id="${apt.id}">
            <div class="appointment-header">
                <h4>预约 ${index + 1}</h4>
                <span class="appointment-status ${statusClassMap[apt.status]}">${statusMap[apt.status] || apt.status}</span>
            </div>
            <div class="appointment-info">
                <p><strong>预约号：</strong><span class="appointment-id">${apt.id}</span></p>
                <p><strong>服务类型：</strong>${serviceNames[apt.serviceType] || apt.serviceType}</p>
                <p><strong>预约日期：</strong>${apt.appointmentDate}</p>
                ${apt.appointmentTime ? `<p><strong>预约时间：</strong>${apt.appointmentTime}</p>` : ''}
                <p><strong>联系人：</strong>${apt.contactName}</p>
                <p><strong>联系电话：</strong>${apt.contactPhone}</p>
                ${apt.childName ? `<p><strong>儿童姓名：</strong>${apt.childName}</p>` : ''}
                ${apt.childAge ? `<p><strong>儿童年龄：</strong>${apt.childAge}岁</p>` : ''}
                ${apt.remarks ? `<p><strong>备注：</strong>${apt.remarks}</p>` : ''}
                <p><strong>提交时间：</strong>${new Date(apt.submitTime).toLocaleString('zh-CN')}</p>
            </div>
            ${apt.status !== 'cancelled' && apt.status !== 'completed' ? `
            <div class="appointment-actions">
                <button class="btn btn-danger btn-sm" onclick="cancelAppointmentByUser('${apt.id}')">取消预约</button>
            </div>
            ` : ''}
        </div>
    `).join('');

    openModal('预约查询结果', `
        <div class="appointment-results">
            ${content}
        </div>
    `, {
        showFooter: false
    });
}

/**
 * 用户取消预约
 * @param {string} appointmentId - 预约ID
 */
function cancelAppointmentByUser(appointmentId) {
    const statusMap = {
        'pending': '待确认',
        'confirmed': '已确认',
        'completed': '已完成',
        'cancelled': '已取消'
    };

    const apt = appointmentSystem.getAllAppointments().find(a => a.id === appointmentId);
    if (!apt) {
        showToast('预约记录不存在', 'error');
        return;
    }

    const content = `
        <div class="cancel-confirm">
            <p>您确定要取消以下预约吗？</p>
            <div class="cancel-appointment-info">
                <p><strong>预约号：</strong>${apt.id}</p>
                <p><strong>服务类型：</strong>${apt.serviceType}</p>
                <p><strong>预约日期：</strong>${apt.appointmentDate}</p>
                <p><strong>当前状态：</strong>${statusMap[apt.status] || apt.status}</p>
            </div>
            <p class="cancel-notice">取消后不可恢复，如需重新预约请重新提交。</p>
        </div>
    `;

    openModal('确认取消预约', content, {
        confirmText: '确认取消',
        confirmCallback: `confirmCancelAppointment('${appointmentId}')`
    });
}

/**
 * 确认取消预约
 * @param {string} appointmentId - 预约ID
 */
function confirmCancelAppointment(appointmentId) {
    const success = appointmentSystem.cancelAppointment(appointmentId);
    if (success) {
        closeModal();
        showToast('预约已成功取消', 'success');
        // 发送取消通知（模拟）
        setTimeout(() => {
            showToast('取消通知已发送至您的手机', 'info', 3000);
        }, 1000);
    } else {
        showToast('取消预约失败，请重试', 'error');
    }
}

// ==========================================
// 合作与志愿者模块
// ==========================================

/**
 * 提交合作意向表单
 * @param {Event} event - 表单提交事件
 * @returns {boolean}
 */
function submitCooperation(event) {
    if (event) {
        event.preventDefault();
    }

    const form = document.getElementById('cooperationForm') || document.querySelector('.cooperation-form');
    if (!form) {
        showToast('表单不存在', 'error');
        return false;
    }

    const formData = {
        companyName: form.querySelector('[name="companyName"]')?.value?.trim() || '',
        contactName: form.querySelector('[name="contactName"]')?.value?.trim() || '',
        contactPhone: form.querySelector('[name="contactPhone"]')?.value?.trim() || '',
        email: form.querySelector('[name="email"]')?.value?.trim() || '',
        cooperationType: form.querySelector('[name="cooperationType"]')?.value || '',
        cooperationContent: form.querySelector('[name="cooperationContent"]')?.value?.trim() || '',
        message: form.querySelector('[name="message"]')?.value?.trim() || ''
    };

    // 验证表单数据
    if (!formData.companyName || formData.companyName.length < 2) {
        showToast('请输入正确的机构/公司名称（至少2个字符）', 'warning');
        return false;
    }

    if (!formData.contactName || formData.contactName.length < 2) {
        showToast('请输入正确的联系人姓名（至少2个字符）', 'warning');
        return false;
    }

    if (!formData.contactPhone) {
        showToast('请输入联系人电话', 'warning');
        return false;
    }

    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(formData.contactPhone)) {
        showToast('请输入正确的11位手机号码', 'warning');
        return false;
    }

    if (!formData.email) {
        showToast('请输入邮箱地址', 'warning');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showToast('请输入正确的邮箱地址', 'warning');
        return false;
    }

    if (!formData.cooperationType) {
        showToast('请选择合作类型', 'warning');
        return false;
    }

    if (!formData.cooperationContent || formData.cooperationContent.length < 10) {
        showToast('请详细描述合作内容（至少10个字符）', 'warning');
        return false;
    }

    // 生成合作意向记录
    const cooperationRecord = {
        id: 'COOP' + Date.now().toString().slice(-8),
        companyName: formData.companyName,
        contactName: formData.contactName,
        contactPhone: formData.contactPhone,
        email: formData.email,
        cooperationType: formData.cooperationType,
        cooperationContent: formData.cooperationContent,
        message: formData.message,
        submitTime: new Date().toISOString(),
        status: 'pending'
    };

    // 存储到 localStorage
    const existingRecords = JSON.parse(localStorage.getItem('smartHeartCooperations') || '[]');
    existingRecords.push(cooperationRecord);
    localStorage.setItem('smartHeartCooperations', JSON.stringify(existingRecords));

    // 显示提交成功提示
    showToast(`合作意向已提交！意向编号：${cooperationRecord.id}，我们将尽快与您联系！`, 'success', 5000);

    // 通知商务团队（模拟）
    notifyBusinessTeam(cooperationRecord);

    // 重置表单
    form.reset();

    return true;
}

/**
 * 通知商务团队（模拟）
 * @param {Object} cooperation - 合作意向记录
 */
function notifyBusinessTeam(cooperation) {
    const cooperationTypeMap = {
        'resource': '资源共享',
        'service': '服务合作',
        'research': '科研合作',
        'sponsorship': '公益赞助',
        'other': '其他合作'
    };

    console.log('=== 新合作意向通知 ===');
    console.log(`意向编号：${cooperation.id}`);
    console.log(`机构名称：${cooperation.companyName}`);
    console.log(`联系人：${cooperation.contactName}`);
    console.log(`联系电话：${cooperation.contactPhone}`);
    console.log(`邮箱：${cooperation.email}`);
    console.log(`合作类型：${cooperationTypeMap[cooperation.cooperationType] || cooperation.cooperationType}`);
    console.log(`合作内容：${cooperation.cooperationContent.substring(0, 50)}...`);
    console.log('=====================');

    // 模拟发送邮件通知
    setTimeout(() => {
        console.log(`邮件通知已发送至商务团队：business@xingxin.com`);
    }, 500);
}

/**
 * 志愿者申请
 * 打开志愿者申请表单模态框
 */
function applyVolunteer() {
    const content = `
        <form id="volunteerForm" class="volunteer-form">
            <div class="form-row">
                <div class="form-group">
                    <label>姓名 *</label>
                    <input type="text" name="name" required placeholder="请输入您的姓名">
                </div>
                <div class="form-group">
                    <label>年龄 *</label>
                    <input type="number" name="age" required placeholder="请输入您的年龄" min="18" max="70">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>手机号 *</label>
                    <input type="tel" name="phone" required placeholder="请输入您的手机号" pattern="1[3-9]\\d{9}">
                </div>
                <div class="form-group">
                    <label>邮箱</label>
                    <input type="email" name="email" placeholder="请输入您的邮箱">
                </div>
            </div>
            <div class="form-group">
                <label>可服务时间 *</label>
                <div class="time-options">
                    <label class="checkbox-label"><input type="checkbox" name="availableTime" value="weekday-morning"> 工作日上午</label>
                    <label class="checkbox-label"><input type="checkbox" name="availableTime" value="weekday-afternoon"> 工作日下午</label>
                    <label class="checkbox-label"><input type="checkbox" name="availableTime" value="weekend-morning"> 周末上午</label>
                    <label class="checkbox-label"><input type="checkbox" name="availableTime" value="weekend-afternoon"> 周末下午</label>
                </div>
            </div>
            <div class="form-group">
                <label>志愿服务意向 *</label>
                <select name="volunteerType" required>
                    <option value="">请选择</option>
                    <option value="companion">儿童陪伴</option>
                    <option value="activity">活动协助</option>
                    <option value="professional">专业支持（医疗/心理/教育）</option>
                    <option value="admin">行政支持</option>
                    <option value="other">其他</option>
                </select>
            </div>
            <div class="form-group">
                <label>自我介绍 *</label>
                <textarea name="introduction" rows="4" required placeholder="请简单介绍您自己，包括您的专业背景、志愿服务经历、以及为什么想加入我们..."></textarea>
            </div>
            <div class="form-group">
                <label class="checkbox-label">
                    <input type="checkbox" name="agreement" required>
                    我已阅读并同意志愿者服务协议
                </label>
            </div>
        </form>
    `;

    openModal('志愿者申请', content, {
        confirmText: '提交申请',
        confirmCallback: 'submitVolunteerForm()'
    });
}

/**
 * 提交志愿者表单
 * 提交后存储到 localStorage 并显示成功提示
 */
function submitVolunteerForm() {
    const form = document.getElementById('volunteerForm');
    if (!form) return;

    // 获取可服务时间（多选）
    const availableTimeCheckboxes = form.querySelectorAll('input[name="availableTime"]:checked');
    const availableTimes = Array.from(availableTimeCheckboxes).map(cb => cb.value);

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.availableTime = availableTimes;

    // 验证必填项
    if (!data.name || data.name.trim().length < 2) {
        showToast('请输入正确的姓名', 'warning');
        return;
    }

    if (!data.age || data.age < 18 || data.age > 70) {
        showToast('请输入有效的年龄（18-70岁）', 'warning');
        return;
    }

    if (!data.phone) {
        showToast('请输入手机号码', 'warning');
        return;
    }

    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(data.phone)) {
        showToast('请输入正确的11位手机号码', 'warning');
        return;
    }

    if (availableTimes.length === 0) {
        showToast('请至少选择一个可服务时间', 'warning');
        return;
    }

    if (!data.volunteerType) {
        showToast('请选择志愿服务意向', 'warning');
        return;
    }

    if (!data.introduction || data.introduction.trim().length < 10) {
        showToast('自我介绍至少需要10个字', 'warning');
        return;
    }

    if (!data.agreement) {
        showToast('请阅读并同意志愿者服务协议', 'warning');
        return;
    }

    // 生成申请记录
    const volunteerRecord = {
        id: 'VOL' + Date.now().toString().slice(-8),
        name: data.name.trim(),
        age: parseInt(data.age),
        phone: data.phone,
        email: data.email || '',
        availableTime: availableTimes,
        volunteerType: data.volunteerType,
        introduction: data.introduction.trim(),
        submitTime: new Date().toISOString(),
        status: 'pending'
    };

    // 存储到 localStorage
    const existingRecords = JSON.parse(localStorage.getItem('smartHeartVolunteers') || '[]');
    existingRecords.push(volunteerRecord);
    localStorage.setItem('smartHeartVolunteers', JSON.stringify(existingRecords));

    // 关闭模态框并显示成功提示
    closeModal();
    showToast(`志愿者申请已提交！申请编号：${volunteerRecord.id}，感谢您的爱心！`, 'success', 5000);

    // 模拟发送确认通知
    console.log('=== 志愿者申请通知 ===');
    console.log(`申请编号：${volunteerRecord.id}`);
    console.log(`姓名：${volunteerRecord.name}`);
    console.log(`手机：${volunteerRecord.phone}`);
    console.log(`服务意向：${volunteerRecord.volunteerType}`);
    console.log(`可服务时间：${volunteerRecord.availableTime.join(', ')}`);
    console.log('=====================');
}

// ==========================================
// 页面初始化与事件绑定
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initStatsAnimation();
    initTrainingTabs();
    initKnowledgeFilter();
    initAppointmentForm();
    initServiceTypeSelection();
    initSearchFunctionality();
    initCooperationForm();
    initVolunteerButtons();
    initSecurityFeatures();
});

/**
 * 初始化导航功能
 */
function initNavigation() {
    const navLinks = document.querySelectorAll('nav a, .nav-link');
    const allModules = document.querySelectorAll('main > section, .page-module');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const moduleId = href.substring(1);
                showModule(moduleId);
                
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    window.showModule = function(moduleId) {
        allModules.forEach(module => {
            module.style.display = 'none';
        });
        
        const selectedModule = document.getElementById(moduleId);
        if (selectedModule) {
            selectedModule.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
            initModuleSpecific(moduleId);
        }
    };
}

/**
 * 初始化统计数字动画
 */
function initStatsAnimation() {
    const statElements = document.querySelectorAll('.stat-number, .stat-number-enhanced');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const finalValue = parseInt(element.dataset.value || element.textContent.replace(/[^\d]/g, ''));
                const suffix = element.dataset.suffix || element.textContent.replace(/[\d,]/g, '');
                
                if (!isNaN(finalValue)) {
                    animateNumber(element, finalValue, 1500, suffix);
                }
                
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    statElements.forEach(stat => observer.observe(stat));
}

/**
 * 初始化训练标签切换
 */
function initTrainingTabs() {
    const tabBtns = document.querySelectorAll('.training-tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            switchTrainingTab(tabName);
        });
    });
}

/**
 * 初始化知识库筛选
 */
function initKnowledgeFilter() {
    const filterBtns = document.querySelectorAll('.knowledge-filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category || 'all';
            filterKnowledge(category);
        });
    });
}

/**
 * 初始化预约表单
 */
function initAppointmentForm() {
    const form = document.getElementById('appointmentForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            submitAppointment();
        });
    }
    
    const queryBtn = document.getElementById('queryAppointmentBtn');
    if (queryBtn) {
        queryBtn.addEventListener('click', function() {
            const queryInput = document.getElementById('appointmentQuery');
            if (queryInput) {
                queryAppointment(queryInput.value);
            }
        });
    }
}

/**
 * 初始化服务类型选择
 */
function initServiceTypeSelection() {
    const serviceCards = document.querySelectorAll('.service-type-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceType = this.dataset.service;
            selectServiceType(serviceType);
        });
    });
}

/**
 * 初始化搜索功能
 */
function initSearchFunctionality() {
    const searchInput = document.getElementById('knowledgeSearch');
    const searchBtn = document.getElementById('knowledgeSearchBtn');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            searchKnowledge(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchKnowledge(searchInput.value);
            }
        });
    }
}

/**
 * 初始化合作表单
 */
function initCooperationForm() {
    const form = document.getElementById('cooperationForm') || document.querySelector('.cooperation-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            submitCooperation();
        });
    }
}

/**
 * 初始化志愿者按钮
 */
function initVolunteerButtons() {
    const volunteerBtns = document.querySelectorAll('[data-action="volunteer"], .volunteer-btn');
    
    volunteerBtns.forEach(btn => {
        btn.addEventListener('click', applyVolunteer);
    });
}

/**
 * 模块特定初始化
 */
function initModuleSpecific(moduleId) {
    switch(moduleId) {
        case 'starlight-overview':
        case 'overview':
            initStatsAnimation();
            break;
        case 'daily-training':
        case 'training':
            initTrainingTabs();
            break;
        case 'science-class':
        case 'recovery-notes':
        case 'knowledge':
            initKnowledgeFilter();
            break;
        case 'appointment-companion':
        case 'appointment':
            initAppointmentForm();
            break;
    }
}

/**
 * 安全功能初始化
 */
function initSecurityFeatures() {
    let sessionTimeout = 15 * 60;
    const sessionTimerElement = document.getElementById('session-timer');
    
    function updateSessionTimer() {
        if (!sessionTimerElement) return;
        
        const minutes = Math.floor(sessionTimeout / 60);
        const seconds = sessionTimeout % 60;
        sessionTimerElement.textContent = `会话将在 ${minutes}:${seconds < 10 ? '0' : ''}${seconds} 后自动锁定`;
        
        if (sessionTimeout <= 0) {
            lockScreen();
        } else {
            sessionTimeout--;
        }
    }
    
    if (sessionTimerElement) {
        setInterval(updateSessionTimer, 1000);
    }
    
    const resetSessionTimeout = () => {
        sessionTimeout = 15 * 60;
    };
    
    ['click', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(eventType => {
        document.addEventListener(eventType, resetSessionTimeout);
    });
}

function lockScreen() {
    showToast('由于长时间无操作，系统已自动锁定', 'warning');
}

// ==========================================
// 关于我们页面功能
// ==========================================

function openOnlineConsult() {
    openModal('在线咨询', `
        <div class="consult-info">
            <p>🕐 工作时间：周一至周五 9:00-18:00</p>
            <p>📞 客服热线：400-123-4567</p>
            <p>💬 您也可以点击右下角的聊天按钮与AI助手对话</p>
        </div>
    `);
}

function openVisitBooking() {
    const content = `
        <form id="visitForm" class="visit-form">
            <div class="form-group">
                <label>姓名 *</label>
                <input type="text" name="name" required>
            </div>
            <div class="form-group">
                <label>手机号 *</label>
                <input type="tel" name="phone" required pattern="1[3-9]\\d{9}">
            </div>
            <div class="form-group">
                <label>预约日期 *</label>
                <input type="date" name="date" required>
            </div>
            <div class="form-group">
                <label>参观人数</label>
                <select name="people">
                    <option value="1">1人</option>
                    <option value="2">2人</option>
                    <option value="3">3人</option>
                    <option value="4">4人及以上</option>
                </select>
            </div>
            <div class="form-group">
                <label>备注</label>
                <textarea name="remarks" rows="2"></textarea>
            </div>
        </form>
    `;
    
    openModal('预约参观', content, {
        confirmText: '提交预约',
        confirmCallback: 'submitVisitForm()'
    });
}

function submitVisitForm() {
    const form = document.getElementById('visitForm');
    if (!form) return;
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    if (!data.name || !data.phone || !data.date) {
        showToast('请填写必填项', 'warning');
        return;
    }
    
    closeModal();
    showToast('参观预约已提交，我们将尽快与您联系确认！', 'success');
}

/**
 * 查看职位详情
 * @param {string} jobTitle - 职位名称
 */
function viewJobDetail(jobTitle) {
    const job = jobDetails[jobTitle];
    if (!job) {
        showToast('职位信息不存在', 'error');
        return;
    }

    const content = `
        <div class="job-detail-modal">
            <div class="job-detail-header">
                <h3>${job.title}</h3>
                <div class="job-meta">
                    <span class="job-department">${job.department}</span>
                    <span class="job-salary">${job.salary}</span>
                </div>
            </div>
            <div class="job-detail-body">
                <div class="job-section">
                    <h4>岗位职责</h4>
                    <ul>
                        ${job.responsibilities.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                <div class="job-section">
                    <h4>任职要求</h4>
                    <ul>
                        ${job.requirements.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                <div class="job-section">
                    <h4>福利待遇</h4>
                    <div class="job-benefits">
                        ${job.benefits.map(benefit => `<span class="benefit-tag">${benefit}</span>`).join('')}
                    </div>
                </div>
            </div>
            <div class="job-detail-footer">
                <p class="apply-info">有意者请将简历发送至：<strong>hr@xingxin.com</strong></p>
                <p class="apply-note">邮件标题请注明：应聘职位-姓名</p>
            </div>
        </div>
    `;

    openModal(job.title, content, {
        confirmText: '申请职位',
        confirmCallback: `applyForJob('${jobTitle}')`
    });
}

/**
 * 申请职位
 * @param {string} jobTitle - 职位名称
 */
function applyForJob(jobTitle) {
    const content = `
        <form id="jobApplicationForm" class="job-application-form">
            <input type="hidden" name="jobTitle" value="${jobTitle}">
            <div class="form-row">
                <div class="form-group">
                    <label>姓名 *</label>
                    <input type="text" name="name" required placeholder="请输入您的姓名">
                </div>
                <div class="form-group">
                    <label>手机号 *</label>
                    <input type="tel" name="phone" required placeholder="请输入您的手机号" pattern="1[3-9]\\d{9}">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>邮箱 *</label>
                    <input type="email" name="email" required placeholder="请输入您的邮箱">
                </div>
                <div class="form-group">
                    <label>期望薪资</label>
                    <input type="text" name="expectedSalary" placeholder="请输入您的期望薪资">
                </div>
            </div>
            <div class="form-group">
                <label>个人简介 *</label>
                <textarea name="introduction" rows="4" required placeholder="请简要介绍您的工作经历、教育背景和相关技能..."></textarea>
            </div>
            <div class="form-group">
                <label>简历链接</label>
                <input type="url" name="resumeUrl" placeholder="请提供简历下载链接（如云盘链接）">
            </div>
        </form>
    `;

    openModal(`申请 ${jobTitle}`, content, {
        confirmText: '提交申请',
        confirmCallback: 'submitJobApplication()'
    });
}

/**
 * 提交职位申请
 */
function submitJobApplication() {
    const form = document.getElementById('jobApplicationForm');
    if (!form) return;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // 验证必填项
    if (!data.name || data.name.trim().length < 2) {
        showToast('请输入正确的姓名', 'warning');
        return;
    }

    if (!data.phone) {
        showToast('请输入手机号码', 'warning');
        return;
    }

    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(data.phone)) {
        showToast('请输入正确的11位手机号码', 'warning');
        return;
    }

    if (!data.email) {
        showToast('请输入邮箱', 'warning');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showToast('请输入正确的邮箱地址', 'warning');
        return;
    }

    if (!data.introduction || data.introduction.trim().length < 20) {
        showToast('个人简介至少需要20个字', 'warning');
        return;
    }

    // 生成申请记录
    const applicationRecord = {
        id: 'JOB' + Date.now().toString().slice(-8),
        jobTitle: data.jobTitle,
        name: data.name.trim(),
        phone: data.phone,
        email: data.email,
        expectedSalary: data.expectedSalary || '',
        introduction: data.introduction.trim(),
        resumeUrl: data.resumeUrl || '',
        submitTime: new Date().toISOString(),
        status: 'pending'
    };

    // 存储到 localStorage
    const existingRecords = JSON.parse(localStorage.getItem('smartHeartJobApplications') || '[]');
    existingRecords.push(applicationRecord);
    localStorage.setItem('smartHeartJobApplications', JSON.stringify(existingRecords));

    // 关闭模态框并显示成功提示
    closeModal();
    showToast(`职位申请已提交！申请编号：${applicationRecord.id}，我们会尽快与您联系。`, 'success', 5000);

    // 模拟通知HR
    console.log('=== 新职位申请通知 ===');
    console.log(`申请编号：${applicationRecord.id}`);
    console.log(`应聘职位：${applicationRecord.jobTitle}`);
    console.log(`姓名：${applicationRecord.name}`);
    console.log(`邮箱：${applicationRecord.email}`);
    console.log('=====================');
}

/**
 * 查看所有招聘信息
 */
function viewJobs() {
    const content = `
        <div class="jobs-list">
            ${Object.values(jobDetails).map(job => `
                <div class="job-item" onclick="viewJobDetail('${job.title}')">
                    <div class="job-item-header">
                        <h4>${job.title}</h4>
                        <span class="job-salary">${job.salary}</span>
                    </div>
                    <p class="job-dept">${job.department}</p>
                    <div class="job-benefits-preview">
                        ${job.benefits.slice(0, 3).map(benefit => `<span class="benefit-tag-small">${benefit}</span>`).join('')}
                    </div>
                    <button class="btn btn-primary btn-sm view-detail-btn">查看详情</button>
                </div>
            `).join('')}
        </div>
        <div class="jobs-footer">
            <p>没有找到合适的职位？</p>
            <p>欢迎发送简历至 <strong>hr@xingxin.com</strong>，我们会为您保留资料。</p>
        </div>
    `;

    openModal('招聘信息', content, {
        showFooter: false
    });
}

// 暴露全局函数
window.showToast = showToast;
window.openModal = openModal;
window.closeModal = closeModal;
window.animateNumber = animateNumber;
window.switchTrainingTab = switchTrainingTab;
window.filterKnowledge = filterKnowledge;
window.searchKnowledge = searchKnowledge;
window.selectServiceType = selectServiceType;
window.showServiceTypeDetail = showServiceTypeDetail;
window.submitAppointment = submitAppointment;
window.queryAppointment = queryAppointment;
window.cancelAppointmentByUser = cancelAppointmentByUser;
window.confirmCancelAppointment = confirmCancelAppointment;
window.sendAppointmentNotification = sendAppointmentNotification;
window.submitCooperation = submitCooperation;
window.notifyBusinessTeam = notifyBusinessTeam;
window.applyVolunteer = applyVolunteer;
window.submitVolunteerForm = submitVolunteerForm;
window.viewJobDetail = viewJobDetail;
window.applyForJob = applyForJob;
window.submitJobApplication = submitJobApplication;
window.openOnlineConsult = openOnlineConsult;
window.openVisitBooking = openVisitBooking;
window.viewJobs = viewJobs;
window.submitVisitForm = submitVisitForm;
window.appointmentSystem = appointmentSystem;

// ==========================================
// 内容数据对象
// ==========================================

// 1. 成长指引详情内容数据
const growthGuidanceContent = {
  earlySignals02: {
    title: "0-2岁早期信号",
    content: `
      <h4>0-2岁自闭症早期预警信号</h4>
      <p><strong>社交互动方面：</strong></p>
      <ul>
        <li>很少或没有眼神接触</li>
        <li>对父母的面部表情反应较少</li>
        <li>很少用手指指向感兴趣的物品</li>
        <li>不主动寻求关注或安慰</li>
        <li>对名字反应迟钝或没有反应</li>
      </ul>
      <p><strong>语言沟通方面：</strong></p>
      <ul>
        <li>12个月时还没有咿呀学语</li>
        <li>16个月时还没有说出第一个词</li>
        <li>24个月时还不会说两个词的短语</li>
        <li>语言发展明显落后于同龄人</li>
      </ul>
      <p><strong>行为模式方面：</strong></p>
      <ul>
        <li>对玩具的兴趣异常（如只关注旋转的轮子）</li>
        <li>重复性动作（如摇晃身体、拍手）</li>
        <li>对日常变化极度敏感</li>
        <li>感官反应异常（对声音、触觉过度敏感或迟钝）</li>
      </ul>
      <p><strong>建议：</strong>如果发现以上多个信号，建议尽早咨询专业医生进行评估。</p>
    `
  },
  earlySignals23: {
    title: "2-3岁预警信号",
    content: `
      <h4>2-3岁自闭症预警信号</h4>
      <p><strong>社交技能：</strong></p>
      <ul>
        <li>不会与其他孩子一起玩耍</li>
        <li>不理解轮流和分享的概念</li>
        <li>缺乏 pretend play（假装游戏）能力</li>
        <li>对他人的情感反应不敏感</li>
      </ul>
      <p><strong>语言交流：</strong></p>
      <ul>
        <li>语言使用刻板、重复</li>
        <li>不会使用语言进行社交沟通</li>
        <li>难以理解简单的指令</li>
        <li>说话语调异常（单调或过于夸张）</li>
      </ul>
      <p><strong>刻板行为：</strong></p>
      <ul>
        <li>坚持固定的日常程序，抗拒改变</li>
        <li>对特定话题过度专注</li>
        <li>重复排列玩具或其他物品</li>
        <li>对光线、声音、质地异常敏感</li>
      </ul>
    `
  },
  stageInfant: {
    title: "婴幼儿期特点（0-3岁）",
    content: `
      <h4>婴幼儿期发展特点</h4>
      <p><strong>生理发展：</strong></p>
      <ul>
        <li>大脑发育迅速，神经可塑性强</li>
        <li>感官系统正在建立连接</li>
        <li>大肌肉运动技能快速发展</li>
        <li>精细动作开始发展</li>
      </ul>
      <p><strong>认知发展：</strong></p>
      <ul>
        <li>通过感官探索世界</li>
        <li>开始理解因果关系</li>
        <li>记忆力逐渐增强</li>
        <li>问题解决能力萌芽</li>
      </ul>
      <p><strong>社交情感：</strong></p>
      <ul>
        <li>建立与主要照顾者的依恋关系</li>
        <li>开始表达基本情绪</li>
        <li>对熟悉的人表现出偏好</li>
        <li>开始理解他人的情绪</li>
      </ul>
      <p><strong>干预重点：</strong>早期干预黄金期，重点培养基础社交技能和感觉统合能力。</p>
    `
  },
  stagePreschool: {
    title: "学龄前期特点（3-6岁）",
    content: `
      <h4>学龄前期发展特点</h4>
      <p><strong>生理发展：</strong></p>
      <ul>
        <li>大肌肉运动技能更加协调</li>
        <li>精细动作能力显著提高</li>
        <li>身体协调性和平衡感增强</li>
        <li>感觉处理能力继续发展</li>
      </ul>
      <p><strong>认知发展：</strong></p>
      <ul>
        <li>语言能力快速发展</li>
        <li>开始理解抽象概念</li>
        <li>想象力和创造力蓬勃发展</li>
        <li>注意力持续时间延长</li>
      </ul>
      <p><strong>社交发展：</strong></p>
      <ul>
        <li>开始与同龄人互动</li>
        <li>学习分享和轮流</li>
        <li>理解基本的社会规则</li>
        <li>友谊概念开始形成</li>
      </ul>
      <p><strong>干预重点：</strong>培养社交技能、情绪管理能力，为入学做准备。</p>
    `
  },
  stageSchool: {
    title: "学龄期特点（6岁+）",
    content: `
      <h4>学龄期发展特点</h4>
      <p><strong>生理发展：</strong></p>
      <ul>
        <li>身体协调性和运动技能成熟</li>
        <li>精细动作能力接近成人水平</li>
        <li>感官处理能力更加稳定</li>
      </ul>
      <p><strong>认知发展：</strong></p>
      <ul>
        <li>逻辑思维能力增强</li>
        <li>阅读理解能力提高</li>
        <li>数学概念理解加深</li>
        <li>能够进行多步骤任务</li>
      </ul>
      <p><strong>社交发展：</strong></p>
      <ul>
        <li>同伴关系变得更加重要</li>
        <li>理解更复杂的社会规则</li>
        <li>开始发展自我意识</li>
        <li>能够进行更深入的对话</li>
      </ul>
      <p><strong>干预重点：</strong>学业支持、社交技能训练、独立生活能力培养。</p>
    `
  },
  advice02: {
    title: "0-2岁感官刺激建议",
    content: `
      <h4>0-2岁感官刺激活动建议</h4>
      <p><strong>视觉刺激：</strong></p>
      <ul>
        <li>使用黑白对比卡片（0-3个月）</li>
        <li>彩色气球和移动玩具</li>
        <li>镜子游戏，帮助认识自己</li>
        <li>追视训练，用玩具引导视线移动</li>
      </ul>
      <p><strong>听觉刺激：</strong></p>
      <ul>
        <li>播放柔和的音乐和儿歌</li>
        <li>使用摇铃、沙锤等发声玩具</li>
        <li>模仿动物声音游戏</li>
        <li>亲子阅读，培养语言输入</li>
      </ul>
      <p><strong>触觉体验：</strong></p>
      <ul>
        <li>不同质地的布料触摸</li>
        <li>安全的手指画活动</li>
        <li>玩沙、玩水游戏</li>
        <li>按摩和抚触</li>
      </ul>
      <p><strong>注意事项：</strong>观察孩子的反应，避免过度刺激，尊重孩子的感官偏好。</p>
    `
  },
  advice24: {
    title: "2-4岁社交游戏建议",
    content: `
      <h4>2-4岁社交游戏活动建议</h4>
      <p><strong>平行游戏阶段（2-3岁）：</strong></p>
      <ul>
        <li>提供足够的玩具，减少冲突</li>
        <li>示范简单的社交行为</li>
        <li>鼓励模仿游戏</li>
        <li>使用简单的社交故事</li>
      </ul>
      <p><strong>合作游戏阶段（3-4岁）：</strong></p>
      <ul>
        <li>简单的合作搭建积木</li>
        <li>轮流玩滑梯等游乐设施</li>
        <li>角色扮演游戏（过家家）</li>
        <li>简单的团体音乐活动</li>
      </ul>
      <p><strong>社交技能训练：</strong></p>
      <ul>
        <li>教授基本的问候语</li>
        <li>练习分享和轮流</li>
        <li>学习表达需求和情感</li>
        <li>理解简单的游戏规则</li>
      </ul>
      <p><strong>家长角色：</strong>做孩子的"社交教练"，在游戏中示范和引导。</p>
    `
  },
  advice46: {
    title: "4-6岁认知训练建议",
    content: `
      <h4>4-6岁认知训练活动建议</h4>
      <p><strong>注意力训练：</strong></p>
      <ul>
        <li>拼图游戏（从简单到复杂）</li>
        <li>找不同游戏</li>
        <li>记忆卡片配对</li>
        <li>听从多步骤指令</li>
      </ul>
      <p><strong>逻辑思维：</strong></p>
      <ul>
        <li>分类和排序活动</li>
        <li>简单的迷宫游戏</li>
        <li>因果关系玩具</li>
        <li>模式识别练习</li>
      </ul>
      <p><strong>语言认知：</strong></p>
      <ul>
        <li>绘本阅读和讨论</li>
        <li>词汇扩展游戏</li>
        <li>讲故事和编故事</li>
        <li>问答游戏</li>
      </ul>
      <p><strong>执行功能：</strong></p>
      <ul>
        <li>简单的计划活动</li>
        <li>延迟满足练习</li>
        <li>任务切换游戏</li>
        <li>自我监控活动</li>
      </ul>
    `
  },
  advice6plus: {
    title: "6岁+学业准备建议",
    content: `
      <h4>6岁以上学业准备建议</h4>
      <p><strong>学习技能：</strong></p>
      <ul>
        <li>培养独立完成作业的能力</li>
        <li>学习时间管理和组织技能</li>
        <li>建立良好的学习习惯</li>
        <li>使用视觉辅助工具</li>
      </ul>
      <p><strong>社交适应：</strong></p>
      <ul>
        <li>理解课堂规则和期望</li>
        <li>与同学建立友谊</li>
        <li>处理同伴冲突</li>
        <li>参与团体活动</li>
      </ul>
      <p><strong>情绪管理：</strong></p>
      <ul>
        <li>识别和表达情绪</li>
        <li>应对挫折的策略</li>
        <li>放松技巧</li>
        <li>自我倡导能力</li>
      </ul>
      <p><strong>家校合作：</strong></p>
      <ul>
        <li>与教师保持沟通</li>
        <li>制定个别化教育计划（IEP）</li>
        <li>提供必要的学习支持</li>
        <li>定期评估和调整策略</li>
      </ul>
    `
  },
  // 家庭观察要点详情
  observationSocial: {
    title: "社交互动观察详情",
    content: `
      <h4>社交互动观察要点</h4>
      <p><strong>观察内容：</strong></p>
      <ul>
        <li><strong>眼神接触：</strong>是否主动与他人进行眼神交流？眼神接触持续时间？</li>
        <li><strong>社交微笑：</strong>是否对熟悉的人微笑回应？</li>
        <li><strong>共同关注：</strong>是否能与他人分享同一兴趣点？</li>
        <li><strong>互动发起：</strong>是否主动发起社交互动？</li>
        <li><strong>模仿能力：</strong>是否模仿他人的动作、语言或表情？</li>
      </ul>
      <p><strong>观察方法：</strong></p>
      <ul>
        <li>在自然环境中观察（家庭、公园、学校）</li>
        <li>使用孩子感兴趣的玩具或活动</li>
        <li>观察与不同对象（家人、陌生人）的互动</li>
        <li>记录具体行为而非主观判断</li>
      </ul>
      <p><strong>建议：</strong></p>
      <ul>
        <li>通过游戏促进互动（如躲猫猫、接力游戏）</li>
        <li>使用视觉支持（图片、手势）</li>
        <li>及时强化积极的社交行为</li>
        <li>与专业人士合作制定干预计划</li>
      </ul>
    `
  },
  observationLanguage: {
    title: "语言沟通观察详情",
    content: `
      <h4>语言沟通观察要点</h4>
      <p><strong>观察内容：</strong></p>
      <ul>
        <li><strong>语言理解：</strong>是否理解简单指令？是否能回答问题？</li>
        <li><strong>语言表达：</strong>词汇量多少？句子长度？</li>
        <li><strong>沟通意图：</strong>是否用语言表达需求？</li>
        <li><strong>非语言沟通：</strong>是否使用手势、表情辅助沟通？</li>
        <li><strong>语言质量：</strong>发音清晰度？语调变化？</li>
      </ul>
      <p><strong>观察方法：</strong></p>
      <ul>
        <li>观察日常对话</li>
        <li>记录语言使用的场景</li>
        <li>注意非语言沟通方式</li>
        <li>比较与同龄人的差异</li>
      </ul>
      <p><strong>建议：</strong></p>
      <ul>
        <li>增加语言输入（多说话、多读书）</li>
        <li>使用简单、明确的语言</li>
        <li>提供选择（"你想要苹果还是香蕉？"）</li>
        <li>鼓励用语言表达需求</li>
        <li>寻求语言治疗师的帮助</li>
      </ul>
    `
  },
  observationBehavior: {
    title: "行为模式观察详情",
    content: `
      <h4>行为模式观察要点</h4>
      <p><strong>观察内容：</strong></p>
      <ul>
        <li><strong>刻板行为：</strong>是否有重复的动作、语言或兴趣？</li>
        <li><strong>感官反应：</strong>对声音、光线、触觉是否敏感或迟钝？</li>
        <li><strong>日常习惯：</strong>是否坚持固定的程序？对变化的反应？</li>
        <li><strong>兴趣范围：</strong>兴趣是否狭窄？是否过度专注于某事物？</li>
        <li><strong>情绪行为：</strong>是否有情绪爆发？触发因素是什么？</li>
      </ul>
      <p><strong>观察方法：</strong></p>
      <ul>
        <li>记录行为发生的时间、地点、频率</li>
        <li>观察行为的前因后果</li>
        <li>注意行为的功能（寻求关注、逃避、自我刺激）</li>
        <li>使用行为记录表</li>
      </ul>
      <p><strong>建议：</strong></p>
      <ul>
        <li>建立可预测的日常作息</li>
        <li>提供适当的感官调节活动</li>
        <li>逐步引入变化</li>
        <li>使用替代行为满足需求</li>
        <li>与行为分析师合作</li>
      </ul>
    `
  }
};

// 5. 康复手记完整案例
const caseStories = {
  xiaoming: {
    title: "小明的故事：从无语言到开口说话",
    content: `
      <h4>小明的故事：从无语言到开口说话</h4>
      <p><strong>基本情况：</strong></p>
      <p>小明在2岁半时被诊断为自闭症谱系障碍。当时他不会说话，很少与人有眼神接触，对呼唤名字没有反应，经常重复排列玩具车。父母最初以为他只是说话晚，直到幼儿园老师提醒他们注意到这些异常。</p>
      
      <p><strong>干预历程：</strong></p>
      <p><strong>第一年（2.5-3.5岁）：</strong></p>
      <ul>
        <li>开始接受应用行为分析（ABA）治疗，每周25小时</li>
        <li>同时进行感觉统合训练</li>
        <li>家长参加培训，学习如何在日常生活中进行干预</li>
        <li>开始使用图片交换沟通系统（PECS）</li>
      </ul>
      
      <p><strong>突破时刻（3.5岁）：</strong></p>
      <p>经过一年的密集干预，小明在3岁半时说出了第一个词"妈妈"。那一刻，全家人都激动得流下了眼泪。这个简单的词语代表着无数个日夜的努力终于有了回报。</p>
      
      <p><strong>第二年（3.5-4.5岁）：</strong></p>
      <ul>
        <li>词汇量逐渐增加到50个词</li>
        <li>开始能够用两词短语表达需求</li>
        <li>眼神接触明显改善</li>
        <li>开始参与简单的社交游戏</li>
      </ul>
      
      <p><strong>现在的进步（5岁）：</strong></p>
      <p>现在的小明已经能够用简单的句子交流，能够表达自己的需求和感受。他在普通幼儿园就读，虽然还需要一些支持，但已经能够和小朋友一起玩耍。他的刻板行为也明显减少，能够灵活应对日常的变化。</p>
      
      <p><strong>家长感言：</strong></p>
      <p>"最重要的是不要放弃希望。早期干预真的很重要，每一分努力都不会白费。看着小明一点点进步，我们知道我们的坚持是对的。" —— 小明的妈妈</p>
    `
  },
  xiaohong: {
    title: "小红的进步：感觉统合训练成果",
    content: `
      <h4>小红的进步：感觉统合训练成果</h4>
      <p><strong>基本情况：</strong></p>
      <p>小红4岁时被诊断为自闭症伴感觉处理障碍。她对声音极度敏感，听到突然的声响会捂住耳朵尖叫；对触觉也很敏感，拒绝穿某些材质的衣服，不愿意赤脚走在草地上。这些感官敏感严重影响了她的日常生活。</p>
      
      <p><strong>评估发现：</strong></p>
      <ul>
        <li>听觉防御：对中等音量以上的声音过度反应</li>
        <li>触觉防御：对轻触和某些质地过度敏感</li>
        <li>前庭觉寻求：喜欢旋转、摇晃，但容易晕车</li>
        <li>本体觉不足：动作笨拙，经常撞到东西</li>
      </ul>
      
      <p><strong>干预方案：</strong></p>
      <p><strong>第一阶段（1-2个月）：建立安全感</strong></p>
      <ul>
        <li>使用降噪耳机应对声音敏感</li>
        <li>提供深压觉输入（加重毯、紧身衣）</li>
        <li>创造可预测的感官环境</li>
      </ul>
      
      <p><strong>第二阶段（3-4个月）：系统脱敏</strong></p>
      <ul>
        <li>渐进式暴露于不同的声音和质地</li>
        <li>感觉统合活动（秋千、蹦床、平衡木）</li>
        <li>触觉探索游戏（从干燥到湿润材质）</li>
      </ul>
      
      <p><strong>第三阶段（5-6个月）：功能应用</strong></p>
      <ul>
        <li>在日常生活中应用学到的技能</li>
        <li>参加团体感统课程</li>
        <li>学习自我调节策略</li>
      </ul>
      
      <p><strong>6个月后的变化：</strong></p>
      <ul>
        <li>能够忍受普通环境的声音，不再需要一直戴耳机</li>
        <li>愿意尝试不同质地的食物和衣物</li>
        <li>动作协调性明显改善</li>
        <li>情绪更加稳定，发脾气减少</li>
        <li>能够参与更多的日常活动</li>
      </ul>
      
      <p><strong>给家长的建议：</strong></p>
      <p>"理解孩子的感官需求是第一步。不要强迫孩子接受他们无法耐受的刺激，而是循序渐进地帮助他们适应。感觉统合训练需要时间和耐心，但效果是值得的。" —— 小红的职业治疗师</p>
    `
  },
  xiaohua: {
    title: "小华的融合教育之路",
    content: `
      <h4>小华的融合教育之路</h4>
      <p><strong>基本情况：</strong></p>
      <p>小华5岁时被诊断为高功能自闭症。他有较好的语言能力，但在社交互动、理解社交规则和情绪管理方面存在困难。父母希望他能够进入普通学校接受教育，而不是去特殊学校。</p>
      
      <p><strong>准备阶段（5-6岁）：</strong></p>
      <ul>
        <li>参加社交技能训练小组</li>
        <li>学习情绪识别和管理</li>
        <li>练习与同龄人互动</li>
        <li>提前参观即将入学的学校</li>
        <li>与未来的老师沟通，制定支持计划</li>
      </ul>
      
      <p><strong>入学初期（6-7岁）：</strong></p>
      <p>一年级对小华来说充满挑战。他不理解为什么上课不能说话，为什么需要排队，为什么有些游戏他赢不了。他经常因为规则的突然改变而情绪崩溃。</p>
      
      <p><strong>支持措施：</strong></p>
      <ul>
        <li>配备影子老师，在旁协助和提示</li>
        <li>使用视觉提示卡帮助理解规则</li>
        <li>建立"冷静角"，在情绪升级时使用</li>
        <li>与同学进行自闭症 awareness 教育</li>
        <li>定期与家长和老师沟通，调整策略</li>
      </ul>
      
      <p><strong>转折点（7-8岁）：</strong></p>
      <p>在二年级，小华遇到了一个特别友善的同学小强。小强主动和小华玩，耐心地教他游戏规则，在他难过时安慰他。这个友谊对小华的社交发展产生了巨大影响。</p>
      
      <p><strong>现在的状态（9岁）：</strong></p>
      <ul>
        <li>能够独立在普通班级学习，不再需要影子老师</li>
        <li>有几个好朋友，能够参与团体活动</li>
        <li>学会了在困难时寻求帮助</li>
        <li>学业成绩中等偏上，特别是在数学方面表现优异</li>
        <li>虽然仍有一些社交挑战，但已经能够很好地适应学校生活</li>
      </ul>
      
      <p><strong>经验总结：</strong></p>
      <p>"融合教育不是把孩子放进普通班级就完事了，需要系统的支持和准备。最重要的是找到一个接纳和支持的环境，以及愿意理解和帮助的老师和同学。" —— 小华的爸爸</p>
    `
  },
  parentView: {
    title: "家长视角：我们的康复之路",
    content: `
      <h4>家长视角：我们的康复之路</h4>
      <p><strong>接受诊断：</strong></p>
      <p>当孩子被诊断为自闭症时，我感觉整个世界都崩塌了。我经历了否认、愤怒、悲伤，最终慢慢接受。这个过程花了我大约一年的时间。现在回头看，我希望能早点接受现实，这样就能早点开始干预。</p>
      
      <p><strong>寻找资源：</strong></p>
      <ul>
        <li>加入家长支持团体，和其他家长交流经验</li>
        <li>寻找专业的干预机构和治疗师</li>
        <li>阅读可靠的资料，学习自闭症知识</li>
        <li>了解并争取应有的权益和服务</li>
      </ul>
      
      <p><strong>家庭调整：</strong></p>
      <ul>
        <li>建立结构化的日常生活</li>
        <li>简化家庭环境，减少感官刺激</li>
        <li>全家人统一教养方式</li>
        <li>为兄弟姐妹提供关注和支持</li>
      </ul>
      
      <p><strong>自我照顾：</strong></p>
      <p>我学会了照顾自己的重要性。如果我自己身心俱疲，就无法很好地照顾孩子。我开始：</p>
      <ul>
        <li>定期运动，保持身体健康</li>
        <li>寻求心理咨询，处理压力和情绪</li>
        <li>安排"喘息时间"，让自己有休息的机会</li>
        <li>维持社交生活，不让自己孤立</li>
      </ul>
      
      <p><strong>给新家长的建议：</strong></p>
      <ol>
        <li>接受诊断，但不要让它定义你的孩子</li>
        <li>尽早开始干预，但不要过度治疗</li>
        <li>相信你的直觉，你是最了解孩子的人</li>
        <li>庆祝每一个小进步</li>
        <li>照顾好自己，这是你能给孩子最好的礼物</li>
        <li>加入支持团体，你并不孤单</li>
      </ol>
    `
  },
  teacherView: {
    title: "老师视角：如何制定个性化训练计划",
    content: `
      <h4>老师视角：如何制定个性化训练计划</h4>
      <p><strong>评估阶段：</strong></p>
      <p>制定有效的训练计划首先需要全面评估。我会从以下几个方面了解孩子：</p>
      <ul>
        <li>发展历史和家庭背景</li>
        <li>当前的能力水平（语言、认知、社交、自理）</li>
        <li>兴趣点和动机</li>
        <li>感官偏好和敏感</li>
        <li>学习风格（视觉型、听觉型、动觉型）</li>
        <li>挑战行为和触发因素</li>
      </ul>
      
      <p><strong>目标设定：</strong></p>
      <p>使用SMART原则设定目标：</p>
      <ul>
        <li><strong>S</strong>pecific（具体的）：明确要教什么</li>
        <li><strong>M</strong>easurable（可测量的）：能够量化进展</li>
        <li><strong>A</strong>chievable（可实现的）：在孩子能力范围内</li>
        <li><strong>R</strong>elevant（相关的）：对孩子有意义</li>
        <li><strong>T</strong>ime-bound（有时限的）：设定时间框架</li>
      </ul>
      
      <p><strong>教学策略：</strong></p>
      <ul>
        <li><strong>任务分析：</strong>将复杂技能分解成小步骤</li>
        <li><strong>视觉支持：</strong>使用图片、视频、图表辅助理解</li>
        <li><strong>强化系统：</strong>建立有效的奖励机制</li>
        <li><strong>自然环境教学：</strong>在日常生活中练习技能</li>
        <li><strong>辅助 fading：</strong>逐步减少辅助，促进独立</li>
      </ul>
      
      <p><strong>数据收集：</strong></p>
      <p>持续的数据收集对于评估计划的有效性至关重要。我会记录：</p>
      <ul>
        <li>目标技能的正确率</li>
        <li>完成任务所需的时间</li>
        <li>需要的辅助水平</li>
        <li>孩子的参与度和情绪状态</li>
      </ul>
      
      <p><strong>计划调整：</strong></p>
      <p>根据数据定期评估和调整计划。如果某个目标长期没有进展，可能需要：</p>
      <ul>
        <li>重新评估先备技能</li>
        <li>调整教学方法</li>
        <li>增加动机</li>
        <li>将目标进一步分解</li>
      </ul>
    `
  },
  childView: {
    title: "孩子视角：我想告诉大家的事",
    content: `
      <h4>孩子视角：我想告诉大家的事</h4>
      <p><strong>关于我自己：</strong></p>
      <p>我今年15岁，是一名高功能自闭症患者。我想分享一些我的感受，希望能帮助人们更好地理解自闭症。</p>
      
      <p><strong>关于感官：</strong></p>
      <p>世界对我来说有时太吵、太亮、太强烈。 fluorescent 灯光让我头痛，多人的教室让我想逃跑。这不是我矫情，而是我的神经系统真的以不同的方式处理这些信息。</p>
      
      <p><strong>关于社交：</strong></p>
      <p>我想交朋友，但社交对我来说就像一门难懂的外语。我不擅长读懂别人的表情和暗示，常常不知道别人是在开玩笑还是认真的。这并不意味着我不在乎别人，只是我需要更直接、更清晰的沟通。</p>
      
      <p><strong>关于兴趣：</strong></p>
      <p>我对火车有着强烈的兴趣。我可以花几个小时研究火车时刻表。有些人觉得这很奇怪，但这让我快乐，也让我感到平静。我的兴趣不是" obsession "，而是我的一部分。</p>
      
      <p><strong>关于变化：</strong></p>
      <p>突如其来的变化让我焦虑。我需要时间来处理新的信息。请提前告诉我即将发生的变化，给我准备的时间。</p>
      
      <p><strong>关于理解：</strong></p>
      <p>自闭症不是我的错，也不是我父母的错。这是大脑的一种不同连接方式。我不需要被"治愈"，我需要被理解和支持。</p>
      
      <p><strong>给其他人的建议：</strong></p>
      <ul>
        <li>请耐心听我说话，即使我说得慢或不流利</li>
        <li>不要假设我不理解，给我机会表达</li>
        <li>尊重我的感官需求</li>
        <li>看到我的能力，而不只是我的障碍</li>
        <li>记住，我也是一个人，有感情、有梦想、有价值</li>
      </ul>
    `
  }
};

// 6. 家长加油站文章
const parentSupportArticles = {
  acceptance: {
    title: "接纳孩子的不同",
    content: `
      <h4>接纳孩子的不同：从悲伤到庆祝</h4>
      <p><strong>悲伤的过程：</strong></p>
      <p>当孩子被诊断为自闭症时，大多数家长会经历一个悲伤的过程。这不是不爱孩子，而是对"理想孩子"梦想的哀悼。这个过程可能包括：</p>
      <ul>
        <li>否认："医生一定搞错了"</li>
        <li>愤怒："为什么是我们？"</li>
        <li>讨价还价："如果我做得更好..."</li>
        <li>抑郁：感到绝望和无助</li>
        <li>接受：最终接纳现实</li>
      </ul>
      
      <p><strong>接纳不等于放弃：</strong></p>
      <p>接纳并不意味着停止帮助孩子进步，而是：</p>
      <ul>
        <li>停止与"正常"比较</li>
        <li>关注孩子的优势，而不只是缺陷</li>
        <li>设定现实但积极的期望</li>
        <li>庆祝孩子的独特性</li>
      </ul>
      
      <p><strong>神经多样性视角：</strong></p>
      <p>尝试用"神经多样性"的视角看待自闭症：就像生物多样性一样，人类大脑也存在自然的变异。自闭症不是缺陷，而是人类神经发育的一种形式。</p>
      
      <p><strong>实践建议：</strong></p>
      <ul>
        <li>每天记录孩子的三个优点或进步</li>
        <li>与其他自闭症家庭建立联系</li>
        <li>阅读自闭症成年人的自述</li>
        <li>寻求心理咨询，处理自己的情绪</li>
        <li>记住：你的孩子仍然是那个你深爱的孩子</li>
      </ul>
    `
  },
  anxiety: {
    title: "处理焦虑与压力",
    content: `
      <h4>家长的压力管理与自我照顾</h4>
      <p><strong>认识压力信号：</strong></p>
      <ul>
        <li>身体：疲劳、失眠、头痛、肌肉紧张</li>
        <li>情绪：易怒、焦虑、抑郁、情绪波动</li>
        <li>认知：难以集中注意力、健忘、决策困难</li>
        <li>行为：社交退缩、过度饮食或食欲不振</li>
      </ul>
      
      <p><strong>压力管理策略：</strong></p>
      <p><strong>1. 身体层面：</strong></p>
      <ul>
        <li>规律运动，即使只是每天散步20分钟</li>
        <li>保证充足睡眠</li>
        <li>健康饮食，减少咖啡因和酒精</li>
        <li>学习放松技巧（深呼吸、渐进性肌肉放松）</li>
      </ul>
      
      <p><strong>2. 情绪层面：</strong></p>
      <ul>
        <li>允许自己感受情绪，不要压抑</li>
        <li>与信任的人倾诉</li>
        <li>写日记，表达内心感受</li>
        <li>寻求专业心理咨询</li>
      </ul>
      
      <p><strong>3. 认知层面：</strong></p>
      <ul>
        <li>挑战消极想法</li>
        <li>练习正念，活在当下</li>
        <li>设定现实的期望</li>
        <li>关注你能控制的事情</li>
      </ul>
      
      <p><strong>4. 社交层面：</strong></p>
      <ul>
        <li>维持社交联系，不要孤立自己</li>
        <li>加入家长支持团体</li>
        <li>寻求并接受帮助</li>
        <li>安排"喘息时间"</li>
      </ul>
    `
  },
  supportNetwork: {
    title: "建立支持网络",
    content: `
      <h4>建立你的支持网络</h4>
      <p><strong>为什么需要支持网络：</strong></p>
      <p>养育自闭症孩子是一项艰巨的任务，没有人应该独自承担。一个强大的支持网络可以提供：</p>
      <ul>
        <li>情感支持：理解、倾听和鼓励</li>
        <li>信息支持：建议、资源和经验分享</li>
        <li>实际支持：临时照看、交通、家务帮助</li>
        <li>倡导支持：在需要时为你发声</li>
      </ul>
      
      <p><strong>支持网络的组成：</strong></p>
      <p><strong>1. 家庭内部：</strong></p>
      <ul>
        <li>配偶/伴侣：共同分担责任</li>
        <li>其他子女：让他们参与，同时关注他们的需求</li>
        <li>扩展家庭：祖父母、兄弟姐妹等</li>
      </ul>
      
      <p><strong>2. 专业支持：</strong></p>
      <ul>
        <li>医生和专科医生</li>
        <li>治疗师团队</li>
        <li>特殊教育老师</li>
        <li>心理咨询师</li>
      </ul>
      
      <p><strong>3. 同路人：</strong></p>
      <ul>
        <li>其他自闭症家长</li>
        <li>家长支持团体（线上和线下）</li>
        <li>自闭症倡导组织</li>
      </ul>
      
      <p><strong>4. 社区资源：</strong></p>
      <ul>
        <li>喘息服务（respite care）</li>
        <li>社区活动和支持项目</li>
        <li>宗教或精神团体</li>
        <li>志愿者组织</li>
      </ul>
      
      <p><strong>如何建立和维护：</strong></p>
      <ul>
        <li>主动寻求帮助，不要害怕开口</li>
        <li>明确表达你需要什么帮助</li>
        <li>接受帮助，不要感到内疚</li>
        <li>也给予他人支持，关系是双向的</li>
        <li>定期联系，维护关系</li>
      </ul>
    `
  },
  relaxation: {
    title: "放松技巧",
    content: `
      <h4>实用放松技巧</h4>
      <p><strong>深呼吸练习：</strong></p>
      <ol>
        <li>找一个安静的地方坐下或躺下</li>
        <li>一只手放在胸部，一只手放在腹部</li>
        <li>缓慢吸气4秒，感受腹部隆起</li>
        <li>屏住呼吸2秒</li>
        <li>缓慢呼气6秒，感受腹部下降</li>
        <li>重复5-10次</li>
      </ol>
      
      <p><strong>渐进性肌肉放松：</strong></p>
      <ol>
        <li>从脚部开始，收紧肌肉5秒</li>
        <li>突然放松，感受紧张释放</li>
        <li>依次向上：小腿、大腿、腹部、胸部、手臂、肩膀、脸部</li>
        <li>最后感受全身放松</li>
      </ol>
      
      <p><strong>正念冥想：</strong></p>
      <ul>
        <li>每天10-15分钟</li>
        <li>专注于呼吸或身体感受</li>
        <li>当思绪飘走时，温和地带回当下</li>
        <li>可以使用引导冥想APP</li>
      </ul>
      
      <p><strong>快速放松技巧（适合忙碌的家长）：</strong></p>
      <ul>
        <li>4-7-8呼吸：吸气4秒，屏息7秒，呼气8秒</li>
        <li>5-4-3-2-1 grounding：说出5个看到的、4个听到的、3个触摸到的、2个闻到的、1个尝到的</li>
        <li>伸展身体，特别是颈部和肩膀</li>
        <li>喝一杯热茶，专注于当下的感受</li>
      </ul>
    `
  },
  timeManagement: {
    title: "时间管理",
    content: `
      <h4>平衡康复训练与家庭生活的时间管理</h4>
      <p><strong>时间审计：</strong></p>
      <p>首先，记录一周的时间使用情况，了解时间都花在哪里了。你可能会惊讶地发现很多时间是低效使用的。</p>
      
      <p><strong>优先级排序：</strong></p>
      <p>使用艾森豪威尔矩阵：</p>
      <ul>
        <li><strong>紧急且重要：</strong>立即做（如孩子的医疗预约）</li>
        <li><strong>重要但不紧急：</strong>计划做（如日常训练、家庭时间）</li>
        <li><strong>紧急但不重要：</strong>委托做（如某些家务）</li>
        <li><strong>不紧急也不重要：</strong>减少或消除（如无意义的刷手机）</li>
      </ul>
      
      <p><strong>实用策略：</strong></p>
      <ul>
        <li><strong>建立常规：</strong>固定的日常流程减少决策疲劳</li>
        <li><strong>批处理任务：</strong>集中处理相似任务（如一次处理所有邮件）</li>
        <li><strong>利用碎片时间：</strong>在等待时回复信息、规划日程</li>
        <li><strong>学会说"不"：</strong>对不重要的事情说不</li>
        <li><strong>委托和分担：</strong>让家庭成员分担责任</li>
      </ul>
      
      <p><strong>整合训练到日常生活：</strong></p>
      <ul>
        <li>穿衣时练习精细动作</li>
        <li>用餐时练习社交技能</li>
        <li>洗澡时练习感觉统合</li>
        <li>购物时练习认知和语言</li>
      </ul>
      
      <p><strong>自我照顾的时间：</strong></p>
      <p>在日程中安排固定的"自我照顾时间"，就像安排重要的约会一样。这是必要的，不是奢侈。</p>
    `
  },
  professionalHelp: {
    title: "寻求专业帮助",
    content: `
      <h4>何时以及如何寻求专业帮助</h4>
      <p><strong>需要专业帮助的信号：</strong></p>
      <ul>
        <li>持续感到悲伤、焦虑或绝望</li>
        <li>睡眠或食欲发生显著变化</li>
        <li>难以完成日常任务</li>
        <li>与家人朋友的关系出现问题</li>
        <li>有伤害自己或他人的想法</li>
        <li>感到极度疲惫，无法恢复</li>
      </ul>
      
      <p><strong>可寻求的专业帮助：</strong></p>
      <p><strong>1. 心理咨询/治疗：</strong></p>
      <ul>
        <li>认知行为疗法（CBT）</li>
        <li>接纳承诺疗法（ACT）</li>
        <li>正念减压（MBSR）</li>
        <li>家庭治疗</li>
      </ul>
      
      <p><strong>2. 精神科帮助：</strong></p>
      <ul>
        <li>如果症状严重，可能需要药物治疗</li>
        <li>精神科医生可以评估是否需要药物</li>
      </ul>
      
      <p><strong>3. 支持团体：</strong></p>
      <ul>
        <li>与其他家长分享经验</li>
        <li>学习应对策略</li>
        <li>减少孤独感</li>
      </ul>
      
      <p><strong>如何开始：</strong></p>
      <ol>
        <li>咨询你的家庭医生，获取转介</li>
        <li>联系你的保险公司了解覆盖范围</li>
        <li>寻找专门服务特殊需要家庭的提供者</li>
        <li>准备问题清单，在第一次会面时询问</li>
      </ol>
      
      <p><strong>克服求助的障碍：</strong></p>
      <ul>
        <li>认识到寻求帮助是力量的表现，不是软弱</li>
        <li>你值得被照顾</li>
        <li>照顾好自己才能更好地照顾孩子</li>
      </ul>
    `
  },
  positiveParenting: {
    title: "正向育儿理念",
    content: `
      <h4>正向育儿：关注优势，建立连接</h4>
      <p><strong>什么是正向育儿：</strong></p>
      <p>正向育儿是一种关注孩子优势、建立积极亲子关系的教养方式。它不是忽视问题，而是在解决问题的同时，更多地关注和发展孩子的优点。</p>
      
      <p><strong>核心原则：</strong></p>
      <ul>
        <li><strong>关注优势：</strong>每个孩子都有独特的才能和优点</li>
        <li><strong>建立连接：</strong>亲子关系是所有教育的基础</li>
        <li><strong>理解行为：</strong>所有行为都是沟通，寻找背后的原因</li>
        <li><strong>积极引导：</strong>教孩子应该做什么，而不是只说不该做什么</li>
        <li><strong>尊重个体：</strong>接纳孩子的独特性</li>
      </ul>
      
      <p><strong>实践策略：</strong></p>
      <p><strong>1. 发现优势：</strong></p>
      <ul>
        <li>观察孩子在什么活动中投入、快乐</li>
        <li>注意孩子的特殊才能或兴趣</li>
        <li>思考这些优势如何帮助学习和发展</li>
      </ul>
      
      <p><strong>2. 积极关注：</strong></p>
      <ul>
        <li>每天花专门的时间陪伴孩子，做他们喜欢的事</li>
        <li>使用描述性表扬（"你自己把玩具收拾好了！"）</li>
        <li>记录孩子的进步和成功</li>
      </ul>
      
      <p><strong>3. 建立连接：</strong></p>
      <ul>
        <li>跟随孩子的引导，进入他们的世界</li>
        <li>使用孩子的兴趣作为连接点</li>
        <li>创造共享的愉快体验</li>
      </ul>
      
      <p><strong>4. 解决问题：</strong></p>
      <ul>
        <li>理解行为背后的原因（感觉、沟通困难等）</li>
        <li>教授替代技能</li>
        <li>调整环境预防问题</li>
      </ul>
    `
  },
  celebrateProgress: {
    title: "庆祝小进步",
    content: `
      <h4>庆祝每一个小进步</h4>
      <p><strong>为什么庆祝小进步很重要：</strong></p>
      <ul>
        <li>对于自闭症孩子，每一个小步骤都是巨大的成就</li>
        <li>庆祝增强孩子的自信心和动机</li>
        <li>帮助家长保持积极的心态</li>
        <li>记录进步，在困难时期提供希望</li>
      </ul>
      
      <p><strong>什么是值得庆祝的进步：</strong></p>
      <ul>
        <li>第一次眼神接触</li>
        <li>用语言表达需求</li>
        <li>尝试新食物</li>
        <li>完成一个自理任务</li>
        <li>与同龄人互动</li>
        <li>处理变化而没有崩溃</li>
        <li>学习一个新技能</li>
        <li>克服一个恐惧</li>
      </ul>
      
      <p><strong>如何庆祝：</strong></p>
      <ul>
        <li><strong>即时表扬：</strong>立即给予具体的口头表扬</li>
        <li><strong>肢体表达：</strong>拥抱、击掌、跳舞</li>
        <li><strong>奖励系统：</strong>贴纸、代币、特权</li>
        <li><strong>记录成就：</strong>拍照、写日记、制作进步墙</li>
        <li><strong>分享喜悦：</strong>与家人朋友分享</li>
        <li><strong>特别庆祝：</strong>对于里程碑式的进步，可以举行小型庆祝</li>
      </ul>
      
      <p><strong>保持记录：</strong></p>
      <p>建议保持一个"进步日记"，记录孩子的每一个小进步。当感到沮丧时，翻看这个日记，你会看到孩子走了多远。</p>
    `
  },
  keepHope: {
    title: "保持希望",
    content: `
      <h4>保持希望：自闭症孩子的未来</h4>
      <p><strong>关于预后的真相：</strong></p>
      <p>虽然自闭症是终身性的，但这并不意味着没有进步的可能。许多自闭症患者：</p>
      <ul>
        <li>发展出良好的语言和沟通能力</li>
        <li>建立有意义的友谊和关系</li>
        <li>完成学业，获得高等教育</li>
        <li>找到适合的工作</li>
        <li>独立生活或半独立生活</li>
        <li>成为对社会有贡献的成员</li>
        <li>建立家庭，成为父母</li>
      </ul>
      
      <p><strong>成功的因素：</strong></p>
      <ul>
        <li>早期识别和干预</li>
        <li>高质量、持续的干预服务</li>
        <li>支持性的家庭环境</li>
        <li>适当的教育支持</li>
        <li>发展特殊才能和兴趣</li>
        <li>接纳和支持的社区</li>
      </ul>
      
      <p><strong>自闭症成年人的声音：</strong></p>
      <p>许多自闭症成年人报告，虽然他们仍然面临挑战，但他们的生活是充实和有意义的。他们强调：</p>
      <ul>
        <li>早期支持的重要性</li>
        <li>被接纳和尊重的价值</li>
        <li>找到适合自己特点的生活方式</li>
        <li>自闭症带来的独特优势</li>
      </ul>
      
      <p><strong>保持希望的方法：</strong></p>
      <ul>
        <li>关注进步，而不是与"正常"比较</li>
        <li>与其他家庭交流，看到长期的可能性</li>
        <li>阅读自闭症成年人的积极故事</li>
        <li>庆祝每一个小成就</li>
        <li>相信孩子的潜力</li>
        <li>照顾好自己，保持积极的心态</li>
      </ul>
      
      <p><strong>最后的话：</strong></p>
      <p>"你的孩子不是'有'自闭症，你的孩子'是'自闭症——这是他们独特身份的一部分。你的任务是帮助他们成为最好的自己，而不是变成别人。" —— 一位自闭症家长</p>
    `
  }
};

// ==========================================
// 内容展示函数
// ==========================================

/**
 * 显示成长指引详情
 * @param {string} key - 内容键名
 */
function showGrowthDetail(key) {
  console.log('showGrowthDetail called with key:', key);
  const content = growthGuidanceContent[key];
  console.log('Content found:', content);
  if (content) {
    openModal(content.title, content.content);
  } else {
    showToast('内容暂未添加', 'info');
  }
}

/**
 * 显示训练详情
 * @param {string} key - 训练项目键名
 */
function showTrainingDetail(key) {
  const training = trainingContent[key];
  if (training) {
    const content = `
      <h4>${training.title}</h4>
      <p><strong>训练步骤：</strong></p>
      <ol>
        ${training.steps.map(step => `<li>${step}</li>`).join('')}
      </ol>
      <p><strong>实用技巧：</strong></p>
      <ul>
        ${training.tips.map(tip => `<li>${tip}</li>`).join('')}
      </ul>
    `;
    openModal(training.title, content);
  } else {
    showToast('训练内容暂未添加', 'info');
  }
}

/**
 * 显示训练指导
 * @param {string} key - 训练项目键名
 */
function showTrainingGuide(key) {
  showTrainingDetail(key);
}

/**
 * 显示行为陪伴详情
 * @param {string} key - 行为陪伴键名
 */
function showBehaviorDetail(key) {
  const behavior = behaviorContent[key];
  if (behavior) {
    openModal(behavior.title, behavior.content);
  } else {
    showToast('内容暂未添加', 'info');
  }
}

/**
 * 显示知识库文章
 * @param {string} key - 文章键名
 */
function showArticle(key) {
  const article = knowledgeArticles[key];
  if (article) {
    openModal(article.title, article.content);
  } else {
    showToast('文章暂未添加', 'info');
  }
}

/**
 * 显示康复手记案例
 * @param {string} key - 案例键名
 */
function showCase(key) {
  const caseStory = caseStories[key];
  if (caseStory) {
    openModal(caseStory.title, caseStory.content);
  } else {
    showToast('案例暂未添加', 'info');
  }
}

/**
 * 显示家长加油站文章
 * @param {string} key - 文章键名
 */
function showParentArticle(key) {
  const article = parentSupportArticles[key];
  if (article) {
    openModal(article.title, article.content);
  } else {
    showToast('文章暂未添加', 'info');
  }
}

// 暴露展示函数到全局
window.showGrowthDetail = showGrowthDetail;
window.showTrainingDetail = showTrainingDetail;
window.showTrainingGuide = showTrainingGuide;
window.showBehaviorDetail = showBehaviorDetail;
window.showArticle = showArticle;
window.showCase = showCase;
window.showParentArticle = showParentArticle;
