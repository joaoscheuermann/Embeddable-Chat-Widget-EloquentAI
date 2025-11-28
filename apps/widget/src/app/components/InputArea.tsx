import { useState } from 'react';

import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Flex, TextField, IconButton } from '@radix-ui/themes';

export interface InputAreaProps {
  onSendMessage: (text: string) => void;
}

export function InputArea({ onSendMessage }: InputAreaProps) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSendMessage(text);
      setText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <Flex p="3">
      <TextField.Root
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        size="3"
        className="flex-grow"
        radius="full"
      >
        <TextField.Slot side="right" pl="1" pr="1">
          <IconButton
            size="2"
            variant="solid"
            onClick={handleSend}
            radius="full"
            disabled={text.trim() === ''}
          >
            <ArrowUpIcon />
          </IconButton>
        </TextField.Slot>
      </TextField.Root>
    </Flex>
  );
}
