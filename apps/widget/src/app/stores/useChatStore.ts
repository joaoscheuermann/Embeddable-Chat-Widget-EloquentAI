import { create } from "zustand";

export enum EMessageStatus {
    THINKING = 'thinking',
    FETCHING = 'fetching',
    COMPLETED = 'completed',
    ERROR = 'error',
}

export interface IChatMessage {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    status: EMessageStatus;
}

export interface ChatState {
    messages: IChatMessage[];
    addMessage: (message: IChatMessage) => void;
    setMessages: (messages: IChatMessage[]) => void;
    updateMessage: (message: IChatMessage) => void;
    clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
    messages: [],
    addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
    updateMessage: (msg) => set((state) => ({ messages: state.messages.map((m) => (m.id === msg.id ? msg : m)) })),
    setMessages: (msgs) => set({ messages: msgs }),
    clearMessages: () => set({ messages: [] }),
}));