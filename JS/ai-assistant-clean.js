// AI助手清洁版本 - 避免重叠问题
document.addEventListener('DOMContentLoaded', function() {
    initializeCleanAI();
});

function initializeCleanAI() {
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
    let messages = [];

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
                generateAIResponse(message);
            }
        });
    });

    // 初始化欢迎消息
    setTimeout(() => {
        addMessage('您好！我是星语助手，有什么可以帮助您的吗？', 'assistant');
        showQuickFunctions();
    }, 1000);

    // 功能函数
    function toggleMinimize() {
        isMinimized = !isMinimized;
        assistantContainer.classList.toggle('minimized', isMinimized);
        
        if (isMinimized) {
            // 最小化时重置位置
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
        
        // 边界检测
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
        
        // 模拟AI回复
        setTimeout(() => {
            hideTypingIndicator();
            generateAIResponse(message);
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
        messages.push({ content, sender, time });
        
        // 滚动到底部
        scrollToBottom();
        
        // 限制消息数量
        if (messages.length > 50) {
            messages.shift();
            chatMessages.removeChild(chatMessages.firstChild);
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
    }

    function hideTypingIndicator() {
        const typingMessage = chatMessages.querySelector('.typing-message');
        if (typingMessage) {
            typingMessage.remove();
        }
    }

    function generateAIResponse(userMessage) {
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
        addMessage(randomResponse, 'assistant');
        
        // 30%概率显示快速功能
        if (Math.random() < 0.3) {
            setTimeout(() => {
                showQuickFunctions();
            }, 500);
        }
    }

    function showQuickFunctions() {
        if (quickFunctions) {
            quickFunctions.classList.add('active');
            setTimeout(() => {
                quickFunctions.classList.remove('active');
            }, 5000);
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
            this.style.height = Math.min(this.scrollHeight, 100) + 'px';
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

    console.log('AI助手清洁版本初始化完成');
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
window.CleanAI = {
    initializeCleanAI,
    debounce
};