import { create } from 'zustand';
import { ChatMessage, ChatResponse } from '@eloquentai/types';

interface ChatState {
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  setMessages: (messages: ChatMessage[]) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  setMessages: (msgs) => set({ messages: msgs }),
}));

export function useChat() {
  const { messages, addMessage } = useChatStore();

  const sendMessage = async (content: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: Date.now(),
    };
    addMessage(userMsg);

    try {
      const res = await fetch('http://localhost:3333/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content }),
      });
      const data: ChatResponse = await res.json();
      addMessage(data.message);
    } catch (error) {
      console.error('Failed to send message', error);
      // Add error message handling if needed
    }
  };

  return { messages, sendMessage };
}
