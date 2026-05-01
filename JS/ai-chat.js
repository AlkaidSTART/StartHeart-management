(function () {
  'use strict';

  const STORAGE_KEY = 'smartheart-ai-chat-history';
  const DEFAULT_MESSAGES = [
    {
      role: 'assistant',
      content: '您好，我是星语助手。您可以在侧边栏或右下角悬浮框里直接和我对话，两边会同步显示同一份记录。',
    },
  ];

  let messages = loadMessages();
  let isSending = false;
  let abortController = null;

  function loadMessages() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (Array.isArray(saved) && saved.length > 0) {
        return saved.filter((message) => ['user', 'assistant'].includes(message.role));
      }
    } catch (_) {
      // Ignore invalid local storage and use the default greeting.
    }
    return [...DEFAULT_MESSAGES];
  }

  function saveMessages() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-60)));
    } catch (_) {
      // Storage can fail in private mode; the current page still keeps state in memory.
    }
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function formatMessage(content) {
    return escapeHtml(content).replace(/\n/g, '<br>');
  }

  function getPanels() {
    return Array.from(document.querySelectorAll('[data-ai-chat]'));
  }

  function renderMessages() {
    getPanels().forEach((panel) => {
      const container = panel.querySelector('[data-ai-messages]');
      if (!container) return;

      container.innerHTML = messages
        .map((message) => `
          <div class="ai-chat-message ${message.role}">
            <div class="ai-chat-bubble">${formatMessage(message.content)}</div>
          </div>
        `)
        .join('');

      container.scrollTop = container.scrollHeight;
    });
  }

  function setBusy(nextBusy) {
    isSending = nextBusy;
    getPanels().forEach((panel) => {
      panel.classList.toggle('is-sending', nextBusy);
      const sendButton = panel.querySelector('.ai-chat-send');
      const input = panel.querySelector('[data-ai-input]');
      if (sendButton) sendButton.disabled = nextBusy;
      if (input) input.disabled = nextBusy;
    });
  }

  function syncInputs(sourceInput) {
    getPanels().forEach((panel) => {
      const input = panel.querySelector('[data-ai-input]');
      if (input && input !== sourceInput) {
        input.value = sourceInput.value;
        resizeInput(input);
      }
    });
  }

  function clearInputs() {
    getPanels().forEach((panel) => {
      const input = panel.querySelector('[data-ai-input]');
      if (input) {
        input.value = '';
        resizeInput(input);
      }
    });
  }

  function resizeInput(input) {
    input.style.height = 'auto';
    input.style.height = `${Math.min(input.scrollHeight, 120)}px`;
  }

  async function sendMessage(content) {
    if (isSending || !content) return;

    messages.push({ role: 'user', content });
    messages.push({ role: 'assistant', content: '' });
    saveMessages();
    clearInputs();
    renderMessages();
    setBusy(true);

    abortController = new AbortController();
    const assistantMessage = messages[messages.length - 1];

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: messages.slice(0, -1) }),
        signal: abortController.signal,
      });

      if (!response.ok || !response.body) {
        let errorText = '星语助手暂时无法连接，请稍后再试。';
        try {
          const errorBody = await response.json();
          if (errorBody?.error) errorText = errorBody.error;
        } catch (_) {
          // Keep the friendly fallback.
        }
        throw new Error(errorText);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantMessage.content += decoder.decode(value, { stream: true });
        renderMessages();
      }

      assistantMessage.content = assistantMessage.content.trim() || '我刚才没有生成有效回复，请再试一次。';
    } catch (error) {
      assistantMessage.content = error.name === 'AbortError'
        ? '本次回复已停止。'
        : error.message || '星语助手暂时无法连接，请稍后再试。';
    } finally {
      setBusy(false);
      saveMessages();
      renderMessages();
      abortController = null;
    }
  }

  function clearChat() {
    if (isSending && abortController) {
      abortController.abort();
    }
    messages = [...DEFAULT_MESSAGES];
    saveMessages();
    renderMessages();
  }

  function toggleFloatingChat(forceOpen) {
    const root = document.getElementById('aiChatFloat');
    if (!root) return;
    const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : !root.classList.contains('open');
    root.classList.toggle('open', shouldOpen);
    if (shouldOpen) {
      const input = root.querySelector('[data-ai-input]');
      setTimeout(() => input?.focus(), 80);
    }
  }

  function bindPanel(panel) {
    const form = panel.querySelector('[data-ai-form]');
    const input = panel.querySelector('[data-ai-input]');

    form?.addEventListener('submit', (event) => {
      event.preventDefault();
      sendMessage((input?.value || '').trim());
    });

    input?.addEventListener('input', () => {
      resizeInput(input);
      syncInputs(input);
    });

    input?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage(input.value.trim());
      }
    });

    panel.querySelector('[data-ai-action="clear"]')?.addEventListener('click', clearChat);
    panel.querySelector('[data-ai-action="close"]')?.addEventListener('click', () => toggleFloatingChat(false));
  }

  function init() {
    getPanels().forEach(bindPanel);
    renderMessages();

    document.getElementById('aiChatFloatButton')?.addEventListener('click', () => toggleFloatingChat());

    window.openPrimaryAIAssistant = () => toggleFloatingChat(true);
    window.toggleChatPopup = (forceOpen) => toggleFloatingChat(forceOpen);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
