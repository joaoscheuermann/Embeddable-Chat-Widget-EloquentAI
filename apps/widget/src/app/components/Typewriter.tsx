import { Flex } from '@radix-ui/themes';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo } from 'react';

export default function Typewriter({ text }: { text: string }) {
  const characters = useMemo(() => text.split(''), [text]);

  return (
    <AnimatePresence mode="popLayout">
      <Flex>
        {characters.map((char, index) => (
          <motion.span
            initial={{ display: 'none', opacity: 0 }}
            animate={{ display: 'inline', opacity: 1 }}
            exit={{ display: 'none', opacity: 0 }}
            transition={{ delay: index * 0.01 }}
            key={index}
            layout
          >
            {char}
          </motion.span>
        ))}
      </Flex>
    </AnimatePresence>
  );
}
