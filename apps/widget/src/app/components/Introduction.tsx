import { ChatBubbleIcon } from '@radix-ui/react-icons';
import { Flex, Box, Text } from '@radix-ui/themes';

export const Introduction = () => {
  return (
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
  );
};
