import { Flex, Text, Avatar, Box } from '@radix-ui/themes';
import { ChatBubbleIcon } from '@radix-ui/react-icons';

interface MessageBubbleProps {
  message: {
    id: string;
    text: string;
    sender: 'user' | 'bot';
  };
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === 'user';

  return (
    <Flex gap="2" direction={isUser ? 'row-reverse' : 'row'} align="end">
      {!isUser && (
        <Avatar
          size="1"
          fallback={<ChatBubbleIcon width="12" height="12" />}
          radius="full"
          variant="solid"
        />
      )}
      <Box
        style={{
          backgroundColor: isUser ? 'var(--accent-9)' : 'var(--gray-4)',
          color: isUser ? 'white' : 'var(--gray-12)',
          padding: 'var(--space-2) var(--space-3)',
          borderRadius: 'var(--radius-3)',
          maxWidth: '80%',
          borderBottomRightRadius: isUser
            ? 'var(--radius-1)'
            : 'var(--radius-3)',
          borderBottomLeftRadius: !isUser
            ? 'var(--radius-1)'
            : 'var(--radius-3)',
        }}
      >
        <Text size="2">{message.text}</Text>
      </Box>
    </Flex>
  );
}
