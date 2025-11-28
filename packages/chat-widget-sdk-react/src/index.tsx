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
    const widget = new EloquentAIChatWidget();

    (widget as any).id = props.id;
    (widget as any).title = props.title;
    (widget as any).accentColor = props.accentColor;
    (widget as any).secondaryColor = props.secondaryColor;
    (widget as any).logoUrl = props.logoUrl;

    document.body.prepend(widget);

    return () => {
      document.body.removeChild(widget);
    };
  }, []);

  return null;
}
