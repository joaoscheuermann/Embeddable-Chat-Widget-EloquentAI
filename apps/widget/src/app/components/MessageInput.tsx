
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { useState, FormEvent } from 'react';

interface MessageInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
    placeholder?: string;
    primaryColor?: string;
}

export function MessageInput({ onSend, disabled, placeholder, primaryColor }: MessageInputProps) {
    const [message, setMessage] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (message.trim() && !disabled) {
            onSend(message);
            setMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 bg-white">
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={placeholder || 'Type a message...'}
                    disabled={disabled}
                    className="flex-1 p-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                    style={{ '--tw-ring-color': primaryColor || '#000' } as any}
                />
                <button
                    type="submit"
                    disabled={disabled || !message.trim()}
                    className="p-2 rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                    style={{ backgroundColor: primaryColor || '#000' }}
                >
                    <PaperPlaneIcon className="w-5 h-5" />
                </button>
            </div>
        </form>
    );
}
