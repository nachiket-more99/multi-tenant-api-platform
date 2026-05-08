import { useQuery } from "@tanstack/react-query";
import { getKeysByTenant } from "@/api/api-keys.api";

export const useGetAllApiKeys = () =>
  useQuery({
    queryKey: ["api-keys"],
    queryFn: getKeysByTenant,
    staleTime: 300000,
  });