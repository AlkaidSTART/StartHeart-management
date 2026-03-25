// 星语助手弹窗：嵌入外部 AI iframe，保留开关控制
(() => {
  let chatPopup;

  function init() {
    chatPopup = document.getElementById('chatPopup');
  }

  function toggleChatPopup() {
    if (!chatPopup) return;
    const isVisible = chatPopup.style.display === 'flex';
    chatPopup.style.display = isVisible ? 'none' : 'flex';
  }

  function openChatPopup() {
    if (!chatPopup) return;
    chatPopup.style.display = 'flex';
  }

  function closeChatPopup() {
    if (!chatPopup) return;
    chatPopup.style.display = 'none';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.toggleChatPopup = toggleChatPopup;
  window.openChatPopup = openChatPopup;
  window.closeChatPopup = closeChatPopup;
})();
