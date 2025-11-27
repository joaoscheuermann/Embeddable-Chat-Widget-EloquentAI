import { useEffect, useState } from 'react';
import { Header } from './Header';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { useChat } from '../hooks/useChat';
import { ChatConfig } from '@eloquentai/types';

export function ChatWindow() {
    const { messages, sendMessage } = useChat();
    const [config, setConfig] = useState<ChatConfig>({
        title: 'Support',
        primaryColor: '#000',
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
            <MessageList messages={messages} primaryColor={config.primaryColor} />
            <MessageInput onSend={sendMessage} primaryColor={config.primaryColor} />
        </div>
    );
}
