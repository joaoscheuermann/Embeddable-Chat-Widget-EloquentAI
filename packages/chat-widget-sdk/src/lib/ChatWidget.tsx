import { useState } from 'react';
import { Launcher } from './components/Launcher';
import { IframeContainer } from './components/IframeContainer';
import { ChatConfig } from '@eloquentai/types';

export interface ChatWidgetProps {
    config: ChatConfig;
    widgetUrl?: string;
}

export function ChatWidget({ config, widgetUrl = 'http://localhost:4200' }: ChatWidgetProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <IframeContainer
                isOpen={isOpen}
                widgetUrl={widgetUrl}
                config={config}
                onClose={() => setIsOpen(false)}
            />
            <Launcher
                isOpen={isOpen}
                onClick={() => setIsOpen(!isOpen)}
                primaryColor={config.primaryColor}
            />
        </>
    );
}
