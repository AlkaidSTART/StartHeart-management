// 星语助手功能增强
document.addEventListener("DOMContentLoaded", function () {
  // 获取聊天相关元素
  const chatMessages = document.querySelector(".chat-messages");
  const chatTextarea = document.querySelector(".chat-textarea");
  const sendButton = document.querySelector(".send-button");
  const clearChatButton = document.getElementById("clear-chat");
  const typingIndicator = document.getElementById("typing-indicator");

  // 发送消息函数
  function sendMessage() {
    const message = chatTextarea.value.trim();
    if (message) {
      // 添加用户消息
      addMessage(message, "user");
      chatTextarea.value = "";

      // 显示正在输入指示器
      typingIndicator.style.display = "flex";

      // 模拟AI回复（实际应用中应调用API）
      setTimeout(() => {
        typingIndicator.style.display = "none";
        addMessage(getAIResponse(message), "assistant");
      }, 1500);
    }
  }

  // 添加消息到聊天界面
  function addMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}`;

    const now = new Date();
    const timeString = `${now.getHours()}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    messageDiv.innerHTML = `
      <div class="message-avatar">
        <div class="avatar-circle">
          <span>${sender === "user" ? "👤" : "🤖"}</span>
        </div>
      </div>
      <div class="message-content">
        <div class="message-bubble">
          <p>${text}</p>
        </div>
        <div class="message-time">${timeString}</div>
      </div>
    `;

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // 简单的AI回复生成函数（实际应用中应连接到真正的AI API）
  function getAIResponse(userMessage) {
    const responses = [
      "感谢您的提问。关于自闭症，我可以为您提供专业的信息和建议。",
      "这是一个很好的问题。根据我的知识库，我建议您关注以下几个方面...",
      "我理解您的关切。对于这类问题，通常的建议是...",
      "关于您提到的内容，我可以分享一些相关的研究和实践案例...",
      "您的问题很有意义。让我为您提供一些实用的指导...",
    ];

    // 根据用户消息内容提供更相关的回复
    if (userMessage.includes("基础") || userMessage.includes("什么")) {
      return "自闭症是一种神经发育障碍，主要表现为社交沟通困难和重复刻板行为。早期识别和干预非常重要。";
    } else if (userMessage.includes("干预") || userMessage.includes("治疗")) {
      return "常见的干预方法包括应用行为分析(ABA)、言语治疗、职业治疗等。每个孩子的情况不同，需要个性化的干预计划。";
    } else if (userMessage.includes("家庭") || userMessage.includes("支持")) {
      return "家庭支持对自闭症儿童的成长至关重要。建议家长学习相关知识，保持耐心，建立规律的生活环境，并寻求专业团队的支持。";
    } else {
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }

  // 事件监听器
  sendButton.addEventListener("click", sendMessage);

  chatTextarea.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  clearChatButton.addEventListener("click", function () {
    if (confirm("确定要清空聊天记录吗？")) {
      chatMessages.innerHTML = "";
      addWelcomeMessages();
    }
  });

  // 添加欢迎消息
  function addWelcomeMessages() {
    const welcomeMessages = `
      <div class="message system">
        <div class="message-avatar">
          <div class="avatar-circle">
            <span>🤖</span>
          </div>
        </div>
        <div class="message-content">
          <div class="message-bubble">
            <p>
              欢迎使用星语助手，我可以为您解答关于自闭症的问题，或帮助记录孩子的行为观察。
            </p>
          </div>
          <div class="message-time">刚刚</div>
        </div>
      </div>
      <div class="message assistant">
        <div class="message-avatar">
          <div class="avatar-circle">
            <span>🤖</span>
          </div>
        </div>
        <div class="message-content">
          <div class="message-bubble">
            <p>您可以向我询问以下方面的问题：</p>
            <ul class="suggestion-list">
              <li class="suggestion-item">自闭症基础知识</li>
              <li class="suggestion-item">干预方法咨询</li>
              <li class="suggestion-item">行为观察记录</li>
              <li class="suggestion-item">家庭支持建议</li>
            </ul>
          </div>
          <div class="message-time">刚刚</div>
        </div>
      </div>
    `;
    chatMessages.innerHTML = welcomeMessages;

    // 重新绑定建议项点击事件
    bindSuggestionEvents();
  }

  // 绑定建议项点击事件
  function bindSuggestionEvents() {
    const suggestionItems = document.querySelectorAll(".suggestion-item");
    suggestionItems.forEach((item) => {
      item.addEventListener("click", function () {
        chatTextarea.value = this.textContent;
        chatTextarea.focus();
      });
    });
  }

  // 初始化时绑定建议项事件
  bindSuggestionEvents();

  // 初始化时滚动到底部
  chatMessages.scrollTop = chatMessages.scrollHeight;
});
