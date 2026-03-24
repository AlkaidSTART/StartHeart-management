/**
 * 星心守护 - AI聊天助手模块
 * 提供智能问答、快捷问题、消息管理等功能
 */

// ==========================================
// 聊天模块配置与数据
// ==========================================

const CHAT_CONFIG = {
    animationDuration: 300,
    typingDelay: 800,
    maxMessageLength: 500,
    storageKey: 'smartHeartChatHistory'
};

const quickQuestions = [
    '什么是自闭症？',
    '如何进行早期筛查？',
    '家长如何帮助孩子？',
    '有哪些干预方法？',
    '如何预约服务？'
];

const qaData = {
    '什么是自闭症': '自闭症谱系障碍（ASD）是一种神经发育性疾病，主要表现为社交沟通障碍、兴趣狭窄和重复刻板行为。每个患者的症状和严重程度各不相同，因此称为"谱系"。早期发现和干预可以显著改善预后。',
    
    '如何进行早期筛查': '早期筛查通常在儿童18-24个月龄时进行。家长可以关注以下信号：\n1. 对名字缺乏反应\n2. 眼神接触少\n3. 语言发展迟缓\n4. 对特定物品强烈执着\n5. 重复行为\n建议定期参加儿童保健体检，如有疑虑请咨询专业医生。',
    
    '家长如何帮助孩子': '家长可以从以下几个方面帮助孩子：\n1. 建立规律的日常生活作息\n2. 使用简洁明确的语言指令\n3. 利用视觉辅助工具（如图片卡片）\n4. 创造丰富的社交游戏机会\n5. 给予充分的正面鼓励\n6. 保持耐心和一致性\n7. 寻求专业支持',
    
    '有哪些干预方法': '目前国际认可的干预方法包括：\n1. ABA应用行为分析\n2. 感觉统合训练\n3. 语言治疗\n4. 社交技能训练\n5. 地板时光（DIR）\n6. 结构化教学（TEACCH）\n建议在专业评估后制定个性化干预方案。',
    
    '如何预约服务': '您可以通过以下方式预约服务：\n1. 在本页面点击"服务中心"进行在线预约\n2. 拨打客服热线：400-123-4567\n3. 在线咨询我们的客服\n我们的服务包括：初诊评估、个别训练、家长咨询、团体课程等。',
    
    '费用': '我们的服务费用根据项目类型和时长有所不同：\n• 初诊评估：300-800元\n• 个别训练：200-500元/课时\n• 团体课程：100-300元/课时\n• 家长咨询：200-400元/次\n具体费用请以实际咨询为准，部分项目可使用医保。',
    
    '地址': '我们的服务中心位于：\n📍 北京市朝阳区星心路123号\n📍 上海市浦东新区守护路456号\n📍 广州市天河区希望路789号\n\n您可以通过地图搜索"星心守护"找到最近的服务中心。',
    
    '专家': '我们拥有专业的康复团队：\n• 儿童精神科主任医师 3名\n• 康复治疗师 15名\n• 特教老师 12名\n• 心理咨询师 8名\n所有专家均持有国家认证资质，并具有丰富的临床经验。',
    
    '康复': '康复训练是一个长期过程，通常需要：\n• 早期干预（2-6岁）：黄金干预期\n• 持续训练：每周10-25小时\n• 家庭配合：日常泛化训练\n• 定期评估：每3-6个月评估进展\n坚持科学干预，大多数孩子都能获得显著改善。',
    
    '学校': '关于入学建议：\n• 普通学校：能力较好的孩子可随班就读\n• 特教学校：需要更多支持的孩子\n• 融合教育：普通学校+特教支持\n我们可以提供入学评估和适应性训练，帮助孩子更好地适应学校生活。',
    
    '饮食': '饮食注意事项：\n• 保持营养均衡\n• 部分孩子可能需要限制麸质/酪蛋白\n• 补充Omega-3脂肪酸可能有帮助\n• 避免过多糖分和添加剂\n• 建立规律的用餐时间\n建议咨询营养师制定个性化饮食方案。',
    
    '睡眠': '改善睡眠的建议：\n• 建立固定的睡前程序\n• 创造安静、黑暗的睡眠环境\n• 白天保证足够的运动\n• 限制睡前屏幕时间\n• 使用加重毯子可能有帮助\n如睡眠问题严重，建议咨询医生。',
    
    '默认': '感谢您的提问！您可以点击上方的快捷问题快速获取答案，或输入您关心的问题，我会尽力为您解答。\n\n如果您需要更详细的帮助，可以：\n• 拨打客服热线：400-123-4567\n• 预约专家咨询\n• 前往就近的服务中心'
};

// ==========================================
// DOM 元素引用
// ==========================================

let chatPopup = null;
let chatMessages = null;
let chatInput = null;
let sendBtn = null;
let chatToggleBtn = null;
let chatCloseBtn = null;

// ==========================================
// 核心功能函数
// ==========================================

/**
 * 初始化聊天组件
 */
function initChat() {
    cacheElements();
    
    if (!chatPopup) {
        console.warn('聊天组件未找到，请确保DOM中包含相应元素');
        return;
    }
    
    bindEvents();
    loadChatHistory();
}

/**
 * 缓存DOM元素引用
 */
function cacheElements() {
    chatPopup = document.getElementById('chatPopup');
    chatMessages = document.getElementById('chatMessages');
    chatInput = document.getElementById('chatInput');
    sendBtn = document.getElementById('sendBtn');
    chatToggleBtn = document.getElementById('chatToggleBtn');
    chatCloseBtn = document.getElementById('chatCloseBtn');
}

/**
 * 绑定事件监听器
 */
function bindEvents() {
    if (chatToggleBtn) {
        chatToggleBtn.addEventListener('click', toggleChatPopup);
    }
    
    if (chatCloseBtn) {
        chatCloseBtn.addEventListener('click', closeChatPopup);
    }
    
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', handleKeyPress);
        chatInput.addEventListener('focus', () => {
            setTimeout(scrollToBottom, 300);
        });
    }
    
    document.addEventListener('click', (e) => {
        if (chatPopup && chatPopup.classList.contains('show')) {
            const isClickInside = chatPopup.contains(e.target) || 
                                  (chatToggleBtn && chatToggleBtn.contains(e.target));
            if (!isClickInside) {
                closeChatPopup();
            }
        }
    });
}

/**
 * 切换聊天窗口显示状态
 */
function toggleChatPopup() {
    if (!chatPopup) return;
    
    const isHidden = !chatPopup.classList.contains('show');
    
    if (isHidden) {
        openChatPopup();
    } else {
        closeChatPopup();
    }
}

/**
 * 打开聊天窗口
 */
function openChatPopup() {
    if (!chatPopup) return;
    
    chatPopup.classList.add('show');
    chatPopup.setAttribute('aria-hidden', 'false');
    
    if (chatMessages && chatMessages.children.length === 0) {
        showWelcomeMessage();
    }
    
    setTimeout(() => {
        scrollToBottom();
        if (chatInput) {
            chatInput.focus();
        }
    }, CHAT_CONFIG.animationDuration);
}

/**
 * 关闭聊天窗口
 */
function closeChatPopup() {
    if (!chatPopup) return;
    
    chatPopup.classList.remove('show');
    chatPopup.setAttribute('aria-hidden', 'true');
    
    saveChatHistory();
}

/**
 * 显示欢迎消息
 */
function showWelcomeMessage() {
    if (!chatMessages) return;
    
    const now = new Date();
    const timeStr = formatTime(now);
    
    const welcomeHTML = `
        <div class="message message-ai">
            <div class="message-avatar" aria-label="AI助手">🤖</div>
            <div class="message-content">
                <div class="message-bubble">
                    <div class="welcome-message">
                        <div class="welcome-icon">🌟</div>
                        <h4 class="welcome-title">您好！我是星语助手</h4>
                        <p class="welcome-text">我可以为您解答关于自闭症的相关问题，也可以提供康复建议和预约指导。请点击下方快捷问题或直接输入您的问题。</p>
                    </div>
                </div>
                <span class="message-time">${timeStr}</span>
            </div>
        </div>
    `;
    
    chatMessages.innerHTML = welcomeHTML;
    renderQuickQuestions();
}

/**
 * 渲染快捷问题按钮
 */
function renderQuickQuestions() {
    if (!chatMessages) return;
    
    const existingQuickQuestions = chatMessages.querySelector('.quick-questions');
    if (existingQuickQuestions) {
        existingQuickQuestions.remove();
    }
    
    const quickQuestionsHTML = `
        <div class="quick-questions">
            <span class="quick-questions-label">快捷问题：</span>
            <div class="quick-questions-list">
                ${quickQuestions.map(q => `<button class="quick-question-btn" onclick="sendQuickQuestion('${q}')" aria-label="${q}">${q}</button>`).join('')}
            </div>
        </div>
    `;
    
    chatMessages.insertAdjacentHTML('beforeend', quickQuestionsHTML);
    scrollToBottom();
}

/**
 * 发送快捷问题
 * @param {string} question - 问题文本
 */
function sendQuickQuestion(question) {
    if (!chatInput || !chatMessages) return;
    
    removeQuickQuestions();
    
    chatInput.value = question;
    sendMessage();
}

/**
 * 移除快捷问题区域
 */
function removeQuickQuestions() {
    const quickQuestionsDiv = chatMessages?.querySelector('.quick-questions');
    if (quickQuestionsDiv) {
        quickQuestionsDiv.remove();
    }
}

/**
 * 发送消息
 */
function sendMessage() {
    if (!chatInput || !chatMessages) return;
    
    const message = chatInput.value.trim();
    if (!message) return;
    
    if (message.length > CHAT_CONFIG.maxMessageLength) {
        showChatError('消息过长，请控制在500字以内');
        return;
    }
    
    addUserMessage(message);
    chatInput.value = '';
    
    showLoadingIndicator();
    
    const delay = CHAT_CONFIG.typingDelay + Math.random() * 500;
    
    setTimeout(() => {
        hideLoadingIndicator();
        const response = getAIResponse(message);
        addAIMessage(response);
    }, delay);
}

/**
 * 添加用户消息
 * @param {string} message - 消息内容
 */
function addUserMessage(message) {
    const now = new Date();
    const timeStr = formatTime(now);
    
    const userMessageHTML = `
        <div class="message message-user">
            <div class="message-avatar" aria-label="用户">👤</div>
            <div class="message-content">
                <div class="message-bubble">${escapeHtml(message)}</div>
                <span class="message-time">${timeStr}</span>
            </div>
        </div>
    `;
    
    removeQuickQuestions();
    chatMessages.insertAdjacentHTML('beforeend', userMessageHTML);
    scrollToBottom();
    saveChatHistory();
}

/**
 * 添加AI消息
 * @param {string} message - 消息内容
 */
function addAIMessage(message) {
    const now = new Date();
    const timeStr = formatTime(now);
    
    const aiMessageHTML = `
        <div class="message message-ai">
            <div class="message-avatar" aria-label="AI助手">🤖</div>
            <div class="message-content">
                <div class="message-bubble">${formatMessage(message)}</div>
                <span class="message-time">${timeStr}</span>
            </div>
        </div>
    `;
    
    chatMessages.insertAdjacentHTML('beforeend', aiMessageHTML);
    scrollToBottom();
    renderQuickQuestions();
    saveChatHistory();
}

/**
 * 显示加载指示器
 */
function showLoadingIndicator() {
    if (!chatMessages) return;
    
    const loadingHTML = `
        <div class="message message-ai message-loading" id="loadingMessage">
            <div class="message-avatar">🤖</div>
            <div class="loading-dots" aria-label="正在输入">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    chatMessages.insertAdjacentHTML('beforeend', loadingHTML);
    scrollToBottom();
}

/**
 * 隐藏加载指示器
 */
function hideLoadingIndicator() {
    const loadingMessage = document.getElementById('loadingMessage');
    if (loadingMessage) {
        loadingMessage.remove();
    }
}

/**
 * 获取AI回复
 * @param {string} message - 用户消息
 * @returns {string} AI回复
 */
function getAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    for (const [key, value] of Object.entries(qaData)) {
        if (key === 'default') continue;
        if (lowerMessage.includes(key.toLowerCase())) {
            return value;
        }
    }
    
    const keywordMatches = {
        '你好': '您好！很高兴为您服务，请问有什么可以帮助您的？',
        '您好': '您好！很高兴为您服务，请问有什么可以帮助您的？',
        '谢谢': '不客气！如果您还有其他问题，随时可以问我。',
        '再见': '再见！祝您有美好的一天，期待再次为您服务。',
        'bye': 'Goodbye! Have a nice day!',
        'hello': 'Hello! How can I help you today?'
    };
    
    for (const [keyword, response] of Object.entries(keywordMatches)) {
        if (lowerMessage.includes(keyword)) {
            return response;
        }
    }
    
    return qaData['默认'];
}

/**
 * 格式化消息内容（支持换行和链接）
 * @param {string} text - 原始文本
 * @returns {string} 格式化后的HTML
 */
function formatMessage(text) {
    let formatted = escapeHtml(text);
    
    formatted = formatted.replace(/\n/g, '<br>');
    
    formatted = formatted.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
    
    formatted = formatted.replace(/(\d{3,4}-\d{7,8}|1[3-9]\d{9})/g, '<a href="tel:$1">$1</a>');
    
    return formatted;
}

/**
 * 处理键盘事件
 * @param {KeyboardEvent} event - 键盘事件
 */
function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

/**
 * 滚动到底部
 */
function scrollToBottom() {
    if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

/**
 * 格式化时间
 * @param {Date} date - 日期对象
 * @returns {string} 格式化后的时间字符串
 */
function formatTime(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

/**
 * HTML转义，防止XSS攻击
 * @param {string} text - 原始文本
 * @returns {string} 转义后的文本
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * 显示聊天错误提示
 * @param {string} message - 错误消息
 */
function showChatError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'chat-error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        position: absolute;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: #ff4444;
        color: white;
        padding: 8px 16px;
        border-radius: 4px;
        font-size: 14px;
        z-index: 1000;
    `;
    
    chatPopup.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

/**
 * 保存聊天记录到本地存储
 */
function saveChatHistory() {
    if (!chatMessages) return;
    
    try {
        const messages = chatMessages.innerHTML;
        sessionStorage.setItem(CHAT_CONFIG.storageKey, messages);
    } catch (e) {
        console.warn('无法保存聊天记录:', e);
    }
}

/**
 * 加载聊天记录
 */
function loadChatHistory() {
    try {
        const savedHistory = sessionStorage.getItem(CHAT_CONFIG.storageKey);
        if (savedHistory && chatMessages) {
            chatMessages.innerHTML = savedHistory;
            scrollToBottom();
        }
    } catch (e) {
        console.warn('无法加载聊天记录:', e);
    }
}

/**
 * 清除聊天记录
 */
function clearChatHistory() {
    try {
        sessionStorage.removeItem(CHAT_CONFIG.storageKey);
        if (chatMessages) {
            chatMessages.innerHTML = '';
        }
        showWelcomeMessage();
    } catch (e) {
        console.warn('无法清除聊天记录:', e);
    }
}

// ==========================================
// 初始化
// ==========================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChat);
} else {
    initChat();
}

// ==========================================
// 暴露全局函数
// ==========================================

window.toggleChatPopup = toggleChatPopup;
window.openChatPopup = openChatPopup;
window.closeChatPopup = closeChatPopup;
window.sendMessage = sendMessage;
window.sendQuickQuestion = sendQuickQuestion;
window.clearChatHistory = clearChatHistory;
