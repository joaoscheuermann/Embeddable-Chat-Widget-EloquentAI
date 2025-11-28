import { Flex, Text, Link } from '@radix-ui/themes';
import { LightningBoltIcon } from '@radix-ui/react-icons';

export function Footer() {
  return (
    <Flex
      justify="center"
      align="center"
      p="2"
      style={{ opacity: 0.5 }}
      className="border-t border-gray-200 bg-gray-100"
    >
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
    </Flex>
  );
}
