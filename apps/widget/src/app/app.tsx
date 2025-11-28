import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { MessageList } from './components/MessageList';
import { MessageInput } from './components/MessageInput';
import { useChat } from './hooks/useChat';

import { ChatConfig } from '@eloquentai/types';

function App() {
  const { messages, sendMessage } = useChat();
  const [config, setConfig] = useState<ChatConfig>({
    id: 'support',
    title: 'Support',
    accentColor: 'crimson',
    secondaryColor: 'auto',
    logoUrl: '',
  });

  useEffect(() => {
    // Listen for config from parent
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'INIT_CONFIG') {
        setConfig(event.data.payload);
      }
    };
    window.addEventListener('message', handleMessage);

    // Notify parent that widget is ready
    window.parent.postMessage({ type: 'WIDGET_READY' }, '*');

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleClose = () => {
    window.parent.postMessage({ type: 'CLOSE_WIDGET' }, '*');
  };

  return (
    <div className="flex flex-col h-full w-full bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
      <Header config={config} onClose={handleClose} />
      <MessageList messages={messages} primaryColor={config.accentColor} />
      <MessageInput onSend={sendMessage} primaryColor={config.accentColor} />
    </div>
  );
}

export default App;
