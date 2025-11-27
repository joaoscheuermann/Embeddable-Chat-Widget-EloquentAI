/// <reference lib="dom" />

import { useState } from 'react';
import styles from './styles.css?inline';
import radixStyles from '@radix-ui/themes/styles.css?inline';

import reactToWebComponent from '@r2wc/react-to-web-component';

import { Box, Flex, IconButton, Section, Theme } from '@radix-ui/themes';
import { ChatBubbleIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { motion } from 'motion/react';

import { useStyles } from './hooks/useStyles';
import { Iframe } from './Iframe';

import { ChatConfig } from '@eloquentai/types';

const WIDGET_TAG_NAME = 'chat-widget';

interface InternalWidgetProps extends ChatConfig {
  container: DocumentFragment;
}

export type WidgetProps = Omit<InternalWidgetProps, 'container'>;

export function WidgetComponent({ container, ...config }: InternalWidgetProps) {
  // Initialize the styles inside the shadow DOM;
  useStyles([styles, radixStyles], container);

  const [isChatWindowOpen, setIsChatWindowOpen] = useState(false);

  return (
    <Theme
      style={{
        display: 'flex',
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 999,
        height: 'fit-content',
        width: 'fit-content',
        minHeight: 0,
      }}
    >
      <Flex direction="column" justify="end" align="end" gap="20px">
        <motion.div
          initial="closed"
          animate={isChatWindowOpen ? 'open' : 'closed'}
          variants={{
            open: { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto' },
            closed: { opacity: 0, y: 20, scale: 0.95, pointerEvents: 'none' },
          }}
          transition={{ duration: 0.1 }}
        >
          <Box className="w-[400px] h-[600px] rounded-xl bg-gray-50 overflow-hidden shadow-sm">
            <Iframe src="http://localhost:4200" />
          </Box>
        </motion.div>

        <IconButton
          className="cursor-pointer"
          size="4"
          variant="solid"
          radius="full"
          onClick={() => setIsChatWindowOpen((state) => !state)}
        >
          {isChatWindowOpen ? (
            <ChevronDownIcon color="white" />
          ) : (
            <ChatBubbleIcon color="white" />
          )}
        </IconButton>
      </Flex>
    </Theme>
  );
}

export const EloquentAIChatWidget = reactToWebComponent(WidgetComponent, {
  shadow: 'open',
});

/**
 * Defines the custom element for the Eloquent AI Chat Widget if it hasn't been defined already.
 */
export const defineWidgetEloquentAIChatWidgetComponent = () => {
  if (customElements.get(WIDGET_TAG_NAME)) return;

  customElements.define(WIDGET_TAG_NAME, EloquentAIChatWidget);
};

/**
 * Initializes and mounts the chat widget to the DOM.
 *
 * @param props - Configuration properties for the chat widget
 * @returns The mounted web component instance
 */
export const setupChatWidget = (props: WidgetProps) => {
  defineWidgetEloquentAIChatWidgetComponent();

  const widget = new EloquentAIChatWidget(props);

  document.body.prepend(widget);

  return widget;
};
