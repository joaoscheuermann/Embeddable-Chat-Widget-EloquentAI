import { ChatWidget, ChatConfig } from '@eloquentai/chat-widget-sdk';

export function App() {
  const config: ChatConfig = {
    title: 'Eloquent Support',
    primaryColor: '#6366f1', // Indigo-500
    secondaryColor: '#4f46e5', // Indigo-600
    logoUrl: 'https://avatars.githubusercontent.com/u/1?v=4', // Mock logo
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to Eloquent AI</h1>
        <p className="text-lg text-gray-600">
          This is a demo page showcasing the embeddable chat widget.
          Click the chat button in the bottom right corner to start a conversation.
        </p>
        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Widget Configuration</h2>
          <pre className="text-left bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(config, null, 2)}
          </pre>
        </div>
      </div>

      <ChatWidget config={config} widgetUrl="http://localhost:4200" />
    </div>
  );
}

export default App;
