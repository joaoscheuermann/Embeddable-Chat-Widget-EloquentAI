import { IServiceStatus } from "@eloquentai/types";

import { useQuery } from "@tanstack/react-query";

export default function useCurrentServiceStatusQuery() {
    return useQuery<IServiceStatus>({
        queryKey: ['current-service-status'],
        queryFn: async () => {
            const response = await fetch(`${URL}/status`);
            return (await response.json()) as IServiceStatus;
        },
    });
}