import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/lib/api-client";
import { MatchType } from "@/types";

type GetMatchOptions = {
  matchId: string;
};

export const getMatch = ({ matchId }: GetMatchOptions): Promise<MatchType> => {
  return apiClient.get(`/match/${matchId}`);
};

export const useMatch = ({ matchId }: GetMatchOptions) => {
  const { data, isLoading } = useQuery({
    queryKey: ["match", matchId],
    queryFn: () => getMatch({ matchId }),
  });

  return { data, isLoading };
};
