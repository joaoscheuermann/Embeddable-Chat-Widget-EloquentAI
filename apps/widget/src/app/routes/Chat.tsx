import '@radix-ui/themes/styles.css';

import { useCallback, useEffect, useState } from 'react';

import { Flex, Theme } from '@radix-ui/themes';
import { usePostMessage } from '@ui/hooks';
import { ChatConfig, WidgetMessage } from '@eloquentai/types';
import { Header } from '../components/Header';
import { MessageList } from '../components/MessageList';
import { InputArea } from '../components/InputArea';
import { Footer } from '../components/Footer';

function App() {
  const [config, setConfig] = useState<ChatConfig | null>(null);
  const [messages, setMessages] = useState<
    Array<{ id: string; text: string; sender: 'user' | 'bot' }>
  >([]);

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

  const handleSendMessage = (text: string) => {
    const newMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user' as const,
    };
    setMessages((prev) => [...prev, newMessage]);

    // Simulate bot response for now
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "I'm a bot response!",
          sender: 'bot',
        },
      ]);
    }, 1000);
  };

  if (!config) return null;

  const title = config.title || 'Eloquent AI';

  return (
    <Theme
      style={{
        height: '100%',
        maxHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      accentColor={config.accentColor}
    >
      <Flex
        direction="column"
        flexGrow="1"
        className="overflow-hidden scroll-hidden"
      >
        <Header title={title} />
        <MessageList messages={messages} />
        <InputArea onSendMessage={handleSendMessage} />
        <Footer />
      </Flex>
    </Theme>
  );
}

export default App;
