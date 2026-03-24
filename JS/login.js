/**
 * 星心守护 - 用户登录认证模块
 * 提供登录/登出、会话管理、用户信息维护等功能
 */

// ==========================================
// 配置与常量
// ==========================================

const AUTH_CONFIG = {
    sessionTimeout: 30 * 60 * 1000,
    rememberMeDuration: 7 * 24 * 60 * 60 * 1000,
    maxLoginAttempts: 5,
    lockoutDuration: 15 * 60 * 1000
};

const STORAGE_KEYS = {
    session: 'smartHeartLoggedIn',
    userInfo: 'smartHeartUserInfo',
    rememberMe: 'smartHeartRememberMe',
    loginAttempts: 'smartHeartLoginAttempts',
    lockoutTime: 'smartHeartLockoutTime'
};

const MOCK_CREDENTIALS = {
    username: 'admin',
    password: '123456'
};

// ==========================================
// 状态管理
// ==========================================

let loginModal = null;
let isLoggedIn = false;
let currentUser = null;

// ==========================================
// 初始化
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initLoginSystem();
});

/**
 * 初始化登录系统
 */
function initLoginSystem() {
    createLoginModal();
    checkLoginStatus();
    loadRememberedUser();
    bindLoginTriggers();
    startSessionMonitor();
}

// ==========================================
// 模态框管理
// ==========================================

/**
 * 创建登录模态框
 */
function createLoginModal() {
    const existingModal = document.getElementById('loginOverlay');
    if (existingModal) return;

    const modalHTML = `
        <div class="login-overlay" id="loginOverlay" role="dialog" aria-modal="true" aria-labelledby="loginTitle">
            <div class="login-card">
                <button class="close-login" onclick="closeLoginModal()" aria-label="关闭">
                    <i class="ri-close-line"></i>
                </button>
                
                <div id="loginFormContainer">
                    <div class="login-card-header">
                        <div class="login-icon">🔐</div>
                        <h2 id="loginTitle">账号登录</h2>
                        <p>欢迎回到星心守护</p>
                    </div>
                    
                    <div id="loginError" class="error-message" style="display: none;" role="alert">
                        <i class="ri-error-warning-line"></i>
                        <span></span>
                    </div>
                    
                    <form id="loginForm" onsubmit="handleLogin(event)">
                        <div class="form-group">
                            <label for="loginUsername">用户名</label>
                            <div class="input-wrapper">
                                <i class="ri-user-line" aria-hidden="true"></i>
                                <input 
                                    type="text" 
                                    id="loginUsername" 
                                    name="username"
                                    placeholder="请输入用户名" 
                                    required
                                    autocomplete="username"
                                    aria-required="true"
                                >
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="loginPassword">密码</label>
                            <div class="input-wrapper">
                                <i class="ri-lock-line" aria-hidden="true"></i>
                                <input 
                                    type="password" 
                                    id="loginPassword" 
                                    name="password"
                                    placeholder="请输入密码" 
                                    required
                                    autocomplete="current-password"
                                    aria-required="true"
                                >
                                <button type="button" class="toggle-password" onclick="togglePasswordVisibility()" aria-label="切换密码可见性">
                                    <i class="ri-eye-line" id="passwordToggleIcon"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div class="remember-forgot">
                            <label class="remember-me">
                                <input type="checkbox" id="rememberMe" name="rememberMe">
                                <span>记住我</span>
                            </label>
                            <button type="button" class="forgot-password" onclick="showForgotPassword()">忘记密码？</button>
                        </div>
                        
                        <button type="submit" class="login-btn" id="loginBtn">
                            <span>登录</span>
                            <i class="ri-arrow-right-line"></i>
                        </button>
                    </form>
                    
                    <div class="login-divider">
                        <span>测试账号</span>
                    </div>
                    
                    <div class="login-hint">
                        <code>admin</code> / <code>123456</code>
                    </div>
                </div>
                
                <div id="loggedInContainer" style="display: none;">
                    <div class="login-card-header">
                        <div class="login-icon">👤</div>
                        <h2>已登录</h2>
                        <p>欢迎回来</p>
                    </div>
                    
                    <div class="user-logged">
                        <img src="assets/1.jpg" alt="用户头像" class="user-logged-avatar" id="loggedUserAvatar">
                        <div class="user-logged-info">
                            <div class="user-logged-name" id="loggedUserName">家长用户</div>
                            <div class="user-logged-role" id="loggedUserRole">VIP会员</div>
                        </div>
                    </div>
                    
                    <div class="user-stats">
                        <div class="stat-item">
                            <span class="stat-value" id="userAppointmentCount">0</span>
                            <span class="stat-label">预约</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value" id="userCourseCount">0</span>
                            <span class="stat-label">课程</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value" id="userMessageCount">0</span>
                            <span class="stat-label">消息</span>
                        </div>
                    </div>
                    
                    <button class="logout-btn" onclick="handleLogout()">
                        <i class="ri-logout-box-r-line"></i>
                        <span>退出登录</span>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    loginModal = document.getElementById('loginOverlay');
    
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            closeLoginModal();
        }
    });
}

/**
 * 打开登录模态框
 */
function openLoginModal() {
    const overlay = document.getElementById('loginOverlay');
    if (!overlay) return;
    
    const isCurrentlyLoggedIn = checkSessionValid();
    updateModalContent(isCurrentlyLoggedIn);
    
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    overlay.setAttribute('aria-hidden', 'false');
    
    if (!isCurrentlyLoggedIn) {
        setTimeout(() => {
            const usernameInput = document.getElementById('loginUsername');
            if (usernameInput && !usernameInput.value) {
                usernameInput.focus();
            }
        }, 100);
    }
}

/**
 * 关闭登录模态框
 */
function closeLoginModal() {
    const overlay = document.getElementById('loginOverlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        overlay.setAttribute('aria-hidden', 'true');
        clearLoginForm();
    }
}

/**
 * 更新模态框内容
 * @param {boolean} loggedIn - 是否已登录
 */
function updateModalContent(loggedIn) {
    const formContainer = document.getElementById('loginFormContainer');
    const loggedContainer = document.getElementById('loggedInContainer');
    
    if (!formContainer || !loggedContainer) return;
    
    if (loggedIn) {
        formContainer.style.display = 'none';
        loggedContainer.style.display = 'block';
        
        const userInfo = getUserInfo();
        document.getElementById('loggedUserName').textContent = userInfo.name || '家长用户';
        document.getElementById('loggedUserRole').textContent = userInfo.role || 'VIP会员';
        document.getElementById('loggedUserAvatar').src = userInfo.avatar || 'assets/1.jpg';
        
        updateUserStats();
    } else {
        formContainer.style.display = 'block';
        loggedContainer.style.display = 'none';
    }
}

// ==========================================
// 登录/登出处理
// ==========================================

/**
 * 处理登录表单提交
 * @param {Event} event - 表单提交事件
 */
function handleLogin(event) {
    event.preventDefault();
    
    if (isLockedOut()) {
        showLoginError(`登录尝试次数过多，请${getRemainingLockoutTime()}分钟后重试`);
        return;
    }
    
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    clearLoginError();
    
    if (!validateLoginInput(username, password)) {
        return;
    }
    
    if (username === MOCK_CREDENTIALS.username && password === MOCK_CREDENTIALS.password) {
        handleLoginSuccess(username, rememberMe);
    } else {
        handleLoginFailure();
    }
}

/**
 * 验证登录输入
 * @param {string} username - 用户名
 * @param {string} password - 密码
 * @returns {boolean} 验证结果
 */
function validateLoginInput(username, password) {
    if (!username || !password) {
        showLoginError('请输入用户名和密码');
        return false;
    }
    
    if (username.length < 3) {
        showLoginError('用户名至少需要3个字符');
        return false;
    }
    
    if (password.length < 6) {
        showLoginError('密码至少需要6个字符');
        return false;
    }
    
    return true;
}

/**
 * 处理登录成功
 * @param {string} username - 用户名
 * @param {boolean} rememberMe - 是否记住我
 */
function handleLoginSuccess(username, rememberMe) {
    clearLoginAttempts();
    
    const userInfo = {
        name: '管理员',
        role: 'VIP会员',
        avatar: 'assets/1.jpg',
        loginTime: new Date().toISOString(),
        username: username
    };
    
    sessionStorage.setItem(STORAGE_KEYS.session, 'true');
    localStorage.setItem(STORAGE_KEYS.userInfo, JSON.stringify(userInfo));
    
    if (rememberMe) {
        localStorage.setItem(STORAGE_KEYS.rememberMe, JSON.stringify({
            username: username,
            expires: Date.now() + AUTH_CONFIG.rememberMeDuration
        }));
    } else {
        localStorage.removeItem(STORAGE_KEYS.rememberMe);
    }
    
    isLoggedIn = true;
    currentUser = userInfo;
    
    showLoginSuccess('登录成功！欢迎回来');
    updateSidebarUserArea(userInfo);
    
    setTimeout(() => {
        closeLoginModal();
        showWelcomeNotification(userInfo.name);
    }, 1000);
}

/**
 * 处理登录失败
 */
function handleLoginFailure() {
    incrementLoginAttempts();
    
    const remainingAttempts = AUTH_CONFIG.maxLoginAttempts - getLoginAttempts();
    
    if (remainingAttempts <= 0) {
        setLockout();
        showLoginError(`登录尝试次数过多，账户已锁定${AUTH_CONFIG.lockoutDuration / 60000}分钟`);
    } else {
        showLoginError(`用户名或密码错误，还剩${remainingAttempts}次尝试机会`);
    }
    
    const passwordInput = document.getElementById('loginPassword');
    if (passwordInput) {
        passwordInput.value = '';
        passwordInput.focus();
    }
}

/**
 * 处理登出
 */
function handleLogout() {
    sessionStorage.removeItem(STORAGE_KEYS.session);
    localStorage.removeItem(STORAGE_KEYS.userInfo);
    
    isLoggedIn = false;
    currentUser = null;
    
    const defaultUserInfo = {
        name: '家长用户',
        role: 'VIP会员',
        avatar: 'assets/1.jpg'
    };
    
    updateSidebarUserArea(defaultUserInfo);
    closeLoginModal();
    showLogoutNotification();
}

// ==========================================
// 会话管理
// ==========================================

/**
 * 检查登录状态
 * @returns {boolean} 是否已登录
 */
function checkLoginStatus() {
    const isValid = checkSessionValid();
    
    if (isValid) {
        const userInfo = getUserInfo();
        isLoggedIn = true;
        currentUser = userInfo;
        updateSidebarUserArea(userInfo);
    }
    
    return isValid;
}

/**
 * 检查会话是否有效
 * @returns {boolean} 会话有效性
 */
function checkSessionValid() {
    const sessionActive = sessionStorage.getItem(STORAGE_KEYS.session) === 'true';
    const userInfo = getUserInfo();
    
    if (!sessionActive || !userInfo) {
        return false;
    }
    
    const loginTime = new Date(userInfo.loginTime).getTime();
    const now = Date.now();
    
    if (now - loginTime > AUTH_CONFIG.sessionTimeout) {
        sessionStorage.removeItem(STORAGE_KEYS.session);
        return false;
    }
    
    return true;
}

/**
 * 启动会话监控
 */
function startSessionMonitor() {
    setInterval(() => {
        if (isLoggedIn && !checkSessionValid()) {
            handleSessionExpired();
        }
    }, 60000);
    
    ['click', 'mousemove', 'keypress', 'scroll'].forEach(eventType => {
        document.addEventListener(eventType, resetSessionTimer);
    });
}

/**
 * 重置会话计时器
 */
function resetSessionTimer() {
    if (isLoggedIn && currentUser) {
        currentUser.loginTime = new Date().toISOString();
        localStorage.setItem(STORAGE_KEYS.userInfo, JSON.stringify(currentUser));
    }
}

/**
 * 处理会话过期
 */
function handleSessionExpired() {
    isLoggedIn = false;
    currentUser = null;
    
    const defaultUserInfo = {
        name: '家长用户',
        role: 'VIP会员',
        avatar: 'assets/1.jpg'
    };
    
    updateSidebarUserArea(defaultUserInfo);
    
    if (typeof showToast === 'function') {
        showToast('会话已过期，请重新登录', 'warning');
    }
}

// ==========================================
// 用户信息显示
// ==========================================

/**
 * 更新侧边栏用户区域
 * @param {Object} userInfo - 用户信息
 */
function updateSidebarUserArea(userInfo) {
    const userAvatar = document.querySelector('.user-avatar');
    const userName = document.querySelector('.user-name');
    const userRole = document.querySelector('.user-role');
    
    if (userAvatar) {
        userAvatar.src = userInfo.avatar || 'assets/1.jpg';
        userAvatar.alt = `${userInfo.name || '用户'}头像`;
    }
    if (userName) {
        userName.textContent = userInfo.name || '家长用户';
    }
    if (userRole) {
        userRole.textContent = userInfo.role || 'VIP会员';
    }
}

/**
 * 更新用户统计数据
 */
function updateUserStats() {
    const appointments = JSON.parse(localStorage.getItem('smartHeartAppointments') || '[]');
    const cooperations = JSON.parse(localStorage.getItem('smartHeartCooperations') || '[]');
    
    const appointmentCountEl = document.getElementById('userAppointmentCount');
    const courseCountEl = document.getElementById('userCourseCount');
    const messageCountEl = document.getElementById('userMessageCount');
    
    if (appointmentCountEl) {
        appointmentCountEl.textContent = appointments.length;
    }
    if (courseCountEl) {
        courseCountEl.textContent = Math.floor(Math.random() * 5);
    }
    if (messageCountEl) {
        messageCountEl.textContent = Math.floor(Math.random() * 10);
    }
}

/**
 * 获取用户信息
 * @returns {Object|null} 用户信息
 */
function getUserInfo() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.userInfo));
    } catch {
        return null;
    }
}

// ==========================================
// 记住我功能
// ==========================================

/**
 * 加载记住的用户
 */
function loadRememberedUser() {
    try {
        const remembered = JSON.parse(localStorage.getItem(STORAGE_KEYS.rememberMe));
        if (remembered && remembered.username && remembered.expires > Date.now()) {
            const usernameInput = document.getElementById('loginUsername');
            const rememberMeCheckbox = document.getElementById('rememberMe');
            
            if (usernameInput) {
                usernameInput.value = remembered.username;
            }
            if (rememberMeCheckbox) {
                rememberMeCheckbox.checked = true;
            }
        } else if (remembered && remembered.expires <= Date.now()) {
            localStorage.removeItem(STORAGE_KEYS.rememberMe);
        }
    } catch {
        // 忽略解析错误
    }
}

// ==========================================
// 登录尝试限制
// ==========================================

/**
 * 获取登录尝试次数
 * @returns {number} 尝试次数
 */
function getLoginAttempts() {
    return parseInt(sessionStorage.getItem(STORAGE_KEYS.loginAttempts) || '0');
}

/**
 * 增加登录尝试次数
 */
function incrementLoginAttempts() {
    const attempts = getLoginAttempts() + 1;
    sessionStorage.setItem(STORAGE_KEYS.loginAttempts, attempts.toString());
}

/**
 * 清除登录尝试次数
 */
function clearLoginAttempts() {
    sessionStorage.removeItem(STORAGE_KEYS.loginAttempts);
    sessionStorage.removeItem(STORAGE_KEYS.lockoutTime);
}

/**
 * 检查是否被锁定
 * @returns {boolean} 是否锁定
 */
function isLockedOut() {
    const lockoutTime = parseInt(sessionStorage.getItem(STORAGE_KEYS.lockoutTime) || '0');
    if (!lockoutTime) return false;
    
    if (Date.now() > lockoutTime) {
        clearLoginAttempts();
        return false;
    }
    
    return true;
}

/**
 * 设置锁定
 */
function setLockout() {
    sessionStorage.setItem(STORAGE_KEYS.lockoutTime, (Date.now() + AUTH_CONFIG.lockoutDuration).toString());
}

/**
 * 获取剩余锁定时间
 * @returns {number} 剩余分钟数
 */
function getRemainingLockoutTime() {
    const lockoutTime = parseInt(sessionStorage.getItem(STORAGE_KEYS.lockoutTime) || '0');
    if (!lockoutTime) return 0;
    
    return Math.ceil((lockoutTime - Date.now()) / 60000);
}

// ==========================================
// 表单辅助功能
// ==========================================

/**
 * 切换密码可见性
 */
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('loginPassword');
    const toggleIcon = document.getElementById('passwordToggleIcon');
    
    if (!passwordInput || !toggleIcon) return;
    
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    
    toggleIcon.className = isPassword ? 'ri-eye-off-line' : 'ri-eye-line';
}

/**
 * 显示登录错误
 * @param {string} message - 错误消息
 */
function showLoginError(message) {
    const errorDiv = document.getElementById('loginError');
    if (!errorDiv) return;
    
    errorDiv.querySelector('span').textContent = message;
    errorDiv.style.display = 'flex';
    errorDiv.className = 'error-message';
    
    const icon = errorDiv.querySelector('i');
    if (icon) {
        icon.className = 'ri-error-warning-line';
    }
}

/**
 * 显示登录成功
 * @param {string} message - 成功消息
 */
function showLoginSuccess(message) {
    const errorDiv = document.getElementById('loginError');
    if (!errorDiv) return;
    
    errorDiv.querySelector('span').textContent = message;
    errorDiv.style.display = 'flex';
    errorDiv.className = 'success-message';
    
    const icon = errorDiv.querySelector('i');
    if (icon) {
        icon.className = 'ri-checkbox-circle-line';
    }
}

/**
 * 清除登录错误
 */
function clearLoginError() {
    const errorDiv = document.getElementById('loginError');
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
    
    const inputs = document.querySelectorAll('#loginForm input');
    inputs.forEach(input => input.classList.remove('error'));
}

/**
 * 清除登录表单
 */
function clearLoginForm() {
    clearLoginError();
    
    const form = document.getElementById('loginForm');
    if (form) {
        form.reset();
    }
    
    const passwordInput = document.getElementById('loginPassword');
    const toggleIcon = document.getElementById('passwordToggleIcon');
    
    if (passwordInput) {
        passwordInput.type = 'password';
    }
    if (toggleIcon) {
        toggleIcon.className = 'ri-eye-line';
    }
}

// ==========================================
// 通知与提示
// ==========================================

/**
 * 显示欢迎通知
 * @param {string} userName - 用户名
 */
function showWelcomeNotification(userName) {
    const message = `${userName}，祝您今天心情愉快！`;
    
    if (typeof showToast === 'function') {
        showToast(message, 'success', 3000);
    } else {
        console.log(`欢迎回来，${message}`);
    }
}

/**
 * 显示登出通知
 */
function showLogoutNotification() {
    if (typeof showToast === 'function') {
        showToast('已安全退出登录', 'info', 3000);
    } else {
        console.log('已退出登录');
    }
}

/**
 * 显示忘记密码提示
 */
function showForgotPassword() {
    const content = `
        <div class="forgot-password-content">
            <p>请联系管理员重置密码：</p>
            <ul>
                <li>客服热线：400-123-4567</li>
                <li>邮箱：support@xingxin.com</li>
                <li>工作时间：周一至周五 9:00-18:00</li>
            </ul>
            <p style="margin-top: 15px; color: #666; font-size: 14px;">
                为了您的账户安全，重置密码需要进行身份验证。
            </p>
        </div>
    `;
    
    if (typeof openModal === 'function') {
        openModal('忘记密码', content);
    } else {
        alert('请联系管理员重置密码\n客服热线：400-123-4567');
    }
}

// ==========================================
// 事件绑定
// ==========================================

/**
 * 绑定登录触发器
 */
function bindLoginTriggers() {
    const loginTriggers = document.querySelectorAll('[data-action="login"], .login-trigger, .user-avatar, .user-info');
    
    loginTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            openLoginModal();
        });
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const overlay = document.getElementById('loginOverlay');
            if (overlay && overlay.classList.contains('active')) {
                closeLoginModal();
            }
        }
    });
}

// ==========================================
// 暴露全局函数
// ==========================================

window.openLoginModal = openLoginModal;
window.closeLoginModal = closeLoginModal;
window.handleLogin = handleLogin;
window.handleLogout = handleLogout;
window.togglePasswordVisibility = togglePasswordVisibility;
window.showForgotPassword = showForgotPassword;
window.checkLoginStatus = checkLoginStatus;
window.getUserInfo = getUserInfo;
