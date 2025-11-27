import { ChatConfig } from '@eloquentai/types';
import { Cross2Icon } from '@radix-ui/react-icons';

interface HeaderProps {
    config: ChatConfig;
    onClose: () => void;
}

export function Header({ config, onClose }: HeaderProps) {
    return (
        <div
            className="flex items-center justify-between p-4 rounded-t-lg text-white"
            style={{ backgroundColor: config.primaryColor || '#000' }}
        >
            <div className="flex items-center gap-2">
                {config.logoUrl && (
                    <img src={config.logoUrl} alt="Logo" className="w-8 h-8 rounded-full" />
                )}
                <h1 className="font-semibold text-lg">{config.title || 'Chat Support'}</h1>
            </div>
            <button
                onClick={onClose}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close chat"
            >
                <Cross2Icon className="w-5 h-5" />
            </button>
        </div>
    );
}
