import { AnimatePresence, motion } from 'motion/react';

export default function Typewriter({ text }: { text: string }) {
  const characters = text.split('');

  console.log(text, characters);

  return (
    <AnimatePresence>
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
    </AnimatePresence>
  );
}
