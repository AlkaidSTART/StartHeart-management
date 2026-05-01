import 'dotenv/config';
import express from 'express';
import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

const app = express();
const port = Number(process.env.PORT || 3000);
const modelName = process.env.OPENAI_MODEL || 'gpt-4o-mini';

app.use(express.json({ limit: '1mb' }));
app.use(express.static(process.cwd()));

app.post('/api/chat', async (req, res) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      res.status(500).json({ error: 'OPENAI_API_KEY is not configured.' });
      return;
    }

    const messages = Array.isArray(req.body?.messages) ? req.body.messages : [];
    const cleanMessages = messages
      .filter((message) => ['user', 'assistant'].includes(message?.role) && typeof message?.content === 'string')
      .slice(-20)
      .map((message) => ({
        role: message.role,
        content: message.content.slice(0, 4000),
      }));

    if (cleanMessages.length === 0) {
      res.status(400).json({ error: 'messages is required.' });
      return;
    }

    const openai = createOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const result = streamText({
      model: openai(modelName),
      system: [
        '你是“星语助手”，面向自闭症儿童家庭的专业、温和、谨慎的 AI 支持伙伴。',
        '你可以提供科普、家庭训练建议、沟通支持和就医准备建议。',
        '涉及诊断、治疗、用药、急症或风险评估时，明确建议咨询合格医生或专业机构。',
        '回答使用简体中文，结构清晰，语气亲切，避免夸大承诺。',
      ].join('\n'),
      messages: cleanMessages,
      temperature: 0.4,
    });

    result.pipeTextStreamToResponse(res);
  } catch (error) {
    console.error('Chat API error:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'AI assistant request failed.' });
    }
  }
});

app.listen(port, () => {
  console.log(`SmartHeart app is running at http://localhost:${port}`);
});
