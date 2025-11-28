import { Flex, Text, Avatar } from '@radix-ui/themes';
import { ChatBubbleIcon } from '@radix-ui/react-icons';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <Flex align="center" gap="3" p="3" className="border-b border-gray-200">
      <Avatar
        size="2"
        fallback={<ChatBubbleIcon width="16" height="16" />}
        radius="full"
        variant="solid"
      />
      <Text weight="bold" size="3">
        {title}
      </Text>
    </Flex>
  );
}
