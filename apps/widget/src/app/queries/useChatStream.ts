import { useQuery } from '@tanstack/react-query';
import { experimental_streamedQuery as streamedQuery } from '@tanstack/react-query';

const decoder = new TextDecoder();

export const useChatStream = (prompt: string | null) => {
    return useQuery({
        queryKey: ['chat', prompt],
        enabled: !!prompt,
        queryFn: streamedQuery({
            streamFn: async () => {
                const response = await fetch(
                    'http://localhost:3000/chat/session-id/message',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ message: prompt }),
                    }
                );

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                if (!response.body) {
                    throw new Error('ReadableStream not supported in this browser.');
                }

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return response.body as any;
            },
            reducer(acc, chunk) {
                try {
                    const decodedChunk = decoder.decode(chunk as Uint8Array);
                    const data = JSON.parse(decodedChunk);

                    if (data.finished) {
                        return acc;
                    }

                    return [...acc, data.content];
                } catch (error) {
                    return acc;
                }
            },
            initialValue: [] as string[]
        })
    })
}
