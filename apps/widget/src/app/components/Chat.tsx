import {
  ArrowUpIcon,
  ChatBubbleIcon,
  InfoCircledIcon,
} from '@radix-ui/react-icons';
import {
  Avatar,
  Box,
  Callout,
  Flex,
  IconButton,
  ScrollArea,
  Text,
  TextField,
} from '@radix-ui/themes';
import { Inset } from '@radix-ui/themes/dist/cjs/index.js';
import { useEffect, useRef, useState } from 'react';

export const Wrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <Flex
      direction="column"
      flexGrow="1"
      className="overflow-hidden scroll-hidden"
    >
      {children}
    </Flex>
  );
};

export const Header = ({
  title,
  icon,
}: {
  title: string;
  icon?: React.ReactNode;
}) => {
  return (
    <Flex align="center" gap="3" p="3">
      {icon}
      <Text weight="medium" size="3">
        {title}
      </Text>
    </Flex>
  );
};

export const Content = ({ children }: React.PropsWithChildren) => {
  return (
    <Flex
      direction="column"
      flexGrow="1"
      gap="3"
      pb="3"
      className="overflow-hidden scroll-hidden"
    >
      {children}
    </Flex>
  );
};

export interface IChatInputProps {
  onSendMessage: (text: string) => void;
  disabled?: boolean;
}

export const Input = ({ onSendMessage, disabled }: IChatInputProps) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSendMessage(text);
      setText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !disabled) {
      handleSend();
    }
  };

  return (
    <Container>
      <TextField.Root
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        size="3"
        className="flex-grow"
        radius="full"
        disabled={disabled}
      >
        <TextField.Slot side="right" pl="1" pr="1">
          <IconButton
            size="2"
            variant="solid"
            onClick={handleSend}
            radius="full"
            disabled={disabled || text.trim() === ''}
          >
            <ArrowUpIcon />
          </IconButton>
        </TextField.Slot>
      </TextField.Root>
    </Container>
  );
};

export const UserBubble = ({ children }: React.PropsWithChildren) => {
  return (
    <Flex justify="end">
      <Box
        px="3"
        py="2"
        className="bg-[var(--accent-9)] text-white max-w-[80%] rounded-md rounded-br-sm"
      >
        <Text size="2">{children}</Text>
      </Box>
    </Flex>
  );
};

export const BotBubble = ({ children }: React.PropsWithChildren) => {
  return (
    <Flex gap="2" align="end">
      <Avatar
        size="1"
        fallback={<ChatBubbleIcon width="12" height="12" />}
        radius="full"
        variant="solid"
      />
      <Box
        px="3"
        py="2"
        className="
            bg-[var(--gray-4)]
            text-[var(--gray-12)]
            max-w-[80%]
            rounded-md
            rounded-bl-sm
        "
      >
        <Text size="2">{children}</Text>
      </Box>
    </Flex>
  );
};

export const Messages = ({ children }: React.PropsWithChildren) => {
  const end = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    end.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Scroll on initial load and when messages change
    scrollToBottom();
  }, [children]);

  return (
    <ScrollArea
      type="always"
      scrollbars="vertical"
      className="flex-grow-1 h-full"
    >
      <Flex direction="column" gap="3" p="4">
        {children}
        <div ref={end} />
      </Flex>
    </ScrollArea>
  );
};

export const Banner = ({}: React.PropsWithChildren) => {
  return (
    <Container>
      <Callout.Root color="orange" role="alert">
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          Service is under maintenance. Please try again later.
        </Callout.Text>
      </Callout.Root>
    </Container>
  );
};

export const Container = ({ children }: React.PropsWithChildren) => {
  return (
    <Flex gap="3" pl="3" pr="3">
      {children}
    </Flex>
  );
};

export const Footer = ({ children }: React.PropsWithChildren) => {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      p="3"
      className="overflow-hidden scroll-hidden bg-gray-100"
    >
      {children}
    </Flex>
  );
};

export const Separator = () => {
  return <Box className="border-b border-gray-200" />;
};
