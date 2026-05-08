import { useQuery } from "@tanstack/react-query";
import { getKeysByTenant } from "@/api/api-keys.api";

export const useGetAllApiKeys = () => {
  return useQuery({
    queryKey: ["api-keys"],
    queryFn: getKeysByTenant,

    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};