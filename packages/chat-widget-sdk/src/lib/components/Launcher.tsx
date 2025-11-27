import { ChatBubbleIcon, Cross2Icon } from '@radix-ui/react-icons';

interface LauncherProps {
    isOpen: boolean;
    onClick: () => void;
    primaryColor?: string;
}

export function Launcher({ isOpen, onClick, primaryColor }: LauncherProps) {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-4 right-4 p-4 rounded-full shadow-lg text-white transition-transform hover:scale-105 z-50"
            style={{ backgroundColor: primaryColor || '#000' }}
            aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
            {isOpen ? (
                <Cross2Icon className="w-6 h-6" />
            ) : (
                <ChatBubbleIcon className="w-6 h-6" />
            )}
        </button>
    );
}
