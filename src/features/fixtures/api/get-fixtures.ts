import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/lib/api-client";

export const getFixtures = (): Promise<any> => {
  return apiClient.get(`/`);
};

export const useFixtures = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["fixtures"],
    queryFn: () => getFixtures(),
  });

  return { data, isLoading };
};
