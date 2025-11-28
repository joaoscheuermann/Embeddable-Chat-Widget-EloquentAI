import { Flex, ScrollArea, Text, Box } from '@radix-ui/themes';
import { ChatBubbleIcon } from '@radix-ui/react-icons';
import { MessageBubble } from './MessageBubble';
import { useEffect, useRef } from 'react';

interface MessageListProps {
  messages: Array<{ id: string; text: string; sender: 'user' | 'bot' }>;
}

export function MessageList({ messages }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollViewportRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Scroll on initial load and when messages change
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const viewport = scrollViewportRef.current?.querySelector(
      '[data-radix-scroll-area-viewport]'
    );

    if (!viewport) return;

    const observer = new ResizeObserver(() => {
      scrollToBottom();
    });

    observer.observe(viewport.children[0] as Element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <ScrollArea
      type="always"
      scrollbars="vertical"
      className="flex-grow-1 h-full"
      ref={scrollViewportRef}
    >
      <Flex
        direction="column"
        align="center"
        justify="center"
        flexGrow="1"
        gap="4"
        p="4"
      >
        <Box className="bg-[var(--accent-9)] p-3 rounded-lg">
          <ChatBubbleIcon width="32" height="32" color="white" />
        </Box>
        <Flex direction="column" align="center" gap="1">
          <Text weight="bold" size="3">
            Eloquent AI responds instantly
          </Text>
          <Text size="2" color="gray">
            Ask me anything
          </Text>
        </Flex>
      </Flex>

      <Flex direction="column" gap="3" p="3">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </Flex>
    </ScrollArea>
  );
}
