import { ComponentProps } from 'react';
import { Theme } from '@radix-ui/themes';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface ChatConfig {
  id: string;
  title?: string;
  accentColor?: ComponentProps<typeof Theme>['accentColor'];
  secondaryColor?: ComponentProps<typeof Theme>['grayColor'];
  logoUrl?: string;
}

export type WidgetStatus = 'online' | 'offline' | 'maintenance';

export interface ChatResponse {
  message: ChatMessage;
}

export type WidgetMessageType = 'iframe:close_window' | 'iframe:initialized' | 'iframe:config';

export interface WidgetMessage {
  type: WidgetMessageType;
  payload?: any;
}
