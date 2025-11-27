import { render } from '@testing-library/react';

import EloquentaiChatWidgetSdk from './chat-widget-sdk';

describe('EloquentaiChatWidgetSdk', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EloquentaiChatWidgetSdk />);
    expect(baseElement).toBeTruthy();
  });
});
