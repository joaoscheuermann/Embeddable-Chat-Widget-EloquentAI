import { useEffect, useMemo } from 'react';

import { useChatStream } from '../queries/useChatStream';
import { EMessageStatus, useChatStore } from '../stores/useChatStore';

export function useChat() {
  const { messages, addMessage, updateMessage, clearMessages } = useChatStore();

  const lastUserMessage = useMemo(() => messages.findLast((m) => m.sender === 'user') ?? null, [messages]);
  const lastBotMessage = useMemo(() => messages.findLast((m) => m.sender === 'bot') ?? null, [messages]);
  const lastUserMessageText = useMemo(() => lastUserMessage?.text ?? null, [lastUserMessage]);

  const { data, isFetching, isFetched } = useChatStream(lastUserMessageText);

  useEffect(() => {
    if (data && lastBotMessage && isFetching) {
      updateMessage({ ...lastBotMessage, text: data.join(''), status: EMessageStatus.FETCHING });
    }
  }, [data]);

  useEffect(() => {
    if (isFetched && lastBotMessage) {
      updateMessage({ ...lastBotMessage, status: EMessageStatus.COMPLETED });
    }
  }, [isFetched]);

  const sendMessage = async (content: string) => {
    addMessage({ id: crypto.randomUUID(), text: content, sender: 'user', status: EMessageStatus.COMPLETED });
    addMessage({ id: crypto.randomUUID(), text: '', sender: 'bot', status: EMessageStatus.THINKING });
  };

  return { messages, sendMessage, clearMessages };
}
