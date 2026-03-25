document.addEventListener('DOMContentLoaded', () => {
  const chatPopup = document.getElementById('chat-popup');
  const chatBody = document.getElementById('chat-body');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-btn');

  const mockResponses = {
    '你好': '你好！我是星语助手，很高兴为您服务。',
    '你是谁': '我是星心守护平台的智能助手，星语。',
    '有什么功能':
      '我可以为您解答关于儿童康复的知识，提供训练建议，或者陪您聊聊天。',
    '再见': '再见！随时欢迎您再来找我。',
    default: '抱歉，我暂时无法回答这个问题，但我正在努力学习中！',
  };

  // Function to toggle chat popup visibility
  window.toggleChatPopup = () => {
    const isVisible = chatPopup.style.display === 'flex';
    chatPopup.style.display = isVisible ? 'none' : 'flex';
    if (!isVisible) {
        // Only add welcome message if it's not already there
        if (chatBody.children.length === 0) {
            addMessage('assistant', '你好！有什么可以帮助您的吗？');
        }
    }
  };

  // Function to add a message to the chat body
  function addMessage(sender, text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', `${sender}-message`);
    
    const icon = document.createElement('i');
    icon.className = sender === 'user' ? 'ri-user-fill' : 'ri-robot-2-fill';
    
    const p = document.createElement('p');
    p.textContent = text;

    messageElement.appendChild(icon);
    messageElement.appendChild(p);

    chatBody.appendChild(messageElement);
    chatBody.scrollTop = chatBody.scrollHeight; // Scroll to bottom
  }

  // Function to handle sending a message
  function sendMessage() {
    const userText = chatInput.value.trim();
    if (userText === '') return;

    addMessage('user', userText);
    chatInput.value = '';

    // Simulate assistant response
    setTimeout(() => {
      const response = getMockResponse(userText);
      addMessage('assistant', response);
    }, 500);
  }

  // Function to get a mock response
  function getMockResponse(inputText) {
    for (const key in mockResponses) {
      if (inputText.includes(key)) {
        return mockResponses[key];
      }
    }
    return mockResponses.default;
  }

  // Event listeners
  sendBtn.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
});

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
