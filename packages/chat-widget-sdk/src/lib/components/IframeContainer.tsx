import { ChatConfig } from '@eloquentai/types';
import { useEffect, useRef } from 'react';

interface IframeContainerProps {
    isOpen: boolean;
    widgetUrl: string;
    config: ChatConfig;
    onClose: () => void;
}

export function IframeContainer({ isOpen, widgetUrl, config, onClose }: IframeContainerProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            // Verify origin if needed, for now accept all
            if (event.data.type === 'WIDGET_READY') {
                // Send config to widget
                iframeRef.current?.contentWindow?.postMessage(
                    { type: 'INIT_CONFIG', payload: config },
                    '*'
                );
            } else if (event.data.type === 'CLOSE_WIDGET') {
                onClose();
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [config, onClose]);

    return (
        <div
            className={`fixed bottom-20 right-4 w-[350px] h-[500px] bg-white rounded-lg shadow-2xl transition-opacity duration-300 z-50 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
        >
            <iframe
                ref={iframeRef}
                src={widgetUrl}
                className="w-full h-full rounded-lg border-none"
                title="Chat Widget"
            />
        </div>
    );
}
