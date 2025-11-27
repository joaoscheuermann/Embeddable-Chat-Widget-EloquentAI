import { ChatMessage } from '@eloquentai/types';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { useEffect, useRef } from 'react';

interface MessageListProps {
    messages: ChatMessage[];
    primaryColor?: string;
}

export function MessageList({ messages, primaryColor }: MessageListProps) {
    const viewportRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (viewportRef.current) {
            viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <ScrollArea.Root className="flex-1 overflow-hidden bg-white">
            <ScrollArea.Viewport ref={viewportRef} className="w-full h-full p-4">
                <div className="flex flex-col gap-3">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.role === 'user'
                                    ? 'self-end text-white rounded-br-none'
                                    : 'self-start bg-gray-100 text-gray-800 rounded-bl-none'
                                }`}
                            style={msg.role === 'user' ? { backgroundColor: primaryColor || '#000' } : {}}
                        >
                            {msg.content}
                        </div>
                    ))}
                </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar orientation="vertical" className="flex select-none touch-none p-0.5 bg-black/5 transition-colors duration-[160ms] ease-out hover:bg-black/10 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5">
                <ScrollArea.Thumb className="flex-1 bg-black/20 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
            </ScrollArea.Scrollbar>
        </ScrollArea.Root>
    );
}
