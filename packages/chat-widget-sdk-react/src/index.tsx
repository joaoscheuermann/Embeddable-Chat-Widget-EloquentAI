/// <reference lib="dom" />
import { useEffect } from 'react';

import {
  EloquentAIChatWidget,
  defineWidgetEloquentAIChatWidgetComponent,
  WidgetProps,
} from '@eloquentai/chat-widget-sdk';

defineWidgetEloquentAIChatWidgetComponent();

export type ChatWidgetProps = WidgetProps;

export function ChatWidget(props: ChatWidgetProps) {
  useEffect(() => {
    const widget = new EloquentAIChatWidget(props);

    document.body.prepend(widget);

    return () => {
      document.body.removeChild(widget);
    };
  }, []);

  return null;
}
