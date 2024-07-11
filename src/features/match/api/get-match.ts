import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/lib/api-client";

export const getMatch = ({ matchId }: any): Promise<any> => {
  return apiClient.get(`/match/${matchId}`);
};

export const useMatch = ({ matchId }: any) => {
  const { data, isLoading } = useQuery({
    queryKey: ["match", matchId],
    queryFn: () => getMatch({ matchId }),
  });

  return { data, isLoading };
};
