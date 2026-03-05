// Uify iframe 增强版管理器 - 现代化UI控制与动画

class UifyIframeEnhancedManager {
    constructor() {
        this.iframe = null;
        this.isMinimized = false;
        this.isLoading = true;
        this.connectionStatus = 'connecting';
        this.messageQueue = [];
        this.loadingProgress = 0;
        this.animationFrame = null;
        this.init();
    }

    init() {
        this.setupElements();
        this.setupEventListeners();
        this.loadIframe();
        this.setupConnectionMonitoring();
        this.startLoadingAnimation();
    }

    // 设置DOM元素
    setupElements() {
        this.container = document.getElementById('uifyContainer');
        this.iframe = document.getElementById('uifyIframe');
        this.loading = document.getElementById('uifyLoading');
        this.error = document.getElementById('uifyError');
        this.status = document.getElementById('uifyConnectionStatus');
        this.minimized = document.getElementById('uifyMinimized');
        
        // 获取加载进度条
        this.loadingProgressBar = document.querySelector('.uify-loading-progress-bar');
        this.loadingIcon = document.querySelector('.uify-loading-icon');
        
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
        const refreshBtn = document.getElementById('uifyRefreshBtn');
        const voiceBtn = document.getElementById('uifyVoiceBtn');
        const settingsBtn = document.getElementById('uifySettingsBtn');
        
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearChat());
        }
        
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportChat());
        }
        
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => this.refreshIframe());
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

        // iframe加载事件
        if (this.iframe) {
            this.iframe.addEventListener('load', () => {
                this.onIframeLoaded();
            });

            this.iframe.addEventListener('error', () => {
                this.onIframeError();
            });
        }

        // 消息监听
        window.addEventListener('message', (e) => {
            this.handleMessage(e);
        });
    }

    // 开始加载动画
    startLoadingAnimation() {
        if (!this.loadingProgressBar) return;
        
        let progress = 0;
        const animateLoading = () => {
            if (!this.isLoading) {
                cancelAnimationFrame(this.animationFrame);
                return;
            }
            
            // 模拟加载进度
            progress += Math.random() * 2;
            if (progress > 90) progress = 90; // 等待真实加载完成
            
            this.loadingProgress = Math.min(progress, 100);
            this.loadingProgressBar.style.width = `${this.loadingProgress}%`;
            
            // 添加脉冲效果到图标
            if (this.loadingIcon) {
                const pulseIntensity = Math.sin(Date.now() * 0.003) * 0.1 + 1;
                this.loadingIcon.style.transform = `scale(${pulseIntensity})`;
            }
            
            this.animationFrame = requestAnimationFrame(animateLoading);
        };
        
        this.animationFrame = requestAnimationFrame(animateLoading);
    }

    // 停止加载动画
    stopLoadingAnimation() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
        
        // 快速完成进度条
        if (this.loadingProgressBar) {
            this.loadingProgressBar.style.transition = 'width 0.3s ease';
            this.loadingProgressBar.style.width = '100%';
            
            setTimeout(() => {
                this.loadingProgressBar.style.transition = '';
            }, 300);
        }
    }

    // 加载iframe
    loadIframe() {
        if (!this.iframe) return;

        this.setLoadingState(true);
        this.setConnectionStatus('connecting');
        this.startLoadingAnimation();
        
        // 添加加载动画类
        this.iframe.classList.add('loading');
        
        // 设置iframe源
        this.iframe.src = 'https://udify.app/chatbot/EmUprlFna2N9LIv7';
        
        // 模拟加载进度
        this.simulateLoadingProgress();
    }

    // 模拟加载进度
    simulateLoadingProgress() {
        const steps = [
            { progress: 15, delay: 500, message: '正在初始化...' },
            { progress: 35, delay: 800, message: '正在连接服务器...' },
            { progress: 55, delay: 600, message: '正在验证身份...' },
            { progress: 75, delay: 700, message: '正在加载AI模型...' },
            { progress: 90, delay: 500, message: '即将完成...' }
        ];
        
        steps.forEach((step, index) => {
            setTimeout(() => {
                if (this.isLoading) {
                    this.loadingProgress = step.progress;
                    if (this.loadingProgressBar) {
                        this.loadingProgressBar.style.width = `${step.progress}%`;
                    }
                    
                    // 更新加载文本
                    const loadingText = document.querySelector('.uify-loading-subtext');
                    if (loadingText) {
                        loadingText.textContent = step.message;
                    }
                    
                    // 添加视觉反馈
                    this.addLoadingPulse();
                }
            }, step.delay * (index + 1));
        });
    }

    // 添加加载脉冲效果
    addLoadingPulse() {
        const loadingContent = document.querySelector('.uify-loading-content');
        if (loadingContent) {
            loadingContent.style.transform = 'scale(1.02)';
            setTimeout(() => {
                loadingContent.style.transform = 'scale(1)';
            }, 200);
        }
    }

    // iframe加载完成
    onIframeLoaded() {
        console.log('Uify iframe loaded successfully');
        this.stopLoadingAnimation();
        this.setLoadingState(false);
        this.setConnectionStatus('connected');
        
        // 移除加载类，添加已加载类
        this.iframe.classList.remove('loading');
        this.iframe.classList.add('loaded');
        
        // 发送初始化消息
        this.sendMessageToIframe({
            type: 'init',
            data: {
                userAgent: navigator.userAgent,
                language: navigator.language,
                timestamp: new Date().toISOString(),
                screenWidth: window.innerWidth,
                screenHeight: window.innerHeight
            }
        });

        // 处理消息队列
        this.processMessageQueue();
        
        // 显示成功动画
        this.showSuccessAnimation();
        
        // 显示欢迎通知
        setTimeout(() => {
            this.showNotification('🎉 星语助手已连接成功！', 'success');
        }, 500);
    }

    // 显示成功动画
    showSuccessAnimation() {
        const container = document.querySelector('.uify-iframe-container');
        if (container) {
            container.style.animation = 'iframeFadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // 添加成功脉冲效果
            setTimeout(() => {
                container.style.boxShadow = '0 0 0 4px rgba(74, 144, 226, 0.3)';
                setTimeout(() => {
                    container.style.boxShadow = '';
                }, 1000);
            }, 300);
        }
    }

    // iframe加载错误
    onIframeError() {
        console.error('Uify iframe failed to load');
        this.stopLoadingAnimation();
        this.setLoadingState(false);
        this.setConnectionStatus('disconnected');
        
        // 移除加载类
        this.iframe.classList.remove('loading');
        
        // 显示错误动画
        this.showErrorAnimation();
        
        // 显示错误通知
        setTimeout(() => {
            this.showError('连接失败，请检查网络连接');
        }, 500);
    }

    // 显示错误动画
    showErrorAnimation() {
        const errorElement = document.querySelector('.uify-error');
        if (errorElement) {
            errorElement.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                errorElement.style.animation = '';
            }, 500);
        }
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
                this.showConnectionSuccess();
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
            case 'pong':
                // 心跳响应
                this.lastPongTime = Date.now();
                break;
            default:
                console.log('Unknown message type:', message.type);
        }
    }

    // 显示连接成功
    showConnectionSuccess() {
        const statusElement = document.querySelector('.uify-connection-status');
        if (statusElement) {
            statusElement.style.animation = 'pulse 1s ease-in-out';
            setTimeout(() => {
                statusElement.style.animation = '';
            }, 1000);
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

    // 其他功能方法
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

    retryLoad() {
        this.hideError();
        this.loadIframe();
    }

    clearChat() {
        if (confirm('确定要清空聊天记录吗？')) {
            this.sendMessageToIframe({
                type: 'clear',
                data: { timestamp: new Date().toISOString() }
            });
            this.showNotification('聊天记录已清空', 'success');
        }
    }

    exportChat() {
        // 请求导出数据
        this.sendMessageToIframe({
            type: 'export',
            data: { format: 'json' }
        });
        
        this.showNotification('正在导出聊天记录...', 'info');
    }

    refreshIframe() {
        this.showNotification('正在刷新星语助手...', 'info');
        this.loadIframe();
    }

    toggleVoice() {
        this.showNotification('语音功能开发中...', 'info');
    }

    openSettings() {
        this.showNotification('设置功能开发中...', 'info');
    }

    handleResize() {
        // 响应式处理
        if (window.innerWidth < 768) {
            this.container.classList.add('mobile');
        } else {
            this.container.classList.remove('mobile');
        }
        
        // 通知iframe窗口大小变化
        this.sendMessageToIframe({
            type: 'resize',
            data: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        });
    }

    resumeConnection() {
        if (this.connectionStatus === 'disconnected') {
            this.retryLoad();
        }
    }

    pauseConnection() {
        // 可以在这里实现连接暂停逻辑
        console.log('Connection paused');
    }

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
        }, 15000); // 15秒超时
    }

    // 获取会话统计
    getStats() {
        return {
            connectionStatus: this.connectionStatus,
            isMinimized: this.isMinimized,
            isLoading: this.isLoading,
            messageQueueLength: this.messageQueue.length,
            loadingProgress: this.loadingProgress,
            timestamp: new Date().toISOString()
        };
    }
}

// 全局Uify管理器实例
let uifyEnhancedManager;

// 初始化Uify iframe
document.addEventListener('DOMContentLoaded', function() {
    initializeEnhancedUifyIframe();
});

function initializeEnhancedUifyIframe() {
    uifyEnhancedManager = new UifyIframeEnhancedManager();
    console.log('Uify enhanced iframe manager initialized');
    
    // 暴露全局访问
    window.uifyEnhancedManager = uifyEnhancedManager;
    
    // 显示初始化通知
    setTimeout(() => {
        uifyEnhancedManager.showNotification('🚀 星语助手正在初始化...', 'info');
    }, 1000);
}

// 全局访问
window.UifyIframeEnhancedManager = UifyIframeEnhancedManager;