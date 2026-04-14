(function () {
  'use strict';

  const CHAT_MARGIN = 12;

  function fallbackToast(message) {
    const existing = document.querySelector('.release-toast');
    if (existing) {
      existing.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'release-toast';
    toast.textContent = message;
    toast.style.cssText = [
      'position: fixed',
      'top: 16px',
      'right: 16px',
      'z-index: 11000',
      'padding: 10px 14px',
      'background: #1f2937',
      'color: #fff',
      'border-radius: 8px',
      'font-size: 13px',
      'box-shadow: 0 8px 20px rgba(0,0,0,.18)'
    ].join(';');

    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2200);
  }

  function notify(message, type) {
    if (typeof window.showToast === 'function') {
      try {
        window.showToast(message, type || 'info', 2200);
        return;
      } catch (_) {
        // Ignore and fallback to lightweight toast.
      }
    }
    fallbackToast(message);
  }

  function getPopupSize() {
    const width = Math.min(420, window.innerWidth - CHAT_MARGIN * 2);
    const height = Math.min(640, window.innerHeight - CHAT_MARGIN * 2);
    return { width, height };
  }

  function updateChatPopupAnchor() {
    const popup = document.getElementById('chatPopupOverlay');
    const button = document.getElementById('starBtn');
    if (!popup || !button) {
      return;
    }

    const rect = button.getBoundingClientRect();
    const size = getPopupSize();

    popup.style.width = `${size.width}px`;
    popup.style.height = `${size.height}px`;

    let left = rect.right - size.width;
    left = Math.max(CHAT_MARGIN, Math.min(left, window.innerWidth - size.width - CHAT_MARGIN));

    let top = rect.top - size.height - 10;
    if (top < CHAT_MARGIN) {
      top = Math.min(window.innerHeight - size.height - CHAT_MARGIN, rect.bottom + 10);
    }

    popup.style.left = `${left}px`;
    popup.style.top = `${top}px`;
  }

  function setChatPopupVisible(visible) {
    const popup = document.getElementById('chatPopupOverlay');
    if (!popup) {
      return;
    }

    if (visible) {
      updateChatPopupAnchor();
      popup.classList.add('active');
    } else {
      popup.classList.remove('active');
    }
  }

  window.updateChatPopupAnchor = updateChatPopupAnchor;
  window.toggleChatPopup = function (forceOpen) {
    const popup = document.getElementById('chatPopupOverlay');
    if (!popup) {
      return;
    }

    const currentlyOpen = popup.classList.contains('active');
    if (typeof forceOpen === 'boolean') {
      setChatPopupVisible(forceOpen);
    } else {
      setChatPopupVisible(!currentlyOpen);
    }
  };

  function applyTrainingFilters() {
    const root = document.getElementById('daily-training');
    if (!root) {
      return;
    }

    const age = root.querySelector('.age-filter')?.value || 'all';
    const difficulty = root.querySelector('.difficulty-filter')?.value || 'all';
    const activeTab = root.querySelector('.intervention-tab.active');
    if (!activeTab) {
      return;
    }

    activeTab.querySelectorAll('.intervention-card-enhanced').forEach((card) => {
      const cardAge = card.dataset.age || '';
      const cardDiff = card.dataset.difficulty || '';
      const ageMatch = age === 'all' || cardAge.includes(age);
      const diffMatch = difficulty === 'all' || cardDiff === difficulty;
      card.style.display = ageMatch && diffMatch ? 'flex' : 'none';
    });
  }

  window.switchTrainingTab = function (tabId, btn) {
    const root = document.getElementById('daily-training');
    if (!root) {
      return;
    }

    root.querySelectorAll('.pill-btn').forEach((pill) => {
      const isActive = pill.dataset.tab === tabId;
      pill.classList.toggle('active', isActive);
    });

    root.querySelectorAll('.intervention-tab').forEach((tab) => {
      const isActive = tab.id === tabId;
      tab.classList.toggle('active', isActive);
      tab.style.display = isActive ? 'block' : 'none';
    });

    if (btn && !btn.classList.contains('active')) {
      btn.classList.add('active');
    }

    applyTrainingFilters();
  };

  window.filterTrainingByAge = function () {
    applyTrainingFilters();
  };

  window.filterByDifficulty = function () {
    applyTrainingFilters();
  };

  window.filterKnowledge = function (category, btn) {
    const root = document.getElementById('science-class');
    if (!root) {
      return;
    }

    if (btn) {
      root.querySelectorAll('.pill-btn').forEach((pill) => pill.classList.remove('active'));
      btn.classList.add('active');
    }

    root.querySelectorAll('.method-category').forEach((group) => {
      group.style.display = category === 'all' || group.dataset.cat === category ? 'block' : 'none';
    });
  };

  window.searchKnowledge = function (query) {
    const root = document.getElementById('science-class');
    if (!root) {
      return;
    }

    const keyword = (query || '').toLowerCase().trim();
    const groups = root.querySelectorAll('.method-category');

    groups.forEach((group) => {
      let visibleCount = 0;
      group.querySelectorAll('.knowledge-card').forEach((card) => {
        const text = `${card.dataset.title || ''} ${card.textContent || ''}`.toLowerCase();
        const matched = !keyword || text.includes(keyword);
        card.style.display = matched ? 'flex' : 'none';
        if (matched) {
          visibleCount += 1;
        }
      });
      group.style.display = visibleCount > 0 ? 'block' : 'none';
    });
  };

  window.filterRecovery = function (category, btn) {
    const root = document.getElementById('recovery-notes');
    if (!root) {
      return;
    }

    if (btn) {
      root.querySelectorAll('.pill-btn').forEach((pill) => pill.classList.remove('active'));
      btn.classList.add('active');
    }

    root.querySelectorAll('.recovery-card').forEach((card) => {
      card.style.display = category === 'all' || card.dataset.cate === category ? 'flex' : 'none';
    });
  };

  window.searchRecovery = function (query) {
    const root = document.getElementById('recovery-notes');
    if (!root) {
      return;
    }

    const keyword = (query || '').toLowerCase().trim();
    root.querySelectorAll('.recovery-card').forEach((card) => {
      const text = `${card.dataset.title || ''} ${card.textContent || ''}`.toLowerCase();
      card.style.display = !keyword || text.includes(keyword) ? 'flex' : 'none';
    });
  };

  window.showDownloadNotification = function (resourceName) {
    if (window.event && typeof window.event.preventDefault === 'function') {
      window.event.preventDefault();
    }
    const name = resourceName || 'resource';
    notify(`已开始准备下载：${name}`, 'success');
  };

  window.logout = function () {
    const shouldLogout = window.confirm('确认退出登录吗？');
    if (!shouldLogout) {
      return;
    }

    setChatPopupVisible(false);
    if (typeof window.openLoginModal === 'function') {
      window.openLoginModal();
    }
    notify('您已退出登录。', 'info');
  };

  function bindGlobalEvents() {
    window.addEventListener('resize', () => {
      const popup = document.getElementById('chatPopupOverlay');
      if (popup && popup.classList.contains('active')) {
        updateChatPopupAnchor();
      }
    });

    window.addEventListener('scroll', () => {
      const popup = document.getElementById('chatPopupOverlay');
      if (popup && popup.classList.contains('active')) {
        updateChatPopupAnchor();
      }
    }, { passive: true });

    document.addEventListener('click', (event) => {
      const popup = document.getElementById('chatPopupOverlay');
      const float = document.getElementById('starAssistantFloat');
      if (!popup || !popup.classList.contains('active')) {
        return;
      }

      if (popup.contains(event.target)) {
        return;
      }

      if (float && float.contains(event.target)) {
        return;
      }

      setChatPopupVisible(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        setChatPopupVisible(false);
      }
    });
  }

  function initializeDefaultStates() {
    const defaultTrainingTab = document.querySelector('#daily-training .pill-btn.active')?.dataset.tab || 'self-care';
    window.switchTrainingTab(defaultTrainingTab);
  }

  function init() {
    bindGlobalEvents();
    initializeDefaultStates();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
