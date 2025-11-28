// import { useCurentServiceStatusQuery } from '@ui/queries';

import { Box } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';

const URL = import.meta.env.VITE_API_ENDPOINT;

export interface ServiceStatus {
  status: string;
}

export const ServiceStatus = () => {
  const { data } = useQuery<ServiceStatus>({
    queryKey: ['current-service-status'],
    queryFn: async () => {
      const response = await fetch(`${URL}/status`);
      return (await response.json()) as ServiceStatus;
    },
  });

  if (!data?.status) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'maintenance':
        return 'bg-orange-500';
      case 'offline':
      default:
        return 'bg-gray-500';
    }
  };

  const className = `w-4 h-4 rounded-full border-2 border-white ${getStatusColor(
    data.status
  )}`;

  return <Box className={className} />;
};
