// 星语助手聊天功能
document.addEventListener('DOMContentLoaded', function() {
    initializeXingyuAssistant();
});

function initializeXingyuAssistant() {
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');
    const clearChatBtn = document.getElementById('clearChat');
    const voiceToggle = document.getElementById('voiceToggle');
    const functionButtons = document.querySelectorAll('.function-btn');
    const suggestionButtons = document.querySelectorAll('.suggestion-btn');

    // 发送消息
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;

        // 添加用户消息
        addMessage(message, 'user');
        
        // 清空输入框
        chatInput.value = '';
        
        // 模拟AI回复
        setTimeout(() => {
            generateAIResponse(message);
        }, 1000);
    }

    // 添加消息到聊天区域
    function addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.textContent = sender === 'user' ? '👤' : '🤖';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        if (typeof content === 'string') {
            const p = document.createElement('p');
            p.textContent = content;
            contentDiv.appendChild(p);
        } else {
            contentDiv.appendChild(content);
        }
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        chatMessages.appendChild(messageDiv);
        
        // 滚动到底部
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // 生成AI回复
    function generateAIResponse(userMessage) {
        const responses = {
            '情绪波动': "我理解您对孩子情绪波动的担心。建议您可以尝试以下方法：\n\n1. **建立预测性环境**：保持日常作息的规律性\n2. **情绪识别训练**：使用情绪卡片帮助孩子识别和表达情绪\n3. **感官调节**：提供适当的感官输入，如压力球、weighted blanket等\n4. **正向行为支持**：关注积极行为，给予及时强化\n\n如果情绪波动持续或加剧，建议咨询专业治疗师。",
            
            '社交技能': "改善社交技能需要循序渐进的方法：\n\n1. **结构化社交训练**：从一对一互动开始\n2. **社交故事**：使用视觉支持工具预演社交情境\n3. **游戏技能培养**：通过共同游戏建立互动基础\n4. **同伴支持**：安排与理解特殊需求的同伴互动\n5. **逐步泛化**：从熟悉环境向多样化环境过渡\n\n建议记录孩子的社交进展，这有助于调整训练策略。",
            
            '感统训练': "家庭感统训练可以从以下几个方面入手：\n\n**前庭觉训练**：
- 秋千、滑梯活动
- 旋转游戏（如转椅）
- 跳跃活动\n\n**本体觉训练**：
- 推拉重物
- 攀爬活动
- 关节挤压\n\n**触觉训练**：
- 不同质地的材料探索
- 沙盘游戏
- 水疗活动\n\n建议在专业指导下进行，注意安全。",
            
            'IEP计划': "制定IEP计划需要考虑以下要素：\n\n1. **全面评估**：了解孩子的优势和挑战领域\n2. **SMART目标**：具体、可测量、可达成、相关、时限性\n3. **个性化策略**：基于孩子的兴趣和学习风格\n4. **团队协作**：家长、教师、治疗师共同参与\n5. **定期评估**：每月或每季度调整计划\n6. **数据记录**：追踪目标达成情况\n\n我可以帮您制定更具体的IEP目标，请告诉我孩子的具体情况。"
        };

        // 检查是否有预设回复
        let response = null;
        for (const key in responses) {
            if (userMessage.includes(key)) {
                response = responses[key];
                break;
            }
        }

        // 如果没有预设回复，使用通用回复
        if (!response) {
            response = generateGenericResponse(userMessage);
        }

        addMessage(response, 'assistant');
    }

    // 生成通用回复
    function generateGenericResponse(message) {
        const genericResponses = [
            "感谢您的问题。基于我的专业知识，我建议您考虑以下方面：",
            "我理解您的关切。让我为您提供一些专业建议：",
            "这是一个很好的问题。根据最佳实践，我建议：",
            "我注意到您的需求。以下是一些可能有帮助的建议："
        ];

        const randomResponse = genericResponses[Math.floor(Math.random() * genericResponses.length)];
        return `${randomResponse}\n\n我会继续学习更多相关知识来为您提供更好的支持。如果您需要更具体的建议，请告诉我更多细节。`;
    }

    // 事件监听器
    sendButton.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // 清空聊天
    clearChatBtn.addEventListener('click', function() {
        if (confirm('确定要清空聊天记录吗？')) {
            chatMessages.innerHTML = `
                <div class="message assistant-message">
                    <div class="message-avatar">🤖</div>
                    <div class="message-content">
                        <p>您好！我是星语助手，专业自闭症支持AI伙伴。我可以为您提供：</p>
                        <ul>
                            <li>个性化干预建议</li>
                            <li>专业知识解答</li>
                            <li>进展跟踪指导</li>
                            <li>紧急情况支持</li>
                        </ul>
                        <p>有什么可以帮助您的吗？</p>
                    </div>
                </div>
            `;
        }
    });

    // 语音功能（模拟）
    voiceToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        const isActive = this.classList.contains('active');
        this.textContent = isActive ? '🔴' : '🎤';
        
        if (isActive) {
            addMessage('语音输入已开启，请对着麦克风说话。', 'assistant');
        } else {
            addMessage('语音输入已关闭。', 'assistant');
        }
    });

    // 功能按钮
    functionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const functionType = this.dataset.function;
            const functionMessages = {
                'assessment': '我来为您提供专业的评估指导。请告诉我孩子的具体情况，包括年龄、主要表现等。',
                'intervention': '让我为您制定个性化的干预建议。请描述孩子目前的挑战和需求。',
                'knowledge': '我拥有丰富的自闭症相关知识，您想了解哪个方面的内容？',
                'emergency': '我理解您可能遇到了紧急情况。请详细描述当前情况，我会提供immediate support建议。',
                'progress': '进展跟踪很重要！请告诉我您想追踪哪个方面的进展，我会帮您制定监测计划。',
                'resources': '我来为您推荐适合的资源，包括工具、机构、书籍等。请告诉我您的具体需求。'
            };

            addMessage(functionMessages[functionType], 'assistant');
        });
    });

    // 快速建议按钮
    suggestionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const question = this.dataset.question;
            chatInput.value = question;
            sendMessage();
        });
    });

    // 模拟实时响应
    setInterval(() => {
        const statusIndicator = document.querySelector('.status-indicator');
        if (statusIndicator) {
            statusIndicator.style.opacity = Math.random() > 0.5 ? '1' : '0.7';
        }
    }, 2000);
}

// 导出函数供其他模块使用
window.XingyuAssistant = {
    initializeXingyuAssistant,
    addMessage: function(content, sender) {
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}-message`;
            
            const avatarDiv = document.createElement('div');
            avatarDiv.className = 'message-avatar';
            avatarDiv.textContent = sender === 'user' ? '👤' : '🤖';
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'message-content';
            
            if (typeof content === 'string') {
                const p = document.createElement('p');
                p.textContent = content;
                contentDiv.appendChild(p);
            } else {
                contentDiv.appendChild(content);
            }
            
            messageDiv.appendChild(avatarDiv);
            messageDiv.appendChild(contentDiv);
            
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
};