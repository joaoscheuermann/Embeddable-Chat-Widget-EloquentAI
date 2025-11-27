import express from 'express';
import cors from 'cors';
import { ChatMessage, ChatResponse, WidgetStatus } from '@eloquentai/types';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/status', (req, res) => {
  const status: WidgetStatus = 'online';
  res.json({ status });
});

app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  
  // Mock delay
  setTimeout(() => {
    const responseMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `Echo: ${message}`,
      timestamp: Date.now(),
    };
    
    const response: ChatResponse = {
      message: responseMessage
    };

    res.json(response);
  }, 1000);
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
