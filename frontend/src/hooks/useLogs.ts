import { useQuery } from "@tanstack/react-query";
import { getAllLogs, getLogsByKey } from "../api/log.api";

export const useLogs = (apiKeyId?: number) =>
  useQuery({
    queryKey: apiKeyId ? ["logs", apiKeyId] : ["logs", "all"],
    queryFn: () =>
      apiKeyId ? getLogsByKey(apiKeyId) : getAllLogs(),
    staleTime: 2000,
    refetchInterval: 3000, 
  });