// Uify iframe 集成管理器 - 现代化UI控制

class UifyIframeManager {
    constructor() {
        this.iframe = null;
        this.isMinimized = false;
        this.isLoading = true;
        this.connectionStatus = 'connecting';
        this.messageQueue = [];
        this.init();
    }

    init() {
        this.setupElements();
        this.setupEventListeners();
        this.loadIframe();
        this.setupConnectionMonitoring();
    }

    // 设置DOM元素
    setupElements() {
        this.container = document.getElementById('uifyContainer');
        this.iframe = document.getElementById('uifyIframe');
        this.loading = document.getElementById('uifyLoading');
        this.error = document.getElementById('uifyError');
        this.status = document.getElementById('uifyConnectionStatus');
        this.minimized = document.getElementById('uifyMinimized');
        
        if (!this.iframe) {
            console.error('Uify iframe element not found');
            return;
        }
    }

    // 设置事件监听器
    setupEventListeners() {
        // 最小化/展开按钮
        const minimizeBtn = document.querySelector('.uify-header-btn.minimize-btn');
        const closeBtn = document.querySelector('.uify-header-btn.close-btn');
        const retryBtn = document.querySelector('.uify-retry-btn');
        
        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', () => this.toggleMinimize());
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }
        
        if (retryBtn) {
            retryBtn.addEventListener('click', () => this.retryLoad());
        }

        // 工具栏按钮
        const clearBtn = document.getElementById('uifyClearBtn');
        const exportBtn = document.getElementById('uifyExportBtn');
        const voiceBtn = document.getElementById('uifyVoiceBtn');
        const settingsBtn = document.getElementById('uifySettingsBtn');
        
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearChat());
        }
        
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportChat());
        }
        
        if (voiceBtn) {
            voiceBtn.addEventListener('click', () => this.toggleVoice());
        }
        
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => this.openSettings());
        }

        // 最小化状态点击
        if (this.minimized) {
            this.minimized.addEventListener('click', () => this.toggleMinimize());
        }

        // 键盘快捷键
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === '/') {
                e.preventDefault();
                this.toggleMinimize();
            }
            if (e.key === 'Escape' && !this.isMinimized) {
                this.toggleMinimize();
            }
        });

        // 窗口大小变化
        window.addEventListener('resize', () => this.handleResize());

        // 页面可见性变化
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                this.resumeConnection();
            } else {
                this.pauseConnection();
            }
        });
    }

    // 加载iframe
    loadIframe() {
        if (!this.iframe) return;

        this.setLoadingState(true);
        this.setConnectionStatus('connecting');

        // 设置iframe源
        this.iframe.src = 'https://udify.app/chatbot/EmUprlFna2N9LIv7';
        
        // 监听iframe加载事件
        this.iframe.addEventListener('load', () => {
            this.onIframeLoaded();
        });

        this.iframe.addEventListener('error', () => {
            this.onIframeError();
        });

        // 设置消息监听器
        window.addEventListener('message', (e) => {
            this.handleMessage(e);
        });
    }

    // iframe加载完成
    onIframeLoaded() {
        console.log('Uify iframe loaded successfully');
        this.setLoadingState(false);
        this.setConnectionStatus('connected');
        
        // 发送初始化消息
        this.sendMessageToIframe({
            type: 'init',
            data: {
                userAgent: navigator.userAgent,
                language: navigator.language,
                timestamp: new Date().toISOString()
            }
        });

        // 处理消息队列
        this.processMessageQueue();
        
        // 显示欢迎消息
        this.showNotification('星语助手已连接', 'success');
    }

    // iframe加载错误
    onIframeError() {
        console.error('Uify iframe failed to load');
        this.setLoadingState(false);
        this.setConnectionStatus('disconnected');
        this.showError('连接失败，请检查网络连接');
    }

    // 处理来自iframe的消息
    handleMessage(event) {
        // 验证消息来源
        if (event.origin !== 'https://udify.app') {
            return;
        }

        const message = event.data;
        console.log('Received message from iframe:', message);

        switch (message.type) {
            case 'ready':
                this.setConnectionStatus('connected');
                break;
            case 'message':
                this.handleChatMessage(message.data);
                break;
            case 'typing':
                this.handleTypingIndicator(message.data);
                break;
            case 'error':
                this.handleError(message.data);
                break;
            case 'status':
                this.handleStatusUpdate(message.data);
                break;
            default:
                console.log('Unknown message type:', message.type);
        }
    }

    // 发送消息到iframe
    sendMessageToIframe(message) {
        if (!this.iframe || !this.iframe.contentWindow) {
            // 如果iframe未准备好，加入队列
            this.messageQueue.push(message);
            return;
        }

        try {
            this.iframe.contentWindow.postMessage(message, 'https://udify.app');
        } catch (error) {
            console.error('Failed to send message to iframe:', error);
            this.messageQueue.push(message);
        }
    }

    // 处理消息队列
    processMessageQueue() {
        while (this.messageQueue.length > 0) {
            const message = this.messageQueue.shift();
            this.sendMessageToIframe(message);
        }
    }

    // 处理聊天消息
    handleChatMessage(data) {
        // 这里可以处理来自Uify的聊天消息
        console.log('Chat message received:', data);
        
        // 更新UI状态
        this.updateChatStatus(data);
    }

    // 处理打字指示器
    handleTypingIndicator(data) {
        // 显示/隐藏打字指示器
        const isTyping = data.typing;
        this.container.classList.toggle('typing', isTyping);
        
        if (isTyping) {
            this.minimized.classList.add('typing');
        } else {
            this.minimized.classList.remove('typing');
        }
    }

    // 处理错误
    handleError(data) {
        console.error('Error from iframe:', data);
        this.showError(data.message || '发生未知错误');
    }

    // 处理状态更新
    handleStatusUpdate(data) {
        console.log('Status update:', data);
        this.setConnectionStatus(data.status || 'connected');
    }

    // 设置加载状态
    setLoadingState(loading) {
        this.isLoading = loading;
        if (this.container) {
            this.container.classList.toggle('loading', loading);
        }
        if (this.loading) {
            this.loading.style.display = loading ? 'flex' : 'none';
        }
    }

    // 设置连接状态
    setConnectionStatus(status) {
        this.connectionStatus = status;
        if (this.status) {
            this.status.className = `uify-connection-status ${status}`;
            this.status.innerHTML = `
                <div class="uify-connection-indicator"></div>
                <span>${this.getStatusText(status)}</span>
            `;
        }
    }

    // 获取状态文本
    getStatusText(status) {
        const statusTexts = {
            'connecting': '连接中...',
            'connected': '已连接',
            'disconnected': '连接断开',
            'error': '连接错误'
        };
        return statusTexts[status] || '未知状态';
    }

    // 显示错误
    showError(message) {
        if (this.error) {
            this.error.style.display = 'flex';
            const errorMessage = this.error.querySelector('.uify-error-message');
            if (errorMessage) {
                errorMessage.textContent = message;
            }
        }
        this.showNotification(message, 'error');
    }

    // 隐藏错误
    hideError() {
        if (this.error) {
            this.error.style.display = 'none';
        }
    }

    // 显示通知
    showNotification(message, type = 'info') {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `uify-notification uify-notification-${type}`;
        notification.innerHTML = `
            <div class="uify-notification-content">
                <span class="uify-notification-icon">${this.getNotificationIcon(type)}</span>
                <span class="uify-notification-text">${message}</span>
            </div>
            <button class="uify-notification-close">×</button>
        `;

        document.body.appendChild(notification);

        // 显示动画
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // 自动隐藏
        setTimeout(() => {
            this.hideNotification(notification);
        }, 3000);

        // 手动关闭
        const closeBtn = notification.querySelector('.uify-notification-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.hideNotification(notification);
            });
        }
    }

    // 获取通知图标
    getNotificationIcon(type) {
        const icons = {
            'success': '✅',
            'error': '❌',
            'warning': '⚠️',
            'info': 'ℹ️'
        };
        return icons[type] || '💬';
    }

    // 隐藏通知
    hideNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // 切换最小化状态
    toggleMinimize() {
        this.isMinimized = !this.isMinimized;
        
        if (this.container) {
            this.container.classList.toggle('minimized', this.isMinimized);
        }
        
        if (this.minimized) {
            this.minimized.style.display = this.isMinimized ? 'flex' : 'none';
        }

        // 发送状态更新到iframe
        this.sendMessageToIframe({
            type: 'minimize',
            data: { minimized: this.isMinimized }
        });

        // 显示通知
        if (this.isMinimized) {
            this.showNotification('星语助手已最小化', 'info');
        } else {
            this.showNotification('星语助手已展开', 'info');
        }
    }

    // 关闭助手
    close() {
        if (confirm('确定要关闭星语助手吗？')) {
            this.container.style.display = 'none';
            this.showNotification('星语助手已关闭', 'info');
            
            // 发送关闭消息
            this.sendMessageToIframe({
                type: 'close',
                data: { timestamp: new Date().toISOString() }
            });
        }
    }

    // 重试加载
    retryLoad() {
        this.hideError();
        this.loadIframe();
    }

    // 清空聊天记录
    clearChat() {
        if (confirm('确定要清空聊天记录吗？')) {
            this.sendMessageToIframe({
                type: 'clear',
                data: { timestamp: new Date().toISOString() }
            });
            this.showNotification('聊天记录已清空', 'success');
        }
    }

    // 导出聊天记录
    exportChat() {
        // 请求导出数据
        this.sendMessageToIframe({
            type: 'export',
            data: { format: 'json' }
        });
        
        this.showNotification('正在导出聊天记录...', 'info');
    }

    // 切换语音
    toggleVoice() {
        // 这里可以实现语音功能的切换
        this.showNotification('语音功能开发中...', 'info');
    }

    // 打开设置
    openSettings() {
        // 这里可以打开设置面板
        this.showNotification('设置功能开发中...', 'info');
    }

    // 恢复连接
    resumeConnection() {
        if (this.connectionStatus === 'disconnected') {
            this.retryLoad();
        }
    }

    // 暂停连接
    pauseConnection() {
        // 可以在这里实现连接暂停逻辑
        console.log('Connection paused');
    }

    // 处理窗口大小变化
    handleResize() {
        // 响应式处理
        if (window.innerWidth < 768) {
            this.container.classList.add('mobile');
        } else {
            this.container.classList.remove('mobile');
        }
    }

    // 设置连接监控
    setupConnectionMonitoring() {
        // 定期检查连接状态
        setInterval(() => {
            if (this.connectionStatus === 'connected') {
                // 发送心跳消息
                this.sendMessageToIframe({
                    type: 'ping',
                    data: { timestamp: new Date().toISOString() }
                });
            }
        }, 30000); // 每30秒检查一次

        // 监听连接超时
        setTimeout(() => {
            if (this.connectionStatus === 'connecting') {
                this.setConnectionStatus('disconnected');
                this.showError('连接超时，请重试');
            }
        }, 10000); // 10秒超时
    }

    // 更新聊天状态
    updateChatStatus(data) {
        // 这里可以更新UI状态，比如显示新消息提示
        if (data.hasNewMessage && this.isMinimized) {
            this.showNotification('您有新消息', 'info');
            
            // 显示消息数量徽章
            const badge = this.minimized.querySelector('.notification-badge');
            if (badge) {
                const count = parseInt(badge.textContent) || 0;
                badge.textContent = count + 1;
                badge.style.display = 'block';
            }
        }
    }

    // 获取会话统计
    getStats() {
        return {
            connectionStatus: this.connectionStatus,
            isMinimized: this.isMinimized,
            isLoading: this.isLoading,
            messageQueueLength: this.messageQueue.length,
            timestamp: new Date().toISOString()
        };
    }
}

// 全局Uify管理器实例
let uifyManager;

// 初始化Uify iframe
document.addEventListener('DOMContentLoaded', function() {
    initializeUifyIframe();
});

function initializeUifyIframe() {
    uifyManager = new UifyIframeManager();
    console.log('Uify iframe manager initialized');
    
    // 暴露全局访问
    window.uifyManager = uifyManager;
    
    // 显示初始化通知
    setTimeout(() => {
        uifyManager.showNotification('星语助手正在初始化...', 'info');
    }, 1000);
}

// 全局访问
window.UifyIframeManager = UifyIframeManager;