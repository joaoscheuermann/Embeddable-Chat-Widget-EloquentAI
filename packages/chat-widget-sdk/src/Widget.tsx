/// <reference lib="dom" />

import { useState, useRef, useCallback, useMemo } from 'react';
import styles from './styles.css?inline';
import radixStyles from '@radix-ui/themes/styles.css?inline';

import reactToWebComponent from '@r2wc/react-to-web-component';

import { usePostMessage } from '@ui/hooks';
import { ChatConfig, WidgetMessage } from '@eloquentai/types';

import { AnimatePresence, motion } from 'motion/react';
import { Box, Flex, IconButton, Theme } from '@radix-ui/themes';
import { ChatBubbleIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Iframe } from './components/Iframe';
import { useStyles } from './hooks/useStyles';
import { ServiceStatus } from './components/ServiceStatus';

const WIDGET_TAG_NAME = 'chat-widget';

interface InternalWidgetProps extends ChatConfig {
  container: DocumentFragment;
}

export type WidgetProps = Omit<InternalWidgetProps, 'container'>;

export function WidgetComponent({ container, ...config }: InternalWidgetProps) {
  const widgetUrl = import.meta.env.DEV
    ? `http://localhost:4200/${config.id}`
    : `http://localhost:4200/${config.id}`;

  const queryClient = useMemo(() => new QueryClient(), []);

  // Initialize the styles inside the shadow DOM;
  useStyles([styles, radixStyles], container);

  const iframe = useRef<HTMLIFrameElement>(null);

  const [isChatWindowOpen, setIsChatWindowOpen] = useState(false);

  const handleMessage = useCallback((event: WidgetMessage) => {
    switch (event.type) {
      case 'iframe:initialized':
        sendMessage(
          { type: 'iframe:config', payload: config },
          iframe.current?.contentWindow,
          '*'
        );
        break;

      case 'iframe:close_window':
        setIsChatWindowOpen(false);
        break;

      default:
        break;
    }
  }, []);

  // Enable comunication between the iframe and the parent window
  const { sendMessage } = usePostMessage(handleMessage);

  return (
    <QueryClientProvider client={queryClient}>
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
        accentColor={config?.accentColor}
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
            <Box className="w-[400px] h-[600px] rounded-xl bg-gray-50 overflow-hidden shadow-md border border-gray-200">
              <Iframe ref={iframe} src={widgetUrl} />
            </Box>
          </motion.div>

          <motion.div
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.1 }}
            style={{ position: 'relative' }}
          >
            <div style={{ position: 'absolute', top: 0, right: 0, zIndex: 10 }}>
              <ServiceStatus />
            </div>
            <IconButton
              className="cursor-pointer shadow-md"
              size="4"
              variant="solid"
              radius="full"
              onClick={() => setIsChatWindowOpen((state) => !state)}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isChatWindowOpen ? 'close' : 'open'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  {isChatWindowOpen ? (
                    <ChevronDownIcon color="white" />
                  ) : (
                    <ChatBubbleIcon color="white" />
                  )}
                </motion.div>
              </AnimatePresence>
            </IconButton>
          </motion.div>
        </Flex>
      </Theme>
    </QueryClientProvider>
  );
}

/**
 * Converts the WidgetComponent to a web component.
 */
export const EloquentAIChatWidget = reactToWebComponent(WidgetComponent, {
  shadow: 'open',
  props: {
    id: 'string',
    title: 'string',
    accentColor: 'string',
    secondaryColor: 'string',
    logoUrl: 'string',
  },
});

/**
 * Defines the custom element for the Eloquent AI Chat Widget if it hasn't been defined already.
 */
export const defineEloquentAIChatWidgetComponent = () => {
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
  defineEloquentAIChatWidgetComponent();

  const widget = new EloquentAIChatWidget();

  document.body.prepend(widget);

  return widget;
};
