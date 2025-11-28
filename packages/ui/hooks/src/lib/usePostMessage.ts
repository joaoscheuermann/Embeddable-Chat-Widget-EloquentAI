import { useEffect, useCallback } from 'react';
import { IWidgetMessage } from '@eloquentai/types';

export const usePostMessage = (handler?: (event: IWidgetMessage) => void) => {
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            console.log(`Message received from: ${event.origin}`, event.data);

            const data = event.data as IWidgetMessage;
            if (data && data.type && handler) {
                handler(data);
            }
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [handler]);

    const sendMessage = useCallback((message: IWidgetMessage, targetWindow: Window | null = null, targetOrigin: string = '*') => {
        const target = targetWindow || (window.parent !== window ? window.parent : null);

        console.log(`Message sent to: ${targetOrigin}`, message);

        if (target) {
            target.postMessage(message, targetOrigin);
        } else {
            console.warn('No target window found to send message');
        }
    }, []);

    return { sendMessage };
};
