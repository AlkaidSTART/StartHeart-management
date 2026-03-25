document.addEventListener('DOMContentLoaded', () => {
  const loginOverlay = document.getElementById('login-overlay');
  const appWrapper = document.getElementById('app-wrapper');
  const loginForm = document.getElementById('login-form');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');

  // Always start at login screen (no token persistence)
  showLogin();

  // Handle login form submission
  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        if (!navigator.onLine) {
            alert('网络无连接，请检查您的网络设置！');
            return;
        }

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'admin' && password === '123456') {
          showApp();
          return; // 登录成功后立即返回
        } else if (username !== 'admin') {
          alert('用户名不正确！');
        } else {
          alert('密码不正确！');
        }
    });
  }

  // Function to display the main application
  function showApp() {
    if (loginOverlay) loginOverlay.style.display = 'none';
    if (appWrapper) appWrapper.style.display = 'block';
  }

  // Function to display the login screen
  function showLogin() {
    if (loginOverlay) loginOverlay.style.display = 'flex';
    if (appWrapper) appWrapper.style.display = 'none';
  }

  // Expose a function to the global scope to allow logout from other parts of the app
  window.openLoginModal = () => {
    showLogin();
  };
});
