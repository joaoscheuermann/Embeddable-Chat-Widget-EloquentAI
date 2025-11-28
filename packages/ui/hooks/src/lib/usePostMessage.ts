import { useEffect, useCallback } from 'react';
import { WidgetMessage } from '@eloquentai/types';

export const usePostMessage = (handler?: (event: WidgetMessage) => void) => {
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            // For now, we accept messages from any origin, but in production this should be restricted
            // if (event.origin !== targetOrigin) return;

            const data = event.data as WidgetMessage;
            if (data && data.type && handler) {
                handler(data);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [handler]);

    const sendMessage = useCallback((message: WidgetMessage, targetWindow: Window | null = null, targetOrigin: string = '*') => {
        const target = targetWindow || (window.parent !== window ? window.parent : null);
        if (target) {
            target.postMessage(message, targetOrigin);
        } else {
            console.warn('No target window found to send message');
        }
    }, []);

    return { sendMessage };
};
