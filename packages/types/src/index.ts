export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface ChatConfig {
  title?: string;
  primaryColor?: string;
  secondaryColor?: string;
  logoUrl?: string;
}

export type WidgetStatus = 'online' | 'offline' | 'maintenance';

export interface ChatResponse {
  message: ChatMessage;
}
