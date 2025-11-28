import { useCallback, useEffect, useState } from 'react';

import { Flex, Theme } from '@radix-ui/themes';
import { usePostMessage } from '@ui/hooks';
import { ChatConfig, WidgetMessage } from '@eloquentai/types';

function App() {
  const [config, setConfig] = useState<ChatConfig | null>(null);

  const handleMessage = useCallback((event: WidgetMessage) => {
    switch (event.type) {
      case 'iframe:config':
        setConfig(event.payload);
        break;

      default:
        break;
    }
  }, []);

  const { sendMessage } = usePostMessage(handleMessage);

  useEffect(() => {
    sendMessage(
      { type: 'iframe:initialized', payload: null },
      window.parent,
      '*'
    );
  }, []);

  if (!config) return null;

  return (
    <Theme>
      <Flex>Foo</Flex>
    </Theme>
  );
}

export default App;
