import '@radix-ui/themes/styles.css';

import { useCallback, useEffect, useState } from 'react';

import { Avatar, Flex, Link, Theme, Text } from '@radix-ui/themes';
import { usePostMessage } from '@ui/hooks';
import { IChatConfig, IWidgetMessage } from '@eloquentai/types';

import * as Chat from '../components/Chat';

import useCurrentServiceStatusQuery from '../queries/useCurentServiceStatusQuery';

import { ChatBubbleIcon, LightningBoltIcon } from '@radix-ui/react-icons';
import { Introduction } from '../components/Introduction';

function App() {
  const [config, setConfig] = useState<IChatConfig | null>(null);
  const [messages, setMessages] = useState<
    Array<{ id: string; text: string; sender: 'user' | 'bot' }>
  >([]);

  const { data: serviceStatus } = useCurrentServiceStatusQuery();

  const handleMessage = useCallback((event: IWidgetMessage) => {
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
  const isMaintenance = serviceStatus?.status === 'maintenance';

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
      <Chat.Wrapper>
        <Chat.Header
          title={title}
          icon={
            <Avatar
              size="2"
              fallback={<ChatBubbleIcon width="16" height="16" />}
              radius="full"
              variant="solid"
            />
          }
        />
        <Chat.Separator />
        <Chat.Content>
          <Chat.Messages>
            <Introduction />

            <Chat.UserBubble>asdasd</Chat.UserBubble>
            <Chat.BotBubble>asdasd</Chat.BotBubble>
            <Chat.BotBubble>asdasd</Chat.BotBubble>
            <Chat.BotBubble>asdasd</Chat.BotBubble>
            <Chat.BotBubble>asdasd</Chat.BotBubble>
            <Chat.BotBubble>asdasd</Chat.BotBubble>
            <Chat.BotBubble>asdasd</Chat.BotBubble>
            <Chat.BotBubble>asdasd</Chat.BotBubble>
            <Chat.BotBubble>asdasd</Chat.BotBubble>
            <Chat.BotBubble>asdasd</Chat.BotBubble>
            <Chat.BotBubble>asdasd</Chat.BotBubble>
            <Chat.BotBubble>asdasd</Chat.BotBubble>
            <Chat.BotBubble>asdasd</Chat.BotBubble>
          </Chat.Messages>

          {isMaintenance && (
            <Chat.Banner>
              Service is under maintenance. Please try again later.
            </Chat.Banner>
          )}
          <Chat.Input
            onSendMessage={handleSendMessage}
            disabled={isMaintenance}
          />
        </Chat.Content>
        <Chat.Separator />
        <Chat.Footer>
          <Link
            href="https://www.eloquentai.co/"
            target="_blank"
            rel="noopener noreferrer"
            color="gray"
            highContrast
          >
            <Flex align="center" gap="2">
              <LightningBoltIcon width="12" height="12" />
              <Text size="1">Powered by EloquentAI</Text>
            </Flex>
          </Link>
        </Chat.Footer>
      </Chat.Wrapper>
    </Theme>
  );
}

export default App;
