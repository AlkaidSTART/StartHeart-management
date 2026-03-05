// 星语助手对话框增强版 - 包含语音输入、表情符号、文件上传等功能

// 对话框管理器
class ChatDialogManager {
    constructor() {
        this.messages = [];
        this.isTyping = false;
        this.currentSuggestions = [];
        this.voiceRecording = false;
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupVoiceRecognition();
        this.setupInputSuggestions();
        this.loadChatHistory();
    }

    // 设置事件监听器
    setupEventListeners() {
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendBtn');
        const voiceBtn = document.getElementById('voiceBtn');
        const emojiBtn = document.getElementById('emojiBtn');
        const fileBtn = document.getElementById('fileBtn');

        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.sendMessage());
        }

        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });

            chatInput.addEventListener('input', (e) => {
                this.autoResizeInput(e.target);
                this.showInputSuggestions(e.target.value);
            });

            chatInput.addEventListener('focus', () => {
                this.hideQuickReplies();
            });
        }

        if (voiceBtn) {
            voiceBtn.addEventListener('click', () => this.toggleVoiceInput());
        }

        if (emojiBtn) {
            emojiBtn.addEventListener('click', () => this.toggleEmojiPicker());
        }

        if (fileBtn) {
            fileBtn.addEventListener('click', () => this.selectFile());
        }

        // 快速回复按钮
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-reply-item')) {
                this.sendQuickReply(e.target.textContent.trim());
            }
        });

        // 消息操作
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('message-action-btn')) {
                this.handleMessageAction(e.target);
            }
        });

        // 输入建议
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('suggestion-item')) {
                this.selectSuggestion(e.target);
            }
        });
    }

    // 设置语音识别
    setupVoiceRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.lang = 'zh-CN';
            this.recognition.continuous = false;
            this.recognition.interimResults = false;

            this.recognition.onstart = () => {
                this.showVoiceIndicator(true);
                console.log('语音识别开始');
            };

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                this.setInputValue(transcript);
                this.hideVoiceIndicator();
                console.log('语音识别结果:', transcript);
            };

            this.recognition.onerror = (event) => {
                console.error('语音识别错误:', event.error);
                this.hideVoiceIndicator();
                this.showError('语音识别失败，请重试');
            };

            this.recognition.onend = () => {
                this.hideVoiceIndicator();
                console.log('语音识别结束');
            };
        }
    }

    // 设置输入建议
    setupInputSuggestions() {
        this.suggestions = [
            { text: '什么是自闭症？', icon: '🧠', category: '基础知识' },
            { text: '如何早期识别自闭症？', icon: '🔍', category: '早期识别' },
            { text: 'ADOS评估是什么？', icon: '📊', category: '专业评估' },
            { text: 'ABA干预怎么做？', icon: '🎯', category: '行为干预' },
            { text: '言语治疗有哪些方法？', icon: '🗣️', category: '言语治疗' },
            { text: '社交技能如何训练？', icon: '🤝', category: '社交训练' },
            { text: '感觉统合训练是什么？', icon: '🧘', category: '感统训练' },
            { text: '家长如何提供支持？', icon: '👨‍👩‍👧‍👦', category: '家庭支持' },
            { text: '学校融合教育怎么做？', icon: '🏫', category: '学校融合' },
            { text: '情绪调节技巧有哪些？', icon: '😊', category: '情绪管理' },
            { text: '如何监测孩子进展？', icon: '📈', category: '进展监测' },
            { text: '紧急情况下怎么办？', icon: '🆘', category: '紧急支持' }
        ];
    }

    // 加载聊天记录
    loadChatHistory() {
        const savedHistory = localStorage.getItem('xingyu-chat-history');
        if (savedHistory) {
            try {
                const history = JSON.parse(savedHistory);
                this.messages = history;
                this.renderMessages();
            } catch (error) {
                console.error('加载聊天记录失败:', error);
            }
        }
    }

    // 保存聊天记录
    saveChatHistory() {
        try {
            localStorage.setItem('xingyu-chat-history', JSON.stringify(this.messages));
        } catch (error) {
            console.error('保存聊天记录失败:', error);
        }
    }

    // 发送消息
    sendMessage() {
        const chatInput = document.getElementById('chatInput');
        const message = chatInput.value.trim();
        
        if (!message) return;

        // 添加用户消息
        this.addMessage(message, 'user');
        chatInput.value = '';
        this.autoResizeInput(chatInput);
        this.hideInputSuggestions();

        // 显示打字指示器
        this.showTypingIndicator();

        // 模拟AI响应
        setTimeout(() => {
            this.hideTypingIndicator();
            this.generateAIResponse(message);
        }, 1500 + Math.random() * 1000);

        // 保存历史记录
        this.saveChatHistory();
    }

    // 添加消息
    addMessage(content, sender, options = {}) {
        const message = {
            id: Date.now() + Math.random(),
            content,
            sender,
            timestamp: new Date(),
            status: 'sent',
            ...options
        };

        this.messages.push(message);
        this.renderMessage(message);
        this.scrollToBottom();

        // 限制消息数量
        if (this.messages.length > 100) {
            this.messages = this.messages.slice(-100);
            this.rerenderMessages();
        }
    }

    // 渲染单个消息
    renderMessage(message) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message-enhanced ${message.sender}`;
        messageDiv.dataset.messageId = message.id;

        const time = message.timestamp.toLocaleTimeString('zh-CN', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });

        messageDiv.innerHTML = `
            <div class="message-avatar-enhanced">${message.sender === 'user' ? '👤' : '🤖'}</div>
            <div class="message-content-wrapper">
                <div class="message-content-enhanced">${this.escapeHtml(message.content)}</div>
                <div class="message-time-enhanced">${time}</div>
                <div class="message-status ${message.status}">
                    <span class="status-icon">${this.getStatusIcon(message.status)}</span>
                </div>
            </div>
            <div class="message-actions">
                <button class="message-action-btn" data-action="copy" title="复制消息">📋</button>
                <button class="message-action-btn" data-action="delete" title="删除消息">🗑️</button>
            </div>
        `;

        chatMessages.appendChild(messageDiv);
    }

    // 重新渲染所有消息
    rerenderMessages() {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;

        chatMessages.innerHTML = '';
        this.messages.forEach(message => this.renderMessage(message));
    }

    // 获取状态图标
    getStatusIcon(status) {
        switch (status) {
            case 'sent': return '✓';
            case 'delivered': return '✓✓';
            case 'read': return '✓✓';
            default: return '○';
        }
    }

    // 显示打字指示器
    showTypingIndicator() {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;

        const typingDiv = document.createElement('div');
        typingDiv.className = 'message-enhanced assistant typing-message';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="message-avatar-enhanced">🤖</div>
            <div class="message-content-wrapper">
                <div class="typing-indicator-enhanced">
                    <div class="typing-dot-enhanced"></div>
                    <div class="typing-dot-enhanced"></div>
                    <div class="typing-dot-enhanced"></div>
                </div>
                <div class="typing-text">正在输入...</div>
            </div>
        `;

        chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
        this.isTyping = true;
    }

    // 隐藏打字指示器
    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        this.isTyping = false;
    }

    // 生成AI响应
    generateAIResponse(userMessage) {
        // 这里可以集成之前创建的 AIResponseGenerator
        const responses = [
            '感谢您的咨询，让我为您详细解答。',
            '这是一个很好的问题，我来为您提供专业建议。',
            '根据您的情况，我建议您考虑以下方案。',
            '让我为您分析一下具体情况。',
            '您的需求我已经理解，以下是专业建议。',
            '针对您的问题，我们有多种解决方案。',
            '我会为您提供最准确的信息和建议。',
            '感谢您的耐心等待，这是我的专业回复。'
        ];

        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        // 添加AI响应
        this.addMessage(randomResponse, 'assistant', { status: 'delivered' });

        // 显示快速回复
        this.showQuickReplies();

        // 更新消息状态
        setTimeout(() => {
            this.updateMessageStatus(this.messages[this.messages.length - 1].id, 'read');
        }, 1000);
    }

    // 显示快速回复
    showQuickReplies() {
        const quickReplies = [
            '谢谢您的回复',
            '我需要更多信息',
            '这很有帮助',
            '我还有其他问题',
            '请给我具体建议',
            '我想了解评估流程'
        ];

        const quickReplyArea = document.getElementById('quickReplyArea');
        if (!quickReplyArea) return;

        quickReplyArea.innerHTML = `
            <div class="quick-reply-title">快速回复</div>
            <div class="quick-reply-list">
                ${quickReplies.map(reply => `
                    <button class="quick-reply-item">${reply}</button>
                `).join('')}
            </div>
        `;

        quickReplyArea.classList.add('active');
        
        // 5秒后自动隐藏
        setTimeout(() => {
            this.hideQuickReplies();
        }, 5000);
    }

    // 隐藏快速回复
    hideQuickReplies() {
        const quickReplyArea = document.getElementById('quickReplyArea');
        if (quickReplyArea) {
            quickReplyArea.classList.remove('active');
        }
    }

    // 发送快速回复
    sendQuickReply(text) {
        this.hideQuickReplies();
        this.addMessage(text, 'user');
        
        // 模拟AI响应
        setTimeout(() => {
            this.generateAIResponse(text);
        }, 1000);
    }

    // 显示输入建议
    showInputSuggestions(input) {
        const suggestionsContainer = document.getElementById('inputSuggestions');
        if (!suggestionsContainer || !input) {
            this.hideInputSuggestions();
            return;
        }

        const filteredSuggestions = this.suggestions.filter(s => 
            s.text.toLowerCase().includes(input.toLowerCase())
        ).slice(0, 5);

        if (filteredSuggestions.length === 0) {
            this.hideInputSuggestions();
            return;
        }

        suggestionsContainer.innerHTML = filteredSuggestions.map(suggestion => `
            <div class="suggestion-item" data-text="${suggestion.text}">
                <span class="suggestion-icon">${suggestion.icon}</span>
                <span class="suggestion-text">${suggestion.text}</span>
                <span class="suggestion-category">${suggestion.category}</span>
            </div>
        `).join('');

        suggestionsContainer.classList.add('active');
    }

    // 隐藏输入建议
    hideInputSuggestions() {
        const suggestionsContainer = document.getElementById('inputSuggestions');
        if (suggestionsContainer) {
            suggestionsContainer.classList.remove('active');
        }
    }

    // 选择建议
    selectSuggestion(element) {
        const text = element.dataset.text;
        if (text) {
            const chatInput = document.getElementById('chatInput');
            chatInput.value = text;
            this.hideInputSuggestions();
            chatInput.focus();
        }
    }

    // 语音输入
    toggleVoiceInput() {
        if (!this.recognition) {
            this.showError('您的浏览器不支持语音识别功能');
            return;
        }

        if (this.voiceRecording) {
            this.recognition.stop();
            this.voiceRecording = false;
        } else {
            try {
                this.recognition.start();
                this.voiceRecording = true;
            } catch (error) {
                console.error('语音识别启动失败:', error);
                this.showError('语音识别启动失败');
            }
        }
    }

    // 显示语音指示器
    showVoiceIndicator(show) {
        const indicator = document.getElementById('voiceInputIndicator');
        if (indicator) {
            if (show) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        }
    }

    // 隐藏语音指示器
    hideVoiceIndicator() {
        this.showVoiceIndicator(false);
        this.voiceRecording = false;
    }

    // 表情符号选择器
    toggleEmojiPicker() {
        const emojiPicker = document.getElementById('emojiPicker');
        if (!emojiPicker) return;

        if (emojiPicker.classList.contains('active')) {
            emojiPicker.classList.remove('active');
        } else {
            this.showEmojiPicker();
        }
    }

    // 显示表情符号选择器
    showEmojiPicker() {
        const emojiPicker = document.getElementById('emojiPicker');
        if (!emojiPicker) return;

        const emojis = ['😊', '😄', '🥰', '🤗', '💪', '🌟', '💡', '❤️', '👍', '🙏', '🤔', '😔', '😢', '😰', '🤯', '💭'];
        
        emojiPicker.innerHTML = `
            <div class="emoji-picker-header">
                <span>选择表情</span>
                <button class="emoji-close-btn">✕</button>
            </div>
            <div class="emoji-grid">
                ${emojis.map(emoji => `
                    <button class="emoji-item" data-emoji="${emoji}">${emoji}</button>
                `).join('')}
            </div>
        `;

        emojiPicker.classList.add('active');

        // 添加表情符号点击事件
        emojiPicker.querySelectorAll('.emoji-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const emoji = e.target.dataset.emoji;
                this.insertEmoji(emoji);
                emojiPicker.classList.remove('active');
            });
        });

        // 关闭按钮
        emojiPicker.querySelector('.emoji-close-btn').addEventListener('click', () => {
            emojiPicker.classList.remove('active');
        });
    }

    // 插入表情符号
    insertEmoji(emoji) {
        const chatInput = document.getElementById('chatInput');
        const cursorPos = chatInput.selectionStart;
        const textBefore = chatInput.value.substring(0, cursorPos);
        const textAfter = chatInput.value.substring(cursorPos);
        
        chatInput.value = textBefore + emoji + textAfter;
        chatInput.selectionStart = chatInput.selectionEnd = cursorPos + emoji.length;
        chatInput.focus();
        this.autoResizeInput(chatInput);
    }

    // 文件选择
    selectFile() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*,video/*,.pdf,.doc,.docx';
        fileInput.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                this.handleFileUpload(file);
            }
        };
        fileInput.click();
    }

    // 处理文件上传
    handleFileUpload(file) {
        // 模拟文件上传
        const fileType = file.type.split('/')[0];
        let fileIcon = '📄';
        
        if (fileType === 'image') {
            fileIcon = '🖼️';
        } else if (fileType === 'video') {
            fileIcon = '🎥';
        } else if (file.type === 'application/pdf') {
            fileIcon = '📄';
        }

        const message = `${fileIcon} 已选择文件: ${file.name} (${this.formatFileSize(file.size)})`;
        this.addMessage(message, 'user', { file: true, fileName: file.name, fileSize: file.size });
        
        // 模拟上传完成
        setTimeout(() => {
            this.addMessage('✅ 文件上传成功！', 'assistant');
        }, 2000);
    }

    // 格式化文件大小
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // 消息操作处理
    handleMessageAction(button) {
        const action = button.dataset.action;
        const messageElement = button.closest('.message-enhanced');
        const messageId = parseInt(messageElement.dataset.messageId);
        
        switch (action) {
            case 'copy':
                this.copyMessage(messageId);
                break;
            case 'delete':
                this.deleteMessage(messageId);
                break;
        }
    }

    // 复制消息
    copyMessage(messageId) {
        const message = this.messages.find(m => m.id === messageId);
        if (message) {
            navigator.clipboard.writeText(message.content).then(() => {
                this.showToast('消息已复制到剪贴板', 'success');
            }).catch(() => {
                this.showToast('复制失败，请重试', 'error');
            });
        }
    }

    // 删除消息
    deleteMessage(messageId) {
        this.messages = this.messages.filter(m => m.id !== messageId);
        this.rerenderMessages();
        this.saveChatHistory();
        this.showToast('消息已删除', 'info');
    }

    // 更新消息状态
    updateMessageStatus(messageId, status) {
        const message = this.messages.find(m => m.id === messageId);
        if (message) {
            message.status = status;
            this.updateMessageDisplay(messageId);
        }
    }

    // 更新消息显示
    updateMessageDisplay(messageId) {
        const messageElement = document.querySelector(`[data-message-id="${messageId}"]`);
        if (messageElement) {
            const statusElement = messageElement.querySelector('.message-status');
            if (statusElement) {
                statusElement.className = `message-status ${this.messages.find(m => m.id === messageId).status}`;
                statusElement.innerHTML = `<span class="status-icon">${this.getStatusIcon(this.messages.find(m => m.id === messageId).status)}</span>`;
            }
        }
    }

    // 自动调整输入框大小
    autoResizeInput(input) {
        input.style.height = 'auto';
        input.style.height = Math.min(input.scrollHeight, 120) + 'px';
    }

    // 设置输入框值
    setInputValue(value) {
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.value = value;
            this.autoResizeInput(chatInput);
        }
    }

    // 滚动到底部
    scrollToBottom() {
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            setTimeout(() => {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 100);
        }
    }

    // 显示错误信息
    showError(message) {
        this.showToast(message, 'error');
    }

    // 显示提示信息
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // HTML转义
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // 获取会话统计
    getSessionStats() {
        return {
            totalMessages: this.messages.length,
            userMessages: this.messages.filter(m => m.sender === 'user').length,
            aiMessages: this.messages.filter(m => m.sender === 'assistant').length,
            sessionDuration: this.messages.length > 0 ? 
                new Date() - this.messages[0].timestamp : 0,
            averageResponseTime: this.calculateAverageResponseTime()
        };
    }

    // 计算平均响应时间
    calculateAverageResponseTime() {
        const userMessages = this.messages.filter(m => m.sender === 'user');
        const aiMessages = this.messages.filter(m => m.sender === 'assistant');
        
        if (userMessages.length === 0 || aiMessages.length === 0) return 0;
        
        let totalResponseTime = 0;
        let responseCount = 0;
        
        for (let i = 0; i < this.messages.length - 1; i++) {
            if (this.messages[i].sender === 'user' && this.messages[i + 1].sender === 'assistant') {
                const responseTime = this.messages[i + 1].timestamp - this.messages[i].timestamp;
                totalResponseTime += responseTime;
                responseCount++;
            }
        }
        
        return responseCount > 0 ? totalResponseTime / responseCount : 0;
    }
}

// 初始化对话框管理器
let chatDialogManager;

// 初始化增强版对话框
document.addEventListener('DOMContentLoaded', function() {
    initializeEnhancedChatDialog();
});

function initializeEnhancedChatDialog() {
    chatDialogManager = new ChatDialogManager();
    console.log('星语助手增强版对话框初始化完成');
}

// 全局访问
window.ChatDialogManager = ChatDialogManager;
window.chatDialogManager = chatDialogManager;