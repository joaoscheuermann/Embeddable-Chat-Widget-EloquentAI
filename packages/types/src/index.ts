import { ComponentProps } from 'react';
import { Theme } from '@radix-ui/themes';

export interface IChatConfig {
  id: string;
  title?: string;
  accentColor?: ComponentProps<typeof Theme>['accentColor'];
  secondaryColor?: ComponentProps<typeof Theme>['grayColor'];
  logoUrl?: string;
}

export type TWidgetStatus = 'online' | 'offline' | 'maintenance';

export interface IServiceStatus {
  status: TWidgetStatus;
}

export type TWidgetMessageType = 'iframe:close_window' | 'iframe:initialized' | 'iframe:config';

export interface IWidgetMessage {
  type: TWidgetMessageType;
  payload?: any;
}
